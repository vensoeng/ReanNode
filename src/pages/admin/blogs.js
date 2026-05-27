import { useEffect, useState } from 'react';
import { API_URL, STORAGE , api} from '../../utils/auth';
import { Flash, Add, Magicpen, Lock1, Global, More, Edit} from 'iconsax-reactjs';
import WebLoader from '../../components/common/WebLoader';
import '../../assets/css/admin/table.css';
import '../../assets/css/admin/blog.css';
import CreateBlog from '../../components/common/formblog';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [LoadingDelete, setLoadingDelete] = useState(false);
  const [LoadingTextDelete, setLoadingTextDelete] = useState('កំពុងលុបទិន្នន័យអត្ថបទចេញពីប្រព័ន្ធ សូមរង់ចាំបន្តិច...')
  //for delete item 
  const handleDeleteSubmit = async (blogId) => {
    if (window.confirm("តើអ្នកពិតជាចង់លុបអត្ថបទនេះមែនទេ?")) {
      try {
        setLoadingDelete(true);

        const response = await api.delete(`/blogs/${blogId}`);

        if (response.status === 200 || response.status === 204) {
          setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
          setLoadingTextDelete('🗑️ លុបអត្ថបទបានជោគជ័យ!')
        }
      } catch (err) {
        console.error("Error deleting blog:", err);
        alert(`ការលុបបរាជ័យ៖ ${err.response?.data?.message || 'មានបញ្ហាក្នុងការតភ្ជាប់!'}`);
      }finally {
        setLoadingDelete(false);
      }
    }
  };

  const handleEditClick = (blogItem) => {
    setSelectedBlog(blogItem);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedBlog(null);     
    setShowForm(false);    
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/blogs`);
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false); 
      }
    };
    fetchBlogs();
  }, []);
 
  return (
    <div className='admin-blogs p-r'>
      <div className='admin-content'>
        {/* load animation when delete item  */}
        {LoadingDelete && (
          <WebLoader>{LoadingTextDelete}</WebLoader>
        )}

        {/* 💡 Form Modal */}
        {showForm && (
          <div className="blog-modal-backdrop">
            <div className="blog-modal-content">
              {/* បញ្ជូនអនុគមន៍បិទតាមរយៈ Prop onClose និងបញ្ជូនទិន្នន័យកែប្រែតាម editData */}
              <CreateBlog onClose={handleCloseForm} editData={selectedBlog} />
            </div>
          </div>
        )}
        
        {/* Nav item for count data */}
        <div className='adnav'>
          <div className='adnav-head'>
            <div className='adnvh-box df-s'>
              <h2 className='df-l'>
                <Flash className='icon icon-sm over-h' />
                បញ្ជីនៃទិន្នន័យ
              </h2>
              {/* 💡 ពេលចុចបន្ថែមថ្មី ត្រូវកំណត់ selectedBlog ទៅ null សិន ទើបបើក Form */}
              <button onClick={() => { setSelectedBlog(null); setShowForm(true); }} className='btn '>
                <Magicpen />
                បន្ថែមអត្ថបទ
              </button>
            </div>
          </div>
          
          <div className='adnv-box'>
            <div className='adnvul scroll-x'>
              <div className='adnvul-row'>
                <div className='adnvulrw-bx'>
                  <div className='adnvulrwbxh df-l'>
                    <Magicpen />
                    <h2>អត្ថបទមាន</h2>
                  </div>
                  <div className='adnvulrw-con'>
                    <blockquote>
                      <h2>មានចំនួន {blogs.length}</h2> 
                      <p>សរសេរអត្ថបទបង្ហោះរាល់ថ្ងៃដើម្បីទទួលបានការចាប់អារម្មណ៍ និងការទាក់ទងបង្កើត Gazat suicide។</p>
                    </blockquote>
                  </div>
                  <div className='adnvulrw-action df-r'>
                    <button type='button' onClick={() => { setSelectedBlog(null); setShowForm(true); }} className='btn'>
                      <Magicpen />
                      បន្ថែមអត្ថបទ
                    </button>
                  </div>
                </div>
              </div>

              <div className='adnvul-row adnav-unactive'>
                <div className='adnvulrw-bx'>
                  <div className='adnvulrwbxh df-l'>
                    <Magicpen />
                    <h2>អត្ថបទមាន</h2>
                  </div>
                  <div className='adnvulrw-con'>
                    <blockquote>
                      <h2>មានចំនួន ១០</h2>
                      <p>សរសេរអត្ថបទបង្ហោះរាល់ថ្ងៃដើម្បីទទួលបានការចាប់អារម្មណ៍ និងការទាក់ទងបង្កើត។</p>
                    </blockquote>
                  </div>
                  <div className='adnvulrw-action df-r'>
                    <button type='button' onClick={() => { setSelectedBlog(null); setShowForm(true); }} className='btn'>
                      <Add size="20" variant="Linear"/>
                      បន្ថែមថ្មី
                    </button>
                  </div>
                </div>
              </div>

              <div className='adnvul-row adnav-unactive'>
                <div className='adnvulrw-bx'>
                  <div className='adnvulrwbxh df-l'>
                    <Magicpen />
                    <h2>អត្ថបទមាន</h2>
                  </div>
                  <div className='adnvulrw-con'>
                    <blockquote>
                      <h2>មានចំនួន ១០</h2>
                      <p>សរសេរអត្ថបទបង្ហោះរាល់ថ្ងៃដើម្បីទទួលបានការចាប់អារម្មណ៍ និងការទាក់ទងបង្កើត។</p>
                    </blockquote>
                  </div>
                  <div className='adnvulrw-action df-r'>
                    <button type='button' onClick={() => { setSelectedBlog(null); setShowForm(true); }} className='btn'>
                      <Add size="20" variant="Linear"/>
                      បន្ថែមថ្មី
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ឆែកលក្ខខណ្ឌ Loading */}
        {loading ? (
          <WebLoader>រង់ចាំបន្ដិចយើងកំពុងទាញយកទិន្នន័យដើម្បីដំណើរការ</WebLoader>
        ) : (
          <section className="tb-section db-c" id="art-books">
            <div className="tb-section-body db-c">
              <div className="box">
                <table>
                  <thead>
                    <tr>
                      <th>រូបភាព និងចំណងជើង</th>
                      <th style={{ textAlign: 'center' }}>លុបទិន្នន័យ</th>
                      <th style={{ textAlign: 'center' }}>ម៉ឺនុយ</th>
                      <th>ពេលវេលា</th>
                      <th>សកម្មភាព</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                          មិនមានទិន្នន័យអត្ថបទឡើយ។
                        </td>
                      </tr>
                    ) : (
                      blogs.toReversed().map((blog, index) => (
                        <tr key={blog.id || index}>
                          <td>
                            <div className="box df-l">
                              <div className="img">
                                <img 
                                  src={blog.img ? API_URL + STORAGE + blog.img : "https://via.placeholder.com/150"} 
                                  alt="Blog Cover" 
                                />
                              </div>
                              <div className="text">
                                  <h2>{blog.title}</h2>
                                  <blockquote>
                                    <p>{blog.des}</p>
                                  </blockquote>
                                  <div className='icon icon-sm txt-be'>
                                    {Number(blog.status) === 1 ? <Global /> : <Lock1 />}
                                  </div>
                              </div>
                            </div>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <button 
                              type="button" 
                              className="bg-n" 
                              onClick={() => handleDeleteSubmit(blog.id)}
                            >
                              <div className="btn btn-ra btn-delete">
                                <span>លុបអត្ថបទ</span>
                              </div>
                            </button>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <button className="btn btn-ra icon-ra-sm btn-status">
                              <span>
                                <More />
                              </span>
                            </button>
                          </td>
                          <td>
                            {new Date(blog.created_at).toLocaleDateString('kh-KH', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </td>
                          <td>
                            {/* 💡 ៥. ហៅប្រើប្រាស់អនុគមន៍ handleEditClick រៀបចំថ្មីត្រឹមត្រូវ */}
                            <button type='button' onClick={() => handleEditClick(blog)} className='df-c btn-edit-action'>
                              <span>កែប្រែ</span>
                              <Edit size="16" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination Section */}
              <div className="tb-foot df-c dn">
                <div className="box df-c">
                  <button className="icon icon-ra icon-ra-sm over-h right-05"><i className="fa-solid fa-chevron-left"></i></button>
                  <ul className="df-c">
                    <li data-id="1" className="btn icon-ra-sm active"><span>០១</span></li>
                    <li data-id="2" className="btn icon-ra-sm"><span>០២</span></li>
                    <li data-id="3" className="btn icon-ra-sm"><span>០៣</span></li>
                    <li data-id="4" className="btn icon-ra-sm"><span>០៤</span></li>
                    <li data-id="5" className="btn icon-ra-sm"><span>០៥</span></li>
                  </ul>
                  <button className="icon icon-ra icon-ra-sm over-h left-05"><i className="fa-solid fa-chevron-right"></i></button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}