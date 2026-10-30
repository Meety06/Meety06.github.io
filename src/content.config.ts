import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { POSTS_CONFIG } from '~/config'
import type { CoverLayout, PostType } from '~/types'

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/posts',
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        titleLines: z.tuple([z.string(), z.string()]).optional(),
        singleLineTitle: z.boolean().default(false),
        description: z.string(),
        pubDate: z.date(),
        tags: z.array(z.string()).optional(),
        series: z.string().optional(),
        seriesLabel: z.string().optional(),
        seriesOrder: z.number().int().positive().optional(),
        updatedDate: z.date().optional(),
        author: z.string().default(POSTS_CONFIG.author),
        cover: image().optional(),
        ogImage: image().optional(),
        recommend: z.boolean().default(false),
        postType: z.custom<PostType>().optional(),
        coverLayout: z.custom<CoverLayout>().optional(),
        pinned: z.boolean().default(false),
        draft: z.boolean().default(false),
        license: z.string().optional(),
      })
      .transform((data) => ({
        ...data,
        ogImage: POSTS_CONFIG.ogImageUseCover && data.cover ? data.cover : data.ogImage,
      })),
})

export const collections = { posts }
