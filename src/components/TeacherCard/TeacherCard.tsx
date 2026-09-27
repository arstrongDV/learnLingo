import type { Teacher } from '../../types/user'
import React, { useState } from 'react'
import sprite from '/icons.svg?no-inline'
import style from './TeacherCard.module.css'

interface TeacherCardProps {
    teacher: Teacher;
}

const TeacherCard = ({teacher}: TeacherCardProps) => {
    const [isReadMore, setReadMore] = useState(false);

  return (
    <div className={style.cardContainer} >
        <div className={style.avatarWrapper} >

            <div className={style.circle}>
                <div className={style.isOnlineCircle}></div>
                <img className={style.avatar} src={`${teacher.avatar_url}`} alt='teacher-photo' />
            </div>

        </div>
        <div className={style.infoWrapper}>
            <div className={style.teacherInfo}>
                <span className={style.infoHeader}>
                    <div className={style.languagesTitle}>
                        <p>Languages</p>
                        <h3>{teacher.name} {teacher.surname}</h3>
                    </div>
                </span>
                <span className={style.teacherInfoDesc}>
                    <div className={style.infoDescItems}>
                        <span className={style.descItem}>
                            <svg width={16} height={16}>
                                <use className={style.bookIcon} href={`${sprite}#icon-book`}></use>
                            </svg>

                            <p>Lessons online</p>
                        </span>

                        <span className={style.descItem}>
                            <p>Lessons done: {teacher.lessons_done}</p>
                        </span>

                        <span className={style.descItem}>
                            <svg width={16} height={16}>
                                <use className={style.starIcon} href={`${sprite}#icon-star`}></use>
                            </svg>

                            <p>Rating: {teacher.rating}</p>
                        </span>

                        <span className={style.descItem}>
                            <p>Price / 1 hour: <span className={style.lightGreen}>{teacher.price_per_hour}$</span></p>
                        </span>
                    </div>

                    <svg width={26} height={26}>
                        <use className={style.heartIcon} href={`${sprite}#icon-heart`}></use>
                    </svg>
                </span>
            </div>
            <div className={style.teacherInfoWrapper}>
                <div className={style.teacherTalents}>
                    <p className={style.talent}>
                        <span className={style.talentLabel}>Speaks: </span>
                        <span className={style.languages}>{teacher.languages.join(', ')}</span>
                    </p>

                    <p className={style.talent}>
                        <span className={style.talentLabel}>Lesson Info: </span>
                        {teacher.lesson_info}
                    </p>

                    <p className={style.talent}>
                        <span className={style.talentLabel}>Conditions: </span>
                        {teacher.conditions.join(' ')}
                    </p>
                </div>

                {!isReadMore ? 
                    <button onClick={() => setReadMore(true)} className={style.readMeSpan}>Read more</button>
                    :
                    <p className={style.teacherDescription}>
                        {teacher.experience}
                    </p>
                }
            </div>

            {isReadMore && (
                <div className={style.reviewsContainer}>
                    {teacher.reviews.map((rewiew) => (
                        <div className={style.rewiewWrapper}>
                            <div className={style.reviewerHeader}>
                                <p>{rewiew.reviewer_name}</p>
                                <span className={style.reviewerRating}>
                                    <svg width={16} height={16}>
                                        <use className={style.starIcon} href={`${sprite}#icon-star`}></use>
                                    </svg>
                                    {rewiew.reviewer_rating.toFixed(1)}
                                </span>
                            </div>

                            <p className={style.reviewerComment}>
                                {rewiew.comment}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            <ul className={style.levels}>
                {teacher.levels.map((level) => (
                    <li key={level} className={style.level}>
                        #{level}
                    </li>
                ))}
            </ul>

            <button className={style.teacherBook}>Book trial lesson</button>
        </div>
    </div>
  )
}

export default TeacherCard
