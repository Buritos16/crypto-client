import React, {useEffect} from "react";
import {CryptocurrencyMarket} from "react-tradingview-embed";

const MarketCap = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div style={{width: '97%', marginLeft: "auto", marginRight: "auto", marginTop: 20, marginBottom: 100}}>
            <div style={{width: '100%', border: 'solid 1px grey', backgroundColor: '#272a31'}}>
                <CryptocurrencyMarket widgetProps={{
                    "width": "100%",
                    "height": "1000",
                    "defaultColumn": "overview",
                    "screener_type": "crypto_mkt",
                    "displayCurrency": "BTC",
                    "colorTheme": "dark",
                    "locale": "en",
                    "isTransparent": true
                }}/>
            </div>
        </div>
    )
}

export default MarketCap