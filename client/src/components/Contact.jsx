import { Clapperboard, Mail, Send } from 'lucide-react'

const Contact = () => (
  <section className='relative mx-auto w-full max-w-7xl overflow-hidden px-5 py-16 sm:px-8 md:py-24 lg:px-12'>
    <div className='pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl' aria-hidden='true' />

    <div className='relative grid overflow-hidden rounded-3xl border border-white/10 bg-[#111012] shadow-2xl shadow-black/20 md:grid-cols-[0.85fr_1.15fr]'>
      <div className='relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-primary/20 via-[#181316] to-[#111012] p-7 sm:p-10 lg:p-12'>
        <div className='pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full border border-white/[0.06]' aria-hidden='true' />
        <div className='pointer-events-none absolute -bottom-12 -right-8 h-48 w-48 rounded-full border border-white/[0.06]' aria-hidden='true' />

        <div className='relative'>
          <span className='mb-8 grid h-12 w-12 place-items-center rounded-2xl border border-primary/25 bg-primary/10 text-primary'>
            <Clapperboard className='h-6 w-6' aria-hidden='true' />
          </span>
          <p className='text-xs font-semibold uppercase tracking-[0.26em] text-primary'>We’re all ears</p>
          <h2 className='mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl'>
            Let’s talk <span className='text-primary'>movies.</span>
          </h2>
          <p className='mt-4 max-w-sm text-sm leading-7 text-gray-400 sm:text-base'>
            Have a question or want to work together? Drop us a message!
          </p>
        </div>

        <div className='relative mt-10 flex items-center gap-3 border-t border-white/10 pt-6'>
          <span className='grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-gray-300'>
            <Mail className='h-5 w-5' aria-hidden='true' />
          </span>
          <div>
            <p className='text-xs text-gray-500'>Your message matters</p>
            <p className='mt-1 text-sm font-medium text-gray-200'>Get in touch with QuickWatch</p>
          </div>
        </div>
      </div>

      <div className='p-6 sm:p-10 lg:p-12'>
        <div className='mb-7'>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gray-500'>Contact us</p>
          <h3 className='mt-2 text-xl font-semibold text-white sm:text-2xl'>Send us a message</h3>
        </div>

        <form className='space-y-5'>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
            <div>
              <label htmlFor='contact-name' className='mb-2 block text-sm font-medium text-gray-300'>
                Your name
              </label>
              <input
                id='contact-name'
                type='text'
                placeholder='John Doe'
                className='w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 hover:border-white/20 focus:border-primary/70 focus:ring-2 focus:ring-primary/20'
                required
              />
            </div>

            <div>
              <label htmlFor='contact-email' className='mb-2 block text-sm font-medium text-gray-300'>
                Your email
              </label>
              <input
                id='contact-email'
                type='email'
                placeholder='john@example.com'
                className='w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 hover:border-white/20 focus:border-primary/70 focus:ring-2 focus:ring-primary/20'
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor='contact-message' className='mb-2 block text-sm font-medium text-gray-300'>
              Message
            </label>
            <textarea
              id='contact-message'
              rows='5'
              placeholder='How can we help you?'
              className='w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-gray-600 hover:border-white/20 focus:border-primary/70 focus:ring-2 focus:ring-primary/20'
              required
            />
          </div>

          <button
            type='button'
            className='inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-dull active:scale-[0.99] sm:w-auto'
          >
            Send message
            <Send className='h-4 w-4' aria-hidden='true' />
          </button>
        </form>
      </div>
    </div>
  </section>
)

export default Contact
