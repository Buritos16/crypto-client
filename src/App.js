import React, {useEffect} from "react";
import './App.css'
import {Routes, Route, useLocation} from "react-router-dom";
import {ToastContainer, Flip} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe} from "./slices/auth";
import {setCoin, setCoinsInfoRapidApi} from "./slices/trading";

import Deposit from "./scenes/Deposit/Deposit";
import TradingContainer from "./scenes/Trading/TradingContainer";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MarketCap from "./scenes/Tools/MarketCap";
import MarketScreener from "./scenes/Tools/MarketScreener";
import CrossRates from "./scenes/Tools/CrossRates";
import CurrencyMap from "./scenes/Tools/CurrencyMap";
import Invest from "./scenes/Invest/Invest";
import P2P from "./scenes/P2P/P2P";
import Swap from "./scenes/Swap/Swap";
import Login from "./scenes/Login/Login";
import Register from "./scenes/Register/Register";
import Wallet from "./scenes/Wallet/Wallet";
import Withdraw from "./scenes/Withdraw/Withdraw";
import Transactions from "./scenes/Transactions/Transactions";
import Transfer from "./scenes/Transfer/Transfer";
import API from "./scenes/API/API";
import Settings from "./scenes/Settings/Settings";
import Verification from "./scenes/Verification/Verification";
import MainPage from "./scenes/MainPage/MainPage";
import HeaderMain from "./components/HeaderMain/HeaderMain";
import Term from "./scenes/Terms/Term";
import Privacy from "./scenes/Terms/Privacy";
import Cookies from "./scenes/Terms/Cookies";
import AMLKYC from "./scenes/Terms/AMLKYC";
import Loader from "./components/Loader/Loader";


const App = () => {

    let location = useLocation();
    const dispatch = useDispatch()
    const coins = useSelector(state => state.trading.coins)
    const loading = useSelector(state => state.auth.status)
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '997b63aad1msh6769ef16d1e96a9p16da8cjsnf624079ee119',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };

    useEffect(() => {

        dispatch(fetchAuthMe())

        if (!location.pathname.includes('trading')) {
            dispatch(setCoin('BTC'))
        }

        fetch(`https://coinranking1.p.rapidapi.com/coins?symbols=${coins}&limit=135`, options)
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch(setCoinsInfoRapidApi(result))
                },
            )
    }, [])

    if(loading === 'loading') return <div className='app-loader'><Loader /></div>
    return (
        <div className="app">
            {location.pathname !== '/' && location.pathname !== '/auth/login' && location.pathname !== '/auth/register' &&
                <Header location={location}/>}
            {location.pathname === '/' && <HeaderMain/>}
            <div className="routes">
                <Routes>
                    <Route exact path="/" element={<MainPage/>}/>
                    <Route exact path="/trading" element={<TradingContainer/>}/>
                    <Route exact path="/tools/cap" element={<MarketCap/>}/>
                    <Route exact path="/tools/screener" element={<MarketScreener/>}/>
                    <Route exact path="/tools/rates" element={<CrossRates/>}/>
                    <Route exact path="/tools/map" element={<CurrencyMap/>}/>
                    <Route exact path="/profile/invest" element={<Invest location={location}/>}/>
                    <Route exact path="/p2p" element={<P2P/>}/>
                    <Route exact path="/profile/wallet" element={<Wallet location={location}/>}/>
                    <Route exact path="/profile/deposit" element={<Deposit location={location}/>}/>
                    <Route exact path="/profile/withdraw" element={<Withdraw location={location}/>}/>
                    <Route exact path="/profile/transactions" element={<Transactions location={location}/>}/>
                    <Route exact path="/profile/convert" element={<Swap/>}/>
                    <Route exact path="/profile/transfer" element={<Transfer location={location}/>}/>
                    <Route exact path="/profile/api" element={<API location={location}/>}/>
                    <Route exact path="/profile/settings" element={<Settings location={location}/>}/>
                    <Route exact path="/profile/verification" element={<Verification/>}/>
                    <Route exact path="/auth/login" element={<Login/>}/>
                    <Route exact path="/auth/register" element={<Register/>}/>
                    <Route exact path="/terms" element={<Term/>}/>
                    <Route exact path="/privacy" element={<Privacy/>}/>
                    <Route exact path="/cookies" element={<Cookies/>}/>
                    <Route exact path="/alm&kyc" element={<AMLKYC/>}/>
                </Routes>
            </div>
            <Footer/>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="colored"
                transition={Flip}
            />
        </div>
    )
}

export default App;