export type User = {
  avatar_url: string
  created_at: string | null
  email: string
  id: string
  name: string | null
  password: string | null
  type: string | null
}

export type Portfolio = {
  created_at: string
  description: string | null
  experiences: JSON | null
  id: number
  isAvailable: boolean | null
  languages: string[] | null
  links: string[] | null
  location: string | null
  owner_id: string | null
  skills: string[] | null
  timezone: string | null
  title: string | null
}