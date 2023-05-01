import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import './HeaderMain.css'
import logo from '../../assets/logo.png';
import logoText from '../../assets/text.png';
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../slices/auth";
import HamburgerMenu from 'react-hamburger-menu'
import {PoweroffOutlined, SettingOutlined, UserOutlined, WalletOutlined} from "@ant-design/icons";


const HeaderMain = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(selectIsAuth)
    const [isOpen, setIsOpen] = useState(false)
    const [mobileTools, setMobileTools] = useState(false)
    const coinsInfoRapidApi = useSelector(state => state.trading.coinsInfoRapidApi)
    const data = useSelector(state => state.auth.data)

    let all = 0

    data?.wallet?.map((item) => {
        if (item?.name === 'USDT') {
            all += item?.value
        } else {
            all += (Number(coinsInfoRapidApi?.data?.coins?.find(x => x.symbol === item.name)?.price) * item?.value)
        }
    })

    const handleOk = async () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div>
        <header className='header-main'>
            <Link to='/' className='link-main'>
                <div className='brand'>
                    <img className='logo' src={logo} alt="brand"/>
                    <img className='logoText' src={logoText} alt="logoText"/>
                </div>
            </Link>
            <nav className='nav-main'>
                <Link to='/trading' className='link-main'>
                    <div>
                        Trading
                    </div>
                </Link>
                <Link to='/profile/invest' className='link-main'>
                    <div>
                        Invest
                    </div>
                </Link>
                <Link to='/p2p' className='link-main'>
                    <div>
                        P2P
                    </div>
                </Link>
                <Link to='/profile/convert' className='link-main'>
                    <div>
                        Convert
                    </div>
                </Link>

                <Link to='/profile/deposit' className='link-main'>
                    <div>
                        Deposit
                    </div>
                </Link>
                {!isAuth && <Link to='/auth/login' className='link-main'>
                    <div style={{fontWeight: "bold"}}>
                        Login
                    </div>
                </Link>}
                {!isAuth && <div style={{height: '40px', marginTop: "auto", marginBottom: "auto", marginLeft: 0}} className='wallet-line'/>}
                {!isAuth && <Link to='/auth/register' className='link-main'>
                    <div style={{width: 100, borderRadius: 40, padding: '9px 15px', marginTop: "auto", marginBottom: "auto", fontSize: 14}}
                         className='login-button'>Register
                    </div>
                </Link>}
                {isAuth && <Link to='/profile/wallet' className='link-main'>
                    <div style={{width: 100, borderRadius: 40, padding: '9px 15px', marginTop: "auto", marginBottom: "auto", fontSize: 14}}
                         className='login-button'>Wallet
                    </div>
                </Link>}
            </nav>
        </header>
            <header className='header-main-mobile'>
                <Link to='/' className='link-main' style={{margin: 0}}>
                    <div className='brand'>
                        <img className='logo' src={logo} alt="brand"/>
                        <img className='logoText' src={logoText} alt="logoText"/>
                    </div>
                </Link>

                <div style={{marginLeft: "auto", marginRight: 10}}>
                    <HamburgerMenu
                        isOpen={isOpen}
                        menuClicked={() => {
                            setIsOpen(!isOpen)
                        }}
                        width={18}
                        height={12}
                        strokeWidth={3}
                        color='white'
                        animationDuration={0.5}
                        className='burger'
                    />
                    <div>
                        {isOpen &&
                            <div className='dropdown' style={{alignItems: "center", right: -10, paddingRight: 10}}>
                                {isAuth && <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontWeight: "bold",
                                    marginRight: 15,
                                    padding: '15px 0 10px 0'
                                }}>
                                    <UserOutlined style={{fontSize: 50, marginRight: 15, color: "white"}}
                                                  className='navIcon'/>
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        <div
                                            style={{color: "white"}}>{data?.personalInformation?.firstName} {data?.personalInformation?.lastName}</div>
                                        <div>{data?.email}</div>
                                    </div>
                                </div>}
                                    <div className="wallet-convert-line-horizontal"/>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignSelf: "flex-start",
                                    marginTop: 10,
                                    marginBottom: 10,
                                    paddingLeft: 20,
                                }}>
                                    <Link style={{color: "white"}} to='/trading'>Trading</Link>
                                    <div style={{color: "white"}}>
                                        <div style={{display: "flex"}} onClick={() => {
                                            setMobileTools(!mobileTools)
                                        }}>
                                            <div>Market tools</div>
                                            <div className="dropdown-arrow"/>
                                        </div>
                                        {mobileTools &&
                                            <div className='header-mobile-tools' style={{marginLeft: 20}}>
                                                <div>
                                                    <Link style={{color: "white"}} to='/tools/cap'>
                                                        Crypto market cap
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link style={{color: "white"}} to='/tools/screener'>
                                                        Market screener
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link style={{color: "white"}} to='/tools/rates'>
                                                        Cross rates
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link style={{color: "white"}} to='/tools/map'>
                                                        Currency heat map
                                                    </Link>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <Link style={{color: "white"}} to='/profile/invest'>Invest</Link>
                                    <Link style={{color: "white"}} to='/p2p'>P2P</Link>
                                    <Link style={{color: "white"}} to='/profile/convert'>Convert</Link>
                                </div>
                                <div className="wallet-convert-line-horizontal"/>
                                {isAuth && <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignSelf: "flex-start",
                                    marginTop: 10,
                                    marginBottom: 10
                                }}>
                                    <Link className='link-item' to='/profile/wallet' onClick={() => {
                                        setIsOpen(false)
                                    }}>
                                        <div className='profile-menu-item'
                                             style={{display: "flex", alignItems: "center", color: "white"}}>
                                            <WalletOutlined style={{fontSize: 15, marginRight: 15}}/>
                                            <div className='profile-menu-item-text1'>Wallet: {all.toFixed(2)} USD</div>
                                        </div>
                                    </Link>
                                    <Link className='link-item' to='/profile/settings' onClick={() => {
                                        setIsOpen(false)
                                    }}>
                                        <div className='profile-menu-item'
                                             style={{display: "flex", alignItems: "center", color: "white"}}>
                                            <SettingOutlined style={{fontSize: 15, marginRight: 15}}/>
                                            <div className='profile-menu-item-text1'>Settings</div>
                                        </div>
                                    </Link>
                                    <div>
                                        <div className='profile-menu-item'
                                             style={{color: "red", display: "flex", alignItems: "center"}}>
                                            <PoweroffOutlined style={{fontSize: 15, marginRight: 15}}/>
                                            <div className='profile-menu-item-text1' onClick={handleOk}
                                                 style={{cursor: "pointer"}}>Log Out
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        }
                    </div>
                </div>


                {!isAuth && <Link to='/profile/wallet' style={{margin: 0}} className='link-main'>
                    <div style={{width: 60, borderRadius: 40, padding: '5px 8px', marginTop: "auto", marginBottom: "auto", fontSize: 14}}
                         className='login-button'>Login
                    </div>
                </Link>}
                {isAuth && <Link to='/profile/wallet' style={{margin: 0}} className='link-main'>
                    <div style={{width: 60, borderRadius: 40, padding: '5px 8px', marginTop: "auto", marginBottom: "auto", fontSize: 14}}
                         className='login-button'>Wallet
                    </div>
                </Link>}
            </header>
        </div>
    )

}

export default HeaderMain;