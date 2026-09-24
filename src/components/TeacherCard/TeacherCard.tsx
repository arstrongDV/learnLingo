import type { Teacher } from '../../types/user'
import React from 'react'
import sprite from '/icons.svg?no-inline'
import style from './TeacherCard.module.css'

interface TeacherCardProps {
    teacher: Teacher;
}

const TeacherCard = ({teacher}: TeacherCardProps) => {
  return (
    <div className={style.cardContainer} >
        <div className={style.avatarWrapper} >

            <div className={style.circle}>
                <div className={style.isOnlineCircle}></div>
                <img className={style.avatar} src={`${teacher.avatar_url}`} alt='teacher-photo' />
            </div>

        </div>
        <div className={style.infoWrapper} >
            <div className={style.teacherInfo}>

                <span className={style.infoHeader}>
                    <div className={style.languagesTitle}>
                        <p>Languages</p>
                        <h3>{teacher.name} {teacher.surname}</h3>
                    </div>
                </span>
                <span>
                    <span className={style.typeOfLesson}>
                        <svg width={16} height={16}>
                            <use className={style.bookIcon} href={`${sprite}#icon-book`}></use>
                        </svg>

                        <p>Lessons online</p>
                    </span>

                    <span className={style.lessonsDone}>
                        <p>Lessons done: {teacher.lessons_done}</p>
                    </span>

                    <span className={style.raiting}>
                        <svg width={16} height={16}>
                            <use className={style.starIcon} href={`${sprite}#icon-star`}></use>
                        </svg>

                        <p>Rating: {teacher.rating}</p>
                    </span>

                    <span className={style.pricing}>
                        <p>Price / 1 hour: <span className={style.lightGreen}>{teacher.price_per_hour}$</span></p>
                    </span>
                </span>

            </div>
            <div className={style.levels}>

            </div>
        </div>
    </div>
  )
}

export default TeacherCard
