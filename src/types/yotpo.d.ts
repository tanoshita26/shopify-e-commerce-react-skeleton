export interface YotpoRetrieveReviewsData {
  status: Status
  response: YotpoRetrieveReviewsResponse
}

export interface Status {
  code: number
  message: string
}

export interface YotpoRetrieveReviewsResponse {
  pagination: Pagination
  bottomline: Bottomline
  grouping_data: GroupingData
  products: Product[]
  product_tags: any
  reviews: Review[]
}

export interface Pagination {
  page: number
  per_page: number
  total: number
}

export interface Bottomline {
  total_review: number
  average_score: number
  total_organic_reviews: number
  organic_average_score: number
  star_distribution: any
  custom_fields_bottomline: any
}

export interface GroupingData {}

export interface Product {
  id: number
  domain_key: string
  name: string
  social_links: SocialLinks
  embedded_widget_link: string
  testimonials_product_link: string
  product_link: string
  image_url: string
}

export interface SocialLinks {
  linkedin: string
  facebook: string
  twitter: string
  google_oauth2: string
}

export interface Review {
  id: number
  score: number
  votes_up: number
  votes_down: number
  content: string
  title: string
  created_at: string
  deleted: boolean
  verified_buyer: boolean
  source_review_id: any
  sentiment: number
  custom_fields: any
  product_id: number
  is_incentivized: boolean
  user: User
  comment: Comment
}

export interface User {
  user_id: number
  social_image: any
  user_type: string
  is_social_connected: number
  display_name: string
}

export interface Comment {
  id: number
  content: string
  created_at: string
}

export type YotpoSourceProductBottomLine = {
  totalReviews: number
  score: number
  yotpoId: string
} | null

export type YotpoCreateFormData = {
  reviewTitle: string
  reviewContent: string
  reviewScore: number
  reviewerName: string
  reviewerEmail: string
}
