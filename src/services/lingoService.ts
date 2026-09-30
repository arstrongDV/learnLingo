import axios from "axios";
import type { LanguageLevel, Teacher, TeacherData } from "../types/user";
import type { FilterState } from "../components/Filters/Filters";

const api = axios.create({
    baseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

const PAGE_SIZE = 10;

interface TeachersPage {
  teachers: Teacher[];
  lastKey: string | null; // pass this back in to get the next page
  hasMore: boolean;
}

export const fetchTeachers = async (lastKey?: string, filters?: FilterState): Promise<TeachersPage> => {
    const limit = lastKey ? PAGE_SIZE + 2 : PAGE_SIZE + 1;

    const res = await api.get<Record<string, TeacherData | null> | (TeacherData | null)[] | null>('/.json', {
        params: {
            orderBy: '"$key"',
            limitToFirst: limit,
            ...(lastKey && { startAt: `"${lastKey}"` })
        }
    });
    let entries = Object.entries(res.data ?? {})
    .filter((entry): entry is [string, TeacherData] => entry[1] !== null);

    if (lastKey) entries = entries.slice(1);

    const pageEntries = entries.slice(0, PAGE_SIZE);
    const teachers = pageEntries.map(([id, teacher]) => ({ id, ...teacher }));

    return {
        teachers: filters ? filter(teachers, filters) : teachers,
        lastKey: pageEntries.at(-1)?.[0] ?? null,
        hasMore: entries.length > PAGE_SIZE,
    };
}

/** Loads only the given teachers, e.g. the user's favorites */
export const fetchTeachersByIds = async (ids: string[]): Promise<Teacher[]> => {
    const responses = await Promise.all(
        ids.map((id) => api.get<TeacherData | null>(`/${id}.json`))
    );

    return responses.flatMap((res, index) =>
        res.data ? [{ id: ids[index], ...res.data }] : []
    );
}

function filter(teachers: Teacher[], filters: FilterState) {
    return teachers.filter((teacher) => 
        (!filters.language || teacher.languages.includes(filters.language)) &&
        (!filters.level || teacher.levels.includes(filters.level as LanguageLevel)) &&
        (!filters.price || teacher.price_per_hour <= Number(filters.price))
    );
}