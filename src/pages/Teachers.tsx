import type { Teacher } from '../types/user';
import React, { useEffect, useState } from 'react'
import { fetchTeachers } from '../services/lingoService';
import toast from 'react-hot-toast';
import TeacherCard from '../components/TeacherCard/TeacherCard';
import style from './Teachers.module.css'

const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

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
    <main className={style.Container}>
      
      <div className={style.teachersWrapper}>
        {teachers.map(teacher => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>

    </main>
  )
}

export default Teachers
