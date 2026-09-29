import { useState } from 'react'
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
        <Modal isOpen={true} onClose={() => navigate(-1)} labelledBy='login-title'>
            <div>
                <div className={style.titleBlock}>
                    <h2 id='login-title' className={style.title}>Log In</h2>
                    <p className={style.text}>
                        Welcome back! Please enter your credentials to access your
                        account and continue your search for a teacher.
                    </p>
                </div>

                <form className={style.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className={style.inputs}>
                        <div>
                            <input
                                type='email'
                                className={style.input}
                                placeholder='Email'
                                aria-label='Email'
                                autoComplete='email'
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? 'login-email-error' : undefined}
                                {...register("email")}
                            />
                            {errors.email && <p id='login-email-error' className={style.errorText}>{errors.email.message}</p>}
                        </div>

                        <div>
                            <div className={style.passwordField}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={`${style.input} ${style.passwordInput}`}
                                    placeholder='Password'
                                    aria-label='Password'
                                    autoComplete='current-password'
                                    aria-invalid={!!errors.password}
                                    aria-describedby={errors.password ? 'login-password-error' : undefined}
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
                            {errors.password && <p id='login-password-error' className={style.errorText}>{errors.password.message}</p>}
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