import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import type { Teacher } from '../types/user'
import { fetchTeachersByIds } from '../services/lingoService'
import { useAuth } from '../context/useAuth'
import { useFavoriteIds } from '../store/store'
import TeacherCard from '../components/TeacherCard/TeacherCard'
import style from './Teachers.module.css'

const Favorites = () => {
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth()
  const favoriteIds = useFavoriteIds()

  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    let ignore = false

    fetchTeachersByIds(favoriteIds)
      .then((result) => {
        if (ignore) return
        setTeachers(result)
        setHasLoaded(true)
      })
      .catch(() => {
        if (ignore) return
        toast.error('Failed to load favorite teachers. Try again later!')
        setHasLoaded(true)
      })

    return () => {
      ignore = true
    }
  }, [favoriteIds])

  // Wait until Firebase restores the session before deciding to redirect
  if (isAuthLoading) return null
  if (!isLoggedIn) return <Navigate to='/' replace />

  // Hide a teacher immediately after it's removed from favorites
  const favoriteTeachers = teachers.filter((teacher) => favoriteIds.includes(teacher.id))

  return (
    <main className={style.page}>
      <div className={style.container}>
        <h1 className='visually-hidden'>Favorite teachers</h1>

        {!hasLoaded ? (
          <p className={style.status} role='status'>Loading favorite teachers...</p>
        ) : favoriteTeachers.length > 0 ? (
          <ul className={style.list}>
            {favoriteTeachers.map((teacher) => (
              <li key={teacher.id}>
                <TeacherCard teacher={teacher} />
              </li>
            ))}
          </ul>
        ) : (
          <div className={style.empty} role='status'>
            <h2 className={style.emptyTitle}>No favorite teachers yet</h2>
            <p className={style.emptyText}>
              Tap the heart on a teacher's card to save them here.
            </p>
            <Link to='/teachers' className={style.resetButton}>
              Browse teachers
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}

export default Favorites
