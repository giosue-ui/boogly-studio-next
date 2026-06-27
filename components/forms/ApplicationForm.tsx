'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'

const DEFAULT_THEMES = [
  'Liebe & Beziehungen',
  'Politik & Gesellschaft',
  'Finanzen & Karriere',
  'Dating & Flirten',
  'Familie & Freundschaft',
  'Humor & Satire',
  'Gesundheit & Sport',
  'Reise & Abenteuer',
  'Technik & Zukunft',
  'Anderes',
]

const schema = z.object({
  name: z.string().min(2, 'Dein Name ist zu kurz'),
  email: z.string().email('Bitte eine gültige E-Mail-Adresse eingeben'),
  instagram: z.string().min(1, 'Instagram-Handle ist Pflicht'),
  tiktok: z.string().optional(),
  youtube: z.string().url('Ungültige URL').optional().or(z.literal('')),
  bio: z.string().min(20, 'Erzähl uns mehr über dich (min. 20 Zeichen)').max(2000),
  motivation: z.string().min(20, 'Erzähl uns warum du dabei sein möchtest (min. 20 Zeichen)').max(2000),
  themen: z.array(z.string()).min(1, 'Wähle mindestens ein Thema'),
  consent: z.boolean().refine((v) => v === true, { message: 'Bitte stimme der Datenschutzerklärung zu.' }),
  website: z.string().optional(), // Honeypot
})

type FormData = z.infer<typeof schema>

interface Props {
  eventTitle: string
  format: string
  themes?: string[]
}

export function ApplicationForm({ eventTitle, format, themes = DEFAULT_THEMES }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { themen: [], consent: false },
  })

  const selectedThemes = watch('themen') || []

  const toggleTheme = (theme: string) => {
    const current = selectedThemes
    if (current.includes(theme)) {
      setValue('themen', current.filter((t) => t !== theme), { shouldValidate: true })
    } else {
      setValue('themen', [...current, theme], { shouldValidate: true })
    }
  }

  const onSubmit = async (data: FormData) => {
    setServerError('')
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          themen: data.themen.join(', '),
          format,
          eventTitle,
        }),
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
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-primary text-2xl font-bold mb-3">Bewerbung eingegangen!</h3>
        <p className="text-secondary leading-relaxed">
          Vielen Dank für deine Bewerbung für <strong className="text-primary">{eventTitle}</strong>.<br />
          Wir haben dir eine Bestätigungsmail geschickt und melden uns so schnell wie möglich.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {/* Honeypot — für Bots unsichtbar */}
      <input {...register('website')} type="text" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden />

      {/* ── Persönliche Infos ── */}
      <section>
        <h3 className="text-primary font-semibold text-lg mb-5 pb-3 border-b border-border">
          Persönliche Angaben
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Vollständiger Name *</label>
            <input {...register('name')} className="form-input" placeholder="Max Mustermann" />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>
          <div>
            <label className="form-label">E-Mail-Adresse *</label>
            <input {...register('email')} type="email" className="form-input" placeholder="deine@email.de" />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>
        </div>
      </section>

      {/* ── Social Media ── */}
      <section>
        <h3 className="text-primary font-semibold text-lg mb-5 pb-3 border-b border-border">
          Social Media
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Instagram *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">@</span>
              <input {...register('instagram')} className="form-input pl-7" placeholder="dein_handle" />
            </div>
            {errors.instagram && <p className="form-error">{errors.instagram.message}</p>}
          </div>
          <div>
            <label className="form-label">TikTok <span className="text-muted">(optional)</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">@</span>
              <input {...register('tiktok')} className="form-input pl-7" placeholder="dein_handle" />
            </div>
          </div>
          <div>
            <label className="form-label">YouTube <span className="text-muted">(optional)</span></label>
            <input {...register('youtube')} className="form-input" placeholder="youtube.com/..." />
            {errors.youtube && <p className="form-error">{errors.youtube.message}</p>}
          </div>
        </div>
      </section>

      {/* ── Deine Stimme ── */}
      <section>
        <h3 className="text-primary font-semibold text-lg mb-5 pb-3 border-b border-border">
          Deine Stimme
        </h3>
        <div className="space-y-5">
          <div>
            <label className="form-label">
              Stell dich vor *{' '}
              <span className="text-muted font-normal">— Wer bist du?</span>
            </label>
            <textarea
              {...register('bio')}
              className="form-input resize-none"
              rows={4}
              placeholder="Erzähl uns kurz, wer du bist, was dich ausmacht und was dich bewegt..."
            />
            {errors.bio && <p className="form-error">{errors.bio.message}</p>}
          </div>
          <div>
            <label className="form-label">
              Deine Motivation *{' '}
              <span className="text-muted font-normal">— Warum möchtest du dabei sein?</span>
            </label>
            <textarea
              {...register('motivation')}
              className="form-input resize-none"
              rows={4}
              placeholder={`Warum möchtest du bei "${eventTitle}" mitmachen? Was erhoffst du dir?`}
            />
            {errors.motivation && <p className="form-error">{errors.motivation.message}</p>}
          </div>
        </div>
      </section>

      {/* ── Themen ── */}
      <section>
        <h3 className="text-primary font-semibold text-lg mb-2 pb-3 border-b border-border">
          Themen
        </h3>
        <p className="text-secondary text-sm mb-5">
          Welche Themen interessieren dich? (Mehrfachauswahl möglich)
        </p>
        <div className="flex flex-wrap gap-2">
          {themes.map((theme) => {
            const selected = selectedThemes.includes(theme)
            return (
              <button
                key={theme}
                type="button"
                onClick={() => toggleTheme(theme)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  selected
                    ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20'
                    : 'bg-surface-2 text-secondary border-border hover:border-accent/50 hover:text-primary'
                }`}
              >
                {theme}
              </button>
            )
          })}
        </div>
        {errors.themen && <p className="form-error mt-2">{errors.themen.message}</p>}
      </section>

      {/* ── Submit ── */}
      {serverError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
          {serverError}
        </div>
      )}

      {/* Einwilligung */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input {...register('consent')} type="checkbox" className="mt-1 w-4 h-4 flex-none accent-[#3B6EF6]" />
          <span className="text-sm text-secondary">
            Ich habe die{' '}
            <a href="/datenschutz" target="_blank" className="underline hover:text-primary transition-colors">
              Datenschutzerklärung
            </a>{' '}
            gelesen und willige ein, dass meine Angaben zur Bearbeitung meiner Bewerbung gespeichert und
            verarbeitet werden. Diese Einwilligung kann ich jederzeit widerrufen. *
          </span>
        </label>
        {errors.consent && <p className="form-error">{errors.consent.message}</p>}
      </div>

      <Button type="submit" size="lg" loading={isSubmitting} className="w-full sm:w-auto">
        Bewerbung absenden →
      </Button>
    </form>
  )
}
