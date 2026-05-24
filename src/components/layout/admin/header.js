
import { useState, useEffect } from 'react';
import profile from '../../../assets/img/logo192.png';
import imgTest from '../../../assets/img/alien.jpg';
import '../../../assets/css/admin/header.css';
import Button from '../../../components/common/button';
import { getAuthUser } from '../../../utils/auth';
import { HamburgerMenu , LoginCurve, Magicpen, HomeHashtag, VideoOctagon, Designtools, Gift, Dropbox} from 'iconsax-reactjs';
export const API_URL = process.env.API_URL || "http://localhost:5000";
export const STORAGE = process.env.STORAGE || "/images/storage/";

export default function AdminHeader() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const authUser = getAuthUser();
        setUser(authUser);
    }, []);

    const displayName = user?.name || user?.username || user?.email || 'Vensoeng';
    const avatarSrc = user?.pr_img || imgTest;

    return (
        <>
            {/* this is header  */}
            <header className="web-head">
                <div className="wh-box df-s">
                    {/* this is logo  */}
                    <div className="row">
                        <div className='row-box df-l'>
                            {/* <div className="logo icon icon-sm over-h">
                                <img src={profile} className='img-c' loading="lazy" />
                            </div> */}
                            <div className='txt'>
                                <h1>ផ្ទាំងគ្រប់គ្រង</h1>
                            </div>
                        </div>
                    </div>
                    {/* this is nav menu header  */}
                    <div className="row">
                        <div className='row-box df-l'>
                            <ul className='df-c'>
                                <li>
                                    <Button>
                                        <a className='df-l'>
                                            <Magicpen />
                                            <p>ផ្សព្វផ្សាយ</p>
                                        </a>
                                    </Button>
                                </li>
                            </ul>
                            <div className='user-infor df-l'>
                                <div className='user-profile icon over-h'>
                                    <img src={ API_URL + STORAGE + avatarSrc} className='img-c' alt={displayName} />
                                </div>
                                <h2>{displayName}</h2>
                            </div>
                            <div className='menu toggle-menu'>
                                <div className='menu-box icon-sm over-h df-c'>
                                  <HamburgerMenu/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* this is aside */}
            <aside className='web-aside'>
                <div className='wa-box'>
                    {/* header  */}
                    <div className='wa-head'>
                        <div className='wah-box df-s'>
                            <h2>ជម្រើសម៊ីនូ</h2>
                            <div className='wah-action icon-sm df-c'>
                                <HamburgerMenu/>
                            </div>
                        </div>
                    </div>
                    {/* content  */}
                    <div className='wa-con'>
                        <div className='wac-box scroll-y'>
                            {/* aside menu  */}
                            <ul>
                                <li>
                                    <a className='df-l active'>
                                        <div className='icon icon-sm over-h df-c'>
                                            <HomeHashtag />
                                        </div>
                                        <p>ផ្ទាំងគ្រប់គ្រង</p>
                                    </a>
                                </li>
                                <li>
                                    <a className='df-l'>
                                        <div className='icon icon-sm over-h df-c'>
                                            <Magicpen />
                                        </div>
                                        <p>ផ្សព្វផ្សាយ</p>
                                    </a>
                                </li>
                                <li>
                                    <a className='df-l'>
                                        <div className='icon icon-sm over-h df-c'>
                                            <VideoOctagon />
                                        </div>
                                        <p>មាតិការ</p>
                                    </a>
                                </li>
                                <li>
                                    <a className='df-l'>
                                        <div className='icon icon-sm over-h df-c'>
                                            <Designtools />
                                        </div>
                                        <p>ការរចនា</p>
                                    </a>
                                </li>
                                <li>
                                    <a className='df-l'>
                                        <div className='icon icon-sm over-h df-c'>
                                            <Dropbox />
                                        </div>
                                        <p>សេវ៉ាកម្ម</p>
                                    </a>
                                </li>
                                <li>
                                    <a className='df-l'>
                                        <div className='icon icon-sm over-h df-c'>
                                            <Gift />
                                        </div>
                                        <p>ការផ្ដល់ជូន</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* footer */}
                    <div className='wa-foot'>
                        <div className='waf-box'>
                            {/* version  */}
                            <blockquote>
                                <p>សូមស្វាគមន៍យើងនៅទីនេះដើម្បីអ្នករាល់គ្នា!</p>
                                <a>@Version 1.0.0</a>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
