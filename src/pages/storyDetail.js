import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { API_URL, STORAGE } from '../utils/auth';

import WebLoader from '../components/common/WebLoader';
import { ArrowLeft, Moon, Link21 } from 'iconsax-reactjs';
import NotFoundPage from './404';
import '../assets/css/storyDetail.css';
export default function StoryDetail() {
    const navigate = useNavigate();

    const { id } = useParams(); 
    const [blog, setBlog] = useState(null);
    const [htmlContent, setHtmlContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingHtml, setLoadingHtml] = useState(false);
    
    useEffect(() => {
        const fetchSingleBlog = async () => {
            try {
                const res = await fetch(`${API_URL}/blogs/${id}`);
                const data = await res.json();
                setBlog(data);

                if (data && data.file) {
                    setLoadingHtml(true);
                    const fileUrl = `${API_URL}/images/storage/${data.file}`;
                    const fileRes = await fetch(fileUrl);
                    const htmlText = await fileRes.text(); 
                    setHtmlContent(htmlText);
                }
            } catch (err) {
                console.error("Error fetching blog or HTML:", err);
            } finally {
                setLoading(false);
                setLoadingHtml(false);
            }
        };

        if (id) {
            fetchSingleBlog();
        }
    }, [id]);
     
    // check privait blog 
    if(!blog && Number(blog.status) !== 1 ){
        return <NotFoundPage></NotFoundPage>;
    }
    return (
        <div className="styde styde-light">
            {/* this Is header  */}
            <div className='styde-head'>
                <div className='stydh-box df-s'>
                    <button 
                        type='button'
                        className='btn-home row btn ibtn'
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft />
                    </button>
                    <div className='row'>
                        <h2>{blog.title}</h2>
                    </div>
                    <div className='row df-l'>
                        <button className='btn ibtn'>
                            <Moon />
                        </button>
                        <button className='btn ibtn'>
                            <Link21 />
                        </button>
                    </div>
                </div>
            </div>
            {/* this is header of content */}
            <div className='stydebox'>
                {loading && <WebLoader>យើងកំពុងធ្វើការទាញយកទិន្នន័យ..</WebLoader>}

                {!loading && (!blog || Number(blog.status) !== 1) ? (
                    <p style={{ padding: '20px', textAlign: 'center' }}>
                        រកមិនឃើញទិន្នន័យ ឬអត្ថបទនេះត្រូវបានដាក់ឯកជនជន (Private)!
                    </p>
                ) : (
                    blog && (
                        <div className="story-content">
                            {/* heade */}
                            <div className='stydeconhead'>
                                <div className='stydeconhead-box'>
                                    <div className='styd-img'>
                                        <img 
                                            className="img-c" 
                                            src={API_URL + STORAGE + blog.img} 
                                            alt={blog.title || "Story image"} 
                                            style={{ 
                                                opacity: 1, 
                                                transition: 'opacity 0.4s ease-in-out',
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>
                                    <div className='styd-info'>
                                        <div className='stydinbox'>
                                            <h2>{blog.title}</h2>
                                            <blockquote>
                                                <p>{blog.des}</p>
                                            </blockquote>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* content writting */}
                            {loadingHtml ? (
                                <p style={{ color: '#94a3b8' }}>កំពុងទាញយកខ្លឹមសារអត្ថបទពីប្រព័ន្ធ...</p>
                            ) : (
                                <div
                                    className="html-render-zone"
                                    dangerouslySetInnerHTML={{ __html: htmlContent || '' }}
                                />
                            )}
                        </div>
                    )
                )}

            </div>
        </div>
    );
}