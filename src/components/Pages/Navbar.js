import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../store/AuthSlice";
import { useHistory } from "react-router-dom";
import { mailActions } from "../store/MailSlice";

const Navbar = () => {
  const disptach = useDispatch();
  const history = useHistory()
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

  const logoutHandler = () => {
    disptach(authSliceActions.logout());
    disptach(mailActions.onLogOut())
    history.replace('/login');
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-header">MailBox</h1>
      <ul className="navbar-nav">
        {isAuthenticated ? (
          <>
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/inbox" className="nav-link">
                Inbox
              </Link>
            </li>
            <li className="nav-item">
              <button className="button" onClick={logoutHandler}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;

// import React from "react";
// import "./Navbar.css";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { authSliceActions } from "../store/AuthSlice";
// import { useHistory } from "react-router-dom";
// import { mailActions } from "../store/MailSlice";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
//   const currentLocation = history.location.pathname;

//   const logoutHandler = () => {
//     dispatch(authSliceActions.logout());
//     dispatch(mailActions.onLogOut());
//     history.replace("/login");
//   };

//   const renderNavLinks = () => {
//     if (isAuthenticated) {
//       return (
//         <>
//           <li className="nav-item">
//             <Link to="/home" className="nav-link">
//               Home
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/inbox" className="nav-link">
//               Inbox
//             </Link>
//           </li>
//           <li className="nav-item">
//             <button className="button" onClick={logoutHandler}>
//               Logout
//             </button>
//           </li>
//         </>
//       );
//     } else if (currentLocation === "/login") {
//       return (
//         <li className="nav-item">
//           <Link to="/login" className="nav-link">
//             Login
//           </Link>
//         </li>
//       );
//     } else {
//       return null;
//     }
//   };

//   return (
//     <nav className="navbar">
//       <h1 className="navbar-header">MailBox</h1>
//       <ul className="navbar-nav">
//         {renderNavLinks()}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
