import './Register.css'
import React, {useEffect, useState} from "react";
import {HiOutlineMail} from 'react-icons/hi';
import {RiLockPasswordFill} from 'react-icons/ri';
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthRegister, selectIsAuth} from "../../slices/auth";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {ExclamationCircleOutlined, IdcardOutlined} from "@ant-design/icons";
import {Link, Navigate} from "react-router-dom";


const Register = () => {
    const isAuth = useSelector(selectIsAuth)

    const [emailRegister, setEmailRegister] = useState({})
    const [passwordRegister, setPasswordRegister] = useState({})
    const [firstNameRegister, setFirstNameRegister] = useState({})
    const [lastNameRegister, setLastNameRegister] = useState({})
    const [terms, setTerms] = useState(false)

    const toastStyle = {
        className: "toast",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
    }
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        setFocus,
        getValues,
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        mode: "all"
    });

    const submitForm = async (values) => {
        if (!terms) {
            toast.warning('You must agree to our Terms and Conditions', toastStyle)
            return
        }
        const data = await dispatch(fetchAuthRegister(values));
        console.log(data?.error?.message)
        if (data?.error?.message) {
            toast.warning('Cannot register', toastStyle)
            return
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
        toast.success('You successfully registered!', toastStyle)
    }


    const handleClickEmail = () => {
        setFocus('email')
        setEmailRegister({borderColor: '#50cff9'})
    }
    const handleBlurEmail = () => {
        if (getValues('email')) {
            setEmailRegister({borderColor: '#50cff9'})
        }
    }
    const handleClickFirstName = () => {
        setFocus('firstName')
        setFirstNameRegister({borderColor: '#50cff9'})
    }
    const handleBlurFirstName = () => {
        if (getValues('firstName')) {
            setFirstNameRegister({borderColor: '#50cff9'})
        }
    }

    const handleClickLastName = () => {
        setFocus('lastName')
        setLastNameRegister({borderColor: '#50cff9'})
    }
    const handleBlurLastName = () => {
        if (getValues('lastName')) {
            setLastNameRegister({borderColor: '#50cff9'})
        }
    }
    const handleClickPassword = () => {
        setFocus('password')
        setPasswordRegister({borderColor: '#50cff9'})
    }
    const handleBlurPassword = () => {
        if (getValues('password')) {
            setPasswordRegister({borderColor: '#50cff9'})
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (isAuth) {
        return <Navigate to='/profile/wallet' replace/>
    }


    return (
        <div className='register-container'>
            <div className='register-card'>
                <div className='register-title'>
                    Create new account
                </div>
                <div style={{display: "flex", fontSize: 15, marginBottom: 30, alignSelf: "flex-start"}}>
                    <div>Already a member?</div>
                    <Link to='/auth/login'>
                        <div className='login-register'>Log in</div>
                    </Link>
                </div>
                <form className='register-form' onSubmit={handleSubmit(submitForm)} autoComplete="off">

                    <div className='form-register' style={{display: "flex", justifyContent: "space-between", width: '100%'}}>
                        <div className='register-item'>
                            <fieldset
                                className='register-fieldset-name'
                                onClick={handleClickFirstName}
                                onBlur={handleBlurFirstName}
                                style={errors?.firstName ? {borderColor: '#e76565'} : firstNameRegister}
                            >
                                <legend className='register-legend'>First name</legend>
                                <IdcardOutlined className='icon-login'/>
                                <div className='login-line'/>
                                <input
                                    placeholder='Tom'
                                    className='register-input'
                                    autoComplete='off'
                                    {...register('firstName', {
                                        required: 'First name is required',
                                    })}
                                />
                            </fieldset>
                            <div className='register-error'>{errors?.firstName &&
                                <div>
                                    <ExclamationCircleOutlined/> {errors?.firstName?.message}
                                </div>}
                            </div>
                        </div>


                        <div className='register-item'>
                            <fieldset
                                className='register-fieldset-name'
                                onClick={handleClickLastName}
                                onBlur={handleBlurLastName}
                                style={errors?.lastName ? {borderColor: '#e76565'} : lastNameRegister}
                            >
                                <legend className='register-legend'>Last name</legend>
                                <IdcardOutlined className='icon-login'/>
                                <div className='login-line'/>
                                <input
                                    placeholder='Cruise'
                                    className='register-input'
                                    autoComplete='off'
                                    {...register('lastName', {
                                        required: 'Last name is required',
                                    })}
                                />
                            </fieldset>
                            <div className='register-error'>{errors?.lastName &&
                                <div>
                                    <ExclamationCircleOutlined/> {errors?.lastName?.message}
                                </div>}
                            </div>
                        </div>
                    </div>


                    <fieldset
                        className='register-fieldset'
                        onClick={handleClickEmail}
                        onBlur={handleBlurEmail}
                        style={errors?.email ? {borderColor: '#e76565'} : emailRegister}
                    >
                        <legend className='register-legend'>Email address</legend>
                        <HiOutlineMail className='icon-login'/>
                        <div className='login-line'/>
                        <input
                            placeholder='Enter your email'
                            className='register-input'
                            autoComplete='off'
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value:
                                        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: 'Please enter valid email'
                                }
                            })}
                        />
                    </fieldset>
                    <div className='register-error'>{errors?.email &&
                        <div>
                            <ExclamationCircleOutlined/> {errors?.email?.message}
                        </div>}
                    </div>
                    <fieldset
                        className='register-fieldset'
                        onClick={handleClickPassword}
                        onBlur={handleBlurPassword}
                        style={errors?.password ? {borderColor: '#e76565'} : passwordRegister}
                    >
                        <legend className='register-legend'>Password</legend>
                        <RiLockPasswordFill className='icon-login'/>
                        <div className='login-line'/>
                        <input
                            type='password'
                            placeholder='••••••••••'
                            className='register-input'
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Minimum 8 characters'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Maximum 20 characters'
                                }
                            })}
                        />
                    </fieldset>
                    <div className='register-error'>
                        {errors?.password &&
                            <div>
                                <ExclamationCircleOutlined/> {errors?.password?.message}
                            </div>}
                    </div>
                    <div className='register-terms'>
                        <input type='checkbox' value={terms} onChange={() => {setTerms(!terms)}}/>
                        <div style={{marginLeft: 10}}>I agree to the</div>
                        <Link className='login-register' to='/terms'>Terms & Conditions</Link>
                    </div>
                    <button
                        type="submit"
                        className='login-button'
                        disabled={!isValid}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register