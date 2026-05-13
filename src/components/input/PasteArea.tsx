import { useEffect } from 'react'
import { useAppStore } from '../../store/appStore'
import { useConversion } from '../../hooks/useConversion'
import { detectInputType } from '../../lib/pipeline/detectType'
import { LineNumberedTextarea } from './LineNumberedTextarea'

export function PasteArea() {
  const { rawInput, setRawInput, setOutput } = useAppStore()
  const { run } = useConversion()

  const pasteValue =
    rawInput?.type === 'md' || rawInput?.type === 'txt'
      ? rawInput.text || ''
      : ''

  const handlePasteChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text = e.target.value

    if (!text.trim()) {
      setRawInput(null)
      setOutput('')
      return
    }

    const type = detectInputType(undefined, text)

    setRawInput({
      type,
      text,
    })
  }

  useEffect(() => {
    if (rawInput) {
      run()
    }
  }, [rawInput, run])

  return (
    <LineNumberedTextarea
      placeholder={`Paste content directly here:
• Plain text content
• Markdown (.md)
• JSON data (auto-detected)
• Any converted document text

Formats are auto-detected. Start with { or [ for JSON, # for Markdown, etc.`}
      value={pasteValue}
      onChange={handlePasteChange}
      spellCheck={false}
    />
  )
}
