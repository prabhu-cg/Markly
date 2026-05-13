import type { InputType } from '../../types'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkToc from 'remark-toc'
import remarkStringify from 'remark-stringify'

function detectTocInMarkdown(markdown: string): boolean {
  return /^##\s+Table of Contents/m.test(markdown)
}

function detectTocInDocx(rawMarkdown: string): boolean {
  const lines = rawMarkdown.split('\n')
  const hasTocHeading = lines.some(line => /^#{1,6}\s+.*table\s+of\s+contents/i.test(line))
  return hasTocHeading
}

function detectTocInTxt(): boolean {
  return false
}

function detectTocInJson(): boolean {
  return false
}

export function shouldGenerateToc(inputType: InputType, rawMarkdown: string): boolean {
  if (inputType === 'md') {
    return detectTocInMarkdown(rawMarkdown)
  } else if (inputType === 'docx') {
    return detectTocInDocx(rawMarkdown)
  } else if (inputType === 'txt') {
    return detectTocInTxt()
  } else if (inputType === 'json') {
    return detectTocInJson()
  }
  return false
}

export async function generateTocMarkdown(
  markdown: string,
  inputType: InputType
): Promise<string> {
  try {
    const hasToc = shouldGenerateToc(inputType, markdown)

    if (!hasToc) {
      return markdown
    }

    const hasTocHeading = /^##\s+Table of Contents/m.test(markdown)

    let markdownWithToc = markdown
    if (!hasTocHeading) {
      const firstHeadingMatch = markdown.match(/^#\s+.+$/m)
      if (firstHeadingMatch) {
        const insertIndex = firstHeadingMatch[0].length
        markdownWithToc = markdown.slice(0, insertIndex) + '\n\n## Table of Contents\n' + markdown.slice(insertIndex)
      }
    }

    const processor = unified()
      .use(remarkParse)
      .use(remarkToc)
      .use(remarkStringify)

    const result = await processor.process(markdownWithToc)
    return String(result)
  } catch (err) {
    console.error('TOC generation error:', err)
    return markdown
  }
}
