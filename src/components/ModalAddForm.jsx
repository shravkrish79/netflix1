import { useState } from "react";
import FormFieldGenerator from "../components/FormFieldGenerator";
import MovieFormData from "../data/movies.json";
import InitialData from "../data/initialdata.json";
import SeriesData from "../data/series.json";
import { useCategory } from "../state/useCategory";

export default function ModalAddForm({ formData }) {
    const [form, setForm] = useState((formData === 'TVShows') ? InitialData[1] : InitialData[0]);
    const { setModal } = useCategory();
    const data = (formData === 'TVShows') ? SeriesData : MovieFormData;
    async function onSubmit(event) {
        event.preventDefault();
        console.log(form);
    }
    function cancelform() {
        setModal(null);
    }

    return (
        <div id="AddForm">
            <h1>Content Manager</h1>
            <form className="content-form" id="contentform" onSubmit={(event) => onSubmit(event)}>
                <FormFieldGenerator data={data} state={[form, setForm]} />
                <button className="addform-btn" id="addCourse-submit" >Create</button>
                <button className="addform-btn" id="addCourse-cancel" onClick={() => cancelform()}>Cancel</button>
            </form>
        </div>
    )
}