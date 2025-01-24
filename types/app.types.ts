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

export type Experience = {
  company_name: string
  created_at: string | null
  end_date: string | null
  id: string
  is_current: boolean | null
  job_title: string
  portfolio_id: number | null
  start_date: string
}
export type Project = {
  created_at: string
  description: string | null
  github_link: string | null
  id: string
  img_thumbnail: string
  portfolio_id: number | null
  project_link: string | null
  skills: string[] | null
  title: string
}