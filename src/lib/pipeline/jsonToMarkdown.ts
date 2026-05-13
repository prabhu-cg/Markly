export type JsonMode = 'readable' | 'table' | 'code'

export interface JsonToMarkdownOptions {
  mode?: JsonMode
  maxDepth?: number
  tableThreshold?: number
}

interface ConversionContext {
  depth: number
  options: Required<JsonToMarkdownOptions>
}

// Detect if data is an array of objects (suitable for tables)
function isArrayOfObjects(arr: unknown[]): arr is Record<string, unknown>[] {
  return (
    arr.length > 0 &&
    arr.every((item) => typeof item === 'object' && item !== null && !Array.isArray(item))
  )
}

// Detect if array is all primitives
function isArrayOfPrimitives(arr: unknown[]): boolean {
  return arr.length > 0 && arr.every((item) => typeof item !== 'object' || item === null)
}

// Escape special markdown characters
function escapeMarkdown(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/\*/g, '\\*')
    .replace(/_/g, '\\_')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
}

// Format a value for display
function formatValue(value: unknown, inTable: boolean = false): string {
  if (value === null) return '*null*'
  if (value === undefined) return '*undefined*'
  if (typeof value === 'boolean') return value ? '`true`' : '`false`'
  if (typeof value === 'number') return String(value)
  if (typeof value === 'string') {
    let str = escapeMarkdown(value)
    if (inTable) {
      str = str.replace(/\n/g, ' ')
      if (str.length > 50) str = str.substring(0, 47) + '...'
    }
    return str
  }
  return String(value)
}

// Generate heading for the given depth
function getHeading(depth: number): string {
  return '#'.repeat(Math.min(depth, 5)) + ' '
}

// Convert array of objects to markdown table
function arrayToTable(arr: Record<string, unknown>[]): string {
  if (arr.length === 0) return ''

  // Get all unique keys across all objects
  const keys = Array.from(
    new Set(arr.flatMap((obj) => Object.keys(obj)))
  )

  // Create table header
  const header = '| ' + keys.join(' | ') + ' |'
  const separator = '|' + keys.map(() => ' --- ').join('|') + '|'

  // Create table rows
  const rows = arr.map((obj) => {
    const cells = keys.map((key) => {
      const value = obj[key]
      return formatValue(value, true)
    })
    return '| ' + cells.join(' | ') + ' |'
  })

  return [header, separator, ...rows].join('\n')
}

// Convert array of primitives to markdown list
function primitiveArrayToList(arr: unknown[]): string {
  return arr.map((item) => `- ${formatValue(item)}`).join('\n')
}

// Main recursive conversion function
function convertValue(
  value: unknown,
  key: string | null,
  context: ConversionContext
): string {
  const { depth, options } = context

  // Check depth limit
  if (depth > options.maxDepth) {
    return ''
  }

  // Handle null
  if (value === null) {
    return key ? `- **${key}**: *null*` : '*null*'
  }

  // Handle primitives
  if (typeof value !== 'object') {
    if (key) {
      return `- **${key}**: ${formatValue(value)}`
    }
    return formatValue(value)
  }

  // Handle arrays
  if (Array.isArray(value)) {
    const lines: string[] = []

    if (key) {
      lines.push(getHeading(depth) + escapeMarkdown(key))
      lines.push('')
    }

    if (value.length === 0) {
      lines.push('*Empty array*')
    } else if (options.mode === 'table' && isArrayOfObjects(value)) {
      lines.push(arrayToTable(value))
    } else if (isArrayOfPrimitives(value)) {
      lines.push(primitiveArrayToList(value))
    } else if (isArrayOfObjects(value)) {
      // Array of objects in readable mode - don't create headings per item to avoid H1 conflicts
      const itemsMarkdown: string[] = []
      value.forEach((item) => {
        if (typeof item === 'object' && item !== null) {
          const itemLines = objectToMarkdown(item, { ...context, depth: depth })
          itemsMarkdown.push(itemLines)
        }
      })
      lines.push(itemsMarkdown.join('\n\n'))
    } else {
      // Mixed array types
      lines.push(primitiveArrayToList(value))
    }

    return lines.join('\n')
  }

  // Handle objects
  return objectToMarkdown(value as Record<string, unknown>, context, key)
}

// Convert object to markdown
function objectToMarkdown(
  obj: Record<string, unknown>,
  context: ConversionContext,
  parentKey?: string | null
): string {
  const { depth } = context
  const lines: string[] = []
  const keys = Object.keys(obj)

  // Add heading for object if it has a parent key
  if (parentKey && depth > 1) {
    lines.push(getHeading(depth) + escapeMarkdown(parentKey))
    lines.push('')
  }

  // Handle empty objects
  if (keys.length === 0) {
    lines.push('*Empty object*')
    return lines.join('\n')
  }

  // Process each key-value pair
  keys.forEach((key) => {
    const value = obj[key]

    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        lines.push(convertValue(value, key, { ...context, depth: depth + 1 }))
      } else {
        lines.push(objectToMarkdown(value as Record<string, unknown>, { ...context, depth: depth + 1 }, key))
      }
    } else {
      lines.push(`- **${escapeMarkdown(key)}**: ${formatValue(value)}`)
    }

    lines.push('')
  })

  return lines.join('\n').trim()
}

// Main entry point
export function jsonToMarkdown(
  data: unknown,
  userOptions: JsonToMarkdownOptions = {}
): string {
  const options: Required<JsonToMarkdownOptions> = {
    mode: userOptions.mode || 'readable',
    maxDepth: userOptions.maxDepth || 5,
    tableThreshold: userOptions.tableThreshold || 10,
  }

  // Code mode: return raw JSON in code block
  if (options.mode === 'code') {
    try {
      const json = JSON.stringify(data, null, 2)
      return '```json\n' + json + '\n```'
    } catch {
      return '```json\n' + String(data) + '\n```'
    }
  }

  // Readable and table modes: convert structure
  const context: ConversionContext = {
    depth: 1,
    options,
  }

  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) {
      return convertValue(data, null, context)
    }
    return objectToMarkdown(data as Record<string, unknown>, context)
  }

  return formatValue(data)
}

// Validation function for JSON
export interface JsonIssue {
  type: 'error' | 'warning' | 'info'
  message: string
  path: string
}

export function validateJson(data: unknown): JsonIssue[] {
  const issues: JsonIssue[] = []
  let maxDepth = 0
  let itemCount = 0

  function checkValue(value: unknown, path: string, depth: number): void {
    maxDepth = Math.max(maxDepth, depth)

    if (value === null || value === undefined) return

    if (Array.isArray(value)) {
      itemCount += value.length
      if (value.length > 50) {
        issues.push({
          type: 'warning',
          message: `Large array with ${value.length} items`,
          path,
        })
      }
      value.forEach((item, index) => {
        checkValue(item, `${path}[${index}]`, depth)
      })
    } else if (typeof value === 'object') {
      const obj = value as Record<string, unknown>
      Object.keys(obj).forEach((key) => {
        checkValue(obj[key], `${path}.${key}`, depth + 1)
      })

      // Check for empty objects
      if (Object.keys(obj).length === 0) {
        issues.push({
          type: 'info',
          message: 'Empty object',
          path,
        })
      }
    }
  }

  checkValue(data, '$', 0)

  if (maxDepth > 4) {
    issues.push({
      type: 'warning',
      message: `Deep nesting detected (${maxDepth} levels)`,
      path: 'root',
    })
  }

  return issues
}
