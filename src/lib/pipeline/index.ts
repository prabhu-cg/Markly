import type { RawInput } from '../../types'
import { detectInputType } from './detectType'
import { docxToMarkdown } from './docxToMarkdown'
import { txtToMarkdown } from './txtToMarkdown'
import { mdToMarkdown } from './mdToMarkdown'
import { jsonToMarkdown } from './jsonToMarkdown'
import { applyCleanup } from '../cleanup'
import { applyFormatter } from '../formatter'
import { generateTocMarkdown } from '../toc/generateToc'
import { useAppStore } from '../../store/appStore'

async function getMarkdown(input: RawInput): Promise<string> {
  const type = detectInputType(input.file, input.text)

  let rawMarkdown: string

  if (type === 'docx') {
    if (!input.arrayBuffer) {
      throw new Error('No data provided')
    }
    rawMarkdown = await docxToMarkdown(input.arrayBuffer)
  } else if (type === 'txt') {
    if (!input.text) {
      throw new Error('No data provided')
    }
    rawMarkdown = txtToMarkdown(input.text)
  } else if (type === 'md') {
    if (!input.text) {
      throw new Error('No data provided')
    }
    rawMarkdown = mdToMarkdown(input.text)
  } else if (type === 'json') {
    if (!input.text) {
      throw new Error('No data provided')
    }
    try {
      const jsonData = JSON.parse(input.text)
      const mode = useAppStore.getState().jsonMode
      rawMarkdown = jsonToMarkdown(jsonData, { mode })
    } catch (err) {
      throw new Error(`Invalid JSON: ${err instanceof Error ? err.message : String(err)}`)
    }
  } else {
    throw new Error('Unsupported file type')
  }

  if (!rawMarkdown.trim()) {
    throw new Error('No content found in the input')
  }

  // Apply cleanup and formatting
  const cleanedMarkdown = applyCleanup(rawMarkdown)
  const formattedMarkdown = applyFormatter(cleanedMarkdown)

  // Generate Table of Contents only if input had one
  const markdownWithToc = await generateTocMarkdown(formattedMarkdown, type)

  return markdownWithToc
}

export async function runPipeline(input: RawInput): Promise<string> {
  return getMarkdown(input)
}
