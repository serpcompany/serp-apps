export enum UserRole {
  MEMBER = 'member',
  ADMIN = 'admin',
  OWNER = 'owner',
}

export enum OneTimePasswordTypes {
  signup = 'SIGNUP',
  login = 'LOGIN',
  forgotPassword = 'FORGOT_PASSWORD',
}

export const SerpTools = [
  {
    icon: 'i-lucide-scan-eye',
    title: 'Website Screenshot',
    description: 'Capture and analyze screenshots of your website.',
    path: '/tools/screenshots',
  },
  {
    icon: 'i-lucide-images',
    title: 'Bulk AI Images Generator',
    description: 'Create hundreds of unique visuals from a single prompt or a CSV file.',
    path: '/tools/bulk-ai-images',
  },
  // {
  //   icon: 'i-lucide-search',
  //   title: 'Keyword Finder',
  //   description: 'Discover trending keywords for your SEO campaigns.',
  // },
  // {
  //   icon: 'i-lucide-bar-chart-3',
  //   title: 'Rank Tracker',
  //   description: 'Track your website rankings across search engines.',
  // },
  // {
  //   icon: 'i-lucide-globe',
  //   title: 'SERP Analyzer',
  //   description: 'Analyze search engine result pages for any keyword.',
  // },
  // {
  //   icon: 'i-lucide-users',
  //   title: 'Competitor Research',
  //   description: 'Uncover your competitors’ strategies and keywords.',
  // },
  // {
  //   icon: 'i-lucide-file-text',
  //   title: 'Content Optimizer',
  //   description: 'Get suggestions to improve your content for SEO.',
  // },
  // {
  //   icon: 'i-lucide-link',
  //   title: 'Backlink Checker',
  //   description: 'Check and monitor backlinks to your website.',
  // },
]

export const PURCHASE_METHOD: 'one_time' | 'subscription' = 'one_time'
