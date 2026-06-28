'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'

const schema = z.object({
  name: z.string().min(2, 'Name ist zu kurz'),
  email: z.string().email('Bitte eine gültige E-Mail-Adresse eingeben'),
  message: z.string().min(10, 'Nachricht ist zu kurz (min. 10 Zeichen)').max(5000),
  consent: z.boolean().refine((v) => v === true, { message: 'Bitte stimme der Datenschutzerklärung zu.' }),
  website: z.string().optional(), // Honeypot
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { consent: false } })

  const onSubmit = async (data: FormData) => {
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.ok) {
        setSubmitted(true)
      } else {
        setServerError(json.error || 'Ein Fehler ist aufgetreten.')
      }
    } catch {
      setServerError('Netzwerkfehler – bitte prüfe deine Verbindung.')
    }
  }

  if (submitted) {
    return (
      <div className="bg-surface border border-green-500/30 rounded-2xl p-8 text-center animate-fade-in">
        <div className="text-5xl mb-4">✉️</div>
        <h3 className="text-primary text-xl font-bold mb-3">Nachricht erhalten!</h3>
        <p className="text-secondary">Wir melden uns so schnell wie möglich bei dir.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot */}
      <input {...register('website')} type="text" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden />

      <div>
        <label className="form-label">Name *</label>
        <input {...register('name')} className="form-input" placeholder="Dein Name" />
        {errors.name && <p className="form-error">{errors.name.message}</p>}
      </div>

      <div>
        <label className="form-label">E-Mail *</label>
        <input {...register('email')} type="email" className="form-input" placeholder="deine@email.de" />
        {errors.email && <p className="form-error">{errors.email.message}</p>}
      </div>

      <div>
        <label className="form-label">Nachricht *</label>
        <textarea
          {...register('message')}
          className="form-input resize-none"
          rows={6}
          placeholder="Womit können wir dir helfen?"
        />
        {errors.message && <p className="form-error">{errors.message.message}</p>}
      </div>

      {/* Einwilligung */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            {...register('consent')}
            type="checkbox"
            className="mt-1 w-4 h-4 flex-none accent-[#FB4D26]"
          />
          <span className="text-sm text-secondary">
            Ich habe die{' '}
            <a href="/datenschutz" target="_blank" className="underline hover:text-primary transition-colors">
              Datenschutzerklärung
            </a>{' '}
            gelesen und bin mit der Verarbeitung meiner Daten zur Bearbeitung der Anfrage einverstanden. *
          </span>
        </label>
        {errors.consent && <p className="form-error">{errors.consent.message}</p>}
      </div>

      {serverError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
          {serverError}
        </div>
      )}

      <Button type="submit" loading={isSubmitting} className="w-full">
        Nachricht senden →
      </Button>
    </form>
  )
}
