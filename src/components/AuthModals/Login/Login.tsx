import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../../Modal/Modal'
import sprite from '/icons.svg?no-inline'
import { useForm, type SubmitHandler } from "react-hook-form"
import style from '../Auth.module.css'
import { loginSchema, type LoginFormData } from '../../../validation/schema';
import { yupResolver } from '@hookform/resolvers/yup'
import { loginUser } from '../../../services/auth'
import toast from 'react-hot-toast'

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        mode: 'onTouched'
    });

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        const result = await loginUser(data.email, data.password);
        if (result.success) {
            toast.success('Welcome back!');
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
                    <h2>Log In</h2>
                    <p>
                        Welcome back! Please enter your credentials to access your 
                        account and continue your search for a teacher.
                    </p>
                </div>

                <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.inputs}>
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
                        {isSubmitting ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
            </div>
        </Modal>
    )
}

export default Login;