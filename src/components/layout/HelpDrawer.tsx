import { useState } from 'react'
import { Question } from 'phosphor-react'
import { Drawer } from '../ui/Drawer'

const HELP_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: 'What is Markly?',
    answer:
      'Markly converts documents and rough text into clean, well-formatted Markdown, entirely in your browser.',
  },
  {
    question: 'What file types can I convert?',
    answer:
      'Word documents (.docx), plain text (.txt), Markdown (.md), and JSON (.json). Drop a file in, or paste content directly — the format is auto-detected.',
  },
  {
    question: 'What are the JSON output modes?',
    answer:
      'Readable turns JSON into headings and lists, Table renders arrays as Markdown tables, and Code drops the raw JSON into a fenced code block.',
  },
  {
    question: 'What does Validate check for?',
    answer:
      'Structural issues like empty headings, multiple H1s, and broken list nesting — each flagged as an error, warning, or suggestion, with one-click fixes where possible.',
  },
  {
    question: 'Does Markly work offline?',
    answer:
      'Yes. Parsing, conversion, and validation all run locally in your browser using JavaScript — no server, no internet connection required.',
  },
  {
    question: 'Is my file ever uploaded?',
    answer:
      'No. Markly is 100% client-side. Your file or pasted text never leaves your device.',
  },
]

export function HelpDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-9 items-center gap-1.5 rounded-md px-3 text-sm font-semibold text-text-muted transition-colors hover:bg-surface hover:text-text"
        title="Help"
      >
        <Question size={18} weight="bold" />
        <span className="hidden sm:inline">Help</span>
      </button>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Help" description="A quick guide to Markly.">
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
          {HELP_ITEMS.map((item) => (
            <div key={item.question}>
              <h3 className="text-sm font-semibold text-text">{item.question}</h3>
              <p className="mt-1 text-sm leading-relaxed text-text-muted">{item.answer}</p>
            </div>
          ))}
        </div>
      </Drawer>
    </>
  )
}
