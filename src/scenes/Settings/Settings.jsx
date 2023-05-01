import React, {useEffect, useState} from "react";
import './Settings.css'
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate} from "react-router-dom";
import verification from '../../assets/verification.webp'
import svgV from '../../assets/fl-br-block.svg'
import {toast} from "react-toastify";
import {patchPersonalInformation, selectIsAuth, setPersonalInformation} from "../../slices/auth";
import Loader from "../../components/Loader/Loader";


const Settings = () => {

    const isAuth = useSelector(selectIsAuth)

    const dispatch = useDispatch()
    const data = useSelector(state => state.auth.data)
    const loading = useSelector(state => state.auth.status)
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

    const [firstName, setFirstName] = useState(data?.personalInformation?.firstName)
    const [lastName, setLastName] = useState(data?.personalInformation?.lastName)
    const [birth, setBirth] = useState(data?.personalInformation?.birth)
    const [permAddress, setPermAddress] = useState(data?.personalInformation?.permAddress)
    const [postal, setPostal] = useState(data?.personalInformation?.postal)
    const [phone, setPhone] = useState(data?.personalInformation?.phone)
    const [presAddress, setPresAddress] = useState(data?.personalInformation?.presAddress)
    const [city, setCity] = useState(data?.personalInformation?.city)
    const [countryFake, setCountryFake] = useState(data?.personalInformation?.countryFake)


    const handleSaveClick = () => {
        if (!firstName) {
            toast.warning('Please, enter first name', toastStyle)
            return
        }
        if (!lastName) {
            toast.warning('Please, enter last name', toastStyle)
            return
        }
        if (!birth) {
            toast.warning('Please, enter date of birth', toastStyle)
            return
        }
        if (!permAddress) {
            toast.warning('Please, enter permanent address', toastStyle)
            return
        }
        if (!postal) {
            toast.warning('Please, enter postal code', toastStyle)
            return
        }
        if (!phone) {
            toast.warning('Please, enter your phone number', toastStyle)
            return
        }
        if (!presAddress) {
            toast.warning('Please, enter present address', toastStyle)
            return
        }
        if (!city) {
            toast.warning('Please, enter your city', toastStyle)
            return
        }
        if (!countryFake) {
            toast.warning('Please, enter your country', toastStyle)
            return
        }
        dispatch(setPersonalInformation({
            firstName: firstName,
            lastName: lastName,
            birth: birth,
            permAddress: permAddress,
            postal: postal,
            phone: phone,
            presAddress: presAddress,
            city: city,
            countryFake: countryFake,
        }))
        dispatch(patchPersonalInformation())
        toast.success('Personal information successfully updated', toastStyle)
    }


    useEffect(() => {
        setFirstName(data?.personalInformation?.firstName)
        setLastName(data?.personalInformation?.lastName)
        setBirth(data?.personalInformation?.birth)
        setPermAddress(data?.personalInformation?.permAddress)
        setPostal(data?.personalInformation?.postal)
        setPhone(data?.personalInformation?.phone)
        setPresAddress(data?.personalInformation?.presAddress)
        setCity(data?.personalInformation?.city)
        setCountryFake(data?.personalInformation?.countryFake)
    }, [loading])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    if (!isAuth) {
        return <Navigate to='/auth/login'/>
    }
    return (
        <div className='settings-container'>
            <div className='profile-username'>
                <div>Welcome Back,&nbsp;</div>
                <div style={{color: '#50cff9'}}>{firstName || 'user'}</div>
                <Link style={{marginLeft: "auto"}} className='profile-header-item' to='/profile/wallet'>
                    <div>Back to Wallet</div>
                </Link>
            </div>
            <div className='attention'>
                <img className='settings-img' style={{zIndex: 1}} alt='settings' src={svgV}/>
                <div className='sssvg'>
                    <div className='settings-text'>
                        <div className='attention-text'>Attention!</div>
                        <div>Your account is not secure enough, please enable two-factor authentication</div>
                        <div className='google-button settings-attention-button'
                             onClick={() => {
                                 toast.warning('To enable two-factor authentication your account must be verified', toastStyle)
                             }}
                        >
                            Enable
                        </div>
                    </div>
                </div>
            </div>
            <div className='settings'>
                <div style={{
                    padding: '20px 25px',
                    fontSize: 17,
                    fontWeight: "bold",
                    color: "white",
                    marginRight: "auto"
                }}>Account Verification
                </div>
                <div className="wallet-convert-line-horizontal"/>
                <div className='verification-text'>
                    <div className='ver-text'>
                        <div>
                            To increase user limits, you need to pass the verification of a Intermediate user or a
                            Advanced
                            user, you must provide personal information, a photo of an identity document, and a
                            photo of
                            your face.
                        </div>
                        <div className='flex' style={{width: '100%'}}>
                            <Link to='/profile/verification'>
                            <div className='wallet-button verification-btn'>
                                Verification page
                            </div>
                        </Link>
                            <img className='ver-img-2' alt='verification2' src={verification}/>
                        </div>
                    </div>
                    <img className='ver-img' alt='verificatin' src={verification}/>
                </div>
            </div>

            <div className='settings-main'>
                <div style={{
                    padding: '20px 25px',
                    fontSize: 17,
                    fontWeight: "bold",
                    color: "white",
                    marginRight: "auto"
                }}>Personal Information
                </div>
                <div className="wallet-convert-line-horizontal"/>
                {loading !== 'loading' &&
                    <div className='settings-personal'>
                        <div className='settings-item'>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <div style={{marginBottom: 10}}>Your First Name</div>
                                <div className='settings-input-container'>
                                    <input className='settings-input'
                                           type='text'
                                           value={firstName}
                                           onChange={(e) => {
                                               setFirstName(e.target.value)
                                           }}
                                    />
                                </div>
                            </div>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <div style={{marginBottom: 10}}>Your Last Name</div>
                                <div className='settings-input-container'>
                                    <input className='settings-input'
                                           type='text'
                                           value={lastName}
                                           onChange={(e) => {
                                               setLastName(e.target.value)
                                           }}
                                    />
                                </div>
                            </div>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <div style={{marginBottom: 10}}>Date of birth</div>
                                <div className='settings-input-container'>
                                    <input className='settings-input'
                                           type='date'
                                           value={birth}
                                           onChange={(e) => {
                                               setBirth(e.target.value)
                                           }}
                                           placeholder='10-10-2020'
                                    />
                                </div>
                            </div>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <div style={{marginBottom: 10}}>Permanent Address</div>
                                <div className='settings-input-container'>
                                    <input className='settings-input'
                                           type='text'
                                           value={permAddress}
                                           onChange={(e) => {
                                               setPermAddress(e.target.value)
                                           }}
                                           placeholder='123, Central Square, Brooklyn'
                                    />
                                </div>
                            </div>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <div style={{marginBottom: 10}}>Postal Code</div>
                                <div className='settings-input-container'>
                                    <input className='settings-input'
                                           type='number'
                                           value={postal}
                                           onChange={(e) => {
                                               setPostal(e.target.value)
                                           }}
                                           placeholder='25481'
                                    />
                                </div>
                            </div>
                            <div onClick={handleSaveClick} className='settings-button1'>
                                Save
                            </div>
                        </div>


                        <div className='settings-item'>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <div style={{marginBottom: 10}}>Current email</div>
                                <div className='settings-input-container' style={{backgroundColor: '#353942'}}>
                                    <div style={{fontWeight: "normal"}}>{data?.email}</div>
                                </div>
                            </div>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <div style={{marginBottom: 10}}>Phone number</div>
                                <div className='settings-input-container'>
                                    <input className='settings-input'
                                           type='number'
                                           value={phone}
                                           onChange={(e) => {
                                               setPhone(e.target.value)
                                           }}
                                           placeholder='+1234567890'
                                    />
                                </div>
                            </div>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <div style={{marginBottom: 10}}>Present Address</div>
                                <div className='settings-input-container'>
                                    <input className='settings-input'
                                           type='text'
                                           value={presAddress}
                                           onChange={(e) => {
                                               setPresAddress(e.target.value)
                                           }}
                                           placeholder='56, Old Street, Brooklyn'
                                    />
                                </div>
                            </div>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <div style={{marginBottom: 10}}>City</div>
                                <div className='settings-input-container'>
                                    <input className='settings-input'
                                           type='text'
                                           value={city}
                                           onChange={(e) => {
                                               setCity(e.target.value)
                                           }}
                                           placeholder='New York'
                                    />
                                </div>
                            </div>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <div style={{marginBottom: 10}}>Country</div>
                                <div className='settings-input-container'>
                                    <input className='settings-input'
                                           type='text'
                                           value={countryFake}
                                           onChange={(e) => {
                                               setCountryFake(e.target.value)
                                           }}
                                           placeholder='United States of America'
                                    />
                                </div>
                            </div>
                            <div onClick={handleSaveClick} className='settings-button2'>
                                Save
                            </div>
                        </div>
                    </div>}
                {
                    loading === 'loading' &&
                    <div style={{marginTop: 200, marginBottom: 200}} className='loader-container'>
                        <Loader/>
                    </div>
                }
            </div>
        </div>
    )
}

export default Settings