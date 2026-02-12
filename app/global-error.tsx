'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '24px',
        }}>
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '16px', letterSpacing: '-0.02em' }}>
              Something went wrong
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
              Don't worry, it's not you. Try refreshing the page.
            </p>
            <button
              onClick={reset}
              style={{
                padding: '12px 24px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: '500',
                backgroundColor: '#ffffff',
                color: '#000000',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
