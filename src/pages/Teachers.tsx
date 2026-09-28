import type { Teacher } from '../types/user';
import React, { useEffect, useState } from 'react'
import { fetchTeachers } from '../services/lingoService';
import toast from 'react-hot-toast';
import TeacherCard from '../components/TeacherCard/TeacherCard';
import style from './Teachers.module.css'

const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

    const loadTeachers = async (fromKey?: string) => {
      setIsLoading(true);
        try {
            const page = await fetchTeachers(fromKey);
            setTeachers(prev => fromKey ? [...prev, ...page.teachers] : page.teachers);
            setLastKey(page.lastKey);
            setHasMore(page.hasMore);
        } catch(err) {
            toast.error("Faild to load teachers. Try again later!");
        } finally {
          setIsLoading(false);
        }
    }

    useEffect(() => {
      loadTeachers();
    }, []);

    console.log(teachers);


  return (
    <main className={style.page}>
      <div className={style.container}>
        <h1 className='visually-hidden'>Teachers</h1>

        <ul className={style.list}>
          {teachers.map(teacher => (
            <li key={teacher.id}>
              <TeacherCard teacher={teacher} />
            </li>
          ))}
        </ul>

        {hasMore && (
          <button 
            className={style.loadMore}
            type='button' 
            onClick={() => loadTeachers(lastKey ?? undefined)} 
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load more'}
          </button>
        )}
      </div>
    </main>
  )
}

export default Teachers
