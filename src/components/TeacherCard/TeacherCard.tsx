import type { Teacher } from '../../types/user'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import sprite from '/icons.svg?no-inline'
import style from './TeacherCard.module.css'
import { useAuth } from '../../context/useAuth';
import { useFavoriteIds, useFavoritesStore } from '../../store/store';

interface TeacherCardProps {
    teacher: Teacher;
}

const TeacherCard = ({teacher}: TeacherCardProps) => {
    const [isReadMore, setReadMore] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const favoriteIds = useFavoriteIds();
    const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
    const isFavorite = favoriteIds.includes(teacher.id);

    const onFavoriteButtonClick = () => {
        if (!user) {
            navigate('/auth-required', { state: { backgroundLocation: location } });
            return;
        }

        toggleFavorite(user.uid, teacher.id);
    }

  return (
    <article className={style.card}>
        <div className={style.avatarRing}>
            <img className={style.avatarImg} src={teacher.avatar_url} alt={`${teacher.name} ${teacher.surname}`} />
            <span className={style.onlineBadge} aria-hidden='true'></span>
        </div>

        <div className={style.content}>
            <header className={style.cardHeader}>
                <div className={style.titleBlock}>
                    <p className={style.subtitle}>Languages</p>
                    <h2 className={style.name}>{teacher.name} {teacher.surname}</h2>
                </div>

                <div className={style.headerActions}>
                    <ul className={style.stats}>
                        <li className={style.statItem}>
                            <svg className={style.bookIcon} width={16} height={16} aria-hidden='true'>
                                <use href={`${sprite}#icon-book`}></use>
                            </svg>
                            Lessons online
                        </li>

                        <li className={style.statItem}>
                            Lessons done: {teacher.lessons_done}
                        </li>

                        <li className={style.statItem}>
                            <svg width={16} height={16} aria-hidden='true'>
                                <use href={`${sprite}#icon-star`}></use>
                            </svg>
                            Rating: {teacher.rating}
                        </li>

                        <li className={style.statItem}>
                            <span>Price / 1 hour: <span className={style.price}>{teacher.price_per_hour}$</span></span>
                        </li>
                    </ul>

                    <button
                        type='button'
                        className={`${style.favoriteButton} ${isFavorite ? style.favorite : ''}`}
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        aria-pressed={isFavorite}
                        onClick={onFavoriteButtonClick}
                    >
                        <svg width={26} height={26} aria-hidden='true'>
                            <use href={`${sprite}#icon-heart`}></use>
                        </svg>
                    </button>
                </div>
            </header>

            <div>
                <dl className={style.details}>
                    <div className={style.detailRow}>
                        <dt className={style.detailTerm}>Speaks:</dt>
                        <dd className={`${style.detailValue} ${style.languages}`}>{teacher.languages.join(', ')}</dd>
                    </div>

                    <div className={style.detailRow}>
                        <dt className={style.detailTerm}>Lesson Info:</dt>
                        <dd className={style.detailValue}>{teacher.lesson_info}</dd>
                    </div>

                    <div className={style.detailRow}>
                        <dt className={style.detailTerm}>Conditions:</dt>
                        <dd className={style.detailValue}>{teacher.conditions.join(' ')}</dd>
                    </div>
                </dl>

                {!isReadMore ? (
                    <button type='button' onClick={() => setReadMore(true)} className={style.readMoreButton}>
                        Read more
                    </button>
                ) : (
                    <p>{teacher.experience}</p>
                )}
            </div>

            {isReadMore && (
                <ul className={style.reviews}>
                    {teacher.reviews.map((rewiew) => (
                        <li key={rewiew.reviewer_name} className={style.review}>
                            <div className={style.reviewer}>
                                <p className={style.reviewerName}>{rewiew.reviewer_name}</p>
                                <p className={style.reviewerRating}>
                                    <svg width={16} height={16} aria-hidden='true'>
                                        <use href={`${sprite}#icon-star`}></use>
                                    </svg>
                                    {rewiew.reviewer_rating.toFixed(1)}
                                </p>
                            </div>

                            <p className={style.reviewComment}>{rewiew.comment}</p>
                        </li>
                    ))}
                </ul>
            )}

            <ul className={style.levels}>
                {teacher.levels.map((level) => (
                    <li key={level} className={style.level}>
                        #{level}
                    </li>
                ))}
            </ul>

            <button type='button' onClick={() => navigate('/book', { state: { backgroundLocation: location, teacher } })} className={style.bookButton}>Book trial lesson</button>
        </div>
    </article>
  )
}

export default TeacherCard
