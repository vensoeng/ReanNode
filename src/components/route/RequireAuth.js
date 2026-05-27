// import { Navigate, useLocation } from "react-router-dom";
// import { isAuthenticated } from "../../utils/auth";

// export default function RequireAuth({ children }) {
//   const location = useLocation();

//   if (!isAuthenticated()) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// }

import { Navigate, useLocation } from 'react-router-dom';
import { getAccessToken, getAuthUser, clearAuthStorage } from '../../utils/auth';

export default function RequireAuth({ children }) {
  const token = getAccessToken();
  const user = getAuthUser();
  const location = useLocation();

  if (!token || !user) {
    clearAuthStorage();
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (Number(user.role) !== 1) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
        <h2>🚫 អត់ទោស! អ្នកមិនមានសិទ្ធិចូលទៅកាន់ទំព័រ Admin ឡើយ។</h2>
        <a href="/">ត្រឡប់ទៅទំព័រដើមវិញ</a>
      </div>
    );
    // return <Navigate to="/" replace />
  }

  return children;
}