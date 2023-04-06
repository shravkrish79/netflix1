import { useState } from "react";
import FormFieldGenerator from "../components/FormFieldGenerator";
import MovieFormData from "../data/movies.json";
import InitialData from "../data/initialdata.json";
import SeriesData from "../data/series.json";
import SeasonData from "../data/season.json";
import { useCategory } from "../state/useCategory";
import { createDocument,createDocumentWithCustomId } from "../scripts/fireStore";
import { useEpisode } from "../state/useEpisode";


export default function ModalAddForm({ path, createType }) {
    let formData, data;

    if (path === 'TVShows') { formData = InitialData[1]; data = SeriesData; }
    else if ((path === 'Movies') || (path === 'Documentaries')) { formData = InitialData[0]; data = MovieFormData; }
    if (createType==='Episode') {formData = InitialData[3]; data = SeasonData;}

    const [form, setForm] = useState(formData);
    const { setModal, dispatch } = useCategory();
    const { episodeDispatch } = useEpisode();

    async function onSubmit(event) {
        event.preventDefault();
        let result;
        document.getElementById("addCourse-submit").disabled = true;
        if(createType!=='Episode'){result = await createDocument(path, form);}
        if(createType==='Episode'){result = await createDocumentWithCustomId(path, form, form.EpisodeNumber);}
        result.status ? onSuccess(result.payload) : onFailure(result.message);
    }
    function cancelform() {
        setModal(null);
    }
    function onSuccess(id) {
        if (createType === 'Category') { dispatch({ type: 'CREATE_ITEM', payload: [form, id] }); }
        if (createType === 'Episode') { episodeDispatch({ type: 'CREATE_ITEM', payload: [form, id] }); }
        document.getElementById("addCourse-submit").disabled = false;
        setModal(null);
    }
    function onFailure(errorMessage) {
        alert(errorMessage);
        document.getElementById("addCourse-submit").disabled = false;
    }

    return (
        <div id="AddForm">
            <h1>Content Manager</h1>
            <span>Note: all * fields are mandatory</span>
            <form className="content-form" id="contentform" onSubmit={(event) => onSubmit(event)}>
                <FormFieldGenerator data={data} state={[form, setForm]} />
                <div id="addform-btn-group">
                    <button className="addform-btn" id="addCourse-submit" >Create</button>
                    <button className="addform-btn" id="addCourse-cancel" onClick={() => cancelform()}>Cancel</button>
                </div>
            </form>

        </div>
    )
}