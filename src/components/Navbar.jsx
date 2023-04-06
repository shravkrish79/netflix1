import Logo from "../assets/images/netflix-logo.svg";
import { GoSearch } from "react-icons/go"

export default function Navbar() {
    return (
        <div id="navbar">
            <img src={Logo} alt="netflix" />
            {/* <a href="." className="logo">NETFLIX</a> */}
            <div className="menu">
                <ul>
                    <li><a href=".">Home</a></li>
                    <li><a href=".">Movies</a></li>
                    <li><a href=".">TV Shows</a></li>
                    <li><a href=".">Documentaries</a></li>
                </ul>
            </div>
            {/* <div className="searchbox">
                <label htmlFor="search-input">
                    <input type="text" id="search-input" />
                    <GoSearch className="reacticons" /></label>
            </div> */}
        </div>
    )
}