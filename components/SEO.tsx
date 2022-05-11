import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { config } from 'utils'
import type { NextImage } from 'lib/images'

interface Props {
  title?: string
  description?: string
  canonical?: string
  seoImage?: NextImage
}

function SEO(p: Props) {
  const router = useRouter()
  const { href: canonical } = new URL(router.asPath, config.siteUrl)

  const title = p.title || config.siteTitle
  const description = p.description || config.siteDesc

  const jsonLd = getJsonLd({
    ...p,
    canonical,
    title,
    description,
    seoImage: p.seoImage,
  })

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:url" content={canonical} />
      {p.seoImage && <meta name="twitter:image" content={p.seoImage.url} />}
      {p.seoImage && <meta property="og:image" content={p.seoImage.url} />}
      {p.seoImage && (
        <meta
          property="og:image:width"
          content={`${p.seoImage.dimensions.width}`}
        />
      )}
      {p.seoImage && (
        <meta
          property="og:image:height"
          content={`${p.seoImage.dimensions.height}`}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      ></script>
    </Head>
  )
}

function getJsonLd({ description, canonical, seoImage }: Props) {
  const { siteUrl } = config

  return {
    '@context': `https://schema.org/`,
    '@type': 'WebSite',
    url: canonical,
    image: {
      ...(seoImage && {
        '@type': `ImageObject`,
        url: seoImage.url,
        ...seoImage.dimensions,
      }),
    },
    mainEntityOfPage: {
      '@type': `WebPage`,
      '@id': siteUrl,
    },
    description,
  }
}

export default SEO