import Placeholder from "../assets/images/placeholder.jpg";
import { useCategory } from "../state/useCategory";
import DeleteCategory from "./DeleteCategory";
import UpdateCategory from "./UpdateCategory";
import {Link} from "react-router-dom";
import UpdateMedia from "./UpdateMedia";
import { useSeason } from "../state/useSeason";

export default function CategoryCard({ path, categoryData }) {

    const { id, BannerImage, Title } = categoryData;
    const showname = Title.replace(/ /g,"");
    

    // Global state
    const { setModal } = useCategory();
    const { idDispatch } = useSeason();

    const DeleteItem = <DeleteCategory id={id} path={path} />;
    const UpdateMediaFile = <UpdateMedia data={categoryData} path={path}/>
    const UpdateItem = <UpdateCategory data={categoryData} path={path}/>
    // Properties
    const ImageSource = (BannerImage === null) ? Placeholder : BannerImage;

    function setId(id){
        idDispatch({ type: 'INIT_ITEM', payload: id });
    }

    return (

        <div className="card-data" >
            <img src={ImageSource} alt={Title} />
            <span>{Title}</span>
            <div className="modal-buttons">
                <button onClick={() => setModal(UpdateMediaFile)}>🏞️</button>
                <button onClick={() => setModal(UpdateItem)}>📝</button>
                <button onClick={() => setModal(DeleteItem)}>❌</button>
            </div>
            {(path !=='TVShows') && <Link className="card-link"/>}
            {(path ==='TVShows') && <Link className="card-link" to={`/tvshows/${showname}`} onClick={()=> setId(id)}/>}
        </div >

    )
}