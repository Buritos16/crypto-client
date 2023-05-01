import React, {useEffect, useState} from "react";
import './Swap.css'

import {CiPercent} from "react-icons/ci";
import {BsExclamationCircle, BsCurrencyExchange} from "react-icons/bs";
import {CaretDownOutlined, DownOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import { patchWallet, selectIsAuth, setWallet} from "../../slices/auth";
import Loader from "../../components/Loader/Loader";
import successful from "../../assets/tick.png";
import {Link, Navigate} from "react-router-dom";

const Swap = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const data = useSelector(state => state.auth.data)
    const loading = useSelector(state => state.auth.status)
    let name1 = 'ETH'
    let name2 = 'USDT'

    const [coinsValue, setCoinsValue] = useState(data?.wallet)
    const coinsImg = useSelector(state => state.trading.coinsInfoRapidApi)
    const coinsName = useSelector(state => state.trading.coins)

    const [selectFrom, setSelectFrom] = useState(false);
    const [inputValueFrom, setInputValueFrom] = useState(0);
    const [coinImgFrom, setCoinImgFrom] = useState(coinsImg?.data?.coins.find(x => x.symbol === name1)?.iconUrl);
    const [coinNameFrom, setCoinNameFrom] = useState(coinsName.find(x => x === name1));
    const [coinValueFrom, setCoinValueFrom] = useState(coinsValue?.find(x => x?.name === name1)?.value)
    const [arrowFrom, setArrowFrom] = useState(true);

    const [selectTo, setSelectTo] = useState(false);
    const [inputValueTo, setInputValueTo] = useState(0);
    const [coinImgTo, setCoinImgTo] = useState(coinsImg?.data?.coins.find(x => x.symbol === name2)?.iconUrl);
    const [coinNameTo, setCoinNameTo] = useState(coinsName.find(x => x === name2));
    const [arrowTo, setArrowTo] = useState(true);

    const [price, setPrice] = useState(0);
    const [error, setError] = useState('');

    const [convert, setConvert] = useState(true)
    const [loader, setLoader] = useState(false)
    const [success, setSuccess] = useState(false)

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

    const handleConvert = () => {
        if (!inputValueFrom || Number(inputValueFrom) === 0) {
            toast.warning('Please, enter convert amount', toastStyle)
            return
        } else if (error.length > 1) {
            toast.warning('Invalid coin', toastStyle)
            return
        } else if (inputValueFrom > coinValueFrom) {
            toast.warning('You don\'t have enough funds in your account', toastStyle)
            return
        }

        const coinFromValue = coinsValue?.find(x => x?.name === coinNameFrom)?.value - inputValueFrom
        const fromAmount = Number(coinFromValue.toFixed(6))

        const coinToValue = (coinsValue?.find(x => x?.name === coinNameTo)?.value || 0) + inputValueTo
        const toAmount = Number(coinToValue.toFixed(6))

        setConvert(false)
        setLoader(true)
        dispatch(setWallet({selected: coinNameFrom, value: fromAmount}))
        dispatch(setWallet({selected: coinNameTo, value: toAmount}))
        dispatch(patchWallet())
        toast.info('Processing...', toastStyle)
        setTimeout(() => {
            toast.success('Successful convert!', toastStyle)
            setLoader(false)
            setSuccess(true)

        }, 3000)
    }

    const handleCloseSelectFrom = () => {
        if (selectFrom) {
            document.getElementById('select-form').style.animationName = 'scale'
            document.getElementById('select-form').style.animationDirection = 'reverse'
            setArrowFrom(true)
            setTimeout(() => {
                setSelectFrom(!selectFrom)
                setInputValueFrom(0)
                setInputValueTo(0)
            }, 300)
        } else {
            setArrowFrom(false)
            setSelectFrom(!selectFrom)
        }
    }

    const handleCloseSelectTo = () => {
        if (selectTo) {
            document.getElementById('select-form').style.animationName = 'scale'
            document.getElementById('select-form').style.animationDirection = 'reverse'
            setArrowTo(true)
            setTimeout(() => {
                setSelectTo(!selectTo)
                setInputValueFrom(0)
                setInputValueTo(0)
            }, 300)
        } else {
            setArrowTo(false)
            setSelectTo(!selectTo)
        }
    }

    useEffect(() => {
        setCoinImgFrom(coinsImg?.data?.coins.find(x => x.symbol === name1)?.iconUrl)
        setCoinImgTo(coinsImg?.data?.coins.find(x => x.symbol === name2)?.iconUrl)
        setCoinsValue(data?.wallet)
    }, [coinsImg, loading])


    useEffect(() => {
        fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${coinNameFrom}${coinNameTo}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setError('')
                        setPrice(Number(result?.price))
                },
            ).catch(error => {
            setError('Invalid coin')
            throw(error);

        })
    }, [coinNameFrom, coinNameTo])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    if (!isAuth) {
        return <Navigate to='/auth/login'/>
    }
    return (
        <div className='swap-data'>
            <div className='swap'>
                <div className='swap-header'>
                    <div className='swap-header-text'>Fast Convert</div>
                    <div className='swap-header-fees'>
                        <div className='swap-header-fees-item'>
                            <CiPercent style={{color: '#65b765', marginRight: 5, fontSize: 17}}/>
                            Zero fee
                        </div>
                        <div className='swap-header-fees-item'><BsExclamationCircle
                            style={{color: '#65b765', marginRight: 5,}}/>Guaranteed price
                        </div>
                        <div className='swap-header-fees-item'><BsCurrencyExchange
                            style={{color: '#65b765', marginRight: 5}}/>Any pairs
                        </div>
                    </div>
                </div>
                <div className='swap-main'>
                    {convert &&
                        <div className='swap-container'>
                            <div style={{fontSize: 16, marginBottom: 10}}>You send</div>
                            <div id='navToolsLink'
                                 className='select-container'>
                                <div style={{padding: '10px', width: '100%', justifyContent: "space-between"}}
                                     className='select-header'>
                                    <input style={{marginLeft: 20, fontSize: 18}} type='number'
                                           value={inputValueFrom}
                                           onChange={(e) => {
                                               if (error) {
                                                   setInputValueFrom(e.target.value)
                                                   setInputValueTo(0)
                                               } else {
                                                   setInputValueFrom(e.target.value)
                                                   setInputValueTo(Number((e.target.value * Number(price)).toFixed(6)))
                                               }
                                           }}
                                           placeholder='Enter amount'
                                           className='convert-input-text'/>
                                    <div style={{
                                        backgroundColor: '#31353d', display: "flex", alignItems: "center",
                                        color: 'white', width: '35%', padding: '8px', borderRadius: 7
                                    }} onClick={handleCloseSelectFrom}>
                                        <img className='coin-image'
                                             style={{height: '20px', width: '20px'}}
                                             src={coinImgFrom}
                                             alt='img is not found'/>
                                        <div className='coin-name'>{coinNameFrom}</div>
                                        <CaretDownOutlined id='arrow-select'
                                                           className={arrowFrom ? 'arrow-select' : 'arrow-select-reverse'}/>
                                    </div>
                                </div>
                                {selectFrom &&
                                    <div id='select-form' className='select'>
                                        {coinsName.map((coin) => (
                                            <div className='select-item' onClick={() => {
                                                handleCloseSelectFrom()
                                                setCoinImgFrom(coinsImg?.data?.coins.find(x => x.symbol === coin)?.iconUrl)
                                                setCoinNameFrom(coin)
                                                setCoinValueFrom(coinsValue?.find(x => x?.name === coin)?.value)
                                                if (error) {
                                                    setInputValueTo(0)
                                                } else {
                                                    setInputValueTo(Number((inputValueFrom * Number(price)).toFixed(6)))
                                                }
                                            }}>
                                                <img className='coin-image'
                                                     style={{height: '30px', width: '30px', marginRight: '10px'}}
                                                     src={coinsImg?.data?.coins.find(x => x.symbol === coin)?.iconUrl}
                                                     alt='img is not found'/>
                                                <div style={{display: "flex", flexDirection: "column"}}>
                                                    <div style={{color: "white"}}>{coin}</div>
                                                    <div style={{fontSize: 12}}>
                                                        {coinsImg?.data?.coins.find(x => x.symbol === coin)?.name}
                                                    </div>
                                                </div>
                                            </div>))}
                                    </div>}
                            </div>


                            <div style={{display: "flex", fontSize: 13}}>
                                Available:
                                <div
                                    onClick={() => {
                                        if (!error) {
                                            setInputValueFrom(coinValueFrom)
                                            setInputValueTo(Number((inputValueFrom * Number(price)).toFixed(6)))
                                        }
                                    }}
                                    style={{marginLeft: 5, color: '#1295ff', cursor: "pointer"}}>
                                    {coinValueFrom || 0} {coinNameFrom}
                                </div>
                            </div>

                            <DownOutlined style={{fontSize: 16, marginTop: 20}}/>

                            <div style={{fontSize: 16, marginTop: 14}}>You get</div>


                            <div id='navToolsLink'
                                 className='select-container'>
                                <div style={{padding: '10px', width: '100%', justifyContent: "space-between"}}
                                     className='select-header'>
                                    <input style={{marginLeft: 20, fontSize: 18}} type='text'
                                           value={inputValueTo}
                                           disabled
                                           placeholder='You will get'
                                           className='convert-input-text'/>
                                    <div style={{
                                        backgroundColor: '#31353d', display: "flex", alignItems: "center",
                                        color: 'white', width: '35%', padding: '8px', borderRadius: 7
                                    }} onClick={handleCloseSelectTo}>
                                        <img className='coin-image'
                                             style={{height: '20px', width: '20px'}}
                                             src={coinImgTo}
                                             alt='img is not found'/>
                                        <div className='coin-name'>{coinNameTo}</div>
                                        <CaretDownOutlined id='arrow-select'
                                                           className={arrowTo ? 'arrow-select' : 'arrow-select-reverse'}/>
                                    </div>
                                </div>
                                {selectTo &&
                                    <div id='select-form' className='select'>
                                        {coinsName.map((coin) => (
                                            <div className='select-item' onClick={() => {
                                                handleCloseSelectTo()
                                                setCoinImgTo(coinsImg?.data?.coins.find(x => x.symbol === coin)?.iconUrl)
                                                setCoinNameTo(coin)
                                                if (error) {
                                                    setInputValueTo(0)
                                                } else {
                                                    setInputValueTo(inputValueFrom * Number(price))
                                                }
                                            }}>
                                                <img className='coin-image'
                                                     style={{height: '30px', width: '30px', marginRight: '10px'}}
                                                     src={coinsImg?.data?.coins.find(x => x.symbol === coin)?.iconUrl}
                                                     alt='img is not found'/>
                                                <div style={{display: "flex", flexDirection: "column"}}>
                                                    <div style={{color: "white"}}>{coin}</div>
                                                    <div style={{fontSize: 12}}>
                                                        {coinsImg?.data?.coins.find(x => x.symbol === coin)?.name}
                                                    </div>
                                                </div>

                                            </div>))}
                                    </div>}
                            </div>

                            <div style={{
                                display: "flex", flexDirection: "column", width: '80%', alignItems: "center",
                                margin: '35px auto 50px auto'
                            }}>
                                <button
                                    onClick={handleConvert}
                                    className='swap-button'>
                                    Convert
                                </button>
                                <div style={{fontStyle: 'oblique', fontSize: 13, marginTop: 15}}>
                                    Exchange rate:
                                    1 {coinNameFrom} ~ {!error.length ? Number(price.toFixed(6)) : error} {!error ? coinNameTo : ''}
                                </div>
                            </div>
                        </div>}
                    {loader &&
                        <div style={{height: 485}} className='loader-container'>
                            <Loader/>
                        </div>}
                    {success &&
                        <div className='loader-container'>
                            <div style={{marginTop: 68, marginBottom: 68, display: "flex", flexDirection: "column", alignItems: "center", fontSize: 18}}>
                                <img src={successful} alt='successful'/>
                                <div style={{marginTop: 20,}}>You have successfully converted</div>
                                <div style={{fontWeight: "bold"}}>
                                    {inputValueFrom} {coinNameFrom}
                                </div>
                                <div style={{fontWeight: "bold"}}>To</div>
                                <div style={{fontWeight: "bold"}}>
                                    {inputValueTo} {coinNameTo}
                                </div>
                                <Link style={{width: '100%'}} to='/profile/wallet'><button
                                    style={{marginTop: 30}}
                                    className='swap-button'>
                                    Proceed
                                </button></Link>
                            </div>
                        </div>}
                </div>
            </div>
            <div className='swap-text'>
                You can simply convert any crypto assets anytime with a live price based on current market conditions
                with zero fees.
            </div>
        </div>
    )
}

export default Swap