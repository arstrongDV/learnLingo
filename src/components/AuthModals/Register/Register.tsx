'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../../Modal/Modal'
import style from '../Auth.module.css'
import sprite from '/icons.svg?no-inline'
import { useForm, type SubmitHandler } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema, type RegisterFormData } from '../../../validation/schema';
import { registerUser } from '../../../services/auth'
import toast from 'react-hot-toast'
import { useAuth } from '../../../context/useAuth'

const Register = () => {
  const navigate = useNavigate();
    const {register, handleSubmit, reset, formState: { errors, isSubmitting },} = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
        mode: 'onTouched',
    });
    const [showPassword, setShowPassword] = useState(false);
    const { refreshUser } = useAuth();

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        const result = await registerUser(data.name, data.email, data.password);
        if (result.success) {
            refreshUser();
            toast.success(`Welcome, ${data.name}! Your account has been created`);
            reset();
            navigate(-1);
        } else {
            toast.error(result.error);
        }
    };
    
  return (
    <Modal isOpen={true} onClose={() => navigate(-1)} labelledBy='register-title'>
        <div>
            <div className={style.titleBlock}>
                <h2 id='register-title' className={style.title}>Registration</h2>
                <p className={style.text}>
                    Thank you for your interest in our platform!
                    In order to register, we need some information.
                    Please provide us with the following information
                </p>
            </div>

            <form className={style.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className={style.inputs}>
                    <div>
                        <input
                            type='text'
                            className={style.input}
                            placeholder='Name'
                            aria-label='Name'
                            autoComplete='name'
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? 'register-name-error' : undefined}
                            {...register("name")}
                        />
                        {errors.name && <p id='register-name-error' className={style.errorText}>{errors.name.message}</p>}
                    </div>

                    <div>
                        <input
                            type='email'
                            className={style.input}
                            placeholder='Email'
                            aria-label='Email'
                            autoComplete='email'
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'register-email-error' : undefined}
                            {...register("email")}
                        />
                        {errors.email && <p id='register-email-error' className={style.errorText}>{errors.email.message}</p>}
                    </div>

                    <div>
                        <div className={style.passwordField}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={`${style.input} ${style.passwordInput}`}
                                placeholder='Password'
                                aria-label='Password'
                                autoComplete='new-password'
                                aria-invalid={!!errors.password}
                                aria-describedby={errors.password ? 'register-password-error' : undefined}
                                {...register("password")}
                            />
                            <button
                                type='button'
                                className={style.eyeButton}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                <svg width={18} height={18} aria-hidden='true'>
                                    <use href={`${sprite}#${showPassword ? 'icon-eye' : 'icon-eye-off'}`}></use>
                                </svg>
                            </button>
                        </div>
                        {errors.password && <p id='register-password-error' className={style.errorText}>{errors.password.message}</p>}
                    </div>
                </div>

                <button className={style.submitButton} type='submit' disabled={isSubmitting}>
                    {isSubmitting ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    </Modal>
  )
}

export default Register
