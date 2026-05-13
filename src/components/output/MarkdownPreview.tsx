import { useMemo } from 'react'
import { useAppStore } from '../../store/appStore'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeSanitize from 'rehype-sanitize'

export function MarkdownPreview() {
  const output = useAppStore((s) => s.output)

  const html = useMemo(() => {
    if (!output) return ''
    try {
      const result = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .processSync(output)
      return String(result)
    } catch {
      return '<p>Error rendering preview</p>'
    }
  }, [output])

  return (
    <div
      className="markdown-preview flex-1 overflow-y-auto text-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
