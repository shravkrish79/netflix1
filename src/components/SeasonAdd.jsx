import { useState } from "react";
import FormFieldGenerator from "../components/FormFieldGenerator";
import InitialData from "../data/initialdata.json";
import SeasonData from "../data/season.json";
import { createDocumentWithCustomId, updateDocument } from "../scripts/fireStore";
import { useSeason } from "../state/useSeason";
import { useCategory } from "../state/useCategory";
import { useEpisode } from "../state/useEpisode";


export default function SeasonAdd({ path, data }) {
    let updatedSeason = data;
    const [form, setForm] = useState(InitialData[3]);
    const { episodeDispatch } = useEpisode();
    const { seasonDispatch } = useSeason();
    const { setModal } = useCategory();

    async function onSubmit(event) {
        event.preventDefault();
        document.getElementById("addSeason-submit").disabled = true;

        path = path + form.SeasonNumber;
        updatedSeason = { ...updatedSeason, Seasons: [...new Set([...updatedSeason.Seasons, form.SeasonNumber])] };

        const result1 = await updateDocument('TVShows', updatedSeason, data.id);
        const result = await createDocumentWithCustomId(path, form, form.EpisodeNumber);

        (result.status && result1.status) ? onSuccess(result.payload, updatedSeason) : onFailure(result.message);
    }
    function cancelform() {
        setModal(null);
    }
    function onSuccess(id, updatedSeason) {
        episodeDispatch({ type: 'CREATE_ITEM', payload: [form, id] });
        seasonDispatch({ type: 'UPDATE_ITEM', payload: updatedSeason });
        document.getElementById("addSeason-submit").disabled = false;
        setModal(null);
    }

    function onFailure(errorMessage) {
        alert(errorMessage);
        document.getElementById("addSeason-submit").disabled = false;
    }

    return (
        <div id="AddForm">
            <h1>Content Manager</h1>
            <span>Note: all * fields are mandatory</span>
            <form className="content-form" id="contentform" onSubmit={(event) => onSubmit(event)}>
                <FormFieldGenerator data={SeasonData} state={[form, setForm]} />
                <div id="addform-btn-group">
                    <button className="addform-btn" id="addSeason-submit" >Create</button>
                    <button className="addform-btn" id="addSeason-cancel" onClick={() => cancelform()}>Cancel</button>
                </div>
            </form>

        </div>
    )
}