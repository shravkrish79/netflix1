import Placeholder from "../assets/images/placeholder.jpg";
import { useCategory } from "../state/useCategory";
import DeleteCategory from "./DeleteCategory";
import UpdateCategory from "./UpdateCategory";
import {Link} from "react-router-dom";
import UpdateMedia from "./UpdateMedia";

export default function CategoryCard({ path, categoryData }) {

    const { id, BannerImage, Title } = categoryData;

    // Global state
    const { setModal } = useCategory();

    const DeleteItem = <DeleteCategory id={id} path={path} />;
    const UpdateMediaFile = <UpdateMedia data={categoryData} path={path}/>
    const UpdateItem = <UpdateCategory data={categoryData} path={path}/>
    // Properties
    const ImageSource = (BannerImage === null) ? Placeholder : BannerImage;
    

    return (

        <div className="card-data" >
            <img src={ImageSource} alt={Title} />
            <span>{Title}</span>
            <div className="modal-buttons">
                <button onClick={() => setModal(UpdateMediaFile)}>🏞️</button>
                <button onClick={() => setModal(UpdateItem)}>📝</button>
                <button onClick={() => setModal(DeleteItem)}>❌</button>
            </div>
            <Link className="card-link"/>
        </div >

    )
}