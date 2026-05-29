
// import testImgStory from '../../assets/img/test_story_img.jpg';
import { API_URL, STORAGE } from '../../utils/auth';
import { NavLink } from 'react-router-dom';

export default function StoryPage({blog = {} , index = 0, newStory = false}) {
    const [imgLoaded, setImgLoaded] = useState(false);
    const imageUrl = API_URL + STORAGE + blog.img;

    return (
        <li style={{ "--bg-img": `url(${API_URL + STORAGE + blog.img})` }}>

            {newStory ? <div className="txtTop-story btn">ថ្មីៗនេះ</div> : ''}
            
            <NavLink to={`/storys/detail/${blog.id}`} className="image">
                {!imgLoaded && (
                        <div className="img-loader-placeholder">
                            <div className="spinner"></div>
                            <span style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>កំពុងផ្ទុក...</span>
                        </div>
                )}
                <img 
                    className={`img-c ${imgLoaded ? 'loaded' : 'loading'}`} 
                    src={imageUrl} 
                    alt={blog.title || "Story Image"} 
                    loading="lazy"
                    onLoad={() => setImgLoaded(true)}
                />
            </NavLink>
            <NavLink to={`/storys/detail/${blog.id}`} className="text text-main">
                <div className="title df-s">
                    <h2>{blog.title}</h2>
                    <span></span>
                </div>
                {/* <div className="sub">
                    <blockquote>
                        <p>ការរស់នៅក្នុងទំនាក់ទំនងមួយដែលមានតែអ្នកជាអ្នកដែលព្យាយាម លះបង់ ឬចូលចិត្តទទួលកំហុស មិនថានៅក្នុងទំនាក់ទំនងស្នេហា មិត្តភាព</p>
                    </blockquote>
                </div> */}
            </NavLink>
            <div className="detail">
                <div className="list df-l">
                    <strong>Main:</strong>
                    <div className="text df-l">
                        {blog.main_hastag && blog.main_hastag.split(/\s+/).filter(Boolean).map((tag, i) => (
                            <div className='btn' key={i}>
                                <p>{tag}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="list df-l">
                    <strong>Hastag:</strong>
                    <div className="text df-l">
                        {blog.hastag && blog.hastag.split(/\s+/).filter(Boolean).map((tag, i) => (
                            <div className='btn' key={i}>
                                <p>{tag}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </li>
    );
}
