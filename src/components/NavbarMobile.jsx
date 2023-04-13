import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Logo from "../assets/images/netflix-logo.svg";
import { useNavigate } from "react-router-dom";
import { useUser } from "../state/useUser";
import { GoSearch } from "react-icons/go";

export default function NavbarMobile() {
    const Navigate = useNavigate();
    const { saveUID, setUid, setIsAdmin, saveAdmin } = useUser();
    const [toggle, setToggle] = useState(false);

    function showsearchbox() {
        setToggle(!toggle);
        document.getElementById('searchinput').focus();
    }

    function onLogout() {
        saveUID("");
        setUid("");
        saveAdmin(false);
        setIsAdmin(false);
        Navigate("/");
    }
    return (
        <div id="navbar-mobile">
            <div className="nav-items">
                <ul>
                    <li>
                        <a href="javascript: void(0);"><FaBars className="bar-icon" /></a>
                        <ul>
                            <li> <a href="/">Home</a> </li>
                            <li> <a href="/movies">Movies</a> </li>
                            <li> <a href="/tvshows">TVShows</a> </li>
                            <li> <a href="/documentaries">Documentary</a> </li>
                            <li><a href="/" onClick={() => onLogout()}>Logout</a></li>
                        </ul>
                    </li>
                </ul>
                <div className="logo">
                    <a href="/"><img src={Logo} alt="netflix red colour text" /></a>
                </div>
                <div className="mobilesearchbox">
                    <input type="search" id="mobilesearch" placeholder="Search: Titles, Genres" />
                    <GoSearch id="mobilesearchicon" />
                </div>

            </div>
        </div >
    )
}