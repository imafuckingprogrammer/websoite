'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-6">
      <div className="text-center max-w-md">
        <h2 className="text-4xl font-bold tracking-tighter mb-4">Something went wrong</h2>
        <p className="text-white/60 mb-8">
          Don't worry, it's not you. Try refreshing the page.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-full text-sm font-medium bg-white text-black hover:bg-white/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
