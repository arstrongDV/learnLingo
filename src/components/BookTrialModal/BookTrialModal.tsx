import Modal from '../Modal/Modal'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import style from './BookTrialModal.module.css'
import { LEARNING_REASON, type Teacher } from '../../types/user'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { bookSchema, type BookFormData } from '../../validation/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'

const BookTrialModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const teacher = location.state?.teacher as Teacher | undefined;

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BookFormData>({
        resolver: yupResolver(bookSchema),
        mode: 'onTouched',
        defaultValues: { reason: LEARNING_REASON[0] },
    });

    const onSubmit: SubmitHandler<BookFormData> = async (data) => {
        console.log(data);
        toast.success(`Your trial lesson with ${teacher?.name} ${teacher?.surname} is booked! We'll contact you soon.`);
        navigate(-1);
    }

    const handleOnClose = () => navigate(-1);

    // Opened without a teacher (e.g. /book typed in the address bar)
    if (!teacher) return <Navigate to='/teachers' replace />;

  return (
    <Modal isOpen={true} onClose={handleOnClose} labelledBy='book-title'>
        <div className={style.bookContainer}>
            <div className={style.bookHeader}>
                <h2 id='book-title'>Book trial lesson</h2>
                <p>
                    Our experienced tutor will assess your current language level,
                    discuss your learning goals, and tailor the lesson to your specific needs.
                </p>
            </div>

            <div className={style.teacherInfo}>
                <img className={style.avatar} src={teacher.avatar_url} alt={`${teacher.name} ${teacher.surname}`} />

                <div className={style.teacher}>
                    <p>Your teacher</p>
                    <h3>{teacher.name} {teacher.surname}</h3>
                </div>
            </div>

            <form className={style.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <fieldset className={style.reasons}>
                    <legend>What is your main reason for learning English?</legend>

                    <div className={style.radioBtns}>
                        {LEARNING_REASON.map((reason) => (
                            <label key={reason} className={style.radioLabel}>
                                <input type='radio' className={style.radioInput} value={reason} {...register('reason')} />
                                {reason}
                            </label>
                        ))}
                    </div>

                    {errors.reason && <p className={style.errorText}>{errors.reason.message}</p>}
                </fieldset>

                <div className={style.inputs}>
                    <div>
                        <input
                            type='text'
                            className={style.input}
                            placeholder='Full Name'
                            aria-label='Full Name'
                            autoComplete='name'
                            aria-invalid={!!errors.fullname}
                            aria-describedby={errors.fullname ? 'book-fullname-error' : undefined}
                            {...register('fullname')}
                        />
                        {errors.fullname && <p id='book-fullname-error' className={style.errorText}>{errors.fullname.message}</p>}
                    </div>

                    <div>
                        <input
                            type='email'
                            className={style.input}
                            placeholder='Email'
                            aria-label='Email'
                            autoComplete='email'
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'book-email-error' : undefined}
                            {...register('email')}
                        />
                        {errors.email && <p id='book-email-error' className={style.errorText}>{errors.email.message}</p>}
                    </div>

                    <div>
                        <input
                            type='tel'
                            className={style.input}
                            placeholder='Phone number'
                            aria-label='Phone number'
                            autoComplete='tel'
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? 'book-phone-error' : undefined}
                            {...register('phone')}
                        />
                        {errors.phone && <p id='book-phone-error' className={style.errorText}>{errors.phone.message}</p>}
                    </div>
                </div>

                <button type='submit' className={style.submitButton} disabled={isSubmitting}>
                    {isSubmitting ? 'Booking...' : 'Book'}
                </button>
            </form>
        </div>
    </Modal>
  )
}

export default BookTrialModal
