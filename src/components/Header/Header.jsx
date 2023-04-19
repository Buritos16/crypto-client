import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import './Header.css'
import logo from '../../images/logo.png';
import logoText from '../../images/text.png';
import {
    BankOutlined,
    BarChartOutlined,
    FundViewOutlined, PoweroffOutlined, SettingOutlined,
    SwapOutlined, UserOutlined,
    UserSwitchOutlined,
    WalletOutlined
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../slices/auth";
import HamburgerMenu from "react-hamburger-menu";


const Header = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(selectIsAuth)
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

    const [openDropdown, setOpenDropdown] = useState(false)
    const [openDropdown1, setOpenDropdown1] = useState(false)

    const [isOpen, setIsOpen] = useState(false);
    const [mobileTools, setMobileTools] = useState(false)

    useEffect(() => {
        document.getElementById('navTrading').className = 'navBlock'
        document.getElementById('navTools').className = 'navBlock'
        document.getElementById('navInvest').className = 'navBlock'
        document.getElementById('navP2P').className = 'navBlock'
        document.getElementById('navConvert').className = 'navBlock'
        document.getElementById('navWallet').className = 'navBlock'
        document.getElementById('navProfile').className = 'navBlock'
        document.getElementById('navTradingLink').className = 'link'
        document.getElementById('navToolsLink').className = 'link'
        document.getElementById('navInvestLink').className = 'link'
        document.getElementById('navP2PLink').className = 'link'
        document.getElementById('navConvertLink').className = 'link'
        document.getElementById('navWalletLink').className = 'link'
        document.getElementById('navProfileLink').className = 'link'
        if (props.location.pathname.includes('trading')) {
            document.getElementById('navTrading').className = 'navBlockSelected'
            setOpenDropdown(false)
        } else if (props.location.pathname.includes('tools')) {
            document.getElementById('navTools').className = 'navBlockSelected'
            setOpenDropdown(false)
        } else if (props.location.pathname.includes('invest')) {
            document.getElementById('navInvest').className = 'navBlockSelected'
            setOpenDropdown(false)
        } else if (props.location.pathname.includes('p2p')) {
            document.getElementById('navP2P').className = 'navBlockSelected'
            setOpenDropdown(false)
        } else if (props.location.pathname.includes('convert')) {
            document.getElementById('navConvert').className = 'navBlockSelected'
            setOpenDropdown(false)
        } else if (props.location.pathname.includes('wallet')) {
            document.getElementById('navWallet').className = 'navBlockSelected'
            setOpenDropdown(false)
        } else if (props.location.pathname.includes('profile')) {
            document.getElementById('navProfile').className = 'navBlockSelected'
            setOpenDropdown(false)
        }
        if (props.location.pathname.includes('trading')) {
            document.getElementById('navTradingLink').className = 'linkSelected'
        } else if (props.location.pathname.includes('tools')) {
            document.getElementById('navToolsLink').className = 'linkSelected'
        } else if (props.location.pathname.includes('invest')) {
            document.getElementById('navInvestLink').className = 'linkSelected'
        } else if (props.location.pathname.includes('p2p')) {
            document.getElementById('navP2PLink').className = 'linkSelected'
        } else if (props.location.pathname.includes('convert')) {
            document.getElementById('navConvertLink').className = 'linkSelected'
        } else if (props.location.pathname.includes('wallet')) {
            document.getElementById('navWalletLink').className = 'linkSelected'
        } else if (props.location.pathname.includes('profile')) {
            document.getElementById('navProfileLink').className = 'linkSelected'
        }
    }, [props.location.pathname])

    const handleArrowEnter = () => {
        document.getElementById('arrow').style.borderTop = '7px solid #50cff9'
    }
    const handleArrowOut = () => {
        document.getElementById('arrow').style.borderTop = '7px solid #979aa1'
    }
    const handleArrowEnter1 = () => {
        document.getElementById('arrow1').style.borderTop = '7px solid #50cff9'
    }
    const handleArrowOut1 = () => {
        document.getElementById('arrow1').style.borderTop = '7px solid #979aa1'
    }

    const handleOk = async () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div>
            <header className='header'>
                <Link to='/'>
                    <div className='brand'>
                        <img className='logo' src={logo} alt="brand"/>
                        <img className='logoText' src={logoText} alt="logoText"/>
                    </div>
                </Link>
                <nav className='nav'>
                    <Link id='navTradingLink' className='link' to='/trading'>
                        <div id='navTrading' className='navBlock'>
                            <FundViewOutlined className='navIcon'/>
                            Trading
                        </div>
                    </Link>
                    <div id='navToolsLink' className='link' onClick={() => {
                        if (openDropdown) {
                            document.getElementById('dropdown').style.animationName = 'fadeOut'
                            document.getElementById('arrow').className = 'dropdown-arrow'
                            setTimeout(() => {
                                setOpenDropdown(!openDropdown)
                            }, 1000)
                        } else {
                            document.getElementById('arrow').className = 'arrow-transform'
                            setOpenDropdown(!openDropdown)
                        }
                    }}
                    >
                        <div id='navTools' className='navBlock tools'><BarChartOutlined
                            className='navIcon' style={{marginRight: '10px'}}/>
                            <div style={{display: 'flex'}} onMouseEnter={handleArrowEnter}
                                 onMouseLeave={handleArrowOut}>
                                <div>Market Tools</div>
                                <div id='arrow' className="dropdown-arrow"/>
                            </div>
                        </div>
                        {openDropdown &&
                            <div id='dropdown' className='dropdown' style={{padding: '0.7rem'}}>
                                <Link className='link-item' to='/tools/cap'>
                                    <div className='menu-item'>Crypto market cap</div>
                                </Link>
                                <Link className='link-item' to='/tools/screener'>
                                    <div className='menu-item'>Market screener</div>
                                </Link>
                                <Link className='link-item' to='/tools/rates'>
                                    <div className='menu-item'>Cross rates</div>
                                </Link>
                                <Link className='link-item' to='/tools/map'>
                                    <div className='menu-item'>Currency heat map</div>
                                </Link>
                            </div>
                        }
                    </div>
                    <Link id='navInvestLink' className='link' to='/profile/invest'>
                        <div id='navInvest' className='navBlock'><BankOutlined
                            className='navIcon'/>Invest
                        </div>
                    </Link>
                    <Link id='navP2PLink' className='link' to='/p2p'>
                        <div
                            id='navP2P' className='navBlock'>
                            <UserSwitchOutlined className='navIcon'/>
                            P2P
                        </div>
                    </Link>
                    <Link id='navConvertLink' className='link' to='/profile/convert'>
                        <div id='navConvert' className='navBlock '>
                            <SwapOutlined
                                className='navIcon '/>
                            Convert
                        </div>
                    </Link>

                    <Link id='navWalletLink' className='link' to='/profile/wallet'>
                        <div id='navWallet' className='navBlock'><WalletOutlined
                            className='navIcon'/>Wallet
                        </div>
                    </Link>
                </nav>
                {isAuth
                    ?
                    <div id='navProfileLink' className='link' onClick={() => {
                        if (openDropdown1) {
                            document.getElementById('dropdown1').style.animationName = 'fadeOut'
                            document.getElementById('arrow1').className = 'dropdown-arrow'
                            setTimeout(() => {
                                setOpenDropdown1(!openDropdown1)
                            }, 1000)
                        } else {
                            document.getElementById('arrow1').className = 'arrow-transform'
                            setOpenDropdown1(!openDropdown1)
                        }
                    }} style={{marginLeft: 'auto'}}>
                        <div id='navProfile' className='navBlock'><UserOutlined
                            className='navIcon'/>
                            <div style={{display: 'flex'}} onMouseEnter={handleArrowEnter1}
                                 onMouseLeave={handleArrowOut1}>
                                <div>{data?.email}</div>
                                <div id='arrow1' className="dropdown-arrow"/>
                            </div>
                        </div>
                        {openDropdown1 &&
                            <div id='dropdown1' className='dropdown' style={{width: 270, alignItems: "center"}}>
                                <div style={{
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
                                </div>
                                <div className="wallet-convert-line-horizontal"/>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignSelf: "flex-start",
                                    marginTop: 10,
                                    marginBottom: 10
                                }}>
                                    <Link className='link-item' to='/profile/wallet'>
                                        <div className='profile-menu-item'
                                             style={{display: "flex", alignItems: "center", color: "white"}}>
                                            <WalletOutlined style={{fontSize: 15, marginRight: 15}}/>
                                            <div className='profile-menu-item-text1'>Wallet: {all.toFixed(2)} USD</div>
                                        </div>
                                    </Link>
                                    <Link className='link-item' to='/profile/settings'>
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
                                </div>
                            </div>
                        }
                    </div>
                    :
                    <Link to='/auth/login' id='navProfileLink' className='link' style={{marginLeft: 'auto'}}>
                        <div id='navProfile' className='navBlock'><UserOutlined
                            className='navIcon'/>Login
                        </div>
                    </Link>
                }
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
                            <div className='dropdown' style={{alignItems: "center", right: -50}}>
                                <div style={{
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
                                </div>
                                <div className="wallet-convert-line-horizontal"/>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignSelf: "flex-start",
                                    marginTop: 10,
                                    marginBottom: 10,
                                    paddingLeft: 20,
                                }}>
                                    <Link style={{color: "white"}} to='/trading' onClick={() => {
                                        setIsOpen(false)
                                    }}>Trading</Link>
                                    <div style={{color: "white"}}>
                                        <div style={{display: "flex"}} onClick={() => {
                                            setMobileTools(!mobileTools)
                                        }}>
                                            <div>Market tools</div>
                                            <div className="dropdown-arrow"/>
                                        </div>
                                        {mobileTools &&
                                            <div className='header-mobile-tools' style={{marginLeft: 20}}>
                                                <div onClick={() => {
                                                    setIsOpen(false)
                                                }}>
                                                    <Link style={{color: "white"}} to='/tools/cap'>
                                                        Crypto market cap
                                                    </Link>
                                                </div>
                                                <div onClick={() => {
                                                    setIsOpen(false)
                                                }}>
                                                    <Link style={{color: "white"}} to='/tools/screener'>
                                                        Market screener
                                                    </Link>
                                                </div>
                                                <div onClick={() => {
                                                    setIsOpen(false)
                                                }}>
                                                    <Link style={{color: "white"}} to='/tools/rates'>
                                                        Cross rates
                                                    </Link>
                                                </div>
                                                <div onClick={() => {
                                                    setIsOpen(false)
                                                }}>
                                                    <Link style={{color: "white"}} to='/tools/map'>
                                                        Currency heat map
                                                    </Link>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <Link style={{color: "white"}} to='/profile/invest' onClick={() => {
                                        setIsOpen(false)
                                    }}>Invest</Link>
                                    <Link style={{color: "white"}} to='/p2p' onClick={() => {
                                        setIsOpen(false)
                                    }}>P2P</Link>
                                    <Link style={{color: "white"}} to='/profile/convert' onClick={() => {
                                        setIsOpen(false)
                                    }}>Convert</Link>
                                </div>
                                <div className="wallet-convert-line-horizontal"/>
                                <div style={{
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
                                </div>
                            </div>
                        }
                    </div>
                </div>


                {!isAuth && <Link to='/profile/wallet' style={{margin: 0}} className='link-main'>
                    <div style={{
                        width: 60,
                        borderRadius: 40,
                        padding: '5px 8px',
                        marginTop: "auto",
                        marginBottom: "auto",
                        fontSize: 14
                    }}
                         className='login-button'>Login
                    </div>
                </Link>}
                {isAuth && <Link to='/profile/wallet' style={{margin: 0}} className='link-main'>
                    <div style={{
                        width: 60,
                        borderRadius: 40,
                        padding: '5px 8px',
                        marginTop: "auto",
                        marginBottom: "auto",
                        fontSize: 14
                    }}
                         className='login-button'>Wallet
                    </div>
                </Link>}
            </header>
        </div>
    )

}

export default Header;