import React, {memo} from "react";
import {AdvancedChart} from "react-tradingview-embed";

const Chart = memo(({coin}) => {


    return (
        <div style={{width: '100%'}}>
            <AdvancedChart widgetProps={{
                height: '400px',
                "symbol": `BINANCE:${coin}USDT`,
                "interval": "1",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1",
                "locale": "en",
                "range": "1D",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "hide_top_toolbar": true,
                "hide_legend": true,
                "hide_side_toolbar": true,
                "save_image": false,
                "container_id": "tradingview_0c001",
            }}/>
        </div>
    )
})

export default Chart