import type { User } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { fetchTeachers } from '../services/lingoService';
import toast from 'react-hot-toast';

const Teachers = () => {
  const [teachers, setTeachers] = useState<User[]>([]);

    const getTeachers = async () => {
        try {
            const res = await fetchTeachers();
            setTeachers(res);
        } catch(err) {
            toast.error("Faild to load teachers. Try again later!");
        }
    }

    useEffect(() => {
      getTeachers();
    }, []);

    console.log(teachers);


  return (
    <main>
      
    </main>
  )
}

export default Teachers
