import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // 1. Import useParams
import { API_URL } from '../utils/auth';

export default function StoryDetail() {
    const { id } = useParams(); 
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchSingleBlog = async () => {
            try {
                const res = await fetch(`${API_URL}/blogs/${id}`);
                const data = await res.json();
                setBlog(data);
            } catch (err) {
                console.error("Error fetching blog details:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSingleBlog();
        }
    }, [id]);

    if (loading) return <p>Loading story...</p>;
    if (!blog) return <p>Story not found.</p>;

    return (
        <div className="story-detail-container">
            <h1>{blog.title}</h1>
            <p className="hashtag-main">{blog.main_hastag}</p>
            <div className="story-content">
                <p>{blog.des}</p>
            </div>
        </div>
    );
}