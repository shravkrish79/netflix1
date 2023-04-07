import { useState } from "react";
import Logo from "../assets/images/netflix-logo.svg";
import { GoSearch } from "react-icons/go";
import { MdOutlineNotificationsNone } from "react-icons/md";
import userIcon from "../assets/netflix-profile-icons/216 - 6FgZxbi.png";
import {Link} from "react-router-dom";


export default function Navbar() {
    const [toggle, setToggle] = useState(false);

    function showsearchbox() {
        setToggle(!toggle);
    }

    return (
        <div id="navbar">
            <img src={Logo} alt="netflix" />
            <div className="menu">
                <ul>
                    <li><a href=".">Home</a></li>
                    <li><Link to={"/movies"}>Movies</Link></li>
                    <li><Link to={"/tvshows"}>TV Shows</Link></li>
                    <li><Link to={"/documentary"}> Documentaries</Link></li>
                </ul>
            </div>
            <div className="searchbox">
                <input type="search" id="searchinput" placeholder="Type to search..." className={toggle ? "showsearch" : "hidesearch"} />
                <div className="search-btn" onClick={() => showsearchbox()}><GoSearch id="searchicon" /></div>
            </div>
            <MdOutlineNotificationsNone className="reacticons" />
            <img src={userIcon} alt={"yellow default icon"} className="reacticons" />
        </div>
    )
}