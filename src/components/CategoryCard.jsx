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
    
    // console.log(categoryData);
    // Global state
    const { setModal } = useCategory();
    const { saveCID,categoryDispatch } = useSeason();

    const DeleteItem = <DeleteCategory id={id} path={path} deleteType={"Category"} />;
    const UpdateMediaFile = <UpdateMedia data={categoryData} path={path} updatemediatype={"Category"}/>
    const UpdateItem = <UpdateCategory data={categoryData} path={path} updatetype={"Category"}/>
    // Properties
    const ImageSource = (BannerImage === null) ? Placeholder : BannerImage;

    function setCategoryID(id){
        saveCID(id);
        categoryDispatch({ type: "INIT_ITEM", payload: id });
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
            {(path ==='TVShows') && <Link className="card-link" onClick={()=>setCategoryID(id)} to={`/tvshows/${showname}`} />}
        </div >

    )
}