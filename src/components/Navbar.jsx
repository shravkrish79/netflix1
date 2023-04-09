import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../state/useUser";
import { useProfile } from "../state/useProfile";
import Logo from "../assets/images/netflix-logo.svg";
import { GoSearch } from "react-icons/go";
import { MdOutlineNotificationsNone } from "react-icons/md";
import userIcon from "../assets/netflix-profile-icons/216 - 6FgZxbi.png";



export default function Navbar() {
    const [toggle, setToggle] = useState(false);
    const Navigate = useNavigate();
    const {profileData} = useProfile();
    const { saveUID, setUid, uid, setIsAdmin, saveAdmin } = useUser();
    const profile = profileData.find((item) => item.uid === uid);

    function showsearchbox() {
        setToggle(!toggle);
    }

    // console.log(profile);

    function onLogout() {
        saveUID("");
        setUid("");
        saveAdmin(false);
        setIsAdmin(false);
        Navigate("/");
    }


    return (
        <div id="navbar">
            <a href="/"><img src={Logo} alt="netflix" /></a>
            <div className="menu">
                <ul>
                    <li><a href=".">Home</a></li>
                    <li><a href={"/movies"}>Movies</a></li>
                    <li><a href={"/tvshows"}>TV Shows</a></li>
                    <li><a href={"/documentary"}> Documentaries</a></li>
                    <li><a href={"/"} onClick={() => onLogout()}> Logout</a></li>
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