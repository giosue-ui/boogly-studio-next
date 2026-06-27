import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import type { SanityImage } from './types'

const builder = imageUrlBuilder(client)

/** Sanity-Bild → optimierte URL. Beispiel: urlFor(img).width(800).url() */
export function urlFor(source: SanityImage) {
  return builder.image(source as object)
}
