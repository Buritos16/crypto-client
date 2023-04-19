import React, {useEffect, useState} from "react";
import './API.css'
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {deleteApiKeys, patchApiKeys, selectIsAuth, setApiKeys} from "../../slices/auth";
import {DeleteOutlined} from "@ant-design/icons";
import {Navigate} from "react-router-dom";
import ProfileHeaderMobile from "../ProfileHeader/ProfileHeaderMobile";

const API = ({location}) => {
    const isAuth = useSelector(selectIsAuth)

    const dispatch = useDispatch()
    const userData = useSelector(state => state.auth.data)

    const makeApi = (length) => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const [data, setData] = useState(false)
    const [withdraw, setWithdraw] = useState(false)
    const [spot, setSpot] = useState(false)
    const [margin, setMargin] = useState(false)

    const toastStyle = {
        className: "toast",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
    }

    const handleClickApi = () => {
        if (!data && !withdraw && !spot && !margin) {
            toast.warning('Please, choose permission type', toastStyle)
            return
        }
        const key = `${makeApi(8)}-${makeApi(8)}-${makeApi(8)}-${makeApi(8)}`
        dispatch(setApiKeys({
            key: key,
            read: data,
            withdraw: withdraw,
            spot: spot,
            margin: margin,
        }))
        dispatch(patchApiKeys())
        toast.success('API key created!', toastStyle)
    }

    const handleClickDeleteApi = (key) => {
        const array = [...userData.apiKeys]
        const index = array.findIndex(i => i.key === key)
        array.splice(index, 1)
        dispatch(deleteApiKeys(array))
        dispatch(patchApiKeys())
        toast.success('API key deleted!', toastStyle)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    if (!isAuth) {
        return <Navigate to='/auth/login'/>
    }
    return (
        <div className='api-container'>
            <ProfileHeader location={location}/>
            <ProfileHeaderMobile location={location}/>
            <div className='api-main'>
                <div style={{
                    padding: '20px 25px',
                    fontSize: 17,
                    fontWeight: "bold",
                    color: "white",
                    marginRight: "auto"
                }}>Create API key
                </div>
                <div className="wallet-convert-line-horizontal"/>
                <div style={{display: "flex", padding: '20px 25px', alignSelf: "flex-start"}}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div style={{display: "flex", margin: 5}}>
                            <input
                                defaultChecked={data}
                                onChange={() => {
                                    setData(!data)
                                }}
                                type='checkbox'/>
                            <div style={{marginLeft: 5}}>Read data</div>
                        </div>
                        <div style={{display: "flex", margin: 5}}>
                            <input
                                defaultChecked={spot}
                                onChange={() => {
                                    setSpot(!spot)
                                }}
                                type='checkbox'/>
                            <div style={{marginLeft: 5}}>Spot trading</div>
                        </div>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", marginLeft: 35}}>
                        <div style={{display: "flex", margin: 5}}>
                            <input
                                defaultChecked={withdraw}
                                onChange={() => {
                                    setWithdraw(!withdraw)
                                }}
                                type='checkbox'/>
                            <div style={{marginLeft: 5}}>Withdraw balance</div>
                        </div>
                        <div style={{display: "flex", margin: 5}}>
                            <input
                                defaultChecked={margin}
                                onChange={() => {
                                    setMargin(!margin)
                                }}
                                type='checkbox'/>
                            <div style={{marginLeft: 5}}>Margin trading</div>
                        </div>
                    </div>
                </div>
                <div
                    onClick={handleClickApi}
                    className='wallet-button api-button'> Create API key
                </div>
            </div>
            <div className='api-main'>
                <div style={{
                    padding: '20px 25px',
                    fontSize: 17,
                    fontWeight: "bold",
                    color: "white",
                    marginRight: "auto"
                }}>Your API Keys
                </div>
                <div className="wallet-convert-line-horizontal"/>
                <div className='api-content' style={{width: '100%'}}>
                    <div className='api-header'>
                        <div style={{width: 300}}>Key</div>
                        <div style={{width: 300}}>Permission</div>
                        <div style={{width: 100}}>Action</div>
                    </div>
                    {userData?.apiKeys?.length
                        ?
                        <div className='api-data'>
                            {userData.apiKeys.map((item) => {
                                return (
                                    <div style={{
                                        backgroundColor: '#15161b',
                                        display: 'flex',
                                        alignItems: "center",
                                        padding: '20px 10px',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        marginBottom: 5
                                    }}>
                                        <div style={{width: 300}}>{item.key}</div>
                                        <div style={{width: 300, display: "flex", justifyContent: 'flex-start'}}>
                                            {(item.read || item.withdraw) &&
                                                <div style={{display: "flex", flexDirection: "column", width: 170}}>
                                                    {item.read && <div>Read data</div>}
                                                    {item.withdraw && <div>Withdraw balance</div>}
                                                </div>
                                            }
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: 'flex-start'
                                            }}>
                                                {item.spot && <div>Spot trading</div>}
                                                {item.margin && <div>Margin trading</div>}
                                            </div>
                                        </div>
                                        <div
                                            onClick={() => handleClickDeleteApi(item.key)}
                                            className='api-delete'
                                            style={{width: 100, cursor: "pointer"}}>
                                            <DeleteOutlined/> Delete
                                        </div>
                                    </div>)
                            })}
                        </div>
                        :
                        <div className='api-no-data' style={{padding: 30}}>No data</div>}
                </div>
            </div>
        </div>
    )
}

export default API