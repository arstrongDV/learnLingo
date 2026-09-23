'use client'

import React, { useState } from 'react'
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
    <Modal isOpen={true} onClose={() => navigate(-1)}>
        <div>
            <div className={style.titleBlock}>
                <h2>Registration</h2>
                <p>
                    Thank you for your interest in our platform! 
                    In order to register, we need some information. 
                    Please provide us with the following information
                </p>
            </div>

            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.inputs}>
                    <div>
                        <input
                            placeholder='Name'
                            {...register("name")}
                        />
                        {errors.name && <p className={style.errorText}>{errors.name.message}</p>}
                    </div>

                    <div>
                        <input
                            placeholder='Email'
                            {...register("email")}
                        />
                        {errors.email && <p className={style.errorText}>{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className={style.passwordLabel}>
                            <input
                                placeholder='Password'
                                type={showPassword ? 'text' : 'password'}
                                {...register("password")}
                            />
                            <svg
                                className={style.eyeIcon}
                                width={18}
                                height={18}
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                <use href={`${sprite}#${showPassword ? 'icon-eye' : 'icon-eye-off'}`}></use>
                            </svg>
                        </label>
                        {errors.password && <p className={style.errorText}>{errors.password.message}</p>}
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
