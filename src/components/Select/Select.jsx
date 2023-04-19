import React, {useEffect, useState} from "react";
import './Select.css'
import {CaretDownOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

const Select = ({name, percent}) => {


    const data = useSelector(state => state.auth.data)

    const coinsImg = useSelector(state => state.trading.coinsInfoRapidApi)
    const coinsName = useSelector(state => state.trading.coins)
    const [select, setSelect] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const [coinImg, setCoinImg] = useState(coinsImg?.data?.coins.find(x => x.symbol === name)?.iconUrl);
    const [coinName, setCoinName] = useState(coinsName.find(x => x === name));
    const [coinValue, setCoinValue] = useState(data?.wallet?.find(x => x?.name === name)?.value || 0);
    const [coinToUSD, setCoinToUSD] = useState(1);
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


    const handleClickMessage = () => {
        if (inputValue === '') {
            toast.info('Please, enter invest amount.', toastStyle)
        } else if (Number(coinValue) < Number(inputValue)) {
          toast.warning('You don\'t have enough funds in your account.', toastStyle)
        } else {
            toast.error('You cannot make an investment. Contact support for details.', toastStyle)
        }
    }


    useEffect(() => {
        setCoinImg(coinsImg?.data?.coins.find(x => x.symbol === name)?.iconUrl)
    }, [coinsImg])

    return (
        <div className='invest-calc'>
            <div id='navToolsLink' className='select-container' onClick={() => {
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
                    <div className='coin-value'>- {coinValue?.toFixed(7) || 0}</div>
                    <CaretDownOutlined id='arrow-select' className={arrow ? 'arrow-select' : 'arrow-select-reverse'}/>
                </div>
                {select &&
                    <div id='select-form' className='select'>
                        {coinsName.map((coin) => (
                            <div className='select-item' onClick={() => {
                                setCoinImg(coinsImg?.data?.coins.find(x => x.symbol === coin)?.iconUrl)
                                setCoinName(coin)
                                setCoinValue(data?.wallet?.find(x => x?.name === coin)?.value || null)
                                setInputValue('')
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

            <div className='invest-amount'>
                <div style={{marginBottom: '5px', marginTop: '15px', color: '#979aa1'}}>Enter an amount to invest</div>
                <div style={{display: "flex", alignItems: "center"}}>
                    <div className='invest-input' onClick={() => {
                        if(coinName === 'USDT') {setCoinToUSD(1)}
                        else {
                            fetch(`https://api.binance.com/api/v3/trades?symbol=${coinName}USDT&limit=1`)
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        setCoinToUSD(result[0].price)
                                    },
                                )
                        }
                    }}>
                        <input type='number'
                               value={inputValue}
                               onChange={(e) => {setInputValue(e.target.value)}}
                               placeholder='0.0000'
                               className='convert-input-text'/>
                        <div style={{fontWeight: "bold", marginLeft: 'auto'}}>{coinName}</div>
                    </div>
                    <div style={{
                        marginLeft: 'auto', backgroundColor: '#31353d', padding: '10px 8px',
                        borderTopRightRadius: '3px', borderBottomRightRadius: '3px', cursor: "pointer",
                    }}
                    onClick={() => {
                        setInputValue(coinValue.toString())
                        if(coinName === 'USDT') {setCoinToUSD(1)}
                        else {
                            fetch(`https://api.binance.com/api/v3/trades?symbol=${coinName}USDT&limit=1`)
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        setCoinToUSD(result[0].price)
                                    },
                                )
                        }
                    }}
                    >
                        MAX
                    </div>
                </div>
            </div>
            <div className='invest-profit'>
                <div>Your profit</div>
                <div style={{color: "white", fontWeight: 'bold', marginLeft: "auto", height: '44px', width: '70%', overflow: "hidden"}}>
                    <div style={{textAlign: "right", overflow: "hidden"}}>
                        + {(Number(inputValue) * Number(percent)).toFixed(5).toString()} {coinName}
                    </div>
                    <div style={{color: '#28d028', fontSize: '12px', textAlign: "right"}}>
                        ≈ {(Number(inputValue) * Number(percent) * Number(coinToUSD)).toFixed(2).toString()}$
                    </div>
                </div>
            </div>
            <div className='invest-profit'>
                <div>Total</div>
                <div style={{color: "white", fontWeight: 'bold', marginLeft: "auto", height: '44px', width: '70%', overflow: "hidden"}}>
                    <div style={{textAlign: "right"}}>
                        + {(Number(inputValue) * (1 + Number(percent))).toFixed(5).toString()} {coinName}
                    </div>
                    <div style={{color: '#28d028', fontSize: '12px', textAlign: "right"}}>
                        ≈ {(Number(inputValue) * (1 + Number(percent)) * Number(coinToUSD)).toFixed(2).toString()}$
                    </div>
                </div>
            </div>
            <button onClick={handleClickMessage} className='invest-button'>+ STAKE</button>
        </div>
    )
}

export default Select