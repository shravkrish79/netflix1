import Placeholder from "../assets/images/placeholder.jpg";
import {Link} from "react-router-dom";
import { useCategory } from "../state/useCategory";
import DeleteSeason from "./DeleteSeason";

export default function SeasonItems({path,seasonData, recs}){

    const { id, BannerImage,Title } = seasonData;
    const showname = Title.replace(/ /g,"");

    const { setModal } = useCategory();

    const DeleteItem = <DeleteSeason id={id} path={path} seasonNumber={recs}/>;
    // Properties
    const ImageSource = (BannerImage === null) ? Placeholder : BannerImage;
    

    return (

        <div className="card-data" >
            <img src={ImageSource} alt={recs} />
            <span>{recs}</span>
            <div className="modal-buttons">
                <button onClick={() => setModal(DeleteItem)}>❌</button>
            </div>
            {(!path.includes('TVShows')) && <Link className="card-link"/>}
            {(path.includes('TVShows')) && <Link className="card-link" to={`/tvshows/${showname}/${recs}`}/>}
        </div >

    )
}