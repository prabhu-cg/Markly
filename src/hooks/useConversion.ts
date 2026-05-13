import { useCallback } from 'react'
import { useAppStore } from '../store/appStore'
import { runPipeline } from '../lib/pipeline'

export function useConversion() {
  const { setOutput, setStatus, setError } = useAppStore()

  const run = useCallback(async () => {
    const currentRawInput = useAppStore.getState().rawInput

    if (!currentRawInput) {
      setError('No input provided')
      return
    }

    try {
      setStatus('processing')
      setError(null)

      const markdown = await runPipeline(currentRawInput)
      setOutput(markdown)
      setStatus('done')
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Conversion failed'
      setError(message)
      setStatus('error')
    }
  }, [setOutput, setStatus, setError])

  return { run, isProcessing: useAppStore((s) => s.status) === 'processing' }
}
