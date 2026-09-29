import type { Teacher } from '../types/user';
import { useEffect, useState } from 'react'
import { fetchTeachers } from '../services/lingoService';
import toast from 'react-hot-toast';
import TeacherCard from '../components/TeacherCard/TeacherCard';
import style from './Teachers.module.css'
import Filters, { type FilterState } from '../components/Filters/Filters';

const INITIAL_FILTERS: FilterState = {
  language: '',
  level: '',
  price: '',
};

const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const hasActiveFilters = Object.values(filters).some(Boolean);

  // First page: loads on mount and again from the start whenever filters change
  useEffect(() => {
    let ignore = false;

    fetchTeachers(undefined, filters)
      .then((page) => {
        if (ignore) return;
        setTeachers(page.teachers);
        setLastKey(page.lastKey);
        setHasMore(page.hasMore);
        setHasLoaded(true);
      })
      .catch(() => {
        if (ignore) return;
        toast.error('Failed to load teachers. Try again later!');
        setHasLoaded(true);
      });

    // Drop the response if filters changed again before it arrived
    return () => {
      ignore = true;
    };
  }, [filters]);

  const loadMore = async () => {
    if (!lastKey) return;

    setIsLoading(true);
    try {
      const page = await fetchTeachers(lastKey, filters);
      setTeachers((prev) => [...prev, ...page.teachers]);
      setLastKey(page.lastKey);
      setHasMore(page.hasMore);
    } catch {
      toast.error('Failed to load teachers. Try again later!');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <main className={style.page}>
      <div className={style.container}>
        <h1 className='visually-hidden'>Teachers</h1>

        <Filters filters={filters} onFilterChange={setFilters} />

        {!hasLoaded ? (
          <p className={style.status} role='status'>Loading teachers...</p>
        ) : teachers.length > 0 ? (
          <ul className={style.list}>
            {teachers.map(teacher => (
              <li key={teacher.id}>
                <TeacherCard teacher={teacher} />
              </li>
            ))}
          </ul>
        ) : (
          <div className={style.empty} role='status'>
            <h2 className={style.emptyTitle}>No teachers found</h2>
            <p className={style.emptyText}>
              {hasActiveFilters
                ? 'No teachers match the selected filters. Try changing the language, level or price.'
                : 'There are no teachers yet. Please check back later.'}
            </p>

            {hasActiveFilters && (
              <button
                type='button'
                className={style.resetButton}
                onClick={() => setFilters(INITIAL_FILTERS)}
              >
                Reset filters
              </button>
            )}
          </div>
        )}


        {teachers.length !== 0 && hasMore && (
          <button 
            className={style.loadMore}
            type='button' 
            onClick={loadMore}
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
