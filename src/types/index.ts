export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
  authorId: string | null
}

export interface PostSummary {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published: boolean
  createdAt: Date
  updatedAt?: Date
}

export interface User {
  id: string
  email: string
  name: string | null
  createdAt: Date
  updatedAt: Date
}
