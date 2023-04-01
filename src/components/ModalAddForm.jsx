import { useState } from "react";
import FormFieldGenerator from "../components/FormFieldGenerator";
import MovieFormData from "../data/movies.json";
import SeriesData from "../data/series.json";
import { useCategory } from "../state/useCategory";

export default function ModalAddForm({ formData }) {
    const [form, setForm] = useState({});
    const { setModal } = useCategory();
    const data = (formData === 'TVShows') ? SeriesData : MovieFormData;
    function onSubmit(event) {
        event.preventDefault();
    }
    function cancelform() {
        setModal(null);
    }
    return (
        <div id="AddForm">
            <h1>Content Manager</h1>
            <form className="content-form" id="contentform" onSubmit={(event) => onSubmit(event)}>
                <FormFieldGenerator data={data} state={[form, setForm]} />
                <button className="addform-btn" id="addCourse-submit" >Submit</button>
                <button className="addform-btn" id="addCourse-cancel" onClick={() => cancelform()}>Cancel</button>
            </form>
        </div>
    )
}