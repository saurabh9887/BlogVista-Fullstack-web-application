import { SquarePen, Trash2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./singlePost.css";
import { Context } from "../../Context/Context";

export default function SinglePost() {
  const [post, setPost] = useState({});
  const location = useLocation();
  const PF = "http://localhost:5000/images/";

  const path = location.pathname.split("/")[2];
  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`http://localhost:5000/api/posts/${path}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log("Something went wrong!");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:5000/api/posts/" + path, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
      window.location.replace("/");
    } catch (error) {
      console.log("Something went wrong!");
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}
        {updateMode ? (
          <input
            type="text"
            className="singlePostTitleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post.title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <SquarePen
                  className="singlePostIcon"
                  onClick={() => setUpdateMode(true)}
                />
                <Trash2 className="singlePostIcon" onClick={handleDelete} />
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span>
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b className="singlePostAuthor">{post.username}</b>
            </Link>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{post.desc}</p>
        )}
        {updateMode && (
          <button className="updatePost" onClick={handleUpdate}>
            Update Post
          </button>
        )}
      </div>
    </div>
  );
}
