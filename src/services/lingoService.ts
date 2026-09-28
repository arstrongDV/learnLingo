import axios from "axios";
import type { Teacher, TeacherData } from "../types/user";
import { limitToFirst, startAt } from "firebase/database";

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

export const fetchTeachers = async (lastKey?: string): Promise<TeachersPage> => {
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
        teachers,
        lastKey: pageEntries.at(-1)?.[0] ?? null,
        hasMore: entries.length > PAGE_SIZE,
    };
}