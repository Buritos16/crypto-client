import React from "react";
import {TechnicalAnalysis} from "react-tradingview-embed";




const TechnicalAnalys = () => {
    return (
        <div style={{width: '97%', marginLeft: "auto", marginRight: "auto", marginTop: 20}}>
            <div style={{width: '100%', border: 'solid 1px grey', backgroundColor: '#272a31'}}>
                <TechnicalAnalysis widgetProps={{
                    "interval": "1m",
                    "width": "300px",
                    "height": "300px",
                    "symbol": "BINANCE:LTCUSDT",
                    "showIntervalTabs": true,
                    "locale": "en",
                    "colorTheme": "dark",
                    "isTransparent": true,
                }} widgetPropsAny={{
                    "interval": "1m",
                    "width": "300px",
                    "height": "300px",
                    "symbol": "BINANCE:LTCUSDT",
                    "showIntervalTabs": true,
                    "locale": "en",
                    "colorTheme": "dark",
                    "isTransparent": true,
                }}/>
            </div>
        </div>
    )
}

export default TechnicalAnalys