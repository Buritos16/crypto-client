import React, {useEffect} from "react";
import './ProfileHeader.css'
import {Link} from "react-router-dom";
import {BsBullseye} from "react-icons/bs";
import {BiCoinStack, BiKey} from "react-icons/bi";
import {TbArrowBigRightLines} from "react-icons/tb";
import {SettingOutlined} from "@ant-design/icons";
import {AiOutlineHistory} from "react-icons/ai";
import {IoIosUndo} from "react-icons/io";
import {GiMoneyStack} from "react-icons/gi";


const ProfileHeaderMobile = (props) => {

    useEffect(() => {
        document.getElementById('wallet').className = 'profile-header-item'
        document.getElementById('deposit').className = 'profile-header-item'
        document.getElementById('withdraw').className = 'profile-header-item'
        document.getElementById('transactions').className = 'profile-header-item'
        document.getElementById('transfer').className = 'profile-header-item'
        document.getElementById('invest').className = 'profile-header-item'
        document.getElementById('api').className = 'profile-header-item'
        document.getElementById('settings').className = 'profile-header-item'

        if (props.location.pathname.includes('wallet')) {
            document.getElementById('wallet').className = 'profile-header-item-selected'
        } else if (props.location.pathname.includes('deposit')) {
            document.getElementById('deposit').className = 'profile-header-item-selected'
        } else if (props.location.pathname.includes('withdraw')) {
            document.getElementById('withdraw').className = 'profile-header-item-selected'
        } else if (props.location.pathname.includes('transactions')) {
            document.getElementById('transactions').className = 'profile-header-item-selected'
        } else if (props.location.pathname.includes('transfer')) {
            document.getElementById('transfer').className = 'profile-header-item-selected'
        } else if (props.location.pathname.includes('invest')) {
            document.getElementById('invest').className = 'profile-header-item-selected'
        } else if (props.location.pathname.includes('api')) {
            document.getElementById('api').className = 'profile-header-item-selected'
        } else if (props.location.pathname.includes('settings')) {
            document.getElementById('settings').className = 'profile-header-item-selected'
        }
    }, [props.location.pathname])



    return (
        <div className='header-sticky'>
                <Link to='/profile/wallet'>
                    <div id='wallet' className='profile-header-item'>
                        <BsBullseye style={{marginRight: '5px'}}/>Overview
                    </div>
                </Link>
                <Link to='/profile/deposit'>
                    <div id='deposit' className='profile-header-item'><BiCoinStack style={{marginRight: '5px'}}/>Deposit
                    </div>
                </Link>
                <Link to='/profile/withdraw'>
                    <div id='withdraw' className='profile-header-item'><TbArrowBigRightLines
                        style={{marginRight: '5px'}}/>Withdraw
                    </div>
                </Link>
            <Link to='/profile/transactions'>
                <div id='transactions' className='profile-header-item'><AiOutlineHistory
                    style={{marginRight: '5px'}}/>Transactions
                </div>
            </Link>
            <Link to='/profile/transfer'>
                <div id='transfer' className='profile-header-item'><IoIosUndo style={{marginRight: '5px'}}/>Transfer
                </div>
            </Link>
            <Link to='/profile/invest'>
                <div id='invest' className='profile-header-item'><GiMoneyStack style={{marginRight: '5px'}}/>Invest
                </div>
            </Link>
            <Link to='/profile/api'>
                <div id='api' className='profile-header-item'><BiKey style={{marginRight: '5px'}}/>API</div>
            </Link>
            <Link to='/profile/settings'>
                <div id='settings' className='profile-header-item'><SettingOutlined
                    style={{marginRight: '5px'}}/>Settings
                </div>
            </Link>
        </div>
    )
}

export default ProfileHeaderMobile