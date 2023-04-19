import React, {useState} from "react";
import {Button, Select, Typography} from "antd";
import {Link, useNavigate} from "react-router-dom";

import Address from "./Address";
import {useDispatch, useSelector} from "react-redux";
import {fetchCoins, selectCoin, setCoinsData, setDepositInput} from "../slices/auth";
import {CloseOutlined, FileTextOutlined, LeftOutlined, PlayCircleOutlined} from "@ant-design/icons";
import {myArray} from "../data";
import {useGetCryptosQuery} from "../services/cryptoApi";

const {Option} = Select
const {Text} = Typography


const Deposit = () => {


    const dispatch = useDispatch()
    const {data: cryptosList, isFetching} = useGetCryptosQuery(30);
    const inputValue = useSelector(state => state.auth.depositInput)
    const navigate = useNavigate()
    const handleOkDeposit = async () => {
        await dispatch(setCoinsData())
        await dispatch(fetchCoins())
        await dispatch(setDepositInput('0'))
        navigate('/exchanges')
    };

    const handleBackDeposit = () => {
        dispatch(setDepositInput('0'))
        dispatch(selectCoin(''))
        navigate('/exchanges')
        const date = new Date().toLocaleDateString("de-DE");
        console.log(date)
    }

    const handleCancelDeposit = () => {
        dispatch(setDepositInput('0'))
        dispatch(selectCoin(''))
    }

    const handleDisableDeposit = () => {
        return inputValue.toString() < 5;
    }

    function handleSelect(value) {
        dispatch(selectCoin(value))
    }

    return (
        <div className='Deposit'>
            <LeftOutlined onClick={handleBackDeposit} className='deposit-back' style={{
                marginLeft: '0%',
                marginTop: '2%',
                fontSize: '140%',
                padding: 2
            }}/>
            <Text style={{fontSize: '3vh', fontWeight: "bold", marginLeft: '0.6%'}}>Deposit Crypto</Text>
            <div style={{padding: '1%', marginTop: '2%', backgroundColor: "#f1efef", borderRadius: 15}}>
                <Text style={{
                    backgroundColor: "#1890ff",
                    paddingLeft: '0.9%',
                    paddingRight: '0.9%',
                    paddingTop: '0.3%',
                    paddingBottom: '0.3%',
                    borderRadius: 150,
                    color: "white",
                    marginLeft: '2%',
                }}>1</Text>
                <div style={{
                    position: 'relative',
                    display: 'inline-block',
                    borderTop: '4px solid #1890ff',
                    marginLeft: '0.6%',
                    marginRight: '0.6%',
                    width: '20.6%',
                    bottom: '0.4vh'
                }}/>
                <Text style={{
                    backgroundColor: "#1890ff",
                    paddingLeft: '0.8%',
                    paddingRight: '0.8%',
                    paddingTop: '0.3%',
                    paddingBottom: '0.3%',
                    borderRadius: 150,
                    color: "white"
                }}>2</Text>
                <div style={{
                    position: 'relative',
                    display: 'inline-block',
                    borderTop: '4px solid #1890ff',
                    marginLeft: '0.6%',
                    marginRight: '0.6%',
                    width: '13.5%',
                    bottom: '0.4vh'
                }}/>
                <Text style={{
                    backgroundColor: "#1890ff",
                    paddingLeft: '0.8%',
                    paddingRight: '0.8%',
                    paddingTop: '0.3%',
                    paddingBottom: '0.3%',
                    borderRadius: 150,
                    color: "white"
                }}>3</Text>
                <div style={{
                    position: 'relative',
                    display: 'inline-block',
                    borderTop: '4px solid #1890ff',
                    marginLeft: '0.6%',
                    marginRight: '0.6%',
                    width: '11.5%',
                    bottom: '0.4vh'
                }}/>
                <Text style={{
                    backgroundColor: "#1890ff",
                    paddingLeft: '0.8%',
                    paddingRight: '0.8%',
                    paddingTop: '0.3%',
                    paddingBottom: '0.3%',
                    borderRadius: 150,
                    color: "white"
                }}>4</Text>
                <div style={{
                    position: 'relative',
                    display: 'inline-block',
                    borderTop: '4px solid #1890ff',
                    marginLeft: '0.6%',
                    marginRight: '0.6%',
                    width: '15.5%',
                    bottom: '0.4vh'
                }}/>
                <Text style={{
                    backgroundColor: "#1890ff",
                    paddingLeft: '0.8%',
                    paddingRight: '0.8%',
                    paddingTop: '0.3%',
                    paddingBottom: '0.3%',
                    borderRadius: 150,
                    color: "white"
                }}>5</Text>
                <br/>
                <div style={{display: "inline-block", width: '22%', marginTop: '1%', marginLeft: '2%'}}>
                    <Text style={{display: "inline", fontSize: 14, fontWeight: "bold"}}>Copy address</Text>
                    <br/>
                    <Text style={{fontSize: 13, color: '707A89FF'}}>Choose the crypto and its network on this page, and
                        copy the deposit address.</Text>
                </div>
                <div style={{display: "inline-block", width: '15%', marginLeft: '2%'}}>
                    <Text style={{display: "inline", fontSize: 14, fontWeight: "bold"}}>Initiate a withdrawal</Text>
                    <br/>
                    <Text style={{fontSize: 13, color: '707A89FF'}}>Initiate a withdrawal on the withdrawal
                        platform.</Text>
                </div>
                <div style={{display: "inline-block", width: '13%', marginLeft: '2%'}}>
                    <Text style={{display: "inline", fontSize: 14, fontWeight: "bold"}}>Confirm deposit</Text>
                    <br/>
                    <Text style={{fontSize: 13, color: '707A89FF'}}>Input the value and click the button to
                        confirm</Text>
                </div>
                <div style={{display: "inline-block", width: '17%', marginLeft: '2%'}}>
                    <Text style={{display: "inline", fontSize: 14, fontWeight: "bold"}}>Network confirmation</Text>
                    <br/>
                    <Text style={{fontSize: 13, color: '707A89FF'}}>Wait for the blockchain network to confirm your
                        transfer.</Text>
                </div>
                <div style={{display: "inline-block", width: '22%', marginLeft: '2%'}}>
                    <Text style={{display: "inline", fontSize: 14, fontWeight: "bold"}}>Deposit successful</Text>
                    <br/>
                    <Text style={{fontSize: 13, color: '707A89FF'}}>After the network confirmation, Cryproverse will
                        credit the crypto for you.</Text>
                </div>
            </div>
            <div className='deposit'>
                <div className='modal-deposit'>
                    <Text style={{
                        marginBottom: 15,
                    }}>Select coin</Text>
                    <Text style={{
                        marginBottom: 15,
                        marginLeft: '20%',
                    }}>Coin</Text>
                    <br/>
                    <Select
                        className='select-coin'
                        showSearch
                        style={{
                            marginLeft: '32%',
                            width: '65%',
                            marginBottom: 15,
                        }}
                        onSelect={handleSelect}
                        placeholder="Select coin"
                        options={myArray.map((item) => ({
                            value: item.coin,
                            label: <div><img style={{width: '6%', marginRight: '3%'}} src={cryptosList?.data?.coins?.find(x => x.name === item.name)?.iconUrl}/>{item.name}</div>,
                        }))}
                    >
                    </Select>
                </div>
                <div className='deposit-block'>
                <Address handleOkDeposit={handleOkDeposit} handleCancelDeposit={handleCancelDeposit}
                         handleDisableDeposit={handleDisableDeposit}/>
                <div className='deposit-info'>
                    <div style={{width: '55vh'}}>
                        <Text style={{fontSize: '122%', fontWeight: "bold"}}>Deposit hasn't arrived?</Text>
                        <br/>
                        <Text style={{position: "relative", top: '2vh'}}>If you encounter the following problems during the deposit process, you can go to Deposit Status Query to search for your current deposit status or retrieve your assets via self-service application.</Text>
                        <ul style={{marginLeft: '6%', position: "relative", top: '2vh'}}>
                            <li>Deposit has not arrived after a long while.</li>
                            <li>Didn’t enter MEMO/Tag correctly</li>
                            <li>Deposited unlisted coins</li>
                        </ul>
                    </div>
                    <div style={{width: '60vh', position: "relative", top: '4vh'}}>
                        <Text style={{fontSize: '122%', fontWeight: "bold"}}>FAQ</Text>
                        <br/>
                        <Text style={{position: "relative", top: '2vh', textDecoration: "underline"}}
                        ><PlayCircleOutlined style={{fontSize: '145%', position: "relative", top: '0.3vh', marginRight: '1vh'}}
                        /><a style={{color: "black"}} href='https://www.binance.com/en/support/faq/how-do-i-deposit-withdraw-cryptocurrency-on-binance-85a1c394ac1d489fb0bfac0ef2fceafd' target='_blank'>Video Tutorial</a></Text>
                        <br/>
                        <Text style={{position: "relative", top: '3vh', textDecoration: "underline"}}
                        ><FileTextOutlined style={{fontSize: '145%', position: "relative", top: '0.3vh', marginRight: '1vh'}}
                        /><a style={{color: "black"}} target='_blank' href='https://www.binance.com/en/support/faq/how-to-deposit-crypto-to-binance-115003764971'>How to Deposit Crypto Step-by-step Guide</a></Text>
                        <br/>
                        <Text style={{position: "relative", top: '4vh', textDecoration: "underline"}}
                        ><FileTextOutlined style={{fontSize: '145%', position: "relative", top: '0.3vh', marginRight: '1vh'}}
                        /><a style={{color: "black"}} target='_blank' href='https://www.binance.com/en/support/faq/why-hasn-t-my-deposit-been-credited-115003736451'>Why Has My Deposit Not Been Credited yet?</a></Text>
                        <br/>
                        <Text style={{position: "relative", top: '5vh', textDecoration: "underline"}}
                        ><FileTextOutlined style={{fontSize: '145%', position: "relative", top: '0.3vh', marginRight: '1vh'}}
                        /><a style={{color: "black"}} target='_blank' href='https://www.binance.com/en/support/faq/how-to-retrieve-crypto-deposit-with-wrong-or-missing-tag-memo-40b87335db904481888ef406b105442b'>How to Retrieve Crypto Deposit with Wrong or Missing Tag/Memo</a></Text>
                        <br/>
                        <Text style={{position: "relative", top: '6vh', textDecoration: "underline"}}
                        ><FileTextOutlined style={{fontSize: '145%', position: "relative", top: '0.3vh', marginRight: '1vh'}}
                        /><a style={{color: "black"}} target='_blank' href='https://www.binance.com/en/support/faq/binance-beginners-guide-c780097f75dd450a82d17f1e84153276'>How to Buy Crypto and Get Started on Binance</a></Text>
                        <br/>
                        <Text style={{position: "relative", top: '7vh', textDecoration: "underline"}}
                        ><FileTextOutlined style={{fontSize: '145%', position: "relative", top: '0.3vh', marginRight: '1vh'}}
                        /><a style={{color: "black"}} target='_blank' href='https://www.binance.com/en/network'>Deposit & Withdrawal Status query</a></Text>
                        <br/>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}


export default Deposit;