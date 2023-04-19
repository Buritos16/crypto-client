import React, {useEffect} from "react";
import './Invest.css'
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import Select from "../Select/Select";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../slices/auth";
import {Navigate} from "react-router-dom";
import ProfileHeaderMobile from "../ProfileHeader/ProfileHeaderMobile";

const Invest = ({location}) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const isAuth = useSelector(selectIsAuth)
    if (!isAuth) {
        return <Navigate to='/auth/login'/>
    }
    return (
        <div className='invest'>
            <ProfileHeader location={location}/>
            <ProfileHeaderMobile location={location}/>
            <div className='invest-main'>
                <div className='invest-item'>
                    <div className='invest-title1'>
                        <div>
                            <div>1 week</div>
                            <div style={{fontWeight: 'normal', color: '#979aa1', fontSize: '12px'}}>Staking</div>
                        </div>
                        <div>
                            <div>1.3% per Day</div>
                            <div>+ Bonus 1%</div>
                        </div>
                    </div>
                    <div className='invest-coin'>
                        <div style={{marginBottom: '5px', color: '#979aa1'}}>Select coin</div>
                        <Select name='BTC' percent='0.1' />
                    </div>
                </div>


                <div className='invest-item'>
                    <div className='invest-title2'>
                        <div>
                            <div>2 weeks</div>
                            <div style={{fontWeight: 'normal', color: '#979aa1', fontSize: '12px'}}>Staking</div>
                        </div>
                        <div>
                            <div>1.6% per Day</div>
                            <div>+ Bonus 2.5%</div>
                        </div>
                    </div>
                    <div className='invest-coin'>
                        <div style={{marginBottom: '5px', color: '#979aa1'}}>Select coin</div>
                        <Select name='LTC' percent='0.25' />
                    </div>
                </div>


                <div className='invest-item'>
                    <div className='invest-title3'>
                        <div>
                            <div>1 month</div>
                            <div style={{fontWeight: 'normal', color: '#979aa1', fontSize: '12px'}}>Staking</div>
                        </div>
                        <div>
                            <div>2.1% per Day</div>
                            <div>+ Bonus 7%</div>
                        </div>
                    </div>
                    <div className='invest-coin'>
                        <div style={{marginBottom: '5px', color: '#979aa1'}}>Select coin</div>
                        <Select name='ETH' percent='0.7' />
                    </div>
                </div>


                <div className='invest-item'>
                    <div className='invest-title4'>
                        <div>
                            <div>3 month</div>
                            <div style={{fontWeight: 'normal', color: '#979aa1', fontSize: '12px'}}>Staking</div>
                        </div>
                        <div>
                            <div>2.6% per Day</div>
                            <div>+ Bonus 16%</div>
                        </div>
                    </div>
                    <div className='invest-coin'>
                        <div style={{marginBottom: '5px', color: '#979aa1'}}>Select coin</div>
                        <Select name='USDT' percent='2.5' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Invest