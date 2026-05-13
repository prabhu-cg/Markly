import type { InputType } from '../../types'

function looksLikeJson(text: string): boolean {
  if (!text) return false
  const trimmed = text.trim()
  return (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
         (trimmed.startsWith('[') && trimmed.endsWith(']'))
}

function looksLikeMarkdown(text: string): boolean {
  if (!text) return false
  const trimmed = text.slice(0, 500).trim()
  const mdPatterns = [
    /^#{1,6}\s/m, // Headings
    /^\s*[-*+]\s/m, // Unordered lists
    /^\s*\d+\.\s/m, // Ordered lists
    /\*\*.+\*\*/, // Bold
    /\[.+\]\(.+\)/, // Links
    /^```/m, // Code blocks
  ]
  return mdPatterns.some((pattern) => pattern.test(trimmed))
}

export function detectInputType(
  file?: File,
  text?: string
): InputType {
  if (file) {
    const name = file.name.toLowerCase()
    if (name.endsWith('.docx')) return 'docx'
    if (name.endsWith('.json')) return 'json'
    if (name.endsWith('.md') || name.endsWith('.markdown')) return 'md'
    if (name.endsWith('.txt')) return 'txt'
  }

  if (text) {
    const trimmed = text.trim()
    if (trimmed.length === 0) return 'unknown'
    if (looksLikeJson(text)) return 'json'
    if (looksLikeMarkdown(text)) return 'md'
    return 'txt'
  }

  return 'unknown'
}
