import { ALLOWED_PAGES } from "../_consts/Links";

export function createSlug(title: string): string {
  // Replace spaces with hyphens and convert to lowercase
  const removeSlash = title.replace(/\//g, ' ');
  return removeSlash.toLowerCase().replace(/\s+/g, '-');
}


export type Article = {
  _id: string
  title: string
  content: string
  date_time: Date
  writer_name: string,
  image: null
}


export function datetime2YearMonthDay(datetime: string): string {
  const dateObj = new Date(datetime);
  const year = dateObj.toISOString().substring(0, 4);
  const month = dateObj.toISOString().substring(5, 7);
  const day = dateObj.toISOString().substring(8, 10);

  const korYearMonthDay = year + '년 ' + month + '월 ' + day + '일 ' ;
  return korYearMonthDay;
}

