import { useState } from "react";
import FormFieldGenerator from "../components/FormFieldGenerator";
import MovieFormData from "../data/movies.json";
import InitialData from "../data/initialdata.json";
import SeriesData from "../data/series.json";
import { useCategory } from "../state/useCategory";
import { createDocument } from "../scripts/fireStore";

export default function ModalAddForm({ path }) {
    const [form, setForm] = useState((path === 'TVShows') ? InitialData[1] : InitialData[0]);
    const { setModal, dispatch } = useCategory();
    const data = (path === 'TVShows') ? SeriesData : MovieFormData;
    async function onSubmit(event) {
        event.preventDefault();
        const result = await createDocument(path, form);
        result.status ? onSuccess(result.payload) : onFailure(result.message);
    }
    function cancelform() {
        setModal(null);
    }
    function onSuccess(id) {
        dispatch({ type: 'CREATE_ITEM', payload: [form, id] });
        setModal(null);
    }

    function onFailure(errorMessage) {
        alert(errorMessage);
    }

    return (
        <div id="AddForm">
            <h1>Content Manager</h1>
            <span>Note: all * fields are mandatory</span>
            <form className="content-form" id="contentform" onSubmit={(event) => onSubmit(event)}>
                <FormFieldGenerator data={data} state={[form, setForm]} />
                <button className="addform-btn" id="addCourse-submit" >Create</button>
                <button className="addform-btn" id="addCourse-cancel" onClick={() => cancelform()}>Cancel</button>
            </form>

        </div>
    )
}