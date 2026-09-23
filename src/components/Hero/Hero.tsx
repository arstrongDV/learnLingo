import React from 'react'
import style from './Hero.module.css'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className={style.heroSection}>
      <div className={style.banersWrapper}>
          <div className={style.textBlock}>
            <h1>
              Unlock your potential with the 
              best <span className={style.heroLighlight}>language</span> tutors
            </h1>

            <p>
              Embark on an Exciting Language Journey with Expert Language 
              Tutors: Elevate your language proficiency to new heights by 
              connecting with highly qualified and experienced tutors.
            </p>

            <Link to='/teachers' className={style.btnStart}>Get started</Link>
          </div>
          <div className={style.banner}>
            <img className={style.avatarImg} src='images/avatar.png' alt='avatar-image' />
            <img className={style.laptopImg} src='images/green-mac.png' alt='mac-image' />
          </div>
      </div>

        {/* <div className={style.companyInfo}> */}
        <ul className={style.infoList}>
          <li className={style.infoEl}>
            <h3>32,000 +</h3>
            <p>Experienced tutors</p>
          </li>
          <li className={style.infoEl}>
            <h3>300,000 +</h3>
            <p>5-star tutor reviews</p>
          </li>
          <li className={style.infoEl}>
            <h3>120 +</h3>
            <p>Subjects taught</p>
          </li>
          <li className={style.infoEl}>
            <h3>200 +</h3>
            <p>Tutor nationalities</p>
          </li>
        </ul>
    </section>
  )
}

export default Hero;