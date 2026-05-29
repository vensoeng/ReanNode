
// import testImgStory from '../../assets/img/test_story_img.jpg';
import { API_URL, STORAGE } from '../../utils/auth';
import { NavLink } from 'react-router-dom';

export default function StoryPage({blog = {} , index = 0, newStory = false}) {
    return (
        <li style={{ "--bg-img": `url(${API_URL + STORAGE + blog.img})` }}>

            {newStory ? <div className="txtTop-story btn">ថ្មីៗនេះ</div> : ''}
            
            <NavLink to={`/storys/detail/${blog.id}`} className="image">
                <img className="img-c" src={API_URL + STORAGE + blog.img} alt="" />
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
