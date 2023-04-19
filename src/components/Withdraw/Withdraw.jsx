import React, {useState, useEffect} from "react";
import './Withdraw.css'
import successful from '../../images/tick.png'
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import {myArray} from "../../data";
import {setCoinsInfoRapidApi} from "../../slices/trading";
import {useDispatch, useSelector} from "react-redux";
import {ImArrowRight} from "react-icons/im";
import {toast} from "react-toastify";
import Loader from "../Loader/Loader";
import {
    patchTransactions,
    patchWallet,
    postSendBotMessage,
    selectIsAuth,
    setTransactions,
    setWallet
} from "../../slices/auth";
import {Navigate} from "react-router-dom";
import ProfileHeaderMobile from "../ProfileHeader/ProfileHeaderMobile";

const Withdraw = ({location}) => {
    const isAuth = useSelector(selectIsAuth)


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
    const [inputAddress, setInputAddress] = useState('')
    const [inputValue, setInputValue] = useState(0)

    const [withdraw, setWithdraw] = useState(true)
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


    const handleClickWithdraw = () => {
        if (!inputAddress) {
            toast.warning('Please, enter address destination', toastStyle)
            return
        }
        if (inputValue < myArray.find(x => x.symbol === selected).minimum3) {
            toast.warning(`Minimum amount of ${selected} to withdraw is ${myArray.find(x => x.symbol === selected).minimum3}`, toastStyle)
            return
        }
        if (inputValue > data?.wallet?.find(x => x.name === selected)?.value || !data?.wallet?.find(x => x.name === selected)?.value) {
            toast.warning('You don\'t have enough funds in your account', toastStyle)
            return
        }
        setWithdraw(false)
        setLoader(true)
        dispatch(setTransactions({
            "time": Date.now(),
            "transactionType": "Withdraw",
            "coin": selected,
            "amount": Number(inputValue).toFixed(6),
            "status": "Pending",
            "color": "#c7bc3f"
        }))
        dispatch(patchTransactions())
        dispatch(postSendBotMessage({message: `User ${data?.email} withdraw ${Number(inputValue).toFixed(6)} ${selected} to ${inputAddress}`}))
        toast.info('Processing...', toastStyle)
        setTimeout(() => {
            toast.success('Successful withdraw!', toastStyle)
            setLoader(false)
            setSuccess(true)
            const summary = data?.wallet?.find(x => x.name === selected)?.value - inputValue
            const Amount = summary.toFixed(6)
            dispatch(setWallet({selected: selected, value: Amount}))
            dispatch(patchWallet())
        }, 3000)
    }


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
                                setInputValue('')
                                setInputAddress('')
                                setLoader(false)
                                setSuccess(false)
                                setWithdraw(true)
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
                <div className='withdraw-container'>
                    <div className='withdraw-info'>
                        <div style={{padding: '20px 25px', fontSize: 17, fontWeight: "bold", color: "white"}}>Withdraw
                        </div>
                        <div className="wallet-convert-line-horizontal"/>
                        {withdraw &&
                            <div className='withdraw-info-main'>
                                <div className='withdraw-item'>
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        <div className='withdraw-bold'>Destination {selected} address</div>
                                        <div className='withdraw-small'>Please double check this address</div>
                                    </div>
                                    <div className='withdraw-input-main'>
                                        <input className='withdraw-input'
                                               type="text"
                                               placeholder='Please enter recipient address'
                                               value={inputAddress}
                                               onChange={(e) => {
                                                   setInputAddress(e.target.value)
                                               }}
                                        />
                                    </div>
                                </div>
                                <div className='withdraw-item'>
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        <div className='withdraw-bold'>Amount {selected}</div>
                                        <div className='withdraw-small'>Maximum amount withdrawals</div>
                                        <div style={{textDecoration: "underline", cursor: "pointer"}}
                                             className='withdraw-small'
                                             onClick={() => {
                                                 setInputValue(data?.wallet?.find(x => x.name === selected)?.value)
                                             }}
                                        >
                                            {data?.wallet?.find(x => x.name === selected)?.value || 0} {selected}
                                        </div>
                                    </div>
                                    <div className='withdraw-input-main'>
                                        <input className='withdraw-input'
                                               type="number"
                                               placeholder='Please enter an amount'
                                               value={inputValue}
                                               onChange={(e) => {
                                                   setInputValue(e.target.value)
                                               }}
                                        />
                                    </div>
                                </div>
                                <div className='withdraw-fees'>
                                    <div>
                                        <div
                                            className='withdraw-bold'>{myArray.find(x => x.symbol === selected).network2} Network Fee
                                        </div>
                                        <div className='withdraw-small'>Transactions on the {myArray.find(x => x.symbol === selected).network2} network are prioritized by fees</div>
                                    </div>
                                    <div className='fee'>
                                        {myArray.find(x => x.symbol === selected).fee} {selected}
                                    </div>
                                </div>
                                <button onClick={handleClickWithdraw} className='wallet-button withdraw-button'>
                                    <ImArrowRight style={{fontSize: 11, marginRight: 5}}/> Withdraw now
                                </button>
                            </div>}
                        {loader &&
                            <div className='loader-container withdraw-loader'>
                                <Loader/>
                            </div>}
                        {success &&
                            <div className='loader-container withdraw-success'>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    fontSize: 18
                                }}>
                                    <img src={successful} alt='successful'/>
                                    <div style={{marginTop: 20,}}>You have successfully withdraw</div>
                                    <div style={{fontWeight: "bold"}}>
                                        {Number(inputValue).toFixed(6)} {selected}
                                    </div>
                                </div>
                            </div>}
                    </div>
                    <div className='withdraw-warnings'>
                        <div style={{padding: '10px 25px', fontSize: 17, fontWeight: "bold", color: "white"}}>
                            Important information
                        </div>
                        <div className="wallet-convert-line-horizontal"/>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: 20,
                            fontSize: 12,
                            marginTop: 20
                        }}>
                            <div style={{marginBottom: 20, display: "flex"}}>
                                <div style={{marginRight: 10}}>•</div>
                                We strongly recommend that you copy & paste the address to help avoid errors. Please
                                note that we are
                                not responsible for coins mistakenly sent to the wrong address.
                            </div>
                            <div style={{marginBottom: 20, display: "flex"}}>
                                <div style={{marginRight: 10}}>•</div>
                                Transactions normally take about 30 to 60 minutes to send, on occasion it can take a few
                                hours if
                                the crypto network is slow.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Withdraw