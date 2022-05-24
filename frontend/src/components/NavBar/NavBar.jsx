import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";

const Navbar = (props) => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>BlueTube</b>
          </Link>
        </li>
        <li>
        <SearchBar searchVideos={props.searchVideos}/>
        </li>
        <li>
          {user ? (
            <button className="btn btn-outline-primary btn-sm" onClick={logoutUser}>Logout</button>
          ) : (
            <button className="btn btn-outline-primary btn-sm" onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
