import React, {useEffect} from "react";
import {ForexCrossRates} from "react-tradingview-embed";

const CrossRates = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div style={{width: '97%', marginLeft: "auto", marginRight: "auto", marginTop: 20, marginBottom: 100}}>
            <div style={{width: '100%', border: 'solid 1px grey', backgroundColor: '#272a31'}}>
                <ForexCrossRates widgetProps={{
                    "width": "100%",
                    "height": "1000",
                    "currencies": [
                        "EUR",
                        "USD",
                        "JPY",
                        "GBP",
                        "CHF",
                        "AUD",
                        "CAD",
                        "NZD",
                        "CNY",
                        "TRY",
                        "SEK",
                        "NOK",
                        "DKK",
                        "ZAR",
                        "HKD"
                    ],
                    "isTransparent": true,
                    "colorTheme": "dark",
                    "locale": "en"
                }}/>
            </div>
        </div>
    )
}

export default CrossRates