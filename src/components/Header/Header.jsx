import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import './Header.css'
import logo from '../../images/logo.png';
import logoText from '../../images/text.png';
import {
    BankOutlined,
    BarChartOutlined,
    FundViewOutlined, SendOutlined,
    SwapOutlined, UserOutlined,
    UserSwitchOutlined,
    WalletOutlined
} from "@ant-design/icons";



const Header = (props) => {

    useEffect(() => {
        document.getElementById('navTrading').className = 'navBlock'
        document.getElementById('navTools').className = 'navBlock'
        document.getElementById('navInvest').className = 'navBlock'
        document.getElementById('navP2P').className = 'navBlock'
        document.getElementById('navConvert').className = 'navBlock'
        document.getElementById('navSupport').className = 'navBlock'
        document.getElementById('navWallet').className = 'navBlock'
        document.getElementById('navProfile').className = 'navBlock'
        document.getElementById('navTradingLink').className = 'link'
        document.getElementById('navToolsLink').className = 'link'
        document.getElementById('navInvestLink').className = 'link'
        document.getElementById('navP2PLink').className = 'link'
        document.getElementById('navConvertLink').className = 'link'
        document.getElementById('navSupportLink').className = 'link'
        document.getElementById('navWalletLink').className = 'link'
        document.getElementById('navProfileLink').className = 'link'
        if (props.location.pathname.includes('trading')) {
            document.getElementById('navTrading').className = 'navBlockSelected'
        }
        else if (props.location.pathname.includes('tools')) {
            document.getElementById('navTools').className = 'navBlockSelected'
        }
        else if (props.location.pathname.includes('invest')) {
            document.getElementById('navInvest').className = 'navBlockSelected'
        }
        else if (props.location.pathname.includes('p2p')) {
            document.getElementById('navP2P').className = 'navBlockSelected'
        }
        else if (props.location.pathname.includes('convert')) {
            document.getElementById('navConvert').className = 'navBlockSelected'
        }
        else if (props.location.pathname.includes('support')) {
            document.getElementById('navSupport').className = 'navBlockSelected'
        }
        else if (props.location.pathname.includes('wallet')) {
            document.getElementById('navWallet').className = 'navBlockSelected'
        }
        else if (props.location.pathname.includes('profile')) {
            document.getElementById('navProfile').className = 'navBlockSelected'
        }
        if (props.location.pathname.includes('trading')) {
            document.getElementById('navTradingLink').className = 'linkSelected'
        }
        else if (props.location.pathname.includes('tools')) {
            document.getElementById('navToolsLink').className = 'linkSelected'
        }
        else if (props.location.pathname.includes('invest')) {
            document.getElementById('navInvestLink').className = 'linkSelected'
        }
        else if (props.location.pathname.includes('p2p')) {
            document.getElementById('navP2PLink').className = 'linkSelected'
        }
        else if (props.location.pathname.includes('convert')) {
            document.getElementById('navConvertLink').className = 'linkSelected'
        }
        else if (props.location.pathname.includes('support')) {
            document.getElementById('navSupportLink').className = 'linkSelected'
        }
        else if (props.location.pathname.includes('wallet')) {
            document.getElementById('navWalletLink').className = 'linkSelected'
        }
        else if (props.location.pathname.includes('profile')) {
            document.getElementById('navProfileLink').className = 'linkSelected'
        }
    },[props.location.pathname])


    return (
        <header className='header'>
            <div className='brand'>
                <img className='logo' src={logo} alt="brand"/>
                <img className='logoText' src={logoText} alt="logoText"/>
            </div>
            <nav className='nav'>
                <Link id='navTradingLink' className='link' to='/trading'>
                    <div id='navTrading' className='navBlock' ><FundViewOutlined
                        className='navIcon'/>Trading
                    </div>
                </Link>
                <Link id='navToolsLink' className='link' to='/tools'>
                    <div id='navTools' className='navBlock' ><BarChartOutlined
                        className='navIcon'/>Market Tools
                    </div>
                </Link>
                <Link id='navInvestLink' className='link' to='/invest'>
                    <div id='navInvest' className='navBlock' ><BankOutlined
                        className='navIcon'/>Invest
                    </div>
                </Link>
                <Link id='navP2PLink' className='link' to='/p2p'>
                    <div id='navP2P' className='navBlock' ><UserSwitchOutlined
                        className='navIcon'/>P2P
                    </div>
                </Link>
                <Link id='navConvertLink' className='link' to='/convert'>
                    <div id='navConvert' className='navBlock' ><SwapOutlined
                        className='navIcon'/>Convert
                    </div>
                </Link>
                <Link id='navSupportLink' className='link' to='/support'>
                    <div id='navSupport' className='navBlock' ><SendOutlined
                        className='navIcon'/>Support
                    </div>
                </Link>
                <Link id='navWalletLink' className='link' to='/wallet'>
                    <div id='navWallet' className='navBlock' ><WalletOutlined
                        className='navIcon'/>Wallet
                    </div>
                </Link>
            </nav>
            <Link id='navProfileLink' className='link' style={{marginLeft: 'auto'}} to='/profile'>
                <div  id='navProfile' className='navBlock' ><UserOutlined
                    className='navIcon'/>Profile
                </div>
            </Link>
        </header>
    )

}

export default Header;