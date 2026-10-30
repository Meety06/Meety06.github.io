import { getCollection, type CollectionEntry } from 'astro:content'

// 文章按时间排序
export function postsSort(posts: CollectionEntry<'posts'>[]) {
  return posts.slice().sort((a, b) => {
    const dateA = a.data.updatedDate ?? a.data.pubDate
    const dateB = b.data.updatedDate ?? b.data.pubDate
    const dateDifference = new Date(dateB).getTime() - new Date(dateA).getTime()
    if (dateDifference !== 0) return dateDifference
    if (a.data.series && a.data.series === b.data.series && a.data.seriesOrder && b.data.seriesOrder) {
      return a.data.seriesOrder - b.data.seriesOrder
    }
    return 0
  })
}

// 공개 목록과 피드에는 게시한 글만 표시합니다.
export async function getAllPosts(): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getCollection('posts')
  return postsSort(allPosts.filter((post) => !post.data.draft))
}

// 개발 서버에서는 초안 주소를 직접 열어 미리 볼 수 있습니다.
export async function getPreviewablePosts(): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getCollection('posts')
  return postsSort(allPosts.filter((post) => import.meta.env.DEV || !post.data.draft))
}

// 获取所有置顶文章
export async function getPinnedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getCollection('posts')
  const pinnedPosts = allPosts.filter((post) => post.data.pinned)
  return postsSort(pinnedPosts)
}

// 获取最新的固定数量的文章
export async function getNumPosts(size: number): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getCollection('posts')
  return postsSort(allPosts.filter((post) => !post.data.draft)).slice(0, size)
}

// 获取标签
export async function getAllTags(): Promise<Record<string, number>> {
  const allPosts = await getAllPosts()
  const tags = allPosts.flatMap((post) => post.data.tags || [])
  return tags.reduce(
    (acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )
}
