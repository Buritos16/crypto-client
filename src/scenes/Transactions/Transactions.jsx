import React, {useEffect} from "react";
import './Transactions.css'
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import {useSelector} from "react-redux";
import Loader from "../../components/Loader/Loader";
import {selectIsAuth} from "../../slices/auth";
import {Navigate} from "react-router-dom";
import ProfileHeaderMobile from "../ProfileHeader/ProfileHeaderMobile";

const Transactions = ({location}) => {
    const isAuth = useSelector(selectIsAuth)
    const data = useSelector(state => state.auth.data)
    const loading = useSelector(state => state.auth.status)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    if (!isAuth) {
        return <Navigate to='/auth/login'/>
    }
    return (
        <div className='transactions'>
            <ProfileHeader location={location}/>
            <ProfileHeaderMobile location={location}/>
            {loading !== 'loading' &&
                <div className='transactions-main'>
                    <div style={{
                        padding: '20px 25px',
                        fontSize: 17,
                        fontWeight: "bold",
                        color: "white",
                        marginRight: "auto"
                    }}>Transaction history
                    </div>
                    <div style={{width: '100%'}} className="wallet-convert-line-horizontal"/>

                    <div className='transactions-over'>
                        <div className='transactions-header'>
                            <div style={{width: 100}}>Transaction ID</div>
                            <div style={{width: 150}}>Time</div>
                            <div style={{width: 100}}>Type</div>
                            <div style={{width: 100}}>Amount</div>
                            <div style={{width: 100}}>Status</div>
                        </div>
                        {data?.transactionHistory?.length
                            ?
                            <div className='transactions-data'>
                                {data?.transactionHistory?.map((item) => {

                                    let date = new Date(item.time)
                                    let Y = date.getFullYear().toString()
                                    let M = (date.getMonth() + 1).toString()
                                    if (date.getMonth() < 10) {
                                        M = `0${date.getMonth() + 1}`
                                    }
                                    let D = (date.getDate()).toString()
                                    if (date.getDate() < 10) {
                                        D = `0${date.getDate()}`
                                    }
                                    let h = date.getHours().toString()
                                    if (date.getHours() < 10) {
                                        h = `0${date.getHours()}`
                                    }
                                    let m = date.getMinutes().toString()
                                    if (date.getMinutes() < 10) {
                                        m = `0${date.getMinutes()}`
                                    }
                                    let s = date.getSeconds().toString()
                                    if (date.getSeconds() < 10) {
                                        s = `0${date.getSeconds()}`
                                    }
                                    let data = `${D}.${M}.${Y} ${h}:${m}:${s}`

                                    return (
                                        <div className='transaction-item' style={
                                            item.status === 'Canceled' ? {backgroundColor: '#15161b'} : {}
                                        }>
                                            <div
                                                style={{width: 100}}>#{item?._id?.replace(/\D/g, '')?.slice(6) || ''}</div>
                                            <div style={{width: 150}}>{data}</div>
                                            <div style={{width: 100}}>{item?.transactionType}</div>
                                            <div style={{width: 100}}>{item?.amount} {item?.coin}</div>
                                            <div style={{width: 100, color: `${item?.color}`}}>{item?.status}</div>
                                        </div>
                                    )
                                })}
                            </div>
                            :
                            <div style={{padding: 30}}>No data</div>}
                    </div>
                </div>}
            {
                loading === 'loading' &&
                <div className='loader-container'>
                    <Loader/>
                </div>
            }
        </div>
    )
}

export default Transactions