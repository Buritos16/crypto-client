import './Login.css'
import React, { useState, useEffect} from "react";
import {HiOutlineMail} from 'react-icons/hi';
import {RiLockPasswordFill} from 'react-icons/ri';
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthLogin, selectIsAuth} from "../../slices/auth";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {Link, Navigate} from "react-router-dom";


const Login = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const [emailLogin, setEmailLogin] = useState({})
    const [passwordLogin, setPasswordLogin] = useState({})

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

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        setFocus,
        getValues,
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: "all"
    });


    const submitForm = async (values) => {
        const data = await dispatch(fetchAuthLogin(values));
        if (data?.error?.message) {
            toast.error('Wrong email or password', toastStyle)
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
        toast.success('Login successful!', toastStyle)
    }


    const handleClickEmail = () => {
        setFocus('email')
        setEmailLogin({borderColor: '#50cff9'})
    }
    const handleBlurEmail = () => {
        if (getValues('email')) {
            setEmailLogin({borderColor: '#50cff9'})
        }
    }

    const handleClickPassword = () => {
        setFocus('password')
        setPasswordLogin({borderColor: '#50cff9'})
    }
    const handleBlurPassword = () => {
        if (getValues('password')) {
            setPasswordLogin({borderColor: '#50cff9'})
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    if (isAuth) {
        return <Navigate to='/trading'/>
    }
    return (
        <div className='login-container'>
            <div className='login-card'>
                <div style={{fontSize: 30, marginBottom: 10, alignSelf: "flex-start", fontWeight: "bold"}}>Log in</div>
                <div style={{fontSize: 15, marginBottom: 30, alignSelf: "flex-start"}}>
                    Welcome back! Please enter your details.
                </div>
                <form className='login-form' onSubmit={handleSubmit(submitForm)}>
                    <fieldset
                        className='fieldset'
                        onClick={handleClickEmail}
                        onBlur={handleBlurEmail}
                        style={errors?.email ? {borderColor: '#e76565'} : emailLogin}
                    >
                        <legend className='legend'>Email address</legend>
                        <HiOutlineMail className='icon-login'/>
                        <div className='login-line'/>
                        <input
                            placeholder='Enter your email'
                            className='login-input'
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
                    <div className='login-error'>{errors?.email &&
                        <div>
                            <ExclamationCircleOutlined/> {errors?.email?.message}
                        </div>}
                    </div>
                    <fieldset
                        className='fieldset'
                        onClick={handleClickPassword}
                        onBlur={handleBlurPassword}
                        style={errors?.password ? {borderColor: '#e76565'} : passwordLogin}
                    >
                        <legend className='legend'>Password</legend>
                        <RiLockPasswordFill className='icon-login'/>
                        <div className='login-line'/>
                        <input
                            type='password'
                            placeholder='••••••••••'
                            className='login-input'
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
                    <div className='login-error'>
                        {errors?.password &&
                            <div>
                                <ExclamationCircleOutlined/> {errors?.password?.message}
                            </div>}
                    </div>
                    <div className='forgot-password'>Forgot your password?</div>
                    <button
                        type="submit"
                        className='login-button'
                        disabled={!isValid}
                    >
                        Sign in
                    </button>

                    <div style={{
                        display: "flex",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 30,
                        width: 226
                    }}>
                        <div style={{color: '#979aa1'}}>Don't have an account?</div>
                        <Link to='/auth/register'>
                            <div className='login-register'>Sign up</div>
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login