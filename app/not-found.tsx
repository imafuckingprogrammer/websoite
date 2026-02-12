'use client'

import { useTheme } from '../src/contexts/ThemeContext'
import AnimatedButton from '../src/components/ui/AnimatedButton'

export default function NotFound() {
  const { darkMode } = useTheme()

  return (
    <section className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-neutral-950 text-white' : 'bg-cream-100 text-black'}`}>
      <div className="container-wide text-center py-32">
        <h1 className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold tracking-tighter leading-none opacity-10">
          404
        </h1>
        <div className="-mt-20 md:-mt-28 lg:-mt-36 relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-4">
            Page Not Found
          </h2>
          <p className={`text-lg md:text-xl mb-8 max-w-md mx-auto ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
            Looks like this page went on vacation without telling us.
          </p>
          <a href="/">
            <AnimatedButton>
              Back to Home
            </AnimatedButton>
          </a>
        </div>
      </div>
    </section>
  )
}
