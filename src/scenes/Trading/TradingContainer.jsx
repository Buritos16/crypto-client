import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addOrderBookAsks, addOrderBookBids, addTradeHistory,
    setCoinsInfoRapidApi, setOrderBookAsks, setOrderBookBids,
    setSymbol24h, setSymbolBigger, setTradeHistory, setVolumeAll
} from "../../slices/trading";
import Trading from "./Trading";

const TradingContainer = () => {

    const dispatch = useDispatch()
    const coin = useSelector(state => state.trading.coin)
    const coins = useSelector(state => state.trading.coinsTrading)

    const array = coins.map(item => (`\"${item}USDT\"`))


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '997b63aad1msh6769ef16d1e96a9p16da8cjsnf624079ee119',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };


    useEffect(() => {
        fetch(`https://api.binance.com/api/v3/depth?symbol=${coin}USDT&limit=20`)
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch(setOrderBookAsks(result.asks))
                    dispatch(setOrderBookBids(result.bids))
                },
            )

        fetch(`https://api.binance.com/api/v1/ticker/24hr?symbols=[${array}]`)
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch(setVolumeAll(result))
                },
            )

        fetch(`https://api.binance.com/api/v3/trades?symbol=${coin}USDT&limit=40`)
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch(setTradeHistory(result))
                },
            )

        fetch(`https://coinranking1.p.rapidapi.com/coins?symbols=${coins}&limit=135`, options)
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch(setCoinsInfoRapidApi(result))
                },
            )

        let interval = setInterval(() => {
            fetch(`https://api.binance.com/api/v3/depth?symbol=${coin}USDT&limit=1`)
                .then(res => res.json())
                .then(
                    (result) => {
                        dispatch(addOrderBookBids(result.bids[0]))
                        dispatch(addOrderBookAsks(result.asks[0]))
                    },
                )
            fetch(`https://api.binance.com/api/v1/ticker/24hr?symbol=${coin}USDT`)
                .then(res => res.json())
                .then(
                    (result) => {
                        dispatch(setSymbolBigger(result.lastPrice))
                        dispatch(setSymbol24h(result))
                    },
                )
            fetch(`https://api.binance.com/api/v3/trades?symbol=${coin}USDT&limit=1`)
                .then(res => res.json())
                .then(
                    (result) => {
                        dispatch(addTradeHistory(result))
                    },
                )
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [coin]);


    return (
        <>
            <Trading coin={coin} coins={coins}/>
        </>
    )
}

export default TradingContainer