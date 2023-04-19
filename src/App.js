import React, {useEffect} from "react";
import {Routes, Route, useLocation} from "react-router-dom";
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe} from "./slices/auth";
import Deposit from "./components/Deposit/Deposit";
import TradingContainer from "./components/Trading/TradingContainer";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MarketCap from "./components/Tools/MarketCap";
import MarketScreener from "./components/Tools/MarketScreener";
import CrossRates from "./components/Tools/CrossRates";
import CurrencyMap from "./components/Tools/CurrencyMap";
import {setCoin, setCoinsInfoRapidApi} from "./slices/trading";
import Invest from "./components/Invest/Invest";
import P2P from "./components/P2P/P2P";
import Swap from "./components/Swap/Swap";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Wallet from "./components/Wallet/Wallet";
import Withdraw from "./components/Withdraw/Withdraw";
import Transactions from "./components/Transactions/Transactions";
import Transfer from "./components/Transfer/Transfer";
import API from "./components/API/API";
import Settings from "./components/Settings/Settings";
import Verification from "./components/Verification/Verification";
import MainPage from "./components/MainPage/MainPage";
import HeaderMain from "./components/HeaderMain/HeaderMain";
import Term from "./components/Terms/Term";
import Privacy from "./components/Terms/Privacy";
import Cookies from "./components/Terms/Cookies";
import AMLKYC from "./components/Terms/AMLKYC";


const App = () => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//code.tidio.co/oumch5ht438tgxgktyrwykazpi6lpscj.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);


    const dispatch = useDispatch()
    const coins = useSelector(state => state.trading.coins)


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '997b63aad1msh6769ef16d1e96a9p16da8cjsnf624079ee119',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };

    React.useEffect( () => {
        dispatch(fetchAuthMe())

        fetch(`https://coinranking1.p.rapidapi.com/coins?symbols=${coins}&limit=135`, options)
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch(setCoinsInfoRapidApi(result))
                },
            )


    }, [])

    let location = useLocation();

    useEffect(() => {
        if (!location.pathname.includes('trading')) {
            dispatch(setCoin('BTC'))
        }
    }, [])


    return (
        <div className="app">


            {location.pathname !== '/' && location.pathname !== '/auth/login' && location.pathname !== '/auth/register' && <Header location={location}/>}
            {location.pathname === '/' && <HeaderMain />}
            <div className="routes">
                <Routes>
                    <Route exact path="/" element={<MainPage />}/>
                    <Route exact path="/trading" element={<TradingContainer />}/>
                    <Route exact path="/tools/cap" element={<MarketCap />}/>
                    <Route exact path="/tools/screener" element={<MarketScreener />}/>
                    <Route exact path="/tools/rates" element={<CrossRates />}/>
                    <Route exact path="/tools/map" element={<CurrencyMap />}/>
                    <Route exact path="/profile/invest" element={<Invest location={location}/>}/>
                    <Route exact path="/p2p" element={<P2P />}/>
                    <Route exact path="/profile/wallet" element={<Wallet location={location}/>}/>
                    <Route exact path="/profile/deposit" element={<Deposit location={location}/>}/>
                    <Route exact path="/profile/withdraw" element={<Withdraw location={location}/>}/>
                    <Route exact path="/profile/transactions" element={<Transactions location={location}/>}/>
                    <Route exact path="/profile/convert" element={<Swap />}/>
                    <Route exact path="/profile/transfer" element={<Transfer location={location}/>}/>
                    <Route exact path="/profile/api" element={<API location={location}/>}/>
                    <Route exact path="/profile/settings" element={<Settings location={location}/>}/>
                    <Route exact path="/profile/verification" element={<Verification />}/>
                    <Route exact path="/auth/login" element={<Login />}/>
                    <Route exact path="/auth/register" element={<Register />}/>
                    <Route exact path="/terms" element={<Term />}/>
                    <Route exact path="/privacy" element={<Privacy />}/>
                    <Route exact path="/cookies" element={<Cookies />}/>
                    <Route exact path="/alm&kyc" element={<AMLKYC />}/>
                </Routes>
            </div>
            <Footer />
            <ToastContainer position="top-right"
                            autoClose={3000}
                            hideProgressBar
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable={false}
                            pauseOnHover
                            theme="colored"
                            transition={Flip}/>
        </div>
    )
}

export default App;