import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../state/useCategory";
import Placeholder from "../../assets/images/placeholder.jpg";
import SeasonModal from "../SeasonModal";
import { useState, useRef } from "react";


export default function DisplayModal({ data, mediacategory }) {
    // console.log(data);
    // console.log(mediacategory)

    const selectRef = useRef();
    const Options = data.Seasons.map(itm => <option value={itm}>{itm}</option>)


    const { setModal } = useCategory();
    const Navigate = useNavigate();
    const defaultYear = new Date().getFullYear().toString();
    function playvideos() {
        setModal(null);
        Navigate(`/${mediacategory}/${data.Title}`, { state: { data: data } })
    }

    let seasondetail = <SeasonModal data={data} season={'Season1'} />

    return (
        <div id="displaymodal">
            <img src={data.BannerImage || Placeholder} alt={data.Title} />
            <div className="BannerContent">
                <span >{data.Title}</span>
                <div className="Banner-btn">
                    <button className="play-btn" onClick={() => playvideos()}><FaPlay /><h3>Play</h3></button>
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
                <div>
                    <div className="list-episodes">
                        <select id="showmodal-select" value={this} required={false} disabled={false}
                            onChange={(e) => e.target.value}>
                            <option value="">None</option>
                            {Options}
                        </select>
                    </div>
                    {seasondetail}
                </div>
            }
        </div>
    )
}