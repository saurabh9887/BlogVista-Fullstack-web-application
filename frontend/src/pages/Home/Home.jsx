import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header.jsx";
import Posts from "../../components/posts/Posts.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/posts" + search
        );
        setPosts(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
