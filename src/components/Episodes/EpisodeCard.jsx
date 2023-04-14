import Placeholder from "../../assets/images/placeholder.jpg";
import { useCategory } from "../../state/useCategory";
import { Link } from "react-router-dom";
import DeleteCategory from "../DeleteCategory";
import UpdateMedia from "../UpdateMedia";
import UpdateCategory from "../UpdateCategory";

export default function Episode({ data, path, showname }) {
    const { setModal } = useCategory();
    const {id,EpisodeImage} = data;
    const ImageSource = (EpisodeImage === null) ? Placeholder : EpisodeImage;
    const DeleteItem = <DeleteCategory id={id} path={path} deleteType={"Episode"}/>;
    const UpdateMediaFile = <UpdateMedia data={data} path={path} updatemediatype={"Episode"}/>
    const UpdateItem = <UpdateCategory data={data} path={path} updatetype={"Episode"}/>
    // console.log(path)
    // console.log(data)
    return (
        <div className="card-data" >
            <img src={ImageSource} alt={id} />
            <span>{id}</span>
            <div className="modal-buttons">
                <button onClick={() => setModal(UpdateMediaFile)}>🏞️</button>
                <button onClick={() => setModal(UpdateItem)}>📝</button>
                <button onClick={() => setModal(DeleteItem)}>❌</button>
            </div>
            {(!path.includes('TVShows')) && <Link className="card-link" />}
            {(path.includes('TVShows')) && <Link className="card-link" to={`/tvshows/${showname}/${data.SeasonNumber}/${data.EpisodeNumber}`} state={{data}}/>}
        </div >

    )
}