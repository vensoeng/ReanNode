import { useEffect, useState } from 'react';
import { API_URL } from '../utils/auth';

import WebLoader from '../components/common/WebLoader';

import '../assets/css/story.css';
import Button from '../components/common/button';
import StoryCard from '../components/common/StoryCard';
import StarryBackground from '../components/common/StarryBackground';
import {ArrowRight} from 'iconsax-reactjs';

export default function StoryPage({active = true})
{
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch(
                    `${API_URL}/blogs`
                );
                const data = await res.json();
                setBlogs(data);
            } catch (err) {
                console.error(
                    "Error fetching blogs:",
                    err
                );
            } finally {
                setLoading(false);
            }

        };
        fetchBlogs();
    }, []);

    return (
        <main  className={active ? "web-main web-main-active" : "web-main"}>
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
                                                    loading ? (

                                                        <WebLoader>
                                                            រង់ចាំបន្ដិចយើងកំពុងទាញយកទិន្នន័យដើម្បីដំណើរការ
                                                        </WebLoader>

                                                    ) : blogs.length === 0 ? (

                                                        <li
                                                            style={{
                                                                textAlign: 'center',
                                                                padding: '30px',
                                                                color: '#64748b'
                                                            }}
                                                        >
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
                                <Button>
                                    មើលបន្ថែមទៀត 
                                    <ArrowRight />
                                </Button>
                            </div>
                        </div>
                        <StarryBackground />
                    </section>
                </div>
            </div>
        </main>
    );
}