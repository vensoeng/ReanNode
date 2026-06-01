import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../utils/auth';

import WebLoader from '../components/common/WebLoader';

// import '../assets/css/story.css';
import '../assets/css/home.css';
// import Button from '../components/common/button';
import ProjectBackground from '../components/common/ProjectBackground';
// import AlienBackground from '../components/common/AlienBackground';
import StoryCard from '../components/common/StoryCard';
import StarryBackground from '../components/common/StarryBackground';
import AdvertisementPopup from '../components/common/AdvertisementPopup';
import StudyList from '../components/common/ListStudy';
// import Screenslider from '../components/common/Screenslider';

import { Book1, ArrowRight} from 'iconsax-reactjs';
//webpage add on
import AboutPage from './about';
// import StoryPage from './story';

const fetchBlogsFromServer = async () => {
    const res = await fetch(`${API_URL}/blogs?limit=4`);
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
            {/* <AlienBackground /> */}
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
                            <p>រកសេវាកម្មល្អៗបាននៅទីនេះ! រាល់ការគាំទ្ររបស់បងៗ គឺជាកម្លាំងចិត្តឱ្យ ខ្ញុំបន្តស្វែងរកអ្វីដែលថ្មី និងឥតគិតថ្លៃមកចែករំលែកបន្តទៀត។</p>
                            <div className='list-btn'>
                                <div className='df-c'>
                                    <NavLink to='/service/' className='btn'>ស្វែងរកសេវ៉ាកម្ម</NavLink>
                                    <NavLink to='/storys' className='btn'>
                                        <Book1 />
                                        អានអត្ថបទ
                                    </NavLink>
                                </div>
                                <p>Open source platform</p>
                            </div>
                        </blockquote>
                    </section>
                    {/* this is is about my skill  */}
                    <StudyList />
                    {/* this is read node */}
                    <ProjectBackground />
                    {/* this is about page  */}
                    <AboutPage active={false} />
                    {/* ---this is design  */}
                    {/* <Screenslider 
                        mainTitle={"DESIGNS"}
                        mainDes={"ចង់ឱ្យផលិតផលរបស់អ្នកលេចធ្លោ និងទទួលបានការចាប់អារម្មណ៍ខ្លាំងមែនទេ? ការរចនា Poster ប្រកបដោយគំនិតច្នៃប្រឌិតពីយើង នឹងជួយផ្សព្វផ្សាយម៉ាកយីហោរបស់អ្នកឱ្យកាន់តែរីកសុះសាយ ព្រមទាំងជួយឱ្យអតិថិជនយល់ដឹងពីព័ត៌មានសំខាន់ៗបានភ្លាមៗត្រឹមមួយវិនាទី!"}
                    /> */}
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
                                                <ArrowRight />
                                            </NavLink>
                                        </div>
                                    </div>
                                    <StarryBackground />
                                </section>
                            </div>
                        </div>
                    </section>
                    {/* 1. Purple CTA Card Section */}
                    {/* <section className="cta-card">
                        <div className="cta-card-box">
                            <h2 className="cta-title">ទំនាក់ទំនងសេវ៉ាកម្ម</h2>
                            <p className="cta-description">
                            រកសេវាកម្មល្អៗបាននៅទីនេះ! រាល់ការគាំទ្ររបស់បងៗ គឺជាកម្លាំងចិត្តឱ្យ ខ្ញុំបន្តស្វែងរកអ្វីដែលថ្មី និងឥតគិតថ្លៃមកចែករំលែកបន្តទៀត។
                            </p>
                            <form className="cta-form" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="គណនីអ៊ីមែល example@email.com" 
                                className="cta-input" 
                                required 
                            />
                            <button type="submit" className="cta-button">ចាប់ផ្ដើម</button>
                            </form>
                        </div>
                    </section> */}
                </div>
            </div>
        </main>
    )
}