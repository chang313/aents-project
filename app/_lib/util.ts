import { ALLOWED_PAGES } from "../_consts/Links";

export function createSlug(title: string): string {
  // Replace spaces with hyphens and convert to lowercase
  return title.toLowerCase().replace(/\s+/g, '-');
}


export type Article = {
  _id: string
  title: string
  content: string
  date_time: Date
  writer_name: string,
  image: null
}
