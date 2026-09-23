import axios from "axios";
import type { User } from "firebase/auth";

const api = axios.create({
    baseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const fetchTeachers = async (): Promise<User[]> => {
    const res = await api.get<User[]>('/.json');
    return res.data;
}