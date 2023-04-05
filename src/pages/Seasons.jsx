import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { readDocument } from "../scripts/fireStore";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useSeason } from "../state/useSeason";
import SeasonItems from "../components/SeasonItems";
import { useCategory } from "../state/useCategory";
import SeasonAdd from "../components/SeasonAdd";

export default function Seasons() {
    const { seasonData, seasonDispatch, categoryId, getCategory } = useSeason();
    const { setModal } = useCategory();
    const [status, setStatus] = useState(0);
    const cid = (categoryId === null) ? getCategory('CID') : categoryId;
    const collection = 'TVShows';
    const path = collection + '/' + cid + '/';

    useEffect(() => {
        loadData(collection);
    }, []);

    async function loadData(collection) {
        const data = await readDocument(collection, cid).catch(onFail);
        onSuccess(data);
    }

    function onSuccess(data) {
        const result = [{ ...data }];
        seasonDispatch({ type: "INIT_ITEM", payload: result });
        setStatus(1);
    }

    function onFail() {
        setStatus(2);
    }

    // console.log(seasonData[0]);
    // const SeasonCard = (status === 1) && seasonData.Seasons.map((recs) => <SeasonItems key={recs} recs={recs} seasonData={seasonData} path={collection} />);
    const SeasonCard = (status === 1) && seasonData.map((recs) => recs.Seasons.map((itm) => <SeasonItems key={itm} recs={itm} seasonData={recs} path={path+itm} />));
    return (
        <div>
            {(status === 0) && <h1> Loading... </h1>}
            {status === 1 &&
                <div id="seasonpage">
                    <div className="container">
                        <div className="cards">
                            {(seasonData) && SeasonCard}
                            <Link key={"seasonAddForm"} onClick={() => { setModal(<SeasonAdd path={path} data={seasonData[0]} />) }}>
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