import { useState, useEffect } from "react";
import { readDocuments } from "../scripts/fireStore";
import { useEpisode } from "../state/useEpisode";
import EpisodeList from "./EpisodeList";

export default function SeasonModal({ data, season, mediacategory }) {
    console.log(season)
    const { episodeData, episodeDispatch } = useEpisode();
    const [status, setStatus] = useState(0);

    const collection = 'TVShows/' + data.id + '/' + season;

    useEffect(() => {
        loadData(collection);
    }, [collection]);

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

    console.log(episodeData);
    const EpisodeCards = (status === 1) && episodeData.length > 0 &&
        episodeData.map((recs) => <EpisodeList key={recs.id} data={recs} mediacategory={mediacategory}
           season={season} Title={data.Title} />)

    return (
        <div>
            {(status === 1) && episodeData.length > 0 && EpisodeCards}
        </div>
    )
}