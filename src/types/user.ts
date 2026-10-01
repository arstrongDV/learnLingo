export const LANGUAGE_LEVELS = [
  'A1 Beginner',
  'A2 Elementary',
  'B1 Intermediate',
  'B2 Upper-Intermediate',
  'C1 Advanced',
  'C2 Proficient',
] as const;

export const LEARNING_REASON = [
  'Career and business',
  'Lesson for kids',
  'Living abroad',
  'Exams and coursework',
  'Culture, travel or hobby'
] as const;

export type LanguageLevel = (typeof LANGUAGE_LEVELS)[number];
export type LearningReason = (typeof LEARNING_REASON)[number];

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

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

export interface Teacher extends TeacherData {
  id: string;
}
