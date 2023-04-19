import React from "react";
import {CryptocurrencyMarket} from "react-tradingview-embed";


const MarketCap = () => {
    return (
        <div style={{width: '97%', marginLeft: "auto", marginRight: "auto", marginTop: 20}}>
            <div style={{width: '100%', border: 'solid 1px grey'}}>
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