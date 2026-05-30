import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../utils/auth';

import WebLoader from '../components/common/WebLoader';

import '../assets/css/storyDetail.css';
export default function StoryDetail() {
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

    if (loading) return <WebLoader>យើងកំពុងធ្វើការទាញួកទិន្នន័យ..</WebLoader>;
    if (!blog) return <p style={{padding: '20px' }}>រកមិនឃើញទិន្នន័យទេ!</p>;
    
    // check privait blog 
    if(Number(blog.status) !== 1 ){
        return;
    }
    return (
        <div className="styde">
            <div className='stydebox'>
                {/* <h1>{blog.title}</h1>
                <p className="hashtag-main" style={{ color: '#9553DD' }}>#{blog.main_hastag}</p>
                {blog.img && (
                    <div className="story-cover" style={{ margin: '20px 0' }}>
                        <img
                            src={`${API_URL}/images/storage/${blog.img}`}
                            alt={blog.title}
                            style={{ width: '100%', maxWidth: '800px', borderRadius: '12px' }}
                        />
                    </div>
                )} */}

                <div className="story-content" style={{ marginTop: '30px', lineHeight: '1.7' }}>
                    {loadingHtml ? (
                        <p style={{ color: '#94a3b8' }}>កំពុងទាញយកខ្លឹមសារអត្ថបទពីប្រព័ន្ធ...</p>
                    ) : (
                        <div
                            className="html-render-zone"
                            // 🚀 បញ្ចូលកូដ HTML ដែលទាញបានពី GitHub មកបង្ហាញនៅលើអេក្រង់
                            dangerouslySetInnerHTML={{ __html: htmlContent || blog.des }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}