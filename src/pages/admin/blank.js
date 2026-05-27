import { useEffect, useState } from 'react';
import { Edit2, Trash, Eye, Add } from 'iconsax-reactjs';
import { API_URL, STORAGE } from '../../utils/auth';
import '../../assets/css/admin/blogTable.css'; // ឯកសារ CSS របស់យើង

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // កន្លែងទាញទិន្នន័យពី Backend (បើកប្រើពេលអ្នកភ្ជាប់ជាមួយ API ពិត)
  /*
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/blogs`);
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);
  */

  // ទិន្នន័យគំរូសម្រាប់រចនា UI (Mock Data)
  const mockBlogs = [
    {
      id: 1,
      title: "របៀបរៀបចំរចនាសម្ព័ន្ធ Node.js MVC ឱ្យមានសុវត្ថិភាព",
      des: "ការណែនាំអំពីការបង្កើត Backend ដោយប្រើប្រាស់ Express...",
      status: "public",
      img: "1716723954000.png",
      created_at: "2026-05-25T03:24:00.000Z"
    },
    {
      id: 2,
      title: "យល់ដឹងពី Frontend Security ជាមួយ React Router",
      des: "មេរៀនពង្រឹងសុវត្ថិភាពទំព័រ Admin កុំឱ្យទិន្នន័យលេចធ្លាយ...",
      status: "draft",
      img: null,
      created_at: "2026-05-26T04:12:00.000Z"
    }
  ];

  const displayBlogs = blogs.length > 0 ? blogs : mockBlogs;

  const handleDelete = (id) => {
    if(window.confirm("តើអ្នកពិតជាចង់លុបអត្ថបទ Blog នេះមែនទេ?")) {
      console.log("Delete blog ID:", id);
      // ហៅទៅកាន់ API លុបរបស់អ្នកនៅទីនេះ
    }
  };

  return (
    <div className="admin-blog-container">
      {/* ផ្នែកក្បាលលើ Table */}
      <div className="table-header-actions">
        <div>
          <h2>ការគ្រប់គ្រងអត្ថបទ Blogs ({displayBlogs.length})</h2>
          <p className="subtitle">អ្នកអាចបង្កើត កែប្រែ ឬលុបអត្ថបទរបស់អ្នកនៅទីនេះ</p>
        </div>
        <button className="btn-create-blog">
          <Add size="20" variant="Linear"/>
          <span>សរសេរ Blog ថ្មី</span>
        </button>
      </div>

      {/* ផ្នែកតារាងបង្ហាញទិន្នន័យ */}
      <div className="table-responsive">
        <table className="admin-blog-table">
          <thead>
            <tr>
              <th>រូបភាព</th>
              <th>ចំណងជើង និងសេចក្តីពិពណ៌នា</th>
              <th>កាលបរិច្ឆេទ</th>
              <th>ស្ថានភាព</th>
              <th style={{ textAlign: 'center' }}>សកម្មភាព</th>
            </tr>
          </thead>
          <tbody>
            {displayBlogs.map((blog) => (
              <tr key={blog.id}>
                {/* រូបភាព Cover */}
                <td className="col-img">
                  <div className="blog-avatar">
                    {blog.img ? (
                      <img src={`${API_URL}${STORAGE}${blog.img}`} alt={blog.title} />
                    ) : (
                      <div className="no-img-placeholder">No Img</div>
                    )}
                  </div>
                </td>

                {/* ចំណងជើង និង Description ខ្លី */}
                <td className="col-info">
                  <span className="blog-title-text">{blog.title}</span>
                  <p className="blog-short-des">{blog.des || "គ្មានសេចក្តីពិពណ៌នាសង្ខេប..."}</p>
                </td>

                {/* ថ្ងៃខែបង្កើត */}
                <td className="col-date">
                  {new Date(blog.created_at).toLocaleDateString('kh-KH', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </td>

                {/* ស្ថានភាព Status */}
                <td className="col-status">
                  <span className={`status-badge ${blog.status}`}>
                    {blog.status === 'public' ? '👨‍💻 សាធារណៈ' : '📝 ព្រាង'}
                  </span>
                </td>

                {/* ប៊ូតុង Actions (មើល, កែ, លុប) */}
                <td className="col-actions">
                  <div className="action-buttons-group">
                    <button className="btn-action view" title="មើលផ្ទាំងផ្សាយ">
                      <Eye size="18" />
                    </button>
                    <button className="btn-action edit" title="កែប្រែ">
                      <Edit2 size="18" />
                    </button>
                    <button className="btn-action delete" title="លុប" onClick={() => handleDelete(blog.id)}>
                      <Trash size="18" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}