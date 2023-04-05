import Placeholder from "../assets/images/placeholder.jpg";
import UpdateCategory from "./UpdateCategory";
import {Link} from "react-router-dom";
import UpdateMedia from "./UpdateMedia";
import { useCategory } from "../state/useCategory";
import DeleteSeason from "./DeleteSeason";

export default function SeasonItems({path,seasonData, recs}){

    const { id, BannerImage } = seasonData;

    const { setModal } = useCategory();

    const DeleteItem = <DeleteSeason id={id} path={path} seasonNumber={recs}/>;
    // const UpdateMediaFile = <UpdateMedia data={seasonData} path={path}/>
    // const UpdateItem = <UpdateCategory data={seasonData} path={path}/>
    // Properties
    const ImageSource = (BannerImage === null) ? Placeholder : BannerImage;
    

    return (

        <div className="card-data" >
            <img src={ImageSource} alt={recs} />
            <span>{recs}</span>
            <div className="modal-buttons">
                {/* <button onClick={() => setModal(UpdateMediaFile)}>🏞️</button>
                <button onClick={() => setModal(UpdateItem)}>📝</button> */}
                <button onClick={() => setModal(DeleteItem)}>❌</button>
            </div>
            {(path !=='TVShows') && <Link className="card-link"/>}
            {(path ==='TVShows') && <Link className="card-link" to={"/tvshows/seasons"}/>}
        </div >

    )
}