import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addOrderBookAsks, setCoin, setOrderBookAsks, setOrderBookBids} from "../slices/trading";
import Trading from "./Trading";

const TradingContainer = () => {
    const dispatch = useDispatch()
    const coin = useSelector(state => state.trading.coin)


    const price = useSelector(state => state.trading.price)

    const [symbolPriceLocal, setSymbolPriceLocal] = useState(price)

    const handleClick = () => {
        dispatch(setCoin('LTC'))
    }

    const handleClickE = () => {
        dispatch(setCoin('ETH'))
    }


    useEffect(() => {
        fetch(`https://api.binance.com/api/v3/depth?symbol=${coin}USDT&limit=19`)
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch(setOrderBookAsks(result.asks))
                    dispatch(setOrderBookBids(result.bids))

                },
            )


        let interval = setInterval(() => {
            fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${coin}USDT`)
                .then(res => res.json())
                .then(
                    (result) => {
                        setSymbolPriceLocal(result?.price)

                    },
                )
            fetch(`https://api.binance.com/api/v3/depth?symbol=${coin}USDT&limit=1`)
                .then(res => res.json())
                .then(
                    (result) => {
                        //console.log(result)
                        dispatch(addOrderBookAsks(result.asks[0]))
                    },
                )
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [coin]);




    return (
        <div>
            <div onClick={handleClick}>
                LTC
            </div>
            <div onClick={handleClickE}>
                ETH
            </div>
            <Trading symbolPrice={symbolPriceLocal} coin={coin}/>

        </div>
    )
}

export default TradingContainer