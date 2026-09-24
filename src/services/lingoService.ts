import axios from "axios";
import type { Teacher, TeacherData } from "../types/user";

const api = axios.create({
    baseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const fetchTeachers = async (): Promise<Teacher[]> => {
    const res = await api.get<Record<string, TeacherData> | TeacherData[] | null>('/.json');
    if (!res.data) return [];

    return Object.entries(res.data).map(([id, teacher]) => ({ id, ...teacher }));
}