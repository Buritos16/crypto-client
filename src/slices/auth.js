import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../axios'

export const fetchAuthLogin = createAsyncThunk('auth/fetchAuthLogin', async (params) => {
    const {data} = await axios.post('/auth/login', params)
    return data;
})

export const fetchAuthRegister = createAsyncThunk('auth/fetchAuthRegister', async (params) => {
    console.log('ye')
    const {data} = await axios.post('/auth/register', params)
    return data;
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const {data} = await axios.get('/auth/me')
    return data;
})

export const fetchCoins = createAsyncThunk('exchanges/fetchCoins', async (arg, {getState}) => {
    const state = getState()
    const {userData} = await axios.patch('/exchanges', state.auth.serverData)
    return userData;
})

export const fetchCoinsConvert = createAsyncThunk('exchanges/fetchCoinsConvert', async (arg, {getState}) => {
    const state = getState()
    const {data} = await axios.patch('/exchanges/convert', state.auth.data)
    return data;
})

export const patchApiKeys = createAsyncThunk('profile/patchApiKeys', async (arg, {getState}) => {
    const state = getState()
    const {data} = await axios.patch('/profile/api', state.auth.data)
    return data;
})

export const patchPersonalInformation = createAsyncThunk('profile/patchPersonalInformation', async (arg, {getState}) => {
    const state = getState()
    const {data} = await axios.patch('/profile/settings', state.auth.data)
    return data;
})

export const patchVerification = createAsyncThunk('profile/patchVerification', async (arg, {getState}) => {
    const state = getState()
    const {data} = await axios.patch('/profile/verification', state.auth.data)
    return data;
})

export const patchWallet = createAsyncThunk('profile/patchWallet', async (arg, {getState}) => {
    const state = getState()
    const {data} = await axios.patch('/profile/wallet', state.auth.data)
    return data;
})

export const patchTransactions = createAsyncThunk('profile/patchTransactions', async (arg, {getState}) => {
    const state = getState()
    const {data} = await axios.patch('/profile/transactions', state.auth.data)
    return data;
})

export const patchConvertHistory = createAsyncThunk('profile/patchConvertHistory', async (arg, {getState}) => {
    const state = getState()
    const {data} = await axios.patch('/profile/convert', state.auth.data)
    return data;
})

export const postSendBotMessage = createAsyncThunk('profile/postSendBotMessage', async (params) => {
    await axios.post('/bot', params)
})

const initialState = {
    data: [],
    serverData: [],
    status: 'loading',
    selectedCoin: '',
    depositInput: 0,
    openOrders: [],
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload
        },
        logout: (state) => {
            state.data = null
        },
        selectCoin: (state, action) => {
            state.selectedCoin = action.payload;
        },
        setDepositInput: (state, action) => {
            state.depositInput = Number(action.payload);
        },
        setCoinsData: (state) => {
            state.serverData.coins.map((element) => {
                if (element.name === state.selectedCoin)
                    return element.value += state.depositInput
            })
            state.selectedCoin = '';
        },
        convertCoinsData: (state, action) => {
            state.data.coins.map((element) => {
                if (element.name === action.payload.coinFrom.toLowerCase())
                    return element.value -= Number(action.payload.numberConvert)
            })
            state.data.coins.map((element) => {
                if (element.name === action.payload.coinTo.toLowerCase())
                    return element.value += Number(action.payload.numberConvertResult)
            })
        },
        setApiKeys: (state, action) => {
            state.data.apiKeys.unshift(action.payload)
        },
        deleteApiKeys: (state, action) => {
            state.data.apiKeys = action.payload
        },
        setPersonalInformation: (state, action) => {
            state.data.personalInformation = action.payload;
        },
        setVerification: (state, action) => {
            state.data.verified = action.payload;
        },
        setWallet: (state, action) => {
            if(!state.data.wallet.find(x => x.name === action.payload.selected)?.value) {
                state.data.wallet.unshift({name: action.payload.selected, value: action.payload.value})
            } else state.data.wallet.find(x => x.name === action.payload.selected).value = action.payload.value
        },
        setTransactions: (state, action) => {
            state.data.transactionHistory.unshift(action.payload)
        },
        updateOpenOrders: (state, action) => {
            state.openOrders.unshift(action.payload)
        },
        setOpenOrders: (state) => {
            state.openOrders = []
        },
        setHistoryOrders: (state, action) => {
            state.data.convertHistory.unshift(action.payload)
        },
    },
    extraReducers: {
        [fetchAuthLogin.pending]: (state) => {
            state.data = null;
            state.status = 'loading';
        },
        [fetchAuthLogin.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.serverData = action.payload;
            state.status = 'loaded';
        },
        [fetchAuthLogin.rejected]: (state) => {
            state.data = null;
            state.status = 'error';
        },
        [fetchAuthRegister.pending]: (state) => {
            state.data = null;
            state.status = 'loading';
        },
        [fetchAuthRegister.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.serverData = action.payload;
            state.status = 'loaded';
        },
        [fetchAuthRegister.rejected]: (state) => {
            state.data = null;
            state.status = 'error';
        },
        [fetchAuthMe.pending]: (state) => {
            state.data = null;
            state.status = 'loading';
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.serverData = action.payload;
            state.status = 'loaded';
        },
        [fetchAuthMe.rejected]: (state) => {
            state.data = null;
            state.status = 'error';
        },
        [fetchCoins.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchCoins.fulfilled]: (state) => {
            state.status = 'loaded';
        },
        [fetchCoins.rejected]: (state) => {
            state.status = 'error';
        },
        [fetchCoinsConvert.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchCoinsConvert.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        },
        [fetchCoinsConvert.rejected]: (state) => {
            state.status = 'error';
        },
        [patchApiKeys.pending]: (state) => {
            state.status = 'loading';
        },
        [patchApiKeys.fulfilled]: (state) => {
            state.status = 'loaded';
        },
        [patchApiKeys.rejected]: (state) => {
            state.status = 'error';
        },
        [patchPersonalInformation.pending]: (state) => {
            state.status = 'loading';
        },
        [patchPersonalInformation.fulfilled]: (state) => {
            state.status = 'loaded';
        },
        [patchPersonalInformation.rejected]: (state) => {
            state.status = 'error';
        },
        [patchVerification.pending]: (state) => {
            state.status = 'loading';
        },
        [patchVerification.fulfilled]: (state) => {
            state.status = 'loaded';
        },
        [patchVerification.rejected]: (state) => {
            state.status = 'error';
        },
        [patchWallet.pending]: (state) => {
            state.status = 'loading';
        },
        [patchWallet.fulfilled]: (state) => {
            state.status = 'loaded';
        },
        [patchWallet.rejected]: (state) => {
            state.status = 'error';
        },
        [patchTransactions.pending]: (state) => {
            state.status = 'loading';
        },
        [patchTransactions.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [patchTransactions.rejected]: (state) => {
            state.status = 'error';
        },
        [patchConvertHistory.pending]: (state) => {
            state.status = 'loading';
        },
        [patchConvertHistory.fulfilled]: (state) => {
            state.status = 'loaded';
        },
        [patchConvertHistory.rejected]: (state) => {
            state.status = 'error';
        },
    },
})

export const selectIsAuth = (state) => Boolean(state.auth.data?.email)

export const authReducer = authSlice.reducer

export const {
    logout,
    selectCoin,
    setDepositInput,
    setCoinsData,
    convertCoinsData,
    setApiKeys,
    deleteApiKeys,
    setPersonalInformation,
    setVerification,
    setWallet,
    setTransactions,
    updateOpenOrders,
    setOpenOrders,
    setHistoryOrders,
    setStatus
} = authSlice.actions