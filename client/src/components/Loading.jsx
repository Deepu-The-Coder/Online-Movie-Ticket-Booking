import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Loading = () => {
  const { nextUrl } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!nextUrl) return undefined

    const timeout = setTimeout(() => {
      navigate(`/${nextUrl}`)
    }, 8000)

    return () => clearTimeout(timeout)
  }, [navigate, nextUrl])

  return (
    <main
      className='relative flex min-h-[80svh] items-center justify-center overflow-hidden px-5 py-16'
      role='status'
      aria-live='polite'
    >
      <div className='pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]' aria-hidden='true' />

      <div className='relative flex w-full max-w-sm flex-col items-center rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.055] to-white/[0.015] px-8 py-10 text-center shadow-2xl shadow-black/20 backdrop-blur-sm'>
        <div className='relative grid h-20 w-20 place-items-center'>
          <span className='absolute inset-0 animate-spin rounded-full border-2 border-white/10 border-t-primary [animation-duration:1.2s]' aria-hidden='true' />
          <span className='text-3xl font-bold tracking-tight text-primary' aria-hidden='true'>Q</span>
        </div>

        <p className='mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-primary'>QuickWatch</p>
        <h1 className='mt-2 text-xl font-semibold text-white'>Getting things ready</h1>
        <p className='mt-2 text-sm leading-6 text-gray-400'>
          Sit tight while we prepare your movie experience.
        </p>

        <div className='mt-7 flex items-center gap-1.5' aria-hidden='true'>
          <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-primary' />
          <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-primary/70 [animation-delay:150ms]' />
          <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-primary/40 [animation-delay:300ms]' />
        </div>
        <span className='sr-only'>Loading</span>
      </div>
    </main>
  )
}

export default Loading
