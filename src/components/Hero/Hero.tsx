import React from 'react'
import style from './Hero.module.css'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className={style.hero}>
      <div className={style.heroTop}>
        <div className={style.intro}>
          <h1 className={style.title}>
            Unlock your potential with the
            best <span className={style.highlight}>language</span> tutors
          </h1>

          <p className={style.description}>
            Embark on an Exciting Language Journey with Expert Language
            Tutors: Elevate your language proficiency to new heights by
            connecting with highly qualified and experienced tutors.
          </p>

          <Link to='/teachers' className={style.startLink}>Get started</Link>
        </div>

        <div className={style.banner}>
          <img className={style.bannerAvatar} src='/images/avatar.png' alt='' />
          <img className={style.bannerLaptop} src='/images/green-mac.png' alt='' />
        </div>
      </div>

      <ul className={style.stats}>
        <li className={style.statItem}>
          <span className={style.statValue}>32,000 +</span>
          <span className={style.statLabel}>Experienced tutors</span>
        </li>
        <li className={style.statItem}>
          <span className={style.statValue}>300,000 +</span>
          <span className={style.statLabel}>5-star tutor reviews</span>
        </li>
        <li className={style.statItem}>
          <span className={style.statValue}>120 +</span>
          <span className={style.statLabel}>Subjects taught</span>
        </li>
        <li className={style.statItem}>
          <span className={style.statValue}>200 +</span>
          <span className={style.statLabel}>Tutor nationalities</span>
        </li>
      </ul>
    </section>
  )
}

export default Hero;
