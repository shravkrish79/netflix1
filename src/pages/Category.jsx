import { useEffect, useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { useCategory } from "../state/useCategory";
import { readDocuments } from "../scripts/fireStore";
import CategoryCard from "../components/CategoryCard";
import ModalAddForm from "../components/ModalAddForm";

export default function Category() {
    const { categoryData, dispatch, setModal } = useCategory();
    const [status, setStatus] = useState(0);
    const { category } = useParams();
    const collection = category === "movies" ? "Movies" : (category === "tvshows" ? "TVShows" : "Documentaries");
    useEffect(() => {
        loadData(collection);
    }, []);
    async function loadData(collection) {
        const data = await readDocuments(collection).catch(onFail);
        onSuccess(data);
    }

    function onSuccess(data) {
        dispatch({ type: "INIT_ITEM", payload: data });
        setStatus(1);
    }

    function onFail() {
        setStatus(2);
    }

    const categoryItems = (categoryData.map((recs) => <CategoryCard data={category} />))

    return (
        <div>
            {(status === 0) && <h1> Loading... </h1>}
            {status === 1 &&
                <div id="category">
                    <div className="card-container">
                        {categoryData.length > 0 && <Link>{categoryItems}</Link>}
                        <Link key={"AddForm"} onClick={() => { setModal(<ModalAddForm formData={collection}/>) }}><AiOutlineFileAdd className="reacticons" /></Link>
                    </div>
                </div>}
            {(status === 2) && <h1> Error </h1>}
        </div>
    )
}