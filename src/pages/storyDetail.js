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
     
    // check privait blog 
    if(!blog || Number(blog.status) !== 1 ){
        return;
    }
    return (
        <div className="styde">
            <div className='stydebox'>
                {loading && <WebLoader>យើងកំពុងធ្វើការទាញយកទិន្នន័យ..</WebLoader>}

                {!loading && (!blog || Number(blog.status) !== 1) ? (
                    <p style={{ padding: '20px', textAlign: 'center' }}>
                        រកមិនឃើញទិន្នន័យ ឬអត្ថបទនេះត្រូវបានដាក់ឯកជនជន (Private)!
                    </p>
                ) : (
                    blog && (
                        <div className="story-content" style={{ marginTop: '30px', lineHeight: '1.7' }}>
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