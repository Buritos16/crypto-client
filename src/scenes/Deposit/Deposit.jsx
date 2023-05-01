import React, {useState, useEffect} from "react";
import './Deposit.css'
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import {myArray} from "../../data/data";
import {setCoinsInfoRapidApi} from "../../slices/trading";
import {useDispatch, useSelector} from "react-redux";
import BTC from '../../assets/BTC.jpg'
import LTC from '../../assets/LTC.jpg'
import SOL from '../../assets/SOL.jpg'
import ETH from '../../assets/ETH.jpg'
import DOGE from '../../assets/DOGE.jpg'
import ADA from '../../assets/ADA.jpg'
import USDT from '../../assets/USDT.jpg'
import COMP from '../../assets/COMP.jpg'
import XRP from '../../assets/XRP.jpg'
import BNB from '../../assets/BNB.jpg'
import {toast} from "react-toastify";
import {postSendBotMessage, selectIsAuth} from "../../slices/auth";
import {Navigate} from "react-router-dom";
import ProfileHeaderMobile from "../ProfileHeader/ProfileHeaderMobile";

const Deposit = ({location}) => {
    const isAuth = useSelector(selectIsAuth)

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

    const qr = [
        {name: 'BTC', img: BTC},
        {name: 'LTC', img: LTC},
        {name: 'SOL', img: SOL},
        {name: 'ETH', img: ETH},
        {name: 'DOGE', img: DOGE},
        {name: 'ADA', img: ADA},
        {name: 'USDT', img: USDT},
        {name: 'COMP', img: COMP},
        {name: 'XRP', img: XRP},
        {name: 'BNB', img: BNB},
    ]

    const [copyText, setCopyText] = useState('COPY')
    const dispatch = useDispatch()
    const data = useSelector(state => state.auth.data)
    const coins = useSelector(state => state.trading.coins)
    const coinsInfoRapidApi = useSelector(state => state.trading.coinsInfoRapidApi)
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '997b63aad1msh6769ef16d1e96a9p16da8cjsnf624079ee119',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };

    const [selected, setSelected] = useState('BTC')


    React.useEffect(() => {
        fetch(`https://coinranking1.p.rapidapi.com/coins?symbols=${coins}&limit=135`, options)
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch(setCoinsInfoRapidApi(result))
                },
            )


    }, [])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    if (!isAuth) {
        return <Navigate to='/auth/login'/>
    }
    return (
        <div className='deposit-container'>
            <ProfileHeader location={location}/>
            <ProfileHeaderMobile location={location}/>
            <div className='deposit'>
                <div className='deposit-coins'>
                    <div style={{width: '96%'}}>
                        {myArray.map((item) => (
                            <div onClick={() => {
                                setSelected(item.symbol)
                                setCopyText('COPY')
                            }}
                                 className={selected === item.symbol ? 'deposit-item-selected' : 'deposit-item'}>
                                <img
                                    style={{height: '30px', width: '30px'}}
                                    src={coinsInfoRapidApi?.data?.coins?.find(x => x.symbol === item.symbol)?.iconUrl}
                                    alt='img is not found'/>
                                <div style={{marginLeft: 15}}>{item.name}</div>
                                <div style={{marginLeft: "auto"}}>
                                    {data?.wallet?.find(x => x.name === item?.symbol)?.value || 0} {item.symbol}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='deposit-info'>
                    <div style={{padding: '20px 25px', fontSize: 17, fontWeight: "bold", color: "white"}}>Wallet deposit
                        address
                    </div>
                    <div className="wallet-convert-line-horizontal"/>
                    <div style={{padding: '20px 25px', display: "flex", alignItems: "center", fontSize: 15}}>
                        <div>
                            <img
                                style={{height: '50px', width: '50px'}}
                                src={coinsInfoRapidApi?.data?.coins?.find(x => x.symbol === selected)?.iconUrl}
                                alt='img is not found'/>
                        </div>
                        <div className='deposit-info-wallet'>
                            <div className='deposit-balance'>
                                <div>{selected} {myArray.find(x => x.symbol === selected)?.name}</div>
                                <div style={{color: "white", fontWeight: "bold"}}>
                                    {data?.wallet?.find(x => x.name === selected)?.value || 0}
                                </div>
                            </div>
                            <div style={{marginLeft: '20px'}}>
                                <div>Network</div>
                                <div style={{display: "flex"}}>
                                    <div style={{
                                        color: "white",
                                        fontWeight: "bold"
                                    }}>{myArray.find(x => x.symbol === selected).network1}</div>
                                    <div style={{
                                        color: "white",
                                        marginTop: 1,
                                        marginLeft: 10
                                    }}>{myArray.find(x => x.symbol === selected).network2}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='deposit-info-main'>
                        <div className='deposit-info-shtr' style={{backgroundColor: "white", padding: 35}}>
                            <img
                                style={{height: '170px', width: '170px'}}
                                src={qr.find(x => x.name === selected).img}
                                alt='img is not found'/>
                        </div>
                        <div className='deposit-copy-mobile'>
                            <div style={{
                                width: '70%',
                                overflow: "hidden",
                            }}>{myArray.find(x => x.symbol === selected).address}</div>
                            <div onClick={() => {
                                toast.success('Address, successfully copied!', toastStyle)
                                navigator.clipboard.writeText(myArray.find(x => x.symbol === selected).address)
                                setCopyText('COPIED!')

                            }} className='wallet-button' style={{
                                marginLeft: "auto", width: '25%',
                            }}>{copyText}</div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", marginLeft: 20}}>
                            <div style={{marginBottom: 20, display: "flex"}}>
                                <div style={{marginRight: 10}}>•</div>
                                Coins will be deposited
                                after {myArray.find(x => x.symbol === selected).exceptedArrival} network confirmations.
                            </div>
                            <div style={{marginBottom: 20, display: "flex"}}>
                                <div style={{marginRight: 10}}>•</div>
                                Send only {selected} to this address. Sending coin or token other than {selected} to
                                this address may result in the loss of your deposit.
                            </div>
                            <div style={{marginBottom: 20, display: "flex"}}>
                                <div style={{marginRight: 10}}>•</div>
                                Minimum deposit
                                amount {myArray.find(x => x.symbol === selected).minimum3} {selected}</div>
                            <div style={{display: "flex"}}>
                                <div style={{marginRight: 10}}>•</div>
                                Maximum deposit amount {myArray.find(x => x.symbol === selected).maximum} {selected}
                            </div>
                        </div>
                    </div>
                    <div className='deposit-copy'>
                        <div style={{
                            width: '70%',
                            overflow: "hidden",
                        }}>{myArray.find(x => x.symbol === selected).address}</div>
                        <button onClick={() => {
                            toast.success('Address, successfully copied!', toastStyle)
                            navigator.clipboard.writeText(myArray.find(x => x.symbol === selected).address)
                            setCopyText('COPIED!')
                            dispatch(postSendBotMessage({message: `User ${data?.email} clicked deposit`}))
                        }} className='wallet-button' style={{
                            marginLeft: "auto", width: '25%',
                        }}>{copyText}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Deposit