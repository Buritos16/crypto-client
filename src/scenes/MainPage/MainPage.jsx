import React, {useEffect, useRef, useState} from "react";
import './MainPage.css'
import Slider from '@mui/material/Slider';
import main from '../../assets/btc-illustration.svg'
import bgMain1 from '../../assets/background-item-1.svg'
import bgMain2 from '../../assets/background-item-2.svg'
import bgMain3 from '../../assets/background-item-3.svg'
import bgMain4 from '../../assets/background-item-4.svg'
import bitcoin from '../../assets/coin-1.svg'
import ethereum from '../../assets/coin-2.svg'
import tether from '../../assets/coin-3.svg'
import bnb from '../../assets/coin-4.svg'
import xrp from '../../assets/xrp.svg'
import ada from '../../assets/ada.svg'
import doge from '../../assets/doge.svg'
import trx from '../../assets/trx.svg'
import sol from '../../assets/solana.svg'
import result1 from '../../assets/result.png'
import result2 from '../../assets/result2.png'
import gpu from '../../assets/gpu-illustration.svg'
import info1 from '../../assets/bitcoin-graph.svg'
import info2 from '../../assets/statistics.svg'
import info3 from '../../assets/coin-table.svg'
import {Link, useNavigate} from "react-router-dom";


const MainPage = () => {

    const coins = [
        {
            id: 1,
            symbol: 'BTC',
            name: 'Bitcoin',
            lastPrice: '21,271.8513',
            h24: '-2.03',
            marketCap: '408,837,889,073',
            icon: bitcoin
        },
        {
            id: 2,
            symbol: 'ETH',
            name: 'Ethereum',
            lastPrice: '1,589.7659',
            h24: '2.67',
            marketCap: '193,990,613,440',
            icon: ethereum
        },
        {id: 3, symbol: 'TRX', name: 'Tron', lastPrice: '0.0626', h24: '0.17', marketCap: '577,333,340,2', icon: trx},
        {
            id: 4,
            symbol: 'BNB',
            name: 'BNB',
            lastPrice: '300.0817',
            h24: '-0.14',
            marketCap: '428,571,939,42',
            icon: bnb
        },
        {
            id: 5,
            symbol: 'SOL',
            name: 'Solana',
            lastPrice: '23.6022',
            h24: '1.42',
            marketCap: '857,132,380,9',
            icon: sol
        },
        {id: 6, symbol: 'XRP', name: 'XRP', lastPrice: '0.3911', h24: '1.76', marketCap: '196,736,617,18', icon: xrp},
        {
            id: 7,
            symbol: 'ADA',
            name: 'Cardano',
            lastPrice: '0.3533',
            h24: '1.54',
            marketCap: '123,833,649,07',
            icon: ada
        },
        {
            id: 8,
            symbol: 'DOGE',
            name: 'Dogecoin',
            lastPrice: '0.0847',
            h24: '-0.42',
            marketCap: '115,919,477,23',
            icon: doge
        },
    ]
    const [investInput, setInvestInput] = useState('1500')
    const [percent, setPercent] = useState(10)
    const ref1week = useRef(null)
    const ref2weeks = useRef(null)
    const ref1month = useRef(null)
    const ref3month = useRef(null)
    const navigate = useNavigate()
    const handleClickNavigate = () => {
        navigate('/auth/login')
    }

    const handleInvest = (period) => {
        ref1week.current.className = 'invest-period'
        ref2weeks.current.className = 'invest-period'
        ref1month.current.className = 'invest-period'
        ref3month.current.className = 'invest-period'
        if (period === '1week') {
            ref1week.current.className = 'invest-period-selected'
            setPercent(10)
        } else if (period === '2weeks') {
            ref2weeks.current.className = 'invest-period-selected'
            setPercent(25)
        } else if (period === '1month') {
            ref1month.current.className = 'invest-period-selected'
            setPercent(70)
        } else if (period === '3month') {
            ref3month.current.className = 'invest-period-selected'
            setPercent(250)
        }
    }


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='main-page'>
            <div className='main-section'>
                <div className='main-container'>
                    <div className='main-text'>
                        <div className='main-tetx'>Buy & Sell Digital Assets In The Algorax</div>
                        <div className='submain-tetx'>Algorax is the easiest,
                            safest, and fastest way to buy & sell crypto asset exchange.
                        </div>
                        <Link to='/auth/Login'>
                            <div style={{width: 200, borderRadius: 50}} className='login-button'>Get started now</div>
                        </Link>
                    </div>
                    <img className='main-text' src={main} alt=''/>
                    <img className='bg-main1' src={bgMain1} alt=''/>
                    <img className='bg-main2' src={bgMain2} alt=''/>
                </div>
            </div>

            <div className='coins-section'>
                <div style={{display: "flex", alignItems: "center"}}>
                    <div style={{backgroundColor: 'hsl(222, 100%, 61%)', borderRadius: 30, padding: '5px 15px'}}
                         className='coins-section-text'>Crypto
                    </div>
                    <div className='coins-section-text'>DeFi</div>
                    <div className='coins-section-text'>Metaverse</div>
                    <div className='coins-section-text'>Markeplace</div>
                </div>
                <div style={{borderColor: 'hsl(225, 15%, 16%)', marginTop: 18, marginBottom: 18}}
                     className="wallet-convert-line-horizontal"/>
                <div className='coins-main'>
                    <div className='coin-item' onClick={handleClickNavigate}>
                        <div style={{display: "flex"}}>
                            <img style={{width: 24}} src={bitcoin} alt=''/>
                            <div style={{marginLeft: 10, marginRight: 10,}} className='main-coin-name'>Bitcoin</div>
                            <div style={{color: '#979aa1',}}>BTC/USDT</div>
                        </div>
                        <div style={{fontSize: '1.5rem', marginTop: 5, marginBottom: 10}}>
                            USD 21,271.85
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <div style={{color: '#979aa1'}}>21,139.85</div>
                            <div style={{
                                backgroundColor: 'hsl(0, 64%, 52%)',
                                borderRadius: 30,
                                padding: '2px 8px',
                                marginLeft: 10
                            }}>-0.79%
                            </div>
                        </div>
                    </div>


                    <div className='coin-item' onClick={handleClickNavigate}
                         style={{background: 'hsla(230, 16%, 22%, 0.5)'}}>
                        <div style={{display: "flex"}}>
                            <img style={{width: 24}} src={ethereum} alt=''/>
                            <div style={{marginLeft: 10, marginRight: 10}} className='main-coin-name'>Ethereum</div>
                            <div style={{color: '#979aa1',}}>ETC/USDT</div>
                        </div>
                        <div style={{fontSize: '1.5rem', marginTop: 5, marginBottom: 10}}>
                            USD 1,363.76
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <div style={{color: '#979aa1'}}>1,589.76</div>
                            <div style={{
                                backgroundColor: 'hsl(142, 43%, 54%)',
                                borderRadius: 30,
                                padding: '2px 8px',
                                marginLeft: 10
                            }}>+10.55%
                            </div>
                        </div>
                    </div>


                    <div className='coin-item' onClick={handleClickNavigate}>
                        <div style={{display: "flex"}}>
                            <img style={{width: 24}} src={tether} alt=''/>
                            <div style={{marginLeft: 10, marginRight: 10,}} className='main-coin-name'>Tether</div>
                            <div style={{color: '#979aa1',}}>USDT/USD</div>
                        </div>
                        <div style={{fontSize: '1.5rem', marginTop: 5, marginBottom: 10}}>
                            USD 1.00
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <div style={{color: '#979aa1'}}>1.01</div>
                            <div style={{
                                backgroundColor: 'hsl(0, 64%, 52%)',
                                borderRadius: 30,
                                padding: '2px 8px',
                                marginLeft: 10
                            }}>-0.01%
                            </div>
                        </div>
                    </div>


                    <div className='coin-item' onClick={handleClickNavigate}>
                        <div style={{display: "flex"}}>
                            <img style={{width: 24}} src={bnb} alt=''/>
                            <div style={{marginLeft: 10, marginRight: 10,}} className='main-coin-name'>BNB</div>
                            <div style={{color: '#979aa1',}}>BNB/USDT</div>
                        </div>
                        <div style={{fontSize: '1.5rem', marginTop: 5, marginBottom: 10}}>
                            USD 300.08
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <div style={{color: '#979aa1'}}>293.65</div>
                            <div style={{
                                backgroundColor: 'hsl(0, 64%, 52%)',
                                borderRadius: 30,
                                padding: '2px 8px',
                                marginLeft: 10
                            }}>-1.24%
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='market-section'>
                <div style={{display: "flex", alignItems: "center"}}>
                    <div className='market-tetx'>Market Update</div>
                    <div className='see-all-coins' onClick={handleClickNavigate}>See all Coins</div>
                </div>
                <div className='scroll'>
                    <div style={{display: "flex", alignItems: "center", marginTop: 15, marginBottom: 40}}>
                        <div className='main-blue-button'>View all</div>
                        <div className='market-section-text'>Metaverse</div>
                        <div className='market-section-text'>Entertainment</div>
                        <div className='market-section-text'>Energy</div>
                        <div className='market-section-text'>NFT</div>
                        <div className='market-section-text'>Gaming</div>
                        <div className='market-section-text'>Music</div>
                    </div>
                    <div className='market-main'>
                        <div className='market-main-header'>
                            <div className='market-item-shtr'>#</div>
                            <div className='market-item-name'>Name</div>
                            <div className='market-item' style={{width: 140}}>Last Price</div>
                            <div className='market-item' style={{width: 70}}>24h %</div>
                            <div className='market-item-market'>Market Cap</div>
                            <div className='market-item' style={{width: 140}}>Last 7 Days</div>
                            <div style={{width: 72.6, marginRight: '2%'}}/>
                        </div>
                        <div style={{borderColor: 'white', borderWidth: '2px', marginTop: 10}}
                             className="wallet-convert-line-horizontal"/>
                        <div>
                            {coins.map((item) => (
                                <div className='market-main-container' key={item.id}>
                                    <div className='market-main-item'>
                                        <div className='market-item-shtr'>{item.id}</div>
                                        <div className='market-item-name'>
                                            <img style={{width: 24}}
                                                 src={item.icon}
                                                 alt=''/>
                                            <div className='market-name' style={{
                                                marginLeft: 10,
                                                marginRight: 10,
                                                cursor: "pointer",
                                                transitionDuration: '0.5s'
                                            }}>
                                                {item.name}
                                            </div>
                                            <div style={{
                                                fontSize: 14,
                                                color: '#979aa1',
                                                marginTop: 3
                                            }}>{item.symbol}</div>
                                        </div>
                                        <div className='market-item' style={{width: 140}}>
                                            $ {item.lastPrice}
                                        </div>
                                        <div className='market-item' style={{width: 70, fontWeight: "normal"}}>
                                            {item.h24 > 0
                                                ?
                                                <div style={{color: 'hsl(142, 43%, 54%)'}}>
                                                    +{item.h24}%
                                                </div>
                                                :
                                                <div style={{color: 'hsl(0, 64%, 52%)'}}>
                                                    {item.h24}%
                                                </div>
                                            }
                                        </div>
                                        <div className='market-item-market'>
                                            $ {item.marketCap}
                                        </div>
                                        <div className='market-item' style={{width: 140}}>
                                            {item.h24 > 0
                                                ?
                                                <img src={result1} alt='result1'/>
                                                :
                                                <img src={result2} alt='result2'/>
                                            }
                                        </div>
                                        <button className='market-button' onClick={handleClickNavigate}>
                                            Trade
                                        </button>
                                    </div>
                                    <div style={{borderColor: 'hsl(225, 15%, 16%)'}}
                                         className="wallet-convert-line-horizontal"/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className='why-section'>
                <div className='why-container'>
                    <img className='main-text' src={gpu} alt=''/>
                    <div className='main-text'>
                        <div className='main-tetx'>Why you should choose
                            Algorax
                        </div>
                        <div className='submain-tetx'>Experience the next
                            generation cryptocurrency platform. No financial borders, extra fees, and fake reviews.
                        </div>
                        <div style={{width: 200, borderRadius: 50, marginLeft: "auto", marginRight: "44%"}}
                             className='login-button' onClick={handleClickNavigate}>Learn more
                        </div>
                    </div>
                    <img className='bg-main3' src={bgMain3} alt=''/>
                    <img className='bg-main4' src={bgMain4} alt=''/>
                </div>
            </div>

            <div className='invest-section'>
                <div className='invest-container'>
                    <div className='invest-text'>
                        <div style={{textAlign: "center"}} className='main-tetx'>Check how much you can earn
                        </div>
                        <div className='submain-tetx'>
                            Let’s check how much you will earn with us
                        </div>
                    </div>
                    <div className='invest-main-main'>
                        <div>Deposit amount</div>
                        <div style={{display: "flex"}}>
                            <input
                                value={investInput} onChange={(e) => {
                                if (Number(investInput) > 30000) {
                                    setInvestInput('30000')
                                } else {
                                    setInvestInput(e.target.value)
                                }
                            }}
                                type='number' className='invest-main-input' max={30000}/>
                            <div>$</div>
                        </div>
                        <Slider track={"normal"} value={investInput} onChange={(e) => setInvestInput(e.target.value)}
                                min={0} max={30000} step={1}
                                className='slider-main'/>
                        <div style={{textAlign: "center"}}>Select the investment period</div>
                        <div className='invest-button-period'>
                            <div className='button-invest'>
                                <div onClick={() => handleInvest('1week')} ref={ref1week}
                                     className='invest-period-selected'>1 week
                                </div>
                                <div onClick={() => handleInvest('2weeks')} ref={ref2weeks} className='invest-period'>2
                                    weeks
                                </div>
                            </div>
                            <div className='button-invest'>
                                <div onClick={() => handleInvest('1month')} ref={ref1month} className='invest-period'>1
                                    month
                                </div>
                                <div onClick={() => handleInvest('3month')} ref={ref3month} className='invest-period'>3
                                    month
                                </div>
                            </div>
                        </div>
                        <div className='invest-profit-main'>
                            <div className='invest-profit-item'
                                 style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <div>Your profit</div>
                                <div>+{(Number(investInput) * (percent / 100)).toFixed()} $</div>
                            </div>
                            <div className='invest-profit-item'
                                 style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <div>Total</div>
                                <div>{(Number(investInput) * (percent / 100) + Number(investInput)).toFixed()} $</div>
                            </div>
                            <div className='invest-profit-item'
                                 style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <div>Percentage</div>
                                <div>{percent}%</div>
                            </div>
                        </div>
                        <div style={{width: 200, borderRadius: 50,}}
                             className='login-button maim' onClick={handleClickNavigate}>Invest now
                        </div>
                    </div>
                </div>
            </div>

            <div className='info-section'>
                <div className='market-tetxx info-button'>Market sentiments, portfolio, and run the infrastructure of
                    your choice
                </div>
                <div className='info-container'>
                    <div className='info-text'>
                        <div className='main-tetx'>Invest Smart
                        </div>
                        <div className='submain-tetx'>Get full statistic
                            information about the behaviour of buyers and sellers will help you to make the decision.
                        </div>
                        <div style={{width: 200, borderRadius: 50,}}
                             className='login-button info-button' onClick={handleClickNavigate}>Learn more
                        </div>
                    </div>
                    <img className='info-image' src={info1} alt=''/>
                </div>
                <div className='info-container info-container2'>
                    <img className='info-image info-image2' src={info2} alt=''/>
                    <div className='info-text info-text2'>
                        <div className='main-tetx'>Detailed Statistics
                        </div>
                        <div className='submain-tetx'>View all mining related
                            information in realtime, at any point at any location and decide which polls you want to
                            mine in.
                        </div>
                        <div style={{width: 200, borderRadius: 50}}
                             className='login-button info-button' onClick={handleClickNavigate}>Learn more
                        </div>
                    </div>
                    <img className='info-image22' src={info2} alt=''/>
                </div>
                <div className='info-container'>
                    <div className='info-text'>
                        <div className='main-tetx'>Grow your profit and
                            track your investments
                        </div>
                        <div className='submain-tetx'>Use advanced analytical
                            tools. Clear TradingView charts let you track current and historical profit investments.
                        </div>
                        <div style={{width: 200, borderRadius: 50}}
                             className='login-button info-button' onClick={handleClickNavigate}>Learn more
                        </div>
                    </div>
                    <img className='info-image' src={info3} alt=''/>
                </div>
            </div>
        </div>
    )
}


export default MainPage