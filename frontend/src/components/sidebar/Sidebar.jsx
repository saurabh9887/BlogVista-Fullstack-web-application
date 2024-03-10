import axios from "axios";
import "./sidebar.css";
import { Linkedin, Flame, CakeSlice, Contact2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src="../../../Img/mikey.jpg" alt="" />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit cumque
          explicabo, adipisci, nam error excepturi modi expedita quae doloribus
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((cat) => (
            <li className="sidebarListItem">
              <Link className="link" to={`/?cat=${cat.name}`}>
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <Flame className="topIcon" color="#898991" />
          <CakeSlice className="topIcon" color="#898991" />
          <Contact2 className="topIcon" color="#898991" />
          <Linkedin className="topIcon" color="#898991" />
        </div>
      </div>
    </div>
  );
}
