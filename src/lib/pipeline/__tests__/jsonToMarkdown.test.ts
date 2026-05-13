import { jsonToMarkdown, validateJson } from '../jsonToMarkdown'

// Test cases for JSON to Markdown conversion

const testCases = [
  {
    name: 'Simple object with primitives',
    input: {
      name: 'John',
      age: 30,
      active: true,
    },
    expectedContent: ['**name**: John', '**age**: 30', '**active**: `true`'],
  },

  {
    name: 'Nested objects',
    input: {
      user: {
        name: 'Alice',
        email: 'alice@example.com',
      },
    },
    expectedContent: ['# User', '**name**: Alice', '**email**: alice@example.com'],
  },

  {
    name: 'Array of primitives',
    input: {
      colors: ['red', 'green', 'blue'],
    },
    expectedContent: ['# Colors', '- red', '- green', '- blue'],
  },

  {
    name: 'Array of objects (readable mode)',
    input: {
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ],
    },
    mode: 'readable' as const,
    expectedContent: ['# Items', 'Item 1', 'Item 2'],
  },

  {
    name: 'Array of objects (table mode)',
    input: {
      products: [
        { name: 'Product A', price: 100 },
        { name: 'Product B', price: 200 },
      ],
    },
    mode: 'table' as const,
    expectedContent: ['| name', '| Product A', '| Product B'],
  },

  {
    name: 'Code mode',
    input: { data: 'test' },
    mode: 'code' as const,
    expectedContent: ['```json', '"data": "test"'],
  },

  {
    name: 'Null and undefined handling',
    input: {
      empty: null,
      value: 'test',
    },
    expectedContent: ['**empty**: *null*', '**value**: test'],
  },

  {
    name: 'Special characters in strings',
    input: {
      markdown: '**bold** text',
      pipe: 'a|b|c',
    },
    expectedContent: ['**markdown**', '\\*\\*bold\\*\\* text', 'a\\|b\\|c'],
  },

  {
    name: 'Empty objects and arrays',
    input: {
      empty_obj: {},
      empty_arr: [],
    },
    expectedContent: ['Empty object', 'Empty array'],
  },

  {
    name: 'Deep nesting',
    input: {
      level1: {
        level2: {
          level3: {
            level4: {
              value: 'deep',
            },
          },
        },
      },
    },
    expectedContent: ['value', 'deep'],
  },
]

// Test validation
const validationTests = [
  {
    name: 'Detects empty objects',
    input: { empty: {} },
    shouldHaveIssue: 'Empty object',
  },

  {
    name: 'Detects large arrays',
    input: { big: Array(60).fill(0) },
    shouldHaveIssue: 'Large array',
  },

  {
    name: 'Detects deep nesting',
    input: {
      l1: { l2: { l3: { l4: { l5: { value: 'deep' } } } } },
    },
    shouldHaveIssue: 'Deep nesting',
  },
]

console.log('=== JSON to Markdown Conversion Tests ===\n')

testCases.forEach((test) => {
  const mode = test.mode || 'readable'
  const result = jsonToMarkdown(test.input, { mode })

  const pass = test.expectedContent.every((expected) => result.includes(expected))

  console.log(`${pass ? '✓' : '✗'} ${test.name}`)
  if (!pass) {
    console.log(`  Expected to contain: ${test.expectedContent.join(', ')}`)
    console.log(`  Got: ${result.substring(0, 100)}...`)
  }
})

console.log('\n=== Validation Tests ===\n')

validationTests.forEach((test) => {
  const issues = validateJson(test.input)
  const pass = issues.some((i) => i.message.includes(test.shouldHaveIssue))

  console.log(`${pass ? '✓' : '✗'} ${test.name}`)
  if (!pass) {
    console.log(`  Expected issue containing: ${test.shouldHaveIssue}`)
    console.log(`  Got: ${issues.map((i) => i.message).join(', ')}`)
  }
})

console.log('\n=== Sample Output ===\n')

const sampleJson = {
  component: {
    name: 'Button',
    variants: ['primary', 'secondary', 'danger'],
    props: [
      { name: 'label', type: 'string', required: true },
      { name: 'onClick', type: 'function', required: false },
    ],
  },
}

console.log('Input JSON:')
console.log(JSON.stringify(sampleJson, null, 2))
console.log('\nOutput Markdown (Readable Mode):')
console.log(jsonToMarkdown(sampleJson, { mode: 'readable' }))
console.log('\nOutput Markdown (Table Mode):')
console.log(jsonToMarkdown(sampleJson, { mode: 'table' }))
console.log('\nOutput Markdown (Code Mode):')
console.log(jsonToMarkdown(sampleJson, { mode: 'code' }))
