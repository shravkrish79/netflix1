import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Logo from "../assets/images/netflix-logo.svg";
import { useNavigate } from "react-router-dom";
import { useUser } from "../state/useUser";
import { GoSearch } from "react-icons/go";
import { useCategory } from "../state/useCategory";
import { useEpisode } from "../state/useEpisode";

export default function NavbarMobile() {
    const Navigate = useNavigate();
    const { saveUID, setUid, setIsAdmin, saveAdmin } = useUser();
    const [toggle, setToggle] = useState(false);
    const { displayData, setDisplayData, initDisplayData } = useCategory();
    const { setIsSearch } = useEpisode();

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

    function searchVideo(e) {
        e.preventDefault();
        setIsSearch({ type: 'SET_ITEM', payload: true });
        const searchkey = e.target.value;
        const searchTerm = searchkey.toLowerCase();
        if (searchkey !== '') {
            const filterData = displayData.map((recs) => {
                return { ...recs, dataList: recs.dataList.filter((itm) => itm.Title.toLowerCase().includes(searchTerm)) }
            });
            let dataLength = 0;
            const filterDataLength = filterData.map((recs) => { dataLength += recs.dataList.length });
            if (dataLength > 0) {
                setDisplayData({ type: 'SET_ITEM', payload: filterData });
            }
            else {
                setDisplayData({ type: 'SET_ITEM', payload: initDisplayData });
            }
        }
        else {
            setDisplayData({ type: 'SET_ITEM', payload: initDisplayData });
            setIsSearch({ type: 'SET_ITEM', payload: false });
        }
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
                    <input type="search" id="mobilesearch" placeholder="Search: Titles, Genres" onChange={(e) => searchVideo(e)} />
                    <GoSearch id="mobilesearchicon" />
                </div>

            </div>
        </div >
    )
}