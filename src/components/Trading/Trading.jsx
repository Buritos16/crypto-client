import React, {memo} from "react";
import {useSelector} from "react-redux";
import Chart from "./Chart";
const { commas } = require('number-prettier')

const Trading = memo(({symbolPrice, coin}) => {

    const orderBookAsks = useSelector(state => state.trading.orderBookAsks)
    const orderBookBids = useSelector(state => state.trading.orderBookBids)

    let date = new Date(1672263523890)
    let Y = date.getFullYear().toString().slice(2)
    let M = (date.getMonth() + 1).toString()
    let h = date.getHours().toString()
    let m = date.getMinutes().toString()
    let data = `${M}.${Y} ${h}:${m}`


    return (
        <>
            <div>
                {coin}
            </div>
            <div style={{marginBottom: '50px'}}>
                {symbolPrice}
            </div>

            <div style={{display: "inline-block", marginRight: '4%'}}>
                {orderBookAsks.map((element) => (
                    <div style={{
                        color: 'red',
                        fontWeight: 400,
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '12px'
                    }}>
                        {commas(Number(element[0]).toFixed(2))}
                    </div>
                ))}
            </div>
            <div style={{display: "inline-block", marginRight: '4%'}}>
                {orderBookAsks.map((element) => (
                    <div style={{
                        fontWeight: 400,
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '12px'
                    }}>{parseFloat(element[1])}</div>
                ))}
            </div>
            <div
                style={{display: "inline-block", marginRight: '4%',}}>
                {orderBookAsks.map((element) => (
                    <div style={{
                        fontWeight: 400,
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '12px',
                        textAlign: "right"
                    }}>{commas((Number(element[0]) * Number(element[1])).toFixed(5))}</div>
                ))}
            </div>
            <Chart coin={coin}/>
        </>
    )
})

export default Trading