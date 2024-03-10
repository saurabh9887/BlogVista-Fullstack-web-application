import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import { Cog } from "lucide-react";
import { useContext, useState } from "react";
import { Context } from "../../Context/Context.jsx";
import axios from "axios";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        updatedUser
      );
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      setSuccess(false);
      dispatch({ type: "UPDATE_FAILURE" });
      console.log("Something went wrong!");
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmitForm}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {user.profilePic ? (
              <img
                src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                alt="pp"
              />
            ) : (
              <img src="../../../Img/empty_avatart.jpg" />
            )}
            <label htmlFor="fileInput">
              <Cog />
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            name="name"
            onChange={(e) => setUsername(e.target.value)}
            style={{ paddingLeft: "8px" }}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ paddingLeft: "8px" }}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ paddingLeft: "8px" }}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && (
            <label style={{ color: "green", textAlign: "center" }}>
              Your changes updated successfully!
            </label>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
