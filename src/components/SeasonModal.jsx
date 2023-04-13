import { useState, useEffect } from "react";
import { readDocuments } from "../scripts/fireStore";
import { useEpisode } from "../state/useEpisode";

export default function SeasonModal({ data, season }) {
    console.log(data)
    const { episodeData, episodeDispatch } = useEpisode();
    const [status, setStatus] = useState(0);

    const collection = 'TVShows/' + data.id + '/' + season;

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

    console.log(episodeData);

    return (
        <h1>Episode view</h1>
    )
}