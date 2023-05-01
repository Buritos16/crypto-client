import React, {useState, useEffect} from "react";
import './Transfer.css'
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import {useSelector} from "react-redux";
import {CaretDownOutlined} from "@ant-design/icons";
import {toast} from "react-toastify";
import {selectIsAuth} from "../../slices/auth";
import {Navigate} from "react-router-dom";
import ProfileHeaderMobile from "../ProfileHeader/ProfileHeaderMobile";


const Transfer = ({location}) => {
    const isAuth = useSelector(selectIsAuth)
    const [transferButton, setTransferButton] = useState(true)
    const [transferHistoryButton, setTransferHistoryButton] = useState(false)
    const data = useSelector(state => state.auth.data)
    const coinsImg = useSelector(state => state.trading.coinsInfoRapidApi)
    const coinsName = useSelector(state => state.trading.coins)
    const [select, setSelect] = useState(false);
    const [inputEmailValue, setInputEmailValue] = useState('');
    const [inputAmountValue, setInputAmountValue] = useState('');

    const [coinImg, setCoinImg] = useState(coinsImg?.data?.coins.find(x => x.symbol === 'BTC')?.iconUrl);
    const [coinName, setCoinName] = useState(coinsName.find(x => x === 'BTC'));
    const [coinValue, setCoinValue] = useState(data?.wallet?.find(x => x?.name === 'BTC')?.value || 0);
    const [arrow, setArrow] = useState(true);

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
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!isAuth) {
        return <Navigate to='/auth/login'/>
    }
    return (
        <div className='transfer-container'>
            <ProfileHeader location={location}/>
            <ProfileHeaderMobile location={location}/>
            <div className='transfer'>
                <div style={{
                    padding: '20px 25px',
                    fontSize: 17,
                    fontWeight: "bold",
                    color: "white",
                    marginRight: "auto"
                }}>Transfer
                </div>
                <div className="wallet-convert-line-horizontal"/>
                <div className='transfer-navigation'>
                    <div
                        onClick={() => {
                            setTransferHistoryButton(false)
                            setTransferButton(true)
                        }}
                        style={transferButton ? {background: '#0090ff'} : {}}
                        className='transfer-button'>
                        New Transfer
                    </div>
                    <div
                        onClick={() => {
                            setTransferHistoryButton(true)
                            setTransferButton(false)
                        }}
                        style={transferHistoryButton ? {background: '#0090ff', marginLeft: 20} : {marginLeft: 20}}
                        className='transfer-button'>
                        History
                    </div>
                </div>
                <div className="wallet-convert-line-horizontal"/>
                {transferButton && <div className='transfer-main'>
                    <div className='transfer-item' style={{display: "flex", alignItems: "center", marginBottom: 50}}>
                        <div className='transfer-data'>
                            <div className='transfer-bold'>Your account ID</div>
                            <div className='transfer-small'>Use your ID to receive the transfer</div>
                        </div>
                        <div style={{fontWeight: "bold", fontSize: 16}}>{data?._id?.replace(/\D/g, '').slice(0, 8) || ''}</div>
                    </div>
                    <div className='transfer-item' style={{display: "flex", alignItems: "center", marginBottom: 50}}>
                        <div className='transfer-data'>
                            <div className='transfer-bold'>Select currency</div>
                            <div className='transfer-small'>Choose a cryptocurrency for transfer</div>
                        </div>
                        <div id='navToolsLink' className='select-container transfer-select' onClick={() => {
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
                            <div className='select-header'>
                                <img className='coin-image'
                                     style={{height: '20px', width: '20px'}}
                                     src={coinImg}
                                     alt='img is not found'/>
                                <div className='coin-name'>{coinName}</div>
                                <div style={{display: "flex", alignItems: "center", marginLeft: 20}}
                                     className='coin-value'>
                                    <div>-</div>
                                    <div style={{marginLeft: 20}}>{coinValue || 0}</div>
                                </div>
                                <CaretDownOutlined id='arrow-select'
                                                   className={arrow ? 'arrow-select' : 'arrow-select-reverse'}/>
                            </div>
                            {select &&
                                <div id='select-form' className='select'>
                                    {coinsName.map((coin) => (
                                        <div className='select-item' onClick={() => {
                                            setCoinImg(coinsImg?.data?.coins.find(x => x.symbol === coin)?.iconUrl)
                                            setCoinName(coin)
                                            setCoinValue(data?.wallet?.find(x => x?.name === coin)?.value || null)
                                        }}>
                                            <img className='coin-image'
                                                 style={{height: '20px', width: '20px', marginRight: '10px'}}
                                                 src={coinsImg?.data?.coins.find(x => x.symbol === coin)?.iconUrl}
                                                 alt='img is not found'/>
                                            <div>{coin}</div>
                                            <div style={{marginLeft: 'auto', marginRight: '80px', width: '30px'}}>
                                                {data?.wallet?.find(x => x?.name === coin)?.value || '0.00'}
                                            </div>
                                        </div>))}
                                </div>}
                        </div>
                    </div>
                    <div className='transfer-item' style={{display: "flex", alignItems: "center", marginBottom: 50}}>
                        <div  className='transfer-data'>
                            <div className='transfer-bold'>User E-Mail</div>
                            <div className='transfer-small'>Enter the user's E-Mail or Account ID for this site
                            </div>
                        </div>
                        <div className='transfer-input'>
                            <input className='withdraw-input' style={{fontSize: 15}}
                                   type="email" value={inputEmailValue}
                                   onChange={(event => setInputEmailValue(event.target.value))}
                                   placeholder='Please enter user E-Mail or ID'
                            />
                        </div>
                    </div>
                    <div className='transfer-item' style={{display: "flex", alignItems: "center", marginBottom: 50}}>
                        <div  className='transfer-data'>
                            <div className='transfer-bold'>Amount</div>
                            <div className='transfer-small'>Enter correctly amount</div>
                        </div>
                        <div className='transfer-input'>
                            <input className='withdraw-input' style={{fontSize: 15}}
                                   type="number" value={inputAmountValue}
                                   onChange={(event => setInputAmountValue(event.target.value))}
                                   placeholder='Please enter an amount'
                            />
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            if (!inputEmailValue) {
                                toast.warning('Please, enter user email or ID', toastStyle)
                                return
                            }
                            if (!inputAmountValue) {
                                toast.warning('Please, enter transfer amount', toastStyle)
                                return
                            }
                            if (inputAmountValue > coinValue) {
                                toast.warning('You don\'t have enough funds in your account', toastStyle)
                                return
                            }
                            toast.warning('Only verified users can make transfers', toastStyle)
                        }}
                        className='wallet-button transfer-button-final'> Transfer
                    </div>

                </div>}
                {transferHistoryButton &&
                    <div className='transfer-history'>
                        <div style={{width: '100%'}}>
                        <div className='transfer-history-header'>
                            <div style={{width: 100}}>Transfer ID</div>
                            <div style={{width: 100}}>Time</div>
                            <div style={{width: 100}}>User E-Mail</div>
                            <div style={{width: 100}}>Amount</div>
                            <div style={{width: 100}}>Status</div>
                        </div>
                        <div className='transfer-history-data'>No data
                        </div>
                        </div>
                    </div>}
            </div>
            <div className='withdraw-warnings transfer-warnings'>
                <div style={{padding: '10px 25px', fontSize: 17, fontWeight: "bold", color: "white"}}>
                    Important information
                </div>
                <div className="wallet-convert-line-horizontal"/>
                <div style={{display: "flex", flexDirection: "column", marginLeft: 20, fontSize: 15, marginTop: 20}}>
                    <div style={{marginBottom: 20, display: "flex"}}>
                        <div style={{marginRight: 10}}>•</div>
                        Transfer funds to users of this site WITHOUT COMMISSION.
                    </div>
                    <div style={{marginBottom: 20, display: "flex"}}>
                        <div style={{marginRight: 10}}>•</div>
                        Transfers normally take about 1 to 60 minutes to send, on occasion it can take a few hours if the crypto network is slow.
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Transfer