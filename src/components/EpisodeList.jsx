import { Link } from "react-router-dom";
import { useCategory } from "../state/useCategory";
import Placeholder from "../assets/images/placeholder.jpg";
import { AiOutlinePlayCircle } from "react-icons/ai";

export default function EpisodeList({ data, mediacategory, season, Title }) {
    // console.log(data);
    const { setModal } = useCategory();
    const ImageSource = (data.EpisodeImage === null) ? Placeholder : data.EpisodeImage;
    return (
        <div className="episodes">
            <div className="episode-media">
                <img src={ImageSource} alt={data.EpisodeTitle} />
                <AiOutlinePlayCircle className="react-playicon"/>
            </div>
            <div className="episodecontent">
                <h2>{data.EpisodeTitle}</h2>
                <h4>{data.EpisodeDesc}</h4>
            </div>
            <Link to={`/${mediacategory}/${Title}/${season}/${data.id}`} state={{ data }}
                onClick={() => setModal(null)}> </Link>
        </div>
    )
}