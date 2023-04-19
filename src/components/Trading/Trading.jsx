import React, {memo, useEffect, useRef, useState} from "react";
import './Trading.css'
import {useDispatch, useSelector} from "react-redux";
import {toast} from 'react-toastify';
import Chart from "../Chart";
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    DownOutlined,
    SearchOutlined,
    UpOutlined,
    WalletOutlined
} from "@ant-design/icons";
import {setCoin} from "../../slices/trading";
import {
    patchConvertHistory,
    patchWallet, selectIsAuth,
    setHistoryOrders,
    setOpenOrders,
    setWallet,
    updateOpenOrders
} from "../../slices/auth";
import Loader from "../Loader/Loader";
import {Navigate} from "react-router-dom";

const {commas} = require('number-prettier')

const Trading = memo(({coin, coins}) => {
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

        const dispatch = useDispatch()
        const wallet = useSelector(state => state.auth.data?.wallet)
        const convertHistory = useSelector(state => state.auth.data?.convertHistory)
        const openOrders = useSelector(state => state.auth.openOrders)
        const orderBookAsks = useSelector(state => state.trading.orderBookAsks)
        const orderBookBids = useSelector(state => state.trading.orderBookBids)

        const symbolInfo = useSelector(state => state.trading.coinInfo)
        const priceBigger = useSelector(state => state.trading.bigger)

        const hVolumeAll = useSelector(state => state.trading.hVolumeAll)

        const coinsInfoRapidApi = useSelector(state => state.trading.coinsInfoRapidApi)

        const tradeHistory = useSelector(state => state.trading.tradeHistory)

        const [buy, setBuy] = useState(true)
        const [sell, setSell] = useState(true)
        const [loader1, setLoader1] = useState(false)
        const [loader2, setLoader2] = useState(false)

        const [buyDisabled, setBuyDisabled] = useState(false)
        const [sellDisabled, setSellDisabled] = useState(false)

        const [searchInputValue, setSearchInputValue] = useState('')
        const [buyCoinInputValue, setBuyCoinInputValue] = useState(0)
        const [buyCoinSellInputValue, setBuyCoinSellInputValue] = useState(0)
        const [sellCoinInputValue, setSellCoinInputValue] = useState(0)
        const [sellCoinSellInputValue, setSellCoinSellInputValue] = useState(0)
        const [trading, setTrading] = useState('market')
        const [history, setHistory] = useState('orders')
        const [active, setActive] = useState(0);
        const [searchIcon, setSearchIcon] = useState({color: '#979aa1', marginRight: '10px'})
        const inputRef = useRef(null)

        const handleClickPercentBuy = (percent) => {
            setSellCoinInputValue(
                (Number(wallet?.find(x => x.name === 'USDT')?.value) * percent).toFixed(6)
            )
            setBuyCoinInputValue(
                ((Number(wallet?.find(x => x.name === 'USDT')?.value) * percent) / Number(symbolInfo.price)).toFixed(6)
            )
        }

        const handleClickPercentSell = (percent) => {
            setBuyCoinSellInputValue(
                (Number(wallet?.find(x => x.name === coin)?.value) * percent).toFixed(6)
            )
            setSellCoinSellInputValue(
                ((Number(wallet?.find(x => x.name === coin)?.value) * percent) * Number(symbolInfo.price)).toFixed(6)
            )
        }


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

        const handleClickSymbol = (coin, i) => {
            dispatch(setCoin(coin.replace('USDT', '')))
            setActive(i)
        }

        const handleClickConvert = id => {
            document.getElementById('market').style.color = '#979aa1'
            document.getElementById('limit').style.color = '#979aa1'
            document.getElementById('stop').style.color = '#979aa1'
            document.getElementById('market-line').style.borderColor = '#272a31'
            document.getElementById('limit-line').style.borderColor = '#272a31'
            document.getElementById('stop-line').style.borderColor = '#272a31'

            document.getElementById(id).style.color = '#50cff9'
            document.getElementById(`${id}-line`).style.borderColor = '#50cff9'
            setTrading(id)

        }

        const handleClickHistory = id => {
            document.getElementById('orders').style.color = '#979aa1'
            document.getElementById('history').style.color = '#979aa1'
            document.getElementById('orders-line').style.borderColor = '#272a31'
            document.getElementById('history-line').style.borderColor = '#272a31'

            document.getElementById(id).style.color = '#50cff9'
            document.getElementById(`${id}-line`).style.borderColor = '#50cff9'
            setHistory(id)
        }

        const handleClickMessage = () => {
            toast.info('At the moment you can open a market order', toastStyle)
            toast.warning('New users cannot open limit orders and stop buys', toastStyle)
        }

        const handleBuyChangeBuy = (event) => {
            setBuyCoinInputValue(event.target.value)
            setSellCoinInputValue(Number((event.target.value * Number(symbolInfo.price)).toFixed(6)))
        }
        const handleSellChangeBuy = (event) => {
            setSellCoinInputValue(event.target.value)
            setBuyCoinInputValue(Number((event.target.value / Number(symbolInfo.price)).toFixed(6)))
        }

        const handleBuyCoin = () => {
            if (!sellCoinInputValue || Number(sellCoinInputValue) === 0) {
                toast.warning('Please, enter buy order amount', toastStyle)
                return
            } else if (sellCoinInputValue < 1) {
                toast.warning('Minimum order amount 1 USDT', toastStyle)
                return
            } else if (sellCoinInputValue > wallet?.find(x => x.name === 'USDT')?.value) {
                toast.warning('You don\'t have enough funds in your account', toastStyle)
                return
            }
            setBuyDisabled(true)
            const coinFromValue = wallet?.find(x => x?.name === 'USDT')?.value - sellCoinInputValue
            const fromAmount = Number(coinFromValue.toFixed(6))
            const coinToValue = (wallet?.find(x => x?.name === coin)?.value || 0) + Number(buyCoinInputValue)
            const toAmount = Number(coinToValue.toFixed(6))
            setLoader1(true)
            setBuy(false)
            toast.info('Processing...', toastStyle)
            const obj = {
                "time": Date.now(),
                "pairs": `${coin}/USDT`,
                "buySell": 'Buy',
                "amount": Number(sellCoinInputValue),
                "status": "Open",
            }
            setTimeout(() => {
                toast.success('Order created!', toastStyle)
                setLoader1(false)
                setBuy(true)
                dispatch(updateOpenOrders(obj))
                setTimeout(() => {
                    dispatch(setOpenOrders())
                    dispatch(setHistoryOrders(obj))
                    dispatch(patchConvertHistory())
                    dispatch(setWallet({selected: 'USDT', value: fromAmount}))
                    dispatch(setWallet({selected: coin, value: toAmount}))
                    dispatch(patchWallet())
                    setTimeout(() => {
                        setBuyDisabled(false)
                    }, 2000)
                }, 3000)
            }, 500)
        }

        const handleBuyChangeSell = (event) => {
            setBuyCoinSellInputValue(event.target.value)
            setSellCoinSellInputValue(Number((event.target.value * Number(symbolInfo.price)).toFixed(6)))
        }
        const handleSellChangeSell = (event) => {
            setSellCoinSellInputValue(event.target.value)
            setBuyCoinSellInputValue(Number((event.target.value / Number(symbolInfo.price)).toFixed(6)))
        }

        const handleSellCoin = () => {
            if (!buyCoinSellInputValue || Number(buyCoinSellInputValue) === 0) {
                toast.warning('Please, enter sell order amount', toastStyle)
                return
            } else if (sellCoinSellInputValue < 1) {
                toast.warning('Minimum order amount 1 USDT', toastStyle)
                return
            } else if (buyCoinSellInputValue > wallet?.find(x => x.name === coin)?.value) {
                toast.warning('You don\'t have enough funds in your account', toastStyle)
                return
            }
            setSellDisabled(true)
            const coinFromValue = wallet?.find(x => x?.name === coin)?.value - Number(buyCoinSellInputValue)
            const fromAmount = Number(coinFromValue.toFixed(6))
            const coinToValue = (wallet?.find(x => x?.name === 'USDT')?.value || 0) + Number(sellCoinSellInputValue)
            const toAmount = Number(coinToValue.toFixed(6))
            setLoader2(true)
            setSell(false)
            toast.info('Processing...', toastStyle)
            const obj = {
                "time": Date.now(),
                "pairs": `${coin}/USDT`,
                "buySell": 'Sell',
                "amount": Number(buyCoinSellInputValue),
                "status": "Open",
            }
            setTimeout(() => {
                toast.success('Order created!', toastStyle)
                setLoader2(false)
                setSell(true)
                dispatch(updateOpenOrders(obj))
                setTimeout(() => {
                    dispatch(setOpenOrders())
                    dispatch(setHistoryOrders(obj))
                    dispatch(patchConvertHistory())
                    dispatch(setWallet({selected: coin, value: fromAmount}))
                    dispatch(setWallet({selected: 'USDT', value: toAmount}))
                    dispatch(patchWallet())
                    setTimeout(() => {
                        setSellDisabled(false)
                    }, 2000)
                }, 3000)
            }, 500)
        }

        const [isFetching, setIsFetching] = useState(true)

        useEffect(() => {
            dispatch(setCoin('BTC'))
            setTimeout(() => {
                setIsFetching(false)
            }, 1000)
        }, [])
        useEffect(() => {
            window.scrollTo(0, 0)
        }, [])


        if (!isAuth) {
            return <Navigate to='/auth/login'/>
        } else if (isFetching) return (
            <div style={{height: '90vh'}} className='loader-container'>
                <Loader/>
            </div>
        )

        return (
            <div className='trading'>
                <div className='trading-header'>
                    <div style={{
                        width: 170,
                        fontSize: '30px',
                        fontWeight: "bold",
                        marginLeft: '2%',
                        marginRight: '3%'
                    }}>{coin}/USDT
                    </div>
                    <div className='last-price'>
                        <div className='last-price-text'>Last Price</div>
                        {priceBigger ?
                            <div style={{color: '#65b765'}} className='last-price-number'>
                                {Number(symbolInfo.price) > 100 ?
                                    Number(symbolInfo.price).toFixed(2) :
                                    Number(symbolInfo.price).toFixed(4)}
                            </div> :
                            <div style={{color: '#e76565'}} className='last-price-number'>
                                {Number(symbolInfo.price) > 100 ?
                                    Number(symbolInfo.price).toFixed(2) :
                                    Number(symbolInfo.price).toFixed(4)}
                            </div>
                        }
                    </div>
                    <div style={{marginLeft: '10px', width: 55}}
                         className='last-price-usd'>${Number(symbolInfo.price).toFixed(2)}</div>
                    <div className='line'/>
                    <div className='h-change'>
                        <div className='h-change-text'>24h Change</div>
                        {symbolInfo.hChange > 0 ?
                            <div style={{color: '#65b765'}} className='h-change-number'>
                                {symbolInfo.hChange}%
                            </div> :
                            <div style={{color: '#e76565'}} className='h-change-number'>
                                {symbolInfo.hChange}%
                            </div>
                        }
                    </div>
                    <div className='line'/>
                    <div className='h-high'>
                        <div className='h-high-text'>24h High</div>
                        <div className='h-high-number'>
                            {Number(symbolInfo.price) > 100 ?
                                commas(Number(symbolInfo.hHigh).toFixed(2)) :
                                Number(symbolInfo.hHigh).toFixed(4)}
                        </div>
                    </div>
                    <div className='h-low'>
                        <div className='h-low-text'>24h Low</div>
                        <div className='h-low-number'>
                            {Number(symbolInfo.price) > 100 ?
                                commas(Number(symbolInfo.hLow).toFixed(2)) :
                                Number(symbolInfo.hLow).toFixed(4)}
                        </div>
                    </div>
                    <div className='line'/>
                    <div className='h-volume'>
                        <div className='h-volume-text'>24h Volume</div>
                        <div className='h-volume-number'>{commas(Number(symbolInfo.hVolumeSecond).toFixed(2))} USDT
                        </div>
                    </div>
                    <div style={{marginLeft: '10px', width: 100}}
                         className='h-volume-usd'>${commas(Number(symbolInfo.hVolumeSecond).toFixed(2))}</div>
                </div>


                <div className='trading-main'>
                    <div style={{color: "white"}} className='order-book'>
                        Order Book
                        <div className='order-book-title'>
                            <div style={{maxWidth: 55}}>Price USDT</div>
                            <div style={{marginLeft: '18%'}}>Amount {coin}</div>
                            <div style={{marginLeft: 'auto', maxWidth: 65}}>Total USDT</div>
                        </div>
                        <div className='order-book-list-asks'>
                            <div>
                                {orderBookAsks.map((element) => (
                                    <div style={{
                                        color: '#e76565',
                                        marginBottom: '4px',
                                        width: 55,
                                    }}>
                                        {Number(symbolInfo.price) > 100 ?
                                            commas(Number(element[0]).toFixed(2)) :
                                            Number(element[0]).toFixed(4)}
                                    </div>
                                ))}
                            </div>
                            <div style={{marginLeft: '21%'}}>
                                {orderBookAsks.map((element) => (
                                    <div style={{
                                        marginBottom: '4px',
                                        width: 65,
                                    }}>
                                        {parseFloat(element[1])}
                                    </div>
                                ))}
                            </div>
                            <div style={{marginLeft: 'auto'}}>
                                {orderBookAsks.map((element) => (
                                    <div style={{
                                        textAlign: "right",
                                        marginBottom: '4px',
                                    }}>
                                        {commas((Number(element[0]) * Number(element[1])).toFixed(2))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='order-book-info'>
                            {priceBigger ?
                                <div className='order-book-info-price'>
                                    <div style={{color: '#65b765',}}
                                         className='order-book-info-text'>
                                        {Number(symbolInfo.price) > 100 ?
                                            Number(symbolInfo.price).toFixed(2) :
                                            Number(symbolInfo.price).toFixed(4)}
                                        <ArrowUpOutlined style={{marginLeft: '5px'}}/>
                                    </div>
                                    <div className='order-book-info-number'>
                                        {Number(symbolInfo.price) > 100 ?
                                            Number(symbolInfo.price).toFixed(2) :
                                            Number(symbolInfo.price).toFixed(4)}
                                        USD
                                    </div>
                                </div>
                                :
                                <div className='order-book-info-price'>
                                    <div style={{color: '#e76565',}}
                                         className='order-book-info-text'>
                                        {Number(symbolInfo.price) > 100 ?
                                            Number(symbolInfo.price).toFixed(2) :
                                            Number(symbolInfo.price).toFixed(4)}
                                        <ArrowDownOutlined style={{marginLeft: '5px'}}/>
                                    </div>
                                    <div className='order-book-info-number'>
                                        {Number(symbolInfo.price) > 100 ?
                                            Number(symbolInfo.price).toFixed(2) :
                                            Number(symbolInfo.price).toFixed(4)} USD
                                    </div>
                                </div>}
                            <div style={{marginRight: '5px'}}>
                                <div style={{display: "flex", fontWeight: "normal"}}>
                                    <div style={{fontSize: '13.6px', color: '#979aa1', marginRight: '5px'}}>Vol:</div>
                                    {commas(Number(symbolInfo.hVolumeFirst).toFixed(2))} {coin}
                                </div>
                                <div className='line-horizontal'/>
                                <div style={{display: "flex", fontWeight: "normal"}}>
                                    <div style={{fontSize: '13.6px', color: '#979aa1', marginRight: '5px'}}>Vol:</div>
                                    {commas(Number(symbolInfo.hVolumeSecond).toFixed(2))} USDT
                                </div>
                            </div>
                        </div>
                        <div className='order-book-list-bids'>
                            <div>
                                {orderBookBids.map((element) => (
                                    <div style={{
                                        color: '#65b765',
                                        marginBottom: '4px',
                                        width: 55,
                                    }}>
                                        {Number(symbolInfo.price) > 100 ?
                                            commas(Number(element[0]).toFixed(2)) :
                                            Number(element[0]).toFixed(4)}

                                    </div>
                                ))}
                            </div>
                            <div style={{marginLeft: '21%'}}>
                                {orderBookBids.map((element) => (
                                    <div style={{
                                        marginBottom: '4px',
                                        width: 65,
                                    }}>
                                        {parseFloat(element[1])}
                                    </div>
                                ))}
                            </div>
                            <div style={{marginLeft: 'auto', textAlign: "right",}}>
                                {orderBookBids.map((element) => (
                                    <div style={{
                                        marginBottom: '4px',
                                    }}>
                                        {commas((Number(element[0]) * Number(element[1])).toFixed(2))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='chart'>
                        <Chart coin={coin}/>
                        <div className='symbols-mobile'>
                            <div className='symbol-header'>
                                <div onClick={handleClickSearch}
                                     onBlur={handleBlurSearch}
                                     onMouseEnter={handleMouseEnterSearch}
                                     onMouseLeave={handleMouseLeaveSearch}
                                     className='symbol-search'
                                     style={document.activeElement === inputRef.current ? {borderColor: '#50cff9'} : {}}>
                                    <SearchOutlined style={searchIcon}/>
                                    <input ref={inputRef}
                                           type='text'
                                           placeholder='Search'
                                           value={searchInputValue}
                                           onChange={(e) => setSearchInputValue(e.target.value)}
                                           className='symbol-input'/>
                                </div>
                                <div className='symbol-pairs'>
                                    <div style={{
                                        fontSize: '11px',
                                        color: '#979aa1',
                                        marginTop: '2%',
                                        marginRight: '5px'
                                    }}>
                                        Pairs
                                    </div>
                                    <div style={{fontSize: '12px'}}>{coins.length}</div>
                                </div>
                            </div>
                            <div className='symbol-title'>
                                <div className='symbol-name-text'>Pair</div>
                                <div className='symbol-price-text'>Price</div>
                                <div className='symbol-percent-text'>Volume/Change</div>
                            </div>
                            <div className='symbol-data'>
                                {hVolumeAll.filter((coin) =>
                                    coin.symbol.toLowerCase().includes(searchInputValue)
                                ).map((coin, i) => (
                                    <div key={i}
                                         onClick={() => handleClickSymbol(coin.symbol, i)}
                                         className='symbol'
                                         style={{
                                             backgroundColor: active === i ? '#424c59' : '#272a31',
                                             borderWidth: 3,
                                             display: "flex",
                                             paddingTop: '5px',
                                             paddingBottom: '5px'
                                         }}
                                    >
                                        <img className='symbol-image'
                                             style={{height: '17px', width: '17px'}}
                                             src={coinsInfoRapidApi?.data?.coins?.find(x => x.symbol === coin.symbol.replace('USDT', ''))?.iconUrl}
                                             alt='img is not found'/>
                                        <div className='symbol-name'>{coin.symbol.replace('USDT', '/USDT')}</div>
                                        <div className='symbol-price'>
                                            {Number(coin.lastPrice) > 100 ?
                                                Number(coin.lastPrice).toFixed(2) :
                                                Number(coin.lastPrice).toFixed(4)}
                                        </div>
                                        <div className='symbol-percent'>
                                            {coin.priceChangePercent > 0 ?
                                                <div style={{color: '#65b765'}}>
                                                    {coin.priceChangePercent}%
                                                </div> :
                                                <div style={{color: '#e76565'}}>
                                                    {coin.priceChangePercent}%
                                                </div>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='convert-container'>
                            <div className='convert'>
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    <div className='convert-title'>
                                        <div id='limit' onClick={() => handleClickConvert('limit')}
                                             className='convert-title-passive'>
                                            Limit
                                        </div>
                                        <div id='market' onClick={() => handleClickConvert('market')}
                                             className='convert-title-active'
                                             style={{marginLeft: '3%'}}>
                                            Market
                                        </div>
                                        <div id='stop' onClick={() => handleClickConvert('stop')}
                                             className='convert-title-passive'
                                             style={{marginLeft: '3%'}}>
                                            Stop
                                        </div>
                                    </div>
                                    <div style={{display: "flex"}}>
                                        <div id='limit-line' className='convert-line-horizontal-trading'/>
                                        <div id='market-line' className='convert-line-horizontal-market'/>
                                        <div id='stop-line' className='convert-line-horizontal-stop'/>
                                    </div>
                                    <div className='convert-line-horizontal'/>
                                </div>
                            </div>
                            {trading === 'limit' &&
                                <div className='convert-form'>
                                    <div className='convert-buy'>
                                        <div style={{fontWeight: "bold", marginBottom: '3%'}}>Buy {coin}</div>
                                        <div style={{marginBottom: '3%'}}>
                                            <WalletOutlined style={{color: '#979aa1', marginRight: '2%'}}/>
                                            {wallet?.find(x => x.name === 'USDT')?.value || 0} - USDT
                                        </div>
                                        <div className='amount-style'>
                                            Amount
                                        </div>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <div className='convert-input'>
                                                <input type='number'
                                                       placeholder='0'
                                                       className='symbol-input'
                                                />
                                                <div style={{marginLeft: 'auto', marginRight: '2%'}}>{coin}</div>
                                            </div>
                                            <div className='arrows'>
                                                <UpOutlined className='trading-arrows'/>
                                                <DownOutlined className='trading-arrows'/>
                                            </div>
                                        </div>
                                        <div className='input-container'>
                                            Price
                                        </div>
                                        <div style={{display: "flex", alignItems: "center", width: '100%'}}>
                                            <div className='convert-input'>
                                                <input type='number'
                                                       placeholder='0'
                                                       className='symbol-input'
                                                />
                                                <div style={{marginLeft: 'auto', marginRight: '2%'}}>USDT</div>
                                            </div>
                                            <div className='arrows'>
                                                <UpOutlined className='trading-arrows'/>
                                                <DownOutlined className='trading-arrows'/>
                                            </div>
                                        </div>
                                        <div className='input-container'>
                                            Total
                                        </div>
                                        <div style={{display: "flex", alignItems: "center", width: '100%'}}>
                                            <div className='convert-input'>
                                                <input type='number'
                                                       placeholder='0'
                                                       className='symbol-input'
                                                />
                                                <div style={{marginLeft: 'auto', marginRight: '2%'}}>USDT</div>
                                            </div>
                                            <div className='arrows'>
                                                <UpOutlined className='trading-arrows'/>
                                                <DownOutlined className='trading-arrows'/>
                                            </div>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            color: '#979aa1',
                                        }}>
                                            <div className='trading-container'>
                                                <div style={{marginRight: "40%", marginLeft: '5%'}}>
                                                    Post only
                                                </div>
                                                <div className="checkbox-wrapper-2">
                                                    <input type="checkbox" className="sc-gJwTLC ikxBAC"/>
                                                </div>
                                            </div>
                                            <div className='trading-container'>
                                                <div style={{marginRight: "57%", marginLeft: '5%'}}>
                                                    FOK
                                                </div>
                                                <div className="checkbox-wrapper-2">
                                                    <input type="checkbox" className="sc-gJwTLC ikxBAC"/>
                                                </div>
                                            </div>

                                        </div>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            color: '#979aa1',
                                        }}>
                                            <div className='trading-container'>
                                                <div style={{marginRight: "57%", marginLeft: '5%'}}>
                                                    IOC
                                                </div>
                                                <div className="checkbox-wrapper-2">
                                                    <input type="checkbox" className="sc-gJwTLC ikxBAC"/>
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={handleClickMessage} className='button-buy'>Buy
                                        </button>
                                    </div>
                                    <div className='convert-sell'>
                                        <div style={{fontWeight: "bold", marginBottom: '3%'}}>Sell {coin}</div>
                                        <div style={{marginBottom: '3%'}}>
                                            <WalletOutlined style={{color: '#979aa1', marginRight: '2%'}}/>
                                            {wallet?.find(x => x.name === coin)?.value || 0} - {coin}
                                        </div>
                                        <div className='amount-style'>
                                            Amount
                                        </div>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <div className='convert-input'>
                                                <input type='number'
                                                       placeholder='0'
                                                       className='symbol-input'
                                                />
                                                <div style={{marginLeft: 'auto', marginRight: '2%'}}>{coin}</div>
                                            </div>
                                            <div className='arrows'>
                                                <UpOutlined className='trading-arrows'/>
                                                <DownOutlined className='trading-arrows'/>
                                            </div>
                                        </div>
                                        <div className='input-container'>
                                            Price
                                        </div>
                                        <div style={{display: "flex", alignItems: "center", width: '100%'}}>
                                            <div className='convert-input'>
                                                <input type='number'
                                                       placeholder='0'
                                                       className='symbol-input'
                                                />
                                                <div style={{marginLeft: 'auto', marginRight: '2%'}}>USDT</div>
                                            </div>
                                            <div className='arrows'>
                                                <UpOutlined className='trading-arrows'/>
                                                <DownOutlined className='trading-arrows'/>
                                            </div>
                                        </div>
                                        <div className='input-container'>
                                            Total
                                        </div>
                                        <div style={{display: "flex", alignItems: "center", width: '100%'}}>
                                            <div className='convert-input'>
                                                <input type='number'
                                                       placeholder='0'
                                                       className='symbol-input'
                                                />
                                                <div style={{marginLeft: 'auto', marginRight: '2%'}}>USDT</div>
                                            </div>
                                            <div className='arrows'>
                                                <UpOutlined className='trading-arrows'/>
                                                <DownOutlined className='trading-arrows'/>
                                            </div>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            color: '#979aa1',
                                        }}>
                                            <div className='trading-container'>
                                                <div style={{marginRight: "40%", marginLeft: '5%'}}>
                                                    Post only
                                                </div>
                                                <div className="checkbox-wrapper-2">
                                                    <input type="checkbox" className="sc-gJwTLC ikxBAC"/>
                                                </div>
                                            </div>
                                            <div className='trading-container'>
                                                <div style={{marginRight: "57%", marginLeft: '5%'}}>
                                                    FOK
                                                </div>
                                                <div className="checkbox-wrapper-2">
                                                    <input type="checkbox" className="sc-gJwTLC ikxBAC"/>
                                                </div>
                                            </div>

                                        </div>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            color: '#979aa1',
                                        }}>
                                            <div className='trading-container'>
                                                <div style={{marginRight: "57%", marginLeft: '5%'}}>
                                                    IOC
                                                </div>
                                                <div className="checkbox-wrapper-2">
                                                    <input type="checkbox" className="sc-gJwTLC ikxBAC"/>
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={handleClickMessage} className='button-sell'>Sell</button>
                                    </div>
                                </div>}
                            {trading === 'market' &&
                                <div className='convert-form'>
                                    {buy &&
                                        <div className='convert-buy'>
                                            <div style={{fontWeight: "bold", marginBottom: '3%'}}>Buy {coin}</div>
                                            <div style={{marginBottom: '3%'}}>
                                                <WalletOutlined style={{color: '#979aa1', marginRight: '2%'}}/>
                                                {wallet?.find(x => x.name === 'USDT')?.value || 0} - USDT
                                            </div>
                                            <div className='amount-style'>
                                                <div style={{color: '#50cff9', marginRight: '1%'}}>Amount</div>
                                                / for the amount of
                                            </div>
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <div className='convert-input'>
                                                    <input type='number'
                                                           placeholder='0'
                                                           className='symbol-input'
                                                           value={buyCoinInputValue}
                                                           onChange={handleBuyChangeBuy}
                                                    />
                                                    <div style={{marginLeft: 'auto', marginRight: '2%'}}>{coin}</div>
                                                </div>
                                                <div className='arrows'>
                                                    <UpOutlined className='trading-arrows'/>
                                                    <DownOutlined className='trading-arrows'/>
                                                </div>
                                            </div>
                                            <div className='input-container'>
                                                Total
                                            </div>
                                            <div style={{display: "flex", alignItems: "center", width: '100%'}}>
                                                <div className='convert-input'>
                                                    <input type='number'
                                                           placeholder='0'
                                                           className='symbol-input'
                                                           value={sellCoinInputValue}
                                                           onChange={handleSellChangeBuy}
                                                    />
                                                    <div style={{marginLeft: 'auto', marginRight: '2%'}}>USDT</div>
                                                </div>
                                                <div className='arrows'>
                                                    <UpOutlined className='trading-arrows'/>
                                                    <DownOutlined className='trading-arrows'/>
                                                </div>
                                            </div>
                                            <div style={{display: 'flex', marginTop: '15px', fontSize: '12px'}}>
                                                <div style={{marginLeft: 0}} className='convert-percent'
                                                     onClick={() => handleClickPercentBuy(0.25)}
                                                >25%
                                                </div>
                                                <div className='convert-percent'
                                                     onClick={() => handleClickPercentBuy(0.5)}
                                                >50%
                                                </div>
                                                <div className='convert-percent'
                                                     onClick={() => handleClickPercentBuy(0.75)}
                                                >75%
                                                </div>
                                                <div className='convert-percent'
                                                     onClick={() => handleClickPercentBuy(1)}
                                                >100%
                                                </div>
                                            </div>
                                            <button disabled={buyDisabled} onClick={handleBuyCoin}
                                                    className='button-buy'>Buy
                                            </button>
                                        </div>}
                                    {loader1 &&
                                        <div className='loader-trading'>
                                            <Loader/>
                                        </div>}
                                    {sell &&
                                        <div className='convert-sell'>
                                            <div style={{fontWeight: "bold", marginBottom: '3%'}}>Sell {coin}</div>
                                            <div style={{marginBottom: '3%'}}>
                                                <WalletOutlined style={{color: '#979aa1', marginRight: '2%'}}/>
                                                {wallet?.find(x => x.name === coin)?.value || 0} - {coin}
                                            </div>
                                            <div className='amount-style'>
                                                <div style={{color: '#50cff9', marginRight: '1%'}}>Amount</div>
                                                / for the amount of
                                            </div>
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <div className='convert-input'>
                                                    <input type='number'
                                                           placeholder='0'
                                                           className='symbol-input'
                                                           value={buyCoinSellInputValue}
                                                           onChange={handleBuyChangeSell}
                                                    />
                                                    <div style={{marginLeft: 'auto', marginRight: '2%'}}>{coin}</div>
                                                </div>
                                                <div className='arrows'>
                                                    <UpOutlined className='trading-arrows'/>
                                                    <DownOutlined className='trading-arrows'/>
                                                </div>
                                            </div>
                                            <div className='input-container'>
                                                Total
                                            </div>
                                            <div style={{display: "flex", alignItems: "center", width: '100%'}}>
                                                <div className='convert-input'>
                                                    <input type='number'
                                                           placeholder='0'
                                                           className='symbol-input'
                                                           value={sellCoinSellInputValue}
                                                           onChange={handleSellChangeSell}
                                                    />
                                                    <div style={{marginLeft: 'auto', marginRight: '2%'}}>USDT</div>
                                                </div>
                                                <div className='arrows'>
                                                    <UpOutlined className='trading-arrows'/>
                                                    <DownOutlined className='trading-arrows'/>
                                                </div>
                                            </div>
                                            <div style={{display: 'flex', marginTop: '15px', fontSize: '12px'}}>
                                                <div style={{marginLeft: 0}} className='convert-percent'
                                                     onClick={() => handleClickPercentSell(0.25)}
                                                >25%
                                                </div>
                                                <div className='convert-percent'
                                                     onClick={() => handleClickPercentSell(0.5)}
                                                >50%
                                                </div>
                                                <div className='convert-percent'
                                                     onClick={() => handleClickPercentSell(0.75)}
                                                >75%
                                                </div>
                                                <div className='convert-percent'
                                                     onClick={() => handleClickPercentSell(1)}
                                                >100%
                                                </div>
                                            </div>
                                            <button disabled={sellDisabled} onClick={handleSellCoin}
                                                    className='button-sell'>Sell
                                            </button>
                                        </div>}
                                    {loader2 &&
                                        <div className='loader-trading2'>
                                            <Loader/>
                                        </div>}
                                </div>}
                            {trading === 'stop' &&
                                <div className='convert-form'>
                                    <div className='convert-buy'>
                                        <div style={{fontWeight: "bold", marginBottom: '3%'}}>Buy {coin}</div>
                                        <div style={{marginBottom: '3%'}}>
                                            <WalletOutlined style={{color: '#979aa1', marginRight: '2%'}}/>
                                            {wallet?.find(x => x.name === 'USDT')?.value || 0} - USDT
                                        </div>
                                        <div className='amount-style'>
                                            Amount
                                        </div>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <div className='convert-input'>
                                                <input type='number'
                                                       placeholder='0'
                                                       className='symbol-input'
                                                />
                                                <div style={{marginLeft: 'auto', marginRight: '2%'}}>{coin}</div>
                                            </div>
                                            <div className='arrows'>
                                                <UpOutlined className='trading-arrows'/>
                                                <DownOutlined className='trading-arrows'/>
                                            </div>
                                        </div>
                                        <div className='input-container'>
                                            Stop Price
                                        </div>
                                        <div style={{display: "flex", alignItems: "center", width: '100%'}}>
                                            <div className='convert-input'>
                                                <input type='number'
                                                       placeholder='0'
                                                       className='symbol-input'
                                                />
                                                <div style={{marginLeft: 'auto', marginRight: '2%'}}>USDT</div>
                                            </div>
                                            <div className='arrows'>
                                                <UpOutlined className='trading-arrows'/>
                                                <DownOutlined className='trading-arrows'/>
                                            </div>
                                        </div>
                                        <div className='input-container'>
                                            Total
                                        </div>
                                        <div style={{display: "flex", alignItems: "center", width: '100%'}}>
                                            <div className='convert-input'>
                                                <input type='number'
                                                       placeholder='0'
                                                       className='symbol-input'
                                                />
                                                <div style={{marginLeft: 'auto', marginRight: '2%'}}>USDT</div>
                                            </div>
                                            <div className='arrows'>
                                                <UpOutlined className='trading-arrows'/>
                                                <DownOutlined className='trading-arrows'/>
                                            </div>
                                        </div>
                                        <button onClick={handleClickMessage} className='button-buy'>Buy</button>
                                    </div>
                                    <div className='convert-sell'>
                                        <div style={{fontWeight: "bold", marginBottom: '3%'}}>Sell {coin}</div>
                                        <div style={{marginBottom: '3%'}}>
                                            <WalletOutlined style={{color: '#979aa1', marginRight: '2%'}}/>
                                            {wallet?.find(x => x.name === coin)?.value || 0} - {coin}
                                        </div>
                                        <div className='amount-style'>
                                            Amount
                                        </div>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <div className='convert-input'>
                                                <input type='number'
                                                       placeholder='0'
                                                       className='symbol-input'
                                                />
                                                <div style={{marginLeft: 'auto', marginRight: '2%'}}>{coin}</div>
                                            </div>
                                            <div className='arrows'>
                                                <UpOutlined className='trading-arrows'/>
                                                <DownOutlined className='trading-arrows'/>
                                            </div>
                                        </div>
                                        <div className='input-container'>
                                            Stop Price
                                        </div>
                                        <div style={{display: "flex", alignItems: "center", width: '100%'}}>
                                            <div className='convert-input'>
                                                <input type='number'
                                                       placeholder='0'
                                                       className='symbol-input'
                                                />
                                                <div style={{marginLeft: 'auto', marginRight: '2%'}}>USDT</div>
                                            </div>
                                            <div className='arrows'>
                                                <UpOutlined className='trading-arrows'/>
                                                <DownOutlined className='trading-arrows'/>
                                            </div>
                                        </div>
                                        <div className='input-container'>
                                            Total
                                        </div>
                                        <div style={{display: "flex", alignItems: "center", width: '100%'}}>
                                            <div className='convert-input'>
                                                <input type='number'
                                                       placeholder='0'
                                                       className='symbol-input'
                                                />
                                                <div style={{marginLeft: 'auto', marginRight: '2%'}}>USDT</div>
                                            </div>
                                            <div className='arrows'>
                                                <UpOutlined className='trading-arrows'/>
                                                <DownOutlined className='trading-arrows'/>
                                            </div>
                                        </div>
                                        <button onClick={handleClickMessage} className='button-sell'>Sell</button>
                                    </div>
                                </div>}
                            <div style={{height: '100%', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px'}}
                                 className='convert-2'>
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    <div className='convert-title'>
                                        <div id='orders' onClick={() => handleClickHistory('orders')}
                                             className='convert-title-history-active'>
                                            My Open Orders
                                        </div>
                                        <div id='history' onClick={() => handleClickHistory('history')}
                                             className='convert-title-history-passive'
                                             style={{marginLeft: '3%'}}>
                                            My Trading History
                                        </div>
                                    </div>
                                    <div style={{display: "flex"}}>
                                        <div id='orders-line' className='convert-line-horizontal-open'/>
                                        <div id='history-line' className='convert-line-horizontal-history'/>
                                    </div>
                                    <div className='convert-line-horizontal'/>
                                </div>
                                {history === 'orders' && openOrders.length >= 1 &&
                                    <div className='orders'>
                                        <div className='open-orders'>
                                            <div className='open-orders-header' style={{paddingTop: 0}}>
                                                <div className='open-orders-header-item'>Date</div>
                                                <div className='open-orders-header-item'>Pairs</div>
                                                <div className='open-orders-header-item'>Status</div>
                                                <div className='open-orders-header-item'>Buy/Sell</div>
                                                <div className='open-orders-header-item'>Amount</div>
                                            </div>
                                            <div className="wallet-convert-line-horizontal"/>
                                            {openOrders.map((item) => {
                                                let date = new Date(item.time)
                                                let Y = date.getFullYear().toString()
                                                let M = (date.getMonth() + 1).toString()
                                                if (date.getMonth() < 10) {
                                                    M = `0${date.getMonth() + 1}`
                                                }
                                                let D = (date.getDate()).toString()
                                                if (date.getDate() < 10) {
                                                    D = `0${date.getDate()}`
                                                }
                                                let h = date.getHours().toString()
                                                if (date.getHours() < 10) {
                                                    h = `0${date.getHours()}`
                                                }
                                                let m = date.getMinutes().toString()
                                                if (date.getMinutes() < 10) {
                                                    m = `0${date.getMinutes()}`
                                                }
                                                let s = date.getSeconds().toString()
                                                if (date.getSeconds() < 10) {
                                                    s = `0${date.getSeconds()}`
                                                }
                                                let data = `${D}.${M}.${Y} ${h}:${m}:${s}`
                                                return (
                                                    <div style={{width: '100%'}}>
                                                        <div className='open-orders-header'>
                                                            <div className='open-orders-item'>{data}</div>
                                                            <div className='open-orders-item'>{item.pairs}</div>
                                                            <div className='open-orders-item'>{item.status}</div>
                                                            <div className='open-orders-item'>{item.buySell}</div>
                                                            <div className='open-orders-item'>{item.amount}</div>
                                                        </div>
                                                        <div className="wallet-convert-line-horizontal"/>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>}
                                {history === 'orders' && openOrders.length < 1 &&
                                    <div className='orders'>
                                        No open orders
                                    </div>}
                                {history === 'history' && convertHistory?.length >= 1 &&
                                    <div className='orders'>
                                        <div className='open-orders'>
                                            <div className='open-orders-header' style={{paddingTop: 0}}>
                                                <div className='open-orders-header-item'>Date</div>
                                                <div className='open-orders-header-item'>Pairs</div>
                                                <div className='open-orders-header-item'>Status</div>
                                                <div className='open-orders-header-item'>Buy/Sell</div>
                                                <div className='open-orders-header-item'>Amount</div>
                                            </div>
                                            <div className="wallet-convert-line-horizontal"/>
                                            {convertHistory?.map((item) => {
                                                let date = new Date(item.time)
                                                let Y = date.getFullYear().toString()
                                                let M = (date.getMonth() + 1).toString()
                                                if (date.getMonth() < 10) {
                                                    M = `0${date.getMonth() + 1}`
                                                }
                                                let D = (date.getDate()).toString()
                                                if (date.getDate() < 10) {
                                                    D = `0${date.getDate()}`
                                                }
                                                let h = date.getHours().toString()
                                                if (date.getHours() < 10) {
                                                    h = `0${date.getHours()}`
                                                }
                                                let m = date.getMinutes().toString()
                                                if (date.getMinutes() < 10) {
                                                    m = `0${date.getMinutes()}`
                                                }
                                                let s = date.getSeconds().toString()
                                                if (date.getSeconds() < 10) {
                                                    s = `0${date.getSeconds()}`
                                                }
                                                let data = `${D}.${M}.${Y} ${h}:${m}:${s}`
                                                return (
                                                    <div style={{width: '100%'}}>
                                                        <div className='open-orders-header'>
                                                            <div className='open-orders-item'>{data}</div>
                                                            <div className='open-orders-item'>{item.pairs}</div>
                                                            <div className='open-orders-item'>Closed</div>
                                                            <div className='open-orders-item'>{item.buySell}</div>
                                                            <div className='open-orders-item'>{item.amount}</div>
                                                        </div>
                                                        <div className="wallet-convert-line-horizontal"/>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>}
                                {history === 'history' && convertHistory?.length < 1 &&
                                    <div className='orders'>
                                        No open orders
                                    </div>}
                            </div>
                        </div>
                        <div style={{color: "white"}} className='order-book-mobile'>
                            Order Book
                            <div className='order-book-title'>
                                <div style={{width: 75}}>Price USDT</div>
                                <div style={{marginLeft: '18%'}}>Amount {coin}</div>
                                <div style={{marginLeft: 'auto', maxWidth: 65}}>Total USDT</div>
                            </div>
                            <div className='order-book-list-asks'>
                                <div>
                                    {orderBookAsks.map((element) => (
                                        <div style={{
                                            color: '#e76565',
                                            marginBottom: '4px',
                                            width: 75,
                                        }}>
                                            {Number(symbolInfo.price) > 100 ?
                                                commas(Number(element[0]).toFixed(2)) :
                                                Number(element[0]).toFixed(4)}
                                        </div>
                                    ))}
                                </div>
                                <div style={{marginLeft: '21%'}}>
                                    {orderBookAsks.map((element) => (
                                        <div style={{
                                            marginBottom: '4px',
                                            width: 65,
                                        }}>
                                            {parseFloat(element[1])}
                                        </div>
                                    ))}
                                </div>
                                <div style={{marginLeft: 'auto'}}>
                                    {orderBookAsks.map((element) => (
                                        <div style={{
                                            textAlign: "right",
                                            marginBottom: '4px',
                                        }}>
                                            {commas((Number(element[0]) * Number(element[1])).toFixed(2))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='order-book-info'>
                                {priceBigger ?
                                    <div className='order-book-info-price'>
                                        <div style={{color: '#65b765',}}
                                             className='order-book-info-text'>
                                            {Number(symbolInfo.price) > 100 ?
                                                Number(symbolInfo.price).toFixed(2) :
                                                Number(symbolInfo.price).toFixed(4)}
                                            <ArrowUpOutlined style={{marginLeft: '5px'}}/>
                                        </div>
                                        <div className='order-book-info-number'>
                                            {Number(symbolInfo.price) > 100 ?
                                                Number(symbolInfo.price).toFixed(2) :
                                                Number(symbolInfo.price).toFixed(4)}
                                            USD
                                        </div>
                                    </div>
                                    :
                                    <div className='order-book-info-price'>
                                        <div style={{color: '#e76565',}}
                                             className='order-book-info-text'>
                                            {Number(symbolInfo.price) > 100 ?
                                                Number(symbolInfo.price).toFixed(2) :
                                                Number(symbolInfo.price).toFixed(4)}
                                            <ArrowDownOutlined style={{marginLeft: '5px'}}/>
                                        </div>
                                        <div className='order-book-info-number'>
                                            {Number(symbolInfo.price) > 100 ?
                                                Number(symbolInfo.price).toFixed(2) :
                                                Number(symbolInfo.price).toFixed(4)} USD
                                        </div>
                                    </div>}
                                <div style={{marginRight: '5px'}}>
                                    <div style={{display: "flex", fontWeight: "normal"}}>
                                        <div style={{fontSize: '13.6px', color: '#979aa1', marginRight: '5px'}}>Vol:</div>
                                        {commas(Number(symbolInfo.hVolumeFirst).toFixed(2))} {coin}
                                    </div>
                                    <div className='line-horizontal'/>
                                    <div style={{display: "flex", fontWeight: "normal"}}>
                                        <div style={{fontSize: '13.6px', color: '#979aa1', marginRight: '5px'}}>Vol:</div>
                                        {commas(Number(symbolInfo.hVolumeSecond).toFixed(2))} USDT
                                    </div>
                                </div>
                            </div>
                            <div className='order-book-list-bids'>
                                <div>
                                    {orderBookBids.map((element) => (
                                        <div style={{
                                            color: '#65b765',
                                            marginBottom: '4px',
                                            width: 75,
                                        }}>
                                            {Number(symbolInfo.price) > 100 ?
                                                commas(Number(element[0]).toFixed(2)) :
                                                Number(element[0]).toFixed(4)}

                                        </div>
                                    ))}
                                </div>
                                <div style={{marginLeft: '21%'}}>
                                    {orderBookBids.map((element) => (
                                        <div style={{
                                            marginBottom: '4px',
                                            width: 65,
                                        }}>
                                            {parseFloat(element[1])}
                                        </div>
                                    ))}
                                </div>
                                <div style={{marginLeft: 'auto', textAlign: "right",}}>
                                    {orderBookBids.map((element) => (
                                        <div style={{
                                            marginBottom: '4px',
                                        }}>
                                            {commas((Number(element[0]) * Number(element[1])).toFixed(2))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div style={{color: "white"}} className='trade-history-mobile'>
                            Trade History
                            <div className='order-book-title'>
                                <div style={{width: 75}}>Price USDT</div>
                                <div className='order-book-amount'>Amount {coin}</div>
                                <div style={{marginLeft: 'auto', maxWidth: 65, marginRight: 20}}>Date/Time</div>
                            </div>
                            <div className='trade-history-list'>
                                <div>
                                    {tradeHistory.map((element) =>
                                        element.isBuyerMaker ? (
                                            <div style={{
                                                color: '#65b765',
                                                marginBottom: '4px',
                                                width: 75,
                                            }}>
                                                {Number(element.price) > 100 ?
                                                    commas(Number(element.price).toFixed(2)) :
                                                    Number(element.price).toFixed(4)}
                                            </div>
                                        ) : (
                                            <div style={{
                                                color: '#e76565',
                                                marginBottom: '4px',
                                                width: 75,
                                            }}>
                                                {Number(element.price) > 100 ?
                                                    commas(Number(element.price).toFixed(2)) :
                                                    Number(element.price).toFixed(4)}
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className='order-book-data'>
                                    {tradeHistory.map((element) => (
                                        <div style={{
                                            marginBottom: '4px',
                                            width: 65,
                                        }}>
                                            {parseFloat(element.qty)}
                                        </div>
                                    ))}
                                </div>
                                <div style={{marginLeft: 'auto'}}>
                                    {tradeHistory.map(element => {
                                        let date = new Date(element.time)
                                        let Y = date.getFullYear().toString().slice(2)
                                        let M = (date.getMonth() + 1).toString()
                                        if (date.getMonth() < 10) {
                                            M = `0${date.getMonth() + 1}`
                                        }
                                        let D = (date.getDate()).toString()
                                        if (date.getDate() < 10) {
                                            D = `0${date.getDate()}`
                                        }
                                        let h = date.getHours().toString()
                                        if (date.getHours() < 10) {
                                            h = `0${date.getHours()}`
                                        }
                                        let m = date.getMinutes().toString()
                                        if (date.getMinutes() < 10) {
                                            m = `0${date.getMinutes()}`
                                        }
                                        let data = `${D}.${M}.${Y} ${h}:${m}`
                                        return (
                                            <div style={{
                                                textAlign: "right",
                                                marginBottom: '4px',
                                                marginRight: '15px',
                                            }}>
                                                {data}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{width: '24%'}}>
                        <div className='symbols'>
                            <div className='symbol-header'>
                                <div onClick={handleClickSearch}
                                     onBlur={handleBlurSearch}
                                     onMouseEnter={handleMouseEnterSearch}
                                     onMouseLeave={handleMouseLeaveSearch}
                                     className='symbol-search'
                                     style={document.activeElement === inputRef.current ? {borderColor: '#50cff9'} : {}}>
                                    <SearchOutlined style={searchIcon}/>
                                    <input ref={inputRef}
                                           type='text'
                                           placeholder='Search'
                                           value={searchInputValue}
                                           onChange={(e) => setSearchInputValue(e.target.value)}
                                           className='symbol-input'/>
                                </div>
                                <div className='symbol-pairs'>
                                    <div style={{
                                        fontSize: '11px',
                                        color: '#979aa1',
                                        marginTop: '2%',
                                        marginRight: '5px'
                                    }}>
                                        Pairs
                                    </div>
                                    <div style={{fontSize: '12px'}}>{coins.length}</div>
                                </div>
                            </div>
                            <div className='symbol-title'>
                                <div className='symbol-name-text'>Pair</div>
                                <div className='symbol-price-text'>Price</div>
                                <div className='symbol-percent-text'>Volume/Change</div>
                            </div>
                            <div className='symbol-data'>
                                {hVolumeAll.filter((coin) =>
                                    coin.symbol.toLowerCase().includes(searchInputValue)
                                ).map((coin, i) => (
                                    <div key={i}
                                         onClick={() => handleClickSymbol(coin.symbol, i)}
                                         className='symbol'
                                         style={{
                                             backgroundColor: active === i ? '#424c59' : '#272a31',
                                             borderWidth: 3,
                                             display: "flex",
                                             paddingTop: '5px',
                                             paddingBottom: '5px'
                                         }}
                                    >
                                        <img className='symbol-image'
                                             style={{height: '17px', width: '17px'}}
                                             src={coinsInfoRapidApi?.data?.coins?.find(x => x.symbol === coin.symbol.replace('USDT', ''))?.iconUrl}
                                             alt='img is not found'/>
                                        <div className='symbol-name'>{coin.symbol.replace('USDT', '/USDT')}</div>
                                        <div className='symbol-price'>
                                            {Number(coin.lastPrice) > 100 ?
                                                Number(coin.lastPrice).toFixed(2) :
                                                Number(coin.lastPrice).toFixed(4)}
                                        </div>
                                        <div className='symbol-percent'>
                                            {coin.priceChangePercent > 0 ?
                                                <div style={{color: '#65b765'}}>
                                                    {coin.priceChangePercent}%
                                                </div> :
                                                <div style={{color: '#e76565'}}>
                                                    {coin.priceChangePercent}%
                                                </div>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{color: "white"}} className='trade-history'>
                            Trade History
                            <div className='order-book-title'>
                                <div style={{width: 75}}>Price USDT</div>
                                <div className='order-book-amount'>Amount {coin}</div>
                                <div style={{marginLeft: 'auto', maxWidth: 65, marginRight: 20}}>Date/Time</div>
                            </div>
                            <div className='trade-history-list'>
                                <div>
                                    {tradeHistory.map((element) =>
                                        element.isBuyerMaker ? (
                                            <div style={{
                                                color: '#65b765',
                                                marginBottom: '4px',
                                                width: 75,
                                            }}>
                                                {Number(element.price) > 100 ?
                                                    commas(Number(element.price).toFixed(2)) :
                                                    Number(element.price).toFixed(4)}
                                            </div>
                                        ) : (
                                            <div style={{
                                                color: '#e76565',
                                                marginBottom: '4px',
                                                width: 75,
                                            }}>
                                                {Number(element.price) > 100 ?
                                                    commas(Number(element.price).toFixed(2)) :
                                                    Number(element.price).toFixed(4)}
                                            </div>
                                        )
                                    )}
                                </div>
                                <div style={{marginLeft: '25%'}}>
                                    {tradeHistory.map((element) => (
                                        <div style={{
                                            marginBottom: '4px',
                                            width: 65,
                                        }}>
                                            {parseFloat(element.qty)}
                                        </div>
                                    ))}
                                </div>
                                <div style={{marginLeft: 'auto'}}>
                                    {tradeHistory.map(element => {
                                        let date = new Date(element.time)
                                        let Y = date.getFullYear().toString().slice(2)
                                        let M = (date.getMonth() + 1).toString()
                                        if (date.getMonth() < 10) {
                                            M = `0${date.getMonth() + 1}`
                                        }
                                        let D = (date.getDate()).toString()
                                        if (date.getDate() < 10) {
                                            D = `0${date.getDate()}`
                                        }
                                        let h = date.getHours().toString()
                                        if (date.getHours() < 10) {
                                            h = `0${date.getHours()}`
                                        }
                                        let m = date.getMinutes().toString()
                                        if (date.getMinutes() < 10) {
                                            m = `0${date.getMinutes()}`
                                        }
                                        let data = `${D}.${M}.${Y} ${h}:${m}`
                                        return (
                                            <div style={{
                                                textAlign: "right",
                                                marginBottom: '4px',
                                                marginRight: '15px',
                                            }}>
                                                {data}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        )
    }
)


export default Trading