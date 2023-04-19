import React from "react";
import {Link} from "react-router-dom";
import './Footer.css'
import logo from "../../images/logo.png";

const Footer = () => {

    return (
        <div className='footer'>
            <div className='main-footer'>
                <div className='footer-item footer-header' >
                    <div style={{display: "flex", fontWeight: "bold", fontSize: '20px', alignItems: "center"}}>
                        <img className='logo' src={logo} alt="brand"/>
                        <div style={{marginLeft: '10px'}}>
                            ALGORAX.NET
                        </div>
                    </div>
                    <div style={{marginTop: '30px', lineHeight: '30px', color: '#acafb6'}}>
                        Algorax is a simple, elegant, and secure platform to build your crypto portfolio.
                    </div>
                </div>
                <div className='footer-item'>
                    <div className='footer-title'>Features</div>
                    <div className='footer-content'>
                        <Link to='/'>
                            <div>Home</div>
                        </Link>
                        <Link to='/trading'>
                            <div>Trading</div>
                        </Link>
                        <Link to='/profile/wallet'>
                            <div>Wallet</div>
                        </Link>
                        <Link to='/profile/invest'>
                            <div>Invest</div>
                        </Link>
                        <Link to='/profile/convert'>
                            <div>Convert</div>
                        </Link>
                    </div>
                </div>
                <div className='footer-item'>
                    <div className='footer-title'>Market Tools</div>
                    <div className='footer-content'>
                        <Link to='/tools/cap'>
                            <div>Crypto market cap</div>
                        </Link>
                        <Link to='/tools/screener'>
                            <div>Market screener</div>
                        </Link>
                        <Link to='/tools/rates'>
                            <div>Cross rates</div>
                        </Link>
                        <Link to='/tools/map'>
                            <div>Currency heat map</div>
                        </Link>
                    </div>
                </div>
                <div className='footer-item'>
                    <div className='footer-title'>Legal</div>
                    <div className='footer-content'>
                        <Link to='/terms'>
                            <div>Terms of service</div>
                        </Link>
                        <Link to='/privacy'>
                            <div>Privacy notice</div>
                        </Link>
                        <Link to='/cookies'>
                            <div>Cookies policy</div>
                        </Link>
                        <Link to='/alm&kyc'>
                            <div>AML & KYC policy</div>
                        </Link>
                    </div>
                </div>
                <div className='footer-item'>
                    <div className='footer-title'>Exchange Pair</div>
                    <div className='footer-content'>
                        <Link to='/trading'>
                            <div>BTC to USDT</div>
                        </Link>
                        <Link to='/trading'>
                            <div>ETH to USDT</div>
                        </Link>
                        <Link to='/trading'>
                            <div>LTC to USDT</div>
                        </Link>
                        <Link to='/trading'>
                            <div>ADA to USDT</div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='footer-end'>
                <div style={{fontWeight: "bold"}}>Algorax</div>
                <div>© Copyright 2023</div>
                <div className='footer-line'/>
                <div>Worldwide Distributed Digital Asset Exchange</div>
                <div className='footer-line' />
                <div>Trading digitals assets such as Bitcoin involves significant risks.</div>
            </div>
            <div className='footer-end-mobile'>
                <div style={{fontWeight: "bold"}}>Algorax</div>
                <div>© Copyright 2023</div>
            </div>
        </div>
    )
}

export default Footer;