import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { getPageBySlug, getAllPageSlugs } from '@/lib/sanity/queries'

export const revalidate = 60

export async function generateStaticParams() {
  return getAllPageSlugs()
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await getPageBySlug(params.slug)
  if (!page) return {}
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription,
  }
}

export default async function GenericPage({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug)
  if (!page) notFound()

  return (
    <article className="container py-20 max-w-3xl">
      <h1 className="font-display text-primary text-4xl sm:text-5xl font-extrabold leading-tight mb-10">{page.title}</h1>
      {page.body && (
        <div className="prose-boogly text-lg">
          <PortableText value={page.body} />
        </div>
      )}
    </article>
  )
}
