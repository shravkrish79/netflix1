import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { readDocument } from "../scripts/fireStore";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useSeason } from "../state/useSeason";
import SeasonItems from "../components/SeasonItems";
import { useCategory } from "../state/useCategory";
import SeasonAdd from "../components/SeasonAdd";

export default function Seasons() {
    const { seasonData, seasonDispatch, categoryId } = useSeason();
    const {setModal} = useCategory();
    const [status, setStatus] = useState(0);
    
    const collection = 'TVShows';
    const path = collection+'/'+categoryId+'/';

    useEffect(() => {
        loadData(collection);
    }, []);

    async function loadData(collection) {
        const data = await readDocument(collection, categoryId).catch(onFail);
        onSuccess(data);
    }

    function onSuccess(data) {
        seasonDispatch({ type: "INIT_ITEM", payload: data });
        setStatus(1);
    }

    function onFail() {
        setStatus(2);
    }

    const SeasonCard = (status === 1) && seasonData.Seasons.map((recs) => <SeasonItems key={recs} recs={recs} seasonData={seasonData} path={collection} />);

    return (
        <div>
            {(status === 0) && <h1> Loading... </h1>}
            {status === 1 &&
                <div id="seasonpage">
                    <div className="container">
                        <div className="cards">
                            {(seasonData) && SeasonCard}
                            <Link key={"seasonAddForm"} onClick={() => {setModal(<SeasonAdd path={path} data={seasonData}/>)} }>
                                <AiOutlineFileAdd className="reacticons" />
                            </Link>
                        </div>
                    </div>
                    <Link to={"/tvshows"} className="back-btn">Go Back</Link>
                </div>}
            {(status === 2) && <h1> Error </h1>}
        </div>
    )
}