import React, {useRef, useState, useEffect} from "react";
import './Wallet.css'
import gift from '../../assets/card-img-right.png'
import {NumberOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";
import {FaUser} from "react-icons/fa";
import {IoMdMail} from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {Link, Navigate} from "react-router-dom";
import {setCoinsInfoRapidApi} from "../../slices/trading";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import {selectIsAuth} from "../../slices/auth";
import ProfileHeaderMobile from "../ProfileHeader/ProfileHeaderMobile";


const Wallet = ({location}) => {
    const isAuth = useSelector(selectIsAuth)

    const dispatch = useDispatch()
    const coins = useSelector(state => state.trading.coins)
    const coinsInfoRapidApi = useSelector(state => state.trading.coinsInfoRapidApi)
    const data = useSelector(state => state.auth.data)

    let all = 0

    data?.wallet?.map((item) => {
        if (item?.name === 'USDT') {
            all += item?.value
        } else {
            all += (Number(coinsInfoRapidApi?.data?.coins?.find(x => x.symbol === item.name)?.price) * item?.value)
        }
    })


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

    const [checkbox, setCheckbox] = useState(false)
    const [searchInputValue, setSearchInputValue] = useState('')
    const [searchIcon, setSearchIcon] = useState({color: '#979aa1', marginRight: '10px'})
    const inputRef = useRef(null)

    const handleMouseEnterSearch = () => {
        setSearchIcon({color: '#50cff9', marginRight: '10px'})
    }
    const handleMouseLeaveSearch = () => {
        if (document.activeElement === inputRef.current) {
            setSearchIcon({color: '#50cff9', marginRight: '10px'})
        } else {
            setSearchIcon({color: '#979aa1', marginRight: '10px'})
        }
    }
    const handleClickSearch = () => {
        inputRef.current.focus()
        setSearchIcon({color: '#50cff9', marginRight: '10px'})
    }
    const handleBlurSearch = () => {
        setSearchIcon({color: '#979aa1', marginRight: '10px'})
    }
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '997b63aad1msh6769ef16d1e96a9p16da8cjsnf624079ee119',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };

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
        <div className='wallet'>
            <ProfileHeader location={location}/>
            <ProfileHeaderMobile location={location}/>
            <div className='wallet-main'>
                <div className='wallet-header'>
                    <div className='wallet-profile'>
                        <div style={{display: "flex"}}>
                            <UserOutlined style={{fontSize: 70}}/>
                            <div style={{display: "flex", flexDirection: "column", marginLeft: 15}}>
                                <div className='wallet-profile-item' style={{color: "white"}}>
                                    <FaUser className='icon-wallet'/>
                                    <div>{data?.personalInformation?.firstName || ''} {data?.personalInformation?.lastName || ''}</div>
                                </div>
                                <div className='wallet-profile-item'>
                                    <IoMdMail className='icon-wallet'/>
                                    <div>{data?.email || ''}</div>
                                </div>
                                <div className='wallet-profile-item'>
                                    <NumberOutlined className='icon-wallet'/>
                                    <div>ID: {data?._id?.replace(/\D/g, '').slice(0, 8) || ''}</div>
                                </div>
                            </div>
                        </div>
                        <div className='total-balance'>
                            <div>Total balance</div>
                            <div style={{display: "flex", color: "white", alignItems: "center", fontWeight: "bold"}}>
                                <div style={{fontSize: 30}}>
                                    {all.toFixed()}
                                </div>
                                <div style={{fontSize: 25, marginTop: 3, marginLeft: 10}}>
                                    USD
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='wallet-promo'>
                        <div className='promo-container'>
                            <img src={gift} className='promo-image' alt='gift'/>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            fontSize: '17px',
                            marginLeft: 20,
                            width: '100%'
                        }}>
                            <div style={{fontWeight: "bold", color: "white"}}>Use bonus promo code</div>
                            <div style={{display: "flex"}}>
                                <div className='select-header' style={{padding: '6px 0px', width: '60%'}}>
                                    <div>
                                        <input style={{marginLeft: 15, fontSize: 15, width: '85%'}} type='text'
                                               placeholder='Enter promo-code'
                                               className='convert-input-text'/>
                                    </div>
                                </div>
                                <button className='promo-button'
                                        style={{marginLeft: "auto", marginRight: "auto", width: '30%'}}
                                        onClick={() => {
                                            toast.warning('Invalid promo-code', toastStyle)
                                        }}
                                >
                                    Activate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='wallet-functional'>
                    <div className='wallet-functional-buttons' style={{display: "flex", alignItems: "center"}}>
                        <div onClick={handleClickSearch}
                             onBlur={handleBlurSearch}
                             onMouseEnter={handleMouseEnterSearch}
                             onMouseLeave={handleMouseLeaveSearch}
                             className='wallet-search'>
                            <SearchOutlined style={searchIcon}/>
                            <input ref={inputRef}
                                   type='text'
                                   placeholder='Search'
                                   value={searchInputValue}
                                   onChange={(e) => setSearchInputValue(e.target.value)}
                                   className='wallet-symbol-input'/>
                        </div>
                        <div className='wallet-hide'>
                            <input className='wallet-checkbox' type='checkbox'
                                   defaultChecked={checkbox}
                                   onChange={() => {
                                       setCheckbox(!checkbox)
                                   }}
                            />
                            <div>Hide zero balances</div>
                        </div>
                    </div>
                    <div className='wallet-functional-buttons' style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <Link className='wallet-link' to='/profile/deposit'>
                            <div className='wallet-button'>Deposit</div>
                        </Link>
                        <Link className='wallet-link' to='/profile/withdraw'>
                            <div className='wallet-button'>Withdraw</div>
                        </Link>
                        <Link className='wallet-link' to='/profile/transfer'>
                            <div className='wallet-button'>Transfer</div>
                        </Link>
                    </div>
                </div>


                <div className='wallet-coins'>
                    <div className='wallet-coins-header'>
                        <div className='wallet-coins-header-coins'>
                            Coin
                        </div>
                        <div className='wallet-line line-coins-wallet'/>
                        <div className='margin-100' style={{width: 150}}>Balance</div>
                        <div style={{height: '40px'}} className='wallet-line'/>
                        <div className='margin-100' style={{width: 130}}>Equivalent</div>
                    </div>

                    {checkbox ?
                        <div className='wallet-coins-data'>
                            {coinsInfoRapidApi?.data?.coins?.filter((coin) =>
                                data?.wallet?.find(x => x.name === coin.symbol)?.value > 0
                            ).filter((coin) =>
                                coin?.name?.toLowerCase()?.includes(searchInputValue)
                            ).map((coin, i) => (
                                <div>
                                    <div className="wallet-convert-line-horizontal"/>
                                    <div key={i} className='wallet-coins-data-name'>
                                        <div className='wallet-balance-name' style={{display: "flex", alignItems: "center"}}>
                                            <img
                                                style={{height: '30px', width: '30px'}}
                                                src={coin?.iconUrl}
                                                alt='img is not found'/>
                                            <div style={{
                                                color: "white",
                                                fontWeight: "bold",
                                                marginRight: 10,
                                                marginLeft: 10
                                            }}>
                                                {coin?.name}
                                            </div>
                                            <div style={{fontWeight: "bold"}}>
                                                {coin?.symbol}
                                            </div>
                                        </div>
                                        <div className='wallet-line-balance'/>
                                        <div className='margin-100' style={{
                                            width: 150,
                                            color: "white",
                                            fontWeight: "bold"
                                        }}>
                                            {data?.wallet?.find(x => x.name === coin.symbol)?.value || 0} {coin?.symbol}
                                        </div>
                                        <div style={{height: '40px'}} className='wallet-line'/>
                                        <div className='margin-100' style={{
                                            width: 130,
                                            color: "white",
                                            fontWeight: "bold"
                                        }}>
                                            {(data?.wallet?.find(x => x.name === coin.symbol)?.value * coin?.price || 0)?.toFixed(2)} USD
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <div className='wallet-coins-data'>
                            {coinsInfoRapidApi?.data?.coins?.filter((coin) =>
                                coin?.name?.toLowerCase()?.includes(searchInputValue)
                            ).map((coin, i) => (
                                <div>
                                    <div className="wallet-convert-line-horizontal"/>
                                    <div key={i}
                                         className='wallet-coins-data-name'
                                    >
                                        <div className='wallet-balance-name' style={{display: "flex", alignItems: "center"}}>
                                            <img
                                                style={{height: '30px', width: '30px'}}
                                                src={coin?.iconUrl}
                                                alt='img is not found'/>
                                            <div style={{
                                                color: "white",
                                                fontWeight: "bold",
                                                marginRight: 10,
                                                marginLeft: 10
                                            }}>
                                                {coin?.name || 'Tether'}
                                            </div>
                                            <div style={{fontWeight: "bold"}}>
                                                {coin?.symbol}
                                            </div>
                                        </div>
                                        <div className='wallet-line-balance'/>
                                        <div className='margin-100' style={{
                                            width: 150,
                                            color: "white",
                                            fontWeight: "bold"
                                        }}>
                                            {data?.wallet?.find(x => x.name === coin.symbol)?.value || 0} {coin?.symbol}
                                        </div>
                                        <div style={{height: '40px'}} className='wallet-line'/>
                                        <div className='margin-100' style={{
                                            width: 130,
                                            color: "white",
                                            fontWeight: "bold"
                                        }}>
                                            {(data?.wallet?.find(x => x.name === coin.symbol)?.value * coin?.price || 0)?.toFixed(2)} USD
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Wallet