'use client'

/**
 * Sanity Studio — erreichbar unter /studio
 * Nur für autorisierte Nutzer zugänglich (Sanity-Login erforderlich).
 */
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
