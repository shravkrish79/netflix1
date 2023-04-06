import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useCategory } from "../state/useCategory";
import { useSeason } from "../state/useSeason";
import { useEpisode } from "../state/useEpisode";
import { readDocuments } from "../scripts/fireStore";
import EpisodeCard from "../components/Episodes/EpisodeCard";
import ModalAddForm from "../components/ModalAddForm";

export default function Episode() {
    const [status, setStatus] = useState(0);
    const { setModal } = useCategory();
    const { categoryId, getCategory } = useSeason();
    const cid = (categoryId === null) ? getCategory('CID') : categoryId;
    const { episodeData, episodeDispatch } = useEpisode();

    const { showname, season } = useParams();
    const collection = 'TVShows/' + cid + '/' + season;

    useEffect(() => {
        loadData(collection);
    }, []);

    async function loadData(collection) {
        const data = await readDocuments(collection).catch(onFail);
        onSuccess(data);
    }

    function onSuccess(data) {
        episodeDispatch({ type: "INIT_ITEM", payload: data });
        setStatus(1);
    }

    function onFail() {
        setStatus(2);
    }
    // console.log(episodeData);
    const EpisodeList = (status === 1) && (episodeData.map((recs) => <EpisodeCard key={recs.id} data={recs} path={collection} />))
    return (
        <div>
            {(status === 0) && <h1> Loading... </h1>}
            {(status === 2) && <h1> ⚠ Error </h1>}
            {(status === 1) &&
                <div id="episodepage">
                    <div className="container">
                        <div className="cards">
                            {(episodeData) && EpisodeList}
                            <Link key={"EpsidoeAddForm"} onClick={() => { setModal(<ModalAddForm path={collection} createType={"Episode"}/>) }}>
                                <AiOutlineFileAdd className="reacticons" />
                            </Link>
                        </div>
                    </div>
                    <Link to={`/tvshows/${showname}`} className="back-btn">Go Back</Link>
                </div>
            }
        </div>
    )
}