import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { readDocuments } from "../scripts/fireStore";
import { useCategory } from "../state/useCategory";
import RandomBanner from "../components/display/RandomBanner";
import DisplayCard from "../components/display/DisplayCard";

export default function DisplayPage() {
    const { displayData, setDisplayData } = useCategory();
    const [status, setStatus] = useState(0);
    const isLoaded = useRef(false);
    const { category } = useParams();
    const collections = ['Movies', 'TVShows', 'Documentaries'];
    useEffect(() => {
        if (isLoaded.current) return;
        const loadData = async (collectionName) => {
            const data = await readDocuments(collectionName).catch(onFail);
            onSuccess(data, collectionName);
        }
        collections.map((itm) => loadData(itm))
        isLoaded.current = true;

    }, []);


    function onSuccess(data, collectionName) {
        const newItem = { id: collectionName.toLowerCase(), dataList: data }
        setDisplayData({ type: 'APPEND_ITEM', payload: newItem });
        setStatus(1);
        if ((category !== 'movies') && (category !== 'tvshows') && (category !== 'documentaries')) { setStatus(3) }
        if (category === undefined) { setStatus(1) }
    }

    function onFail() {
        setStatus(2);
        console.error();
    }

    if (status === 1) { console.log(displayData); }
    if (status === 0) { return <h1>Loading...</h1> }
    if (status === 2) { return <h1>Error while data pull</h1> }
    if (status === 3) { return <h1> Page not found.</h1> }

    const RandomItem = <RandomBanner />
    const Cards = <DisplayCard Category={category} />
    return (
        <div>
            {(status === 1) && (displayData.length > 0) &&
                <div id="displaypage">
                    {RandomItem}
                    {Cards}
                </div>
            }
        </div>
    )
}