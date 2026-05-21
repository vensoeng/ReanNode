import '../../assets/css/login.css';
import { Record, Hashtag, Book1 } from 'iconsax-reactjs';
import Button from '../../components/common/button';

export default function LoginPage()
{
    return(
        <>
        <div>
            <div className="main">
                {/* this is for block text  */}
                <div className="row row-blog-text">
                    <div className="box">
                        <h2>*</h2>
                        <h1>
                            សូមស្វាគមន៍<br />
                            អ្នកប្រើប្រាសជាទីគោរព!
                        </h1>
                        <blockquote>
                            <p>រីករាយក្នុងការជួបអ្នកម្តងទៀត! សូមបញ្ចូលអ៊ីមែល និងពាក្យសម្ងាត់របស់អ្នកដើម្បីចូលប្រើប្រាសគណនី។</p>
                        </blockquote>
                    </div>
                </div>
                {/* this is for block input  */}
                <div className="row row-form">
                    <div clasName="box">
                        {/* this is profile  */}
                        <div className="main-pr">
                            <div className="pr">
                                <div className="img">
                                    <img className='img-c' alt="About" width="200" />
                                </div>
                            </div>
                            <div className="pr-sub">
                                <blockquote>
                                    <h2>ចូលគណនី</h2>
                                    <p>សូមបំពេញព័ត៌មានការចូលប្រើប្រាសរបស់អ្នកដើម្បីបន្តរ</p>
                                </blockquote>
                            </div>
                        </div>
                        {/* this is form txt*/}
                        <div className="maim-form">
                            <div className="fbox">
                                <div className="txt-main">
                                    <div className="txt-box">
                                        <div className="txt-i">
                                            <Hashtag/>
                                        </div>
                                        <div className="txt">
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}