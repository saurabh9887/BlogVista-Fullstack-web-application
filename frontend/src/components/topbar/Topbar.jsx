import "./topbar.css";
import { Linkedin, Flame, CakeSlice, Contact2, Search } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context.jsx";

export default function Topbar() {
  // const user = false;
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topLeft">
        <Flame className="topIcon" color="#898991" />
        <CakeSlice className="topIcon" color="#898991" />
        <Contact2 className="topIcon" color="#898991" />
        <Linkedin className="topIcon" color="#898991" />
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {user && (
            <li className="topListItem" onClick={handleLogout}>
              LOGOUT
            </li>
          )}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/setting">
            {user.profilePic ? (
              <img className="topImg" src={PF + user.profilePic} alt="pp" />
            ) : (
              <img src="../../../Img/empty_avatart.jpg" className="topImg" />
            )}
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <Search />
      </div>
    </div>
  );
}
