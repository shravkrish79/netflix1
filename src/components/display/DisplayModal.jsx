import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../state/useCategory";
import Placeholder from "../../assets/images/placeholder.jpg";
import SeasonModal from "../SeasonModal";
import { useState } from "react";
// import { useState, useRef } from "react";


export default function DisplayModal({ data, mediacategory }) {
    // console.log(data);
    // console.log(mediacategory)

    let Options;
    const [selectedValue, setSelectedValue] = useState(data.Seasons ? data.Seasons[0] : null);

    if (mediacategory === 'tvshows') {
        Options = data.Seasons.map(itm => <option value={itm}>{itm}</option>)
    }

    const episodes = <SeasonModal data={data} season={selectedValue} mediacategory={mediacategory}/>
    const { setModal } = useCategory();
    const Navigate = useNavigate();
    const defaultYear = new Date().getFullYear().toString();
    function playvideos() {
        setModal(null);
        Navigate(`/${mediacategory}/${data.Title}`, { state: { data: data } })
    }

    return (
        <div id="displaymodal">
            <img src={data.BannerImage || Placeholder} alt={data.Title} />
            <div className="BannerContent">
                <span >{data.Title}</span>
                <div className="Banner-btn">
                    {mediacategory !== 'tvshows' && <button className="play-btn" onClick={() => playvideos()}><FaPlay /><h3>Play</h3></button>}
                    {mediacategory === 'tvshows' && <div >
                        <select id="showmodal-select" value={selectedValue} required={false} disabled={false}
                            onChange={(e) => setSelectedValue(e.target.value)}>
                            {Options}
                        </select>
                    </div>}
                </div>
            </div>
            <div className="display-bottom">
                <h1> </h1>
                <div className="bottom-content">
                    <h3>
                        <h4>Released Year: {((data.ReleasedDate) ? data.ReleasedDate : defaultYear).slice(0, 4)}</h4>
                        <h4> {"Duration: " + ((data.TimeLength) ? data.TimeLength : data.Seasons.length + ' Seasons')}</h4>
                        <h4>Rating: {data.Rating}</h4>
                    </h3>
                    <h3>Cast: {data.Casting}</h3>
                    <h3>{data.LongDesc}</h3>
                    <h3>Genres:{data.Genres}</h3>
                </div>
            </div>
            {(mediacategory === 'tvshows') &&
                <div className="list-episodes">

                    {episodes}
                </div>
            }
        </div>
    )
}