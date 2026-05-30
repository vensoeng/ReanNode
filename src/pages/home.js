import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../utils/auth';

import WebLoader from '../components/common/WebLoader';

import '../assets/css/story.css';
import '../assets/css/home.css';
import Button from '../components/common/button';
import ProjectBackground from '../components/common/ProjectBackground';
import AlienBackground from '../components/common/AlienBackground';
import StoryCard from '../components/common/StoryCard';
import StarryBackground from '../components/common/StarryBackground';
import AdvertisementPopup from '../components/common/AdvertisementPopup';

import { Record, Hashtag, Book1} from 'iconsax-reactjs';
//webpage add on
import AboutPage from './about';
// import StoryPage from './story';

const fetchBlogsFromServer = async () => {
    const res = await fetch(`${API_URL}/blogs?limit=5`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};

export default function HomePage() {
    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogsFromServer,
        staleTime: 5 * 60 * 1000,
    });

    return (
        <main className="web-main">
            <AlienBackground />
            <AdvertisementPopup />
            <div className="main-body">
                <div className="mb-box">
                    {/* this is is head of home page  */}
                    <section className="head">
                        <blockquote>
                            <h2>
                                បង្កើតដំណោះស្រាយប្រកបដោយភាពច្នៃប្រឌិត និងមានប្រសិទ្ធភាព
                                គេហទំព័រនិងទូរស័ព្ទ។
                            </h2>
                            <p>សួស្តី ខ្ញុំឈ្មោះវិនសឹង្ហ ហើយខ្ញុំជាអ្នកអភិវឌ្ឍន៍ជាមួយនឹងបទពិសោធន៍ក្នុងភាសាសរសេរកម្មវិធី និងក្របខ័ណ្ឌផ្សេងៗ។</p>
                            <div className='list-btn'>
                                <div className='df-c'>
                                    <Button>ទាញយកប្រវត្តរូប</Button>
                                    <Button>
                                        <Book1 />
                                        ទិដ្ឋពីក្រោយជីវិត
                                    </Button>
                                </div>
                                <p>Open source platform!</p>
                            </div>
                        </blockquote>
                    </section>
                    {/* this is is about my skill  */}
                    <section className='skill'>
                        <div className='sk-box'>
                            <div className='sk-head'>
                                <div className='skh-box df-l'>
                                    <div className='list-icon'>
                                        <Record />
                                        <Record />
                                        <Record />
                                    </div>
                                </div>
                            </div>
                            <div className='sk-con'>
                                <div className='skc-box df-s'>
                                    <div className='row'>
                                        <div className='row-head'>
                                            <h2>2021 - 2022</h2>
                                        </div>
                                        <ul>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Basic English</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Basic computer</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Computer network system</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Adobe Photoshop, Premiere pro</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Microsoft basic</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='row'>
                                        <div className='row-head'>
                                            <h2>2022 - 2023</h2>
                                        </div>
                                        <ul>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Project paper (python)</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Advance Java programing</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Web development programing (HTML + CSS + JS)</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Computer Graphic designs (Photoshop)</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>MData structure and algorithm program (python)</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Digital marketing </p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Web technology (Angular + Node express basic) </p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Network administrator</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Linux open source</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='skc-box df-s'>
                                    <div className='row'>
                                        <div className='row-head'>
                                            <h2>2023 - 2024</h2>
                                        </div>
                                        <ul>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Mobile Application development (Flutter)</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Open source Technology (Laravel + XAMP) </p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Net programing (ASP.net)</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Research Methodology</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Database Administrator (Microsoft SQL server) </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='row'>
                                        <div className='row-head'>
                                            <h2>2024 - 2025</h2>
                                        </div>
                                        <ul>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Electronic Ecommerce (Ecommerce introduction + WordPress + Laravel)</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Big data Analytics</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Advance programming (Node express)</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Software Engineer and project management </p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>Machine Learning (Basic)</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='skc-box df-s'>
                                    <div className='row'>
                                        <div className='row-head'>
                                            <h2>2025 - 2026 Fut</h2>
                                        </div>
                                        <ul>
                                            <li className="df-l">
                                                <Hashtag />
                                                <p>React JS, Vue.js, Flutter, Network, Node Express.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* this is read node */}
                    <ProjectBackground />
                    {/* this is about page  */}
                    <AboutPage />
                    {/* this is show my story  */}
                    <section className="web-main">
                        <div className="main-body">
                            <div className="mb-box">
                                <section className="me-story">
                                    <canvas id="star-canvas"></canvas>
                                    <div className="ms-box">
                                        <div className="ms-head">
                                            <div className="msh-box">
                                                <h2>ព្រឹត្តិការណ៍</h2>
                                                <blockquote>
                                                    <p>ស្វែងរក និងអានព្រឹត្តិការណ៍ផ្សេងៗដែលមានការបង្កើតជាប្រចាំ!</p>
                                                </blockquote>
                                            </div>
                                        </div>
                                        <div className="ms-con">
                                            <div className="msc-box">
                                                <div className="my-story-body">
                                                    <div className='box'>
                                                        <ul>
                                                            {
                                                                isLoading ? (
                                                                    <WebLoader>
                                                                        រង់ចាំបន្ដិចយើងកំពុងទាញយកទិន្នន័យដើម្បីដំណើរការ
                                                                    </WebLoader>
                                                                ) : blogs.length === 0 ? (
                                                                    <li style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                                                                        មិនមានទិន្នន័យអត្ថបទឡើយ។
                                                                    </li>
                                                                ) : (
                                                                    [...blogs].reverse().map((blog, index) => (
                                                                        <StoryCard
                                                                            key={index}
                                                                            blog={blog}
                                                                            newStory={true}
                                                                        />
                                                                    ))
                                                                )
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='story-main-btn df-c'>
                                            <NavLink to='/storys' className="btn">
                                                មើលបន្ថែមទៀត
                                            </NavLink>
                                        </div>
                                    </div>
                                    <StarryBackground />
                                </section>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}