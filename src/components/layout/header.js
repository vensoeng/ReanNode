import { NavLink } from 'react-router-dom';
import '../../assets/css/header.css';
import favIcon from '../../assets/img/logo192.png';
import { Flash, HamburgerMenu, Add } from 'iconsax-reactjs';
import Pageon from '../common/page';
import { useState } from 'react';

const ListRoute = () => {

    return(
        <div className="link-box">
            <ul className="df-s">
                <li className='df-c'><NavLink className={({ isActive }) => isActive ? "df-c active" : "df-c"} to="/">ទំព័រដើម</NavLink></li>
                <li className='df-c'><NavLink className={({ isActive }) => isActive ? "df-c active" : "df-c"} to="/website">ព្រឹត្តិការណ៍</NavLink></li>
                <li className='df-c'><NavLink className={({ isActive }) => isActive ? "df-c active" : "df-c"} to="/creator">មាតិការ</NavLink></li>
                <li className='df-c'><NavLink className={({ isActive }) => isActive ? "df-c active" : "df-c"} to="/poster">ការរចនា</NavLink></li>
                <li className='df-c'><NavLink className={({ isActive }) => isActive ? "df-c active" : "df-c"} to="/about">អំពីខ្ញុំ</NavLink></li>
            </ul>
        </div>
    )
}
export default function Header()
{
    const [loadAside, setLoadAside] = useState(false);

    return(
        <>
        <Pageon />
        <header className="webhead">
            <div className="wh-box df-s scroll-x">
                <NavLink to="/" className="logo icon icon-ra icon-sm">
                    {/* <h1>តោះ</h1> */}
                    <img className='img-c' src={favIcon} alt=''/>
                </NavLink>
                {/* rander list of route  */}
                <ListRoute />
                {/* this is main button */}
                <div className="btn-main df-r">
                    {/* <Link to='/login' className="btn">
                        <p>ទំនាក់ទំនង់</p>
                    </Link> */}
                    <a href="/service/" className="btn">
                        <p>សេវាកម្ម</p>
                        <div className="icon icon-ra icon-sm ip">
                            <Flash/>
                        </div>
                    </a>
                    <button className="btn" type='button' onClick={() => setLoadAside(prev => !prev)}>
                        <div className="icon icon-ra icon-sm ip">
                           {loadAside ? <Add style={{ transform: 'rotate(45deg)' }} /> : <HamburgerMenu />}
                        </div>
                    </button>
                </div>
            </div>
        </header>
        {/* this is for aside  */}
        <aside className='web-main-aside'>
            <div className='webmas-con'>
                <div className='weasc-box scroll-y'>
                    {/* rander list of route  */}
                    <ListRoute />
                </div>
            </div>
        </aside>
        </>
    );
}