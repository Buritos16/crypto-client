import React, {useState, useEffect} from "react";
import './P2P.css'
import {CaretDownOutlined, UserOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {p2p} from '../../data'
import {toast} from "react-toastify";
import {selectIsAuth} from "../../slices/auth";
import {Navigate} from "react-router-dom";

const P2P = () => {
    const isAuth = useSelector(selectIsAuth)

    const [sell, setSell] = useState(true)
    const [buy, setBuy] = useState(false)

    const coinsName = useSelector(state => state.trading.coins)
    const [coinName, setCoinName] = useState('BTC');
    const [select, setSelect] = useState(false);

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
        toast.error('An error occurred while performing the action. Please try again or contact technical support', toastStyle)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    if (!isAuth) {
        return <Navigate to='/auth/login'/>
    }
    return (
        <div className='p2p'>
            <div className='p2p-options'>
                <div className='p2p-buttons'>
                    <div className='p2p-buttons-text1' style={sell ?
                        {backgroundColor: '#0d73c5',} :
                        {}
                    } onClick={() => {
                        setSell(true);
                        setBuy(false)
                    }}
                    >SELL
                    </div>
                    <div className='p2p-buttons-text2' style={buy ?
                        {backgroundColor: '#0d73c5',} :
                        {}
                    } onClick={() => {
                        setSell(false);
                        setBuy(true)
                    }}
                    >BUY
                    </div>
                </div>

                <div style={{marginTop: '30px'}} className='invest-amount'>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div style={{borderRadius: '10px', display: "flex", justifyContent: "space-between"}}
                             className='invest-input'>
                            <input type='number'
                                   placeholder='Amount (BTC)'
                                   className='convert-input-text'/>
                            <div id='navToolsLink' className='select-container' onClick={() => {
                                if (select) {
                                    document.getElementById('select-form').style.animationName = 'scale'
                                    document.getElementById('select-form').style.animationDirection = 'reverse'
                                    document.getElementById('arrow-select').className = 'arrow-select'
                                    setTimeout(() => {
                                        setSelect(!select)
                                    }, 300)
                                } else {
                                    document.getElementById('arrow-select').className = 'arrow-select-reverse'
                                    setSelect(!select)
                                }
                            }}
                            >
                                <div style={{display: "flex", alignItems: 'center'}}
                                     className='select-header p2p-select-button'>
                                    <div className='coin-name'>{coinName}</div>
                                    <CaretDownOutlined id='arrow-select' className='arrow-select'/>
                                </div>
                                {select &&
                                    <div id='select-form' className='select'>
                                        {coinsName.map((coin) => (
                                            <div className='select-item' onClick={() => {
                                                setCoinName(coin)
                                            }}>
                                                <div>{coin}</div>
                                            </div>))}
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>


                <div style={{marginTop: '30px'}} className='invest-amount'>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div style={{borderRadius: '10px', display: "flex", justifyContent: "space-between"}}
                             className='invest-input'>
                            <input type='number'
                                   placeholder='Amount (USD)'
                                   className='convert-input-text'/>
                            <div className='select-container'>
                                <div style={{display: "flex", alignItems: 'center'}}
                                     className='select-header p2p-select-button'>
                                    <div className='coin-name'>USD</div>
                                    <CaretDownOutlined className='arrow-select'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{marginTop: '30px'}} className='invest-amount'>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div style={{
                            padding: '20px',
                            borderRadius: '10px',
                            display: "flex",
                            justifyContent: "space-between"
                        }} className='invest-input'>
                            <div>Payment method</div>
                            <div>Card to Card</div>
                        </div>
                    </div>
                </div>

                <div style={{display: "flex", justifyContent: "space-between", marginTop: 30}}>
                    <div>
                        <div>Verified users</div>
                        <div style={{color: '#979aa1', fontSize: '13px'}}>Show ads of verified traders only</div>
                    </div>
                    <div className="checkbox-wrapper">
                        <input type="checkbox" className="sc ikx"/>
                    </div>
                </div>

                <button onClick={handleClickMessage} className='p2p-button'>Search</button>
            </div>
            <div className='p2p-people'>
                <div className='p2p-container' style={{width: '100%'}}>
                    <div style={{
                        paddingLeft: 20,
                        display: "flex",
                        fontSize: '15px',
                        color: '#979aa1',
                        marginBottom: 25
                    }}>
                        <div style={{width: 190}}>Trader</div>
                        <div style={{marginLeft: '2%', width: 130}}>Payment method</div>
                        <div style={{marginLeft: '10%', width: 100}}>Price</div>
                        <div style={{marginLeft: '10%'}}>Limits</div>
                    </div>
                    {p2p.map((item) => (
                        <div>
                            <div style={{borderColor: '#979aa1'}} className="convert-line-horizontal"/>
                            <div style={{display: "flex", alignItems: "center", padding: '20px 20px'}}>
                                <UserOutlined style={{fontSize: 30, color: '#979aa1'}}/>
                                <div style={{display: "flex", flexDirection: "column", marginLeft: 10, width: 150}}>
                                    <div style={{color: '#0d73c5'}}>{item.name}</div>
                                    <div style={{color: '#979aa1'}}>{item.orders}</div>
                                </div>
                                <div style={{marginLeft: '2%', width: 130}}>Card to Card</div>
                                <div style={{
                                    marginLeft: '10%',
                                    fontWeight: "bold",
                                    color: '#65b765',
                                    width: 100
                                }}>{item.price} USD
                                </div>
                                <div style={{marginLeft: '10%', fontWeight: "bold"}}>50 - {item.limits} USD</div>
                                <div className='sell-btc'
                                     onClick={handleClickMessage}
                                     style={{
                                         marginLeft: "auto",
                                         cursor: "pointer",
                                         border: '2px solid #0d73c5',
                                         padding: 10,
                                         color: '#0d73c5',
                                         borderRadius: 7,
                                         fontWeight: "bold"
                                     }}>
                                    Sell BTC
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div onClick={handleClickMessage}
                     className='p2p-button-load'
                     style={{
                         alignSelf: "center",
                         backgroundColor: '#0d73c5',
                         padding: 15,
                         borderRadius: 10,
                         cursor: "pointer"
                     }}>
                    Load 15 more traders
                </div>

            </div>
        </div>
    )
}

export default P2P