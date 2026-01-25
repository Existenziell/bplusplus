'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SITE_URL } from '@/app/utils/metadata'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xvzkeedd'

const inputStyles =
  'px-3 py-2 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-gray-800 dark:text-gray-200 focus:outline-none focus:border-btc w-full'

function FeedbackForm() {
  return (
    <div className="max-w-xl mx-auto text-center">
      <h1 className="heading-page-hero">Feedback</h1>
      <p className="text-gray-800 dark:text-gray-200 leading-7 mb-8">
        I would love to get feedback from fellow Bitcoiners. What worked? What didn&apos;t? No login required 🧡
      </p>

      <form
        action={FORMSPREE_ENDPOINT}
        method="POST"
        className="space-y-4 text-left md:mt-16"
      >
        <input
          type="hidden"
          name="_next"
          value={`${SITE_URL}/feedback?thanks=1`}
        />
        <input type="hidden" name="_subject" value="B++ Feedback" />

        <div>
          <label htmlFor="feedback-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message <span className="text-btc" aria-hidden="true">*</span>
          </label>
          <textarea
            id="feedback-message"
            name="message"
            required
            rows={5}
            placeholder="Your feedback..."
            className={`${inputStyles} md:min-h-[20rem] resize-y`}
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="feedback-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email <span className="text-secondary text-xs">(optional, for follow-up)</span>
          </label>
          <input
            id="feedback-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className={inputStyles}
          />
        </div>

        <button type="submit" className="btn-primary">
          Send feedback
        </button>
      </form>
    </div>
  )
}

function FeedbackContent() {
  const searchParams = useSearchParams()
  const thanks = searchParams.get('thanks') === '1'

  if (thanks) {
    return (
      <div className="max-w-xl mx-auto text-center">
        <h1 className="heading-page-hero">Thank you</h1>
        <p className="text-gray-800 dark:text-gray-200 leading-7 mb-6">
          Your feedback helps us improve B++. We appreciate you taking the time to share your thoughts.
        </p>
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
      </div>
    )
  }

  return <FeedbackForm />
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={<FeedbackForm />}>
      <FeedbackContent />
    </Suspense>
  )
}
