import React, {useState, useEffect} from "react";
import './Verification.css'
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {CaretDownOutlined, ClockCircleOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {InboxOutlined} from '@ant-design/icons';
import {message, Upload} from 'antd';
import {countries} from "../../data";
import {patchVerification, selectIsAuth, setVerification} from "../../slices/auth";
import {Navigate} from "react-router-dom";

const {Dragger} = Upload;


const Verification = () => {
    const isAuth = useSelector(selectIsAuth)
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const {status} = info.file;
            console.log(status)
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const dispatch = useDispatch()
    const verification = useSelector(state => state.auth.data?.verified)

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
    const types = [
        {name: 'Passport'},
        {name: 'Driver’s License'},
        {name: 'ID card'},
        {name: 'Bank Statement'},
        {name: 'Utility Bill'},
        {name: 'Tax bill'},
        {name: 'Insurance Agreement'},
        {name: 'Employment documents'},
        {name: 'Educational Documents'},
        {name: 'Employee Letters'},
    ]

    const [select, setSelect] = useState(false);
    const [arrow, setArrow] = useState(true);
    const [select1, setSelect1] = useState(false);
    const [arrow1, setArrow1] = useState(true);

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [country, setCountry] = useState(countries[0].name)
    const [idType, setIdType] = useState(types[0].name)
    const [birth, setBirth] = useState('')
    const [phone, setPhone] = useState(countries[0].dial_code)
    const [address, setAddress] = useState('')
    const [idNumber, setIdNumber] = useState('')


    const handleSaveClick = () => {
        if (!firstName) {
            toast.warning('Please, enter first name', toastStyle)
            return
        }
        if (!lastName) {
            toast.warning('Please, enter last name', toastStyle)
            return
        }
        if (!country) {
            toast.warning('Please, enter country', toastStyle)
            return
        }
        if (!address) {
            toast.warning('Please, enter permanent address', toastStyle)
            return
        }
        if (!phone) {
            toast.warning('Please, enter your phone number', toastStyle)
            return
        }
        if (!birth) {
            toast.warning('Please, enter your date of birth', toastStyle)
            return
        }
        if (!idType) {
            toast.warning('Please, select ID type', toastStyle)
            return
        }
        if (!idNumber) {
            toast.warning('Please, enter your ID number', toastStyle)
            return
        }
        dispatch(setVerification(true))
        dispatch(patchVerification())
        toast.info('Your information will be checked', toastStyle)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!isAuth) {
        return <Navigate to='/auth/login'/>
    }
    if (verification)
        return (
            <div className='verification-true'>
                <ClockCircleOutlined />
                <div>
                    Verification in progress
                </div>
            </div>
        )

    return (
        <div className='verification-container'>
            <div className='verification-header'>
                <div>KYC Verification</div>
            </div>
            <div className='settings-main'>
                <div className='kyc'>
                    <ExclamationCircleOutlined style={{fontSize: 40, marginRight: 15}}/>Account not verified
                </div>
                <div className='settings-personal1'>
                    <div className='settings-item'>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>First name</div>
                            <input className='verification-input'
                                   type='text'
                                   value={firstName}
                                   onChange={(e) => {
                                       setFirstName(e.target.value)
                                   }}
                            />
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>Select country</div>

                            <div style={{width: '100%'}} id='navToolsLink' className='select-container' onClick={() => {
                                if (select) {
                                    document.getElementById('select-form').style.animationName = 'scale'
                                    document.getElementById('select-form').style.animationDirection = 'reverse'
                                    setArrow(true)
                                    setTimeout(() => {
                                        setSelect(!select)
                                    }, 300)
                                } else {
                                    setArrow(false)
                                    setSelect(!select)
                                }
                            }}
                            >
                                <div className='verification-input' style={{display: "flex", alignItems: "center"}}>
                                    <div className='coin-name'>{country}</div>
                                    <CaretDownOutlined id='arrow-select'
                                                       className={arrow ? 'arrow-select' : 'arrow-select-reverse'}/>
                                </div>
                                {select &&
                                    <div id='select-form' className='select'>
                                        {countries.map((country) => (
                                            <div className='select-item' onClick={() => {
                                                setCountry(country.name)
                                                setPhone(country.dial_code)
                                            }}>
                                                <div>{country.name}</div>
                                            </div>))}
                                    </div>}
                            </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>Phone number</div>
                            <input className='verification-input'
                                   type='text'
                                   value={phone}
                                   onChange={(e) => {
                                       setPhone(e.target.value)
                                   }}
                            />
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>Select ID type</div>
                            <div style={{width: '100%'}} id='navToolsLink' className='select-container' onClick={() => {
                                if (select1) {
                                    document.getElementById('select-form').style.animationName = 'scale'
                                    document.getElementById('select-form').style.animationDirection = 'reverse'
                                    setArrow1(true)
                                    setTimeout(() => {
                                        setSelect1(!select1)
                                    }, 300)
                                } else {
                                    setArrow1(false)
                                    setSelect1(!select1)
                                }
                            }}
                            >
                                <div className='verification-input' style={{display: "flex", alignItems: "center"}}>
                                    <div className='coin-name'>{idType}</div>
                                    <CaretDownOutlined id='arrow-select'
                                                       className={arrow1 ? 'arrow-select' : 'arrow-select-reverse'}/>
                                </div>
                                {select1 &&
                                    <div id='select-form' className='select'>
                                        {types.map((type) => (
                                            <div className='select-item' onClick={() => {
                                                setIdType(type.name)
                                            }}>
                                                <div>{type.name}</div>
                                            </div>))}
                                    </div>}
                            </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>Upload the document</div>
                            <div style={{
                                marginBottom: 10,
                                fontSize: 12,
                                color: '#979aa1',
                                fontWeight: "normal",
                                height: 40
                            }}>
                                Please upload a photo of yourself that clearly shows your face
                            </div>
                            <Dragger {...props} style={{backgroundColor: "#0c0d10"}}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined/>
                                </p>
                                <p style={{color: '#979aa1'}} className="ant-upload-text">Click or drag file to this
                                    area to upload</p>
                            </Dragger>
                        </div>
                    </div>


                    <div className='settings-item'>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>Last name</div>
                            <input className='verification-input'
                                   type='text'
                                   value={lastName}
                                   onChange={(e) => {
                                       setLastName(e.target.value)
                                   }}
                            />
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>Address</div>
                            <input className='verification-input'
                                   type='text'
                                   value={address}
                                   onChange={(e) => {
                                       setAddress(e.target.value)
                                   }}
                            />
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>Date of birth</div>
                            <input className='verification-input'
                                   type='number'
                                   value={birth}
                                   onChange={(e) => {
                                       setBirth(e.target.value)
                                   }}
                            />
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>ID number</div>
                            <input className='verification-input'
                                   type='text'
                                   value={idNumber}
                                   onChange={(e) => {
                                       setIdNumber(e.target.value)
                                   }}
                            />
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>Upload a selfie</div>
                            <div className='ver-textt'>
                                Please provide a clear photo/scan of your document. Please make sure that the photo/scan
                                in
                                complete and clearly visible, in JPG/PNG format.
                            </div>
                            <Dragger {...props} style={{backgroundColor: "#0c0d10"}}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined/>
                                </p>
                                <p style={{color: '#979aa1'}} className="ant-upload-text">Click or drag file to this
                                    area to upload</p>
                            </Dragger>
                        </div>
                    </div>
                </div>
                <div className='settings-personal-mobile'>
                    <div className='settings-item'>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>First name</div>
                            <input className='verification-input'
                                   type='text'
                                   value={firstName}
                                   onChange={(e) => {
                                       setFirstName(e.target.value)
                                   }}
                            />
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>Last name</div>
                            <input className='verification-input'
                                   type='text'
                                   value={lastName}
                                   onChange={(e) => {
                                       setLastName(e.target.value)
                                   }}
                            />
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>Select country</div>

                            <div style={{width: '100%'}} id='navToolsLink' className='select-container' onClick={() => {
                                if (select) {
                                    document.getElementById('select-form').style.animationName = 'scale'
                                    document.getElementById('select-form').style.animationDirection = 'reverse'
                                    setArrow(true)
                                    setTimeout(() => {
                                        setSelect(!select)
                                    }, 300)
                                } else {
                                    setArrow(false)
                                    setSelect(!select)
                                }
                            }}
                            >
                                <div className='verification-input' style={{display: "flex", alignItems: "center"}}>
                                    <div className='coin-name'>{country}</div>
                                    <CaretDownOutlined id='arrow-select'
                                                       className={arrow ? 'arrow-select' : 'arrow-select-reverse'}/>
                                </div>
                                {select &&
                                    <div id='select-form' className='select'>
                                        {countries.map((country) => (
                                            <div className='select-item' onClick={() => {
                                                setCountry(country.name)
                                                setPhone(country.dial_code)
                                            }}>
                                                <div>{country.name}</div>
                                            </div>))}
                                    </div>}
                            </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>Date of birth</div>
                            <input className='verification-input'
                                   type='number'
                                   value={birth}
                                   onChange={(e) => {
                                       setBirth(e.target.value)
                                   }}
                            />
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>Phone number</div>
                            <input className='verification-input'
                                   type='text'
                                   value={phone}
                                   onChange={(e) => {
                                       setPhone(e.target.value)
                                   }}
                            />
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>Address</div>
                            <input className='verification-input'
                                   type='text'
                                   value={address}
                                   onChange={(e) => {
                                       setAddress(e.target.value)
                                   }}
                            />
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>ID number</div>
                            <input className='verification-input'
                                   type='text'
                                   value={idNumber}
                                   onChange={(e) => {
                                       setIdNumber(e.target.value)
                                   }}
                            />
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>Select ID type</div>
                            <div style={{width: '100%'}} id='navToolsLink' className='select-container' onClick={() => {
                                if (select1) {
                                    document.getElementById('select-form').style.animationName = 'scale'
                                    document.getElementById('select-form').style.animationDirection = 'reverse'
                                    setArrow1(true)
                                    setTimeout(() => {
                                        setSelect1(!select1)
                                    }, 300)
                                } else {
                                    setArrow1(false)
                                    setSelect1(!select1)
                                }
                            }}
                            >
                                <div className='verification-input' style={{display: "flex", alignItems: "center"}}>
                                    <div className='coin-name'>{idType}</div>
                                    <CaretDownOutlined id='arrow-select'
                                                       className={arrow1 ? 'arrow-select' : 'arrow-select-reverse'}/>
                                </div>
                                {select1 &&
                                    <div id='select-form' className='select'>
                                        {types.map((type) => (
                                            <div className='select-item' onClick={() => {
                                                setIdType(type.name)
                                            }}>
                                                <div>{type.name}</div>
                                            </div>))}
                                    </div>}
                            </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>Upload the document</div>
                            <div style={{
                                marginBottom: 10,
                                fontSize: 12,
                                color: '#979aa1',
                                fontWeight: "normal",
                                height: 40
                            }}>
                                Please upload a photo of yourself that clearly shows your face
                            </div>
                            <Dragger {...props} style={{backgroundColor: "#0c0d10"}}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined/>
                                </p>
                                <p style={{color: '#979aa1'}} className="ant-upload-text">Click or drag file to this
                                    area to upload</p>
                            </Dragger>
                        </div>
                    </div>

                    <div className='settings-item'>



                        <div className='selfie-mobile' style={{display: "flex", flexDirection: "column"}}>
                            <div style={{marginBottom: 10, color: "white"}}>Upload a selfie</div>
                            <div className='ver-textt'>
                                Please provide a clear photo/scan of your document. Please make sure that the photo/scan
                                in
                                complete and clearly visible, in JPG/PNG format.
                            </div>
                            <Dragger {...props} style={{backgroundColor: "#0c0d10"}}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined/>
                                </p>
                                <p style={{color: '#979aa1'}} className="ant-upload-text">Click or drag file to this
                                    area to upload</p>
                            </Dragger>
                        </div>
                    </div>
                </div>
                <div onClick={handleSaveClick} className='verification-button'>
                    Submit for review
                </div>
            </div>
        </div>
    )
}

export default Verification