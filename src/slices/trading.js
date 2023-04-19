import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    coins: ["BTC","LTC","ETH","USDT","NEO","BNB","QTUM","EOS","BNT","ZRX","OMG","WTC","LRC","TRX","FUN","KNC","XVG","LINK","MTL","NULS","STX","ADX","ETC","ZEC","BAT","DASH","POWR","REQ","XMR","ENJ","XRP","STORJ","KMD","DATA","MANA","BTS","LSK","ADA","XLM","WAVES","ICX","ELF","AION","NEBL","RLC","IOST","STEEM","BLZ","SYS","ONT","ZIL","XEM","WAN","ZEN","THETA","IOTX","SC","KEY","MFT","DENT","ARDR","HOT","VET","DOCK","ONG","RVN","DCR","REN","FET","TFUEL","CELR","MATIC","ATOM","PHB","ONE","FTM","CHZ","COS","ALGO","DOGE","DUSK","ANKR","WIN","COCOS","PERL","TOMO","BUSD","BAND","BEAM","HBAR","XTZ","DGB","NKN","KAVA","CTXC","BCH","TROY","VITE","OGN","DREP","WRX","LTO","MBL","COTI","HIVE","SOL","CTSI","CHR","JST","FIO","STMX","MDT","PNT","COMP","IRIS","MKR","SXP","SNX","RUNE","AVA"],
    coinsTrading: ["BTC","LTC","ETH","NEO","BNB","QTUM","EOS","BNT","ZRX","OMG","WTC","LRC","TRX","FUN","KNC","XVG","LINK","MTL","NULS","STX","ADX","ETC","ZEC","BAT","DASH","POWR","REQ","XMR","ENJ","XRP","STORJ","KMD","DATA","MANA","BTS","LSK","ADA","XLM","WAVES","ICX","ELF","AION","NEBL","RLC","IOST","STEEM","BLZ","SYS","ONT","ZIL","XEM","WAN","ZEN","THETA","IOTX","SC","KEY","MFT","DENT","ARDR","HOT","VET","DOCK","ONG","RVN","DCR","REN","FET","TFUEL","CELR","MATIC","ATOM","PHB","ONE","FTM","CHZ","COS","ALGO","DOGE","DUSK","ANKR","WIN","COCOS","PERL","TOMO","BUSD","BAND","BEAM","HBAR","XTZ","DGB","NKN","KAVA","CTXC","BCH","TROY","VITE","OGN","DREP","WRX","LTO","MBL","COTI","HIVE","SOL","CTSI","CHR","JST","FIO","STMX","MDT","PNT","COMP","IRIS","MKR","SXP","SNX","RUNE","AVA"],
    coin: 'BTC',
    bigger: false,
    coinInfo: {
        price: '',
        hChange: '',
        hHigh: '',
        hLow: '',
        hVolumeFirst: '',
        hVolumeSecond: '',
    },
    hVolumeAll: [],
    orderBookAsks: [],
    orderBookBids: [],
    tradeHistory: [],
    coinsInfoRapidApi: [],
}

const tradingSlice = createSlice({
    name: 'trading',
    initialState,
    reducers: {
        setCoin: (state, action) => {
            state.coin = action.payload
        },
        setSymbolPrice: (state, action) => {
            state.price = action.payload
        },
        setOrderBookAsks: (state, action) => {
            state.orderBookAsks = action.payload
        },
        setOrderBookBids: (state, action) => {
            state.orderBookBids = action.payload
        },
        setTradeHistory: (state, action) => {
            state.tradeHistory = action.payload
        },
        addOrderBookAsks: (state, action) => {
            if(JSON.stringify(state.orderBookAsks[0]) !== JSON.stringify(action.payload)) {
                state.orderBookAsks.unshift(action.payload);
                state.orderBookAsks.pop()
            }
        },
        addOrderBookBids: (state, action) => {
            if(JSON.stringify(state.orderBookBids[0]) !== JSON.stringify(action.payload)) {
                state.orderBookBids.unshift(action.payload);
                state.orderBookBids.pop()
            }
        },
        addTradeHistory: (state, action) => {
            if(JSON.stringify(state.tradeHistory[0].id) !== JSON.stringify(action.payload[0].id)) {
                state.tradeHistory.unshift(action.payload[0]);
                state.tradeHistory.pop()
            }
        },
        setSymbol24h: (state, action) => {
            state.coinInfo.price = action.payload.lastPrice
            state.coinInfo.hChange = action.payload.priceChangePercent
            state.coinInfo.hHigh = action.payload.highPrice
            state.coinInfo.hLow = action.payload.lowPrice
            state.coinInfo.hVolumeFirst = action.payload.volume
            state.coinInfo.hVolumeSecond = action.payload.quoteVolume
        },
        setSymbolBigger: (state, action) => {
            state.bigger = Number(action.payload) > Number(state.coinInfo.price);
        },
        setVolumeAll: (state, action) => {
            state.hVolumeAll = action.payload;
        },
        setCoinsInfoRapidApi: (state, action) => {
            state.coinsInfoRapidApi = action.payload;
            state.coinsInfoRapidApi.data.coins.unshift({symbol: 'USDT', iconUrl: 'https://cdn.coinranking.com/mgHqwlCLj/usdt.svg'})
        },
    },
})

export const tradingReducer = tradingSlice.reducer

export const {
    setCoin,
    setSymbolBigger,
    setOrderBookAsks,
    setOrderBookBids,
    addOrderBookAsks,
    addOrderBookBids,
    setSymbol24h,
    setVolumeAll,
    setCoinsInfoRapidApi,
    setTradeHistory,
    addTradeHistory,
} = tradingSlice.actions