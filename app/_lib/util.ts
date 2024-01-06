import { ALLOWED_PAGES } from "../_consts/Links";

export function createSlug(title: string): string {
  // Replace spaces with hyphens and convert to lowercase
  return title.toLowerCase().replace(/\s+/g, '-');
}


