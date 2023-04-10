import { FaPlay } from "react-icons/fa";

export default function DisplayModal({ data }) {
    console.log(data);
    
    return (
        <div id="displaymodal">
            <img src={data.BannerImage} alt={data.Title} />
            <div className="BannerContent">
                <span >{data.Title}</span>
                <div className="Banner-btn">
                    <button className="play-btn" ><FaPlay /><h3>Play</h3></button>
                </div>
            </div>
            <div className="display-bottom">
                <h1> </h1>
                <div className="bottom-content">
                    <h3>
                        <h4>Released Year: {(data.ReleasedDate||'2022').slice(0, 4)}</h4>
                        <h4> {"Duration: "+data.TimeLength||data.Seasons.length+' Seasons'}</h4>
                        <h4>Rating: {data.Rating}</h4>
                    </h3>
                    <h3>Cast: {data.Casting}</h3>
                    <h3>{data.ShortDesc}</h3>
                    <h3>Genres:{data.Genres}</h3>
                </div>
            </div>
        </div>
    )
}