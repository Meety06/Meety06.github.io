import type {
  AnalyticsConfig,
  CommentConfig,
  GithubConfig,
  Link,
  PostConfig,
  Site,
  SkillsShowcaseConfig,
  SocialLink,
  TagsConfig,
} from '~/types'

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'meety-blog'
const owner = process.env.GITHUB_REPOSITORY_OWNER ?? 'localhost'
const isRootPage = repository === `${owner}.github.io`
const base = process.env.BASE_PATH ?? (process.env.GITHUB_ACTIONS && !isRootPage ? `/${repository}` : '/')

export const SITE: Site = {
  title: 'Meety Tech Blog',
  description: 'Meety 팀 기술 블로그',
  website: process.env.SITE_URL ?? (process.env.GITHUB_ACTIONS ? `https://${owner}.github.io${base}` : 'http://localhost:4321'),
  lang: 'ko',
  base,
  author: 'Meety Team',
  ogImage: '/og-image.webp',
  transition: false,
  themeAnimation: true,
}

export const HEADER_LINKS: Link[] = [
  { name: '글', url: '/posts' },
  { name: '태그', url: '/tags' },
]

export const FOOTER_LINKS: Link[] = [
  { name: '홈', url: '/' },
  { name: '글', url: '/posts' },
  { name: '태그', url: '/tags' },
]

export const SOCIAL_LINKS: SocialLink[] = []

export const SKILLSSHOWCASE_CONFIG: SkillsShowcaseConfig = {
  SKILLS_ENABLED: false,
  SKILLS_DATA: [],
}

export const GITHUB_CONFIG: GithubConfig = {
  ENABLED: false,
  GITHUB_USERNAME: '',
  TOOLTIP_ENABLED: false,
}

export const POSTS_CONFIG: PostConfig = {
  title: '글',
  description: 'Meety 팀 기술 블로그',
  introduce: '',
  author: 'Meety Team',
  homePageConfig: { size: 5, type: 'compact' },
  postPageConfig: { size: 10, type: 'compact' },
  tagsPageConfig: { size: 10, type: 'time-line' },
  ogImageUseCover: true,
  postType: 'metaOnly',
  imageDarkenInDark: true,
  readMoreText: '더 읽기',
  prevPageText: '이전',
  nextPageText: '다음',
  tocText: '목차',
  backToPostsText: '글 목록으로',
  nextPostText: '다음 글',
  prevPostText: '이전 글',
  recommendText: '추천',
  wordCountView: false,
}

export const COMMENT_CONFIG: CommentConfig = {
  enabled: false,
  system: 'gitalk',
  gitalk: {
    clientID: '',
    clientSecret: '',
    repo: '',
    owner: '',
    admin: [],
    language: 'ko-KR',
    perPage: 5,
    pagerDirection: 'last',
    createIssueManually: false,
    distractionFreeMode: false,
    enableHotKey: true,
  },
}

export const TAGS_CONFIG: TagsConfig = {
  title: '태그',
  description: '태그',
  introduce: '',
}

export const ANALYTICS_CONFIG: AnalyticsConfig = {
  vercount: { enabled: false },
  umami: { enabled: false, websiteId: '', serverUrl: '' },
}
