export const LANGUAGE_LEVELS = [
  'A1 Beginner',
  'A2 Elementary',
  'B1 Intermediate',
  'B2 Upper-Intermediate',
  'C1 Advanced',
  'C2 Proficient',
] as const;

export type LanguageLevel = (typeof LANGUAGE_LEVELS)[number];

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

/** Teacher record exactly as stored in Firebase Realtime Database */
export interface TeacherData {
  name: string;
  surname: string;
  languages: string[];
  levels: LanguageLevel[];
  rating: number;
  reviews: Review[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
}

/** Teacher as used in the app: the database key is attached as `id` */
export interface Teacher extends TeacherData {
  id: string;
}
