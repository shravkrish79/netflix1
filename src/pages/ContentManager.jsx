import { Link } from "react-router-dom";
import CategoryData from "../data/category.json";


export default function ContentManager() {

    const categoryList = CategoryData.map((item) => <Link key={item.id} to={`/${item.path}`}>{item.name}</Link>);
    return (
        <div id="contentmanager">
            <h1> What do you want to add? </h1>
            <div className="card-container">
                {categoryList}
            </div>
        </div>
    )
}