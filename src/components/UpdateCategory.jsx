import { useCategory } from "../state/useCategory";
import { useState } from "react";
import { updateDocument } from "../scripts/fireStore";
import FormFieldGenerator from "../components/FormFieldGenerator";
import MovieFormData from "../data/movies.json";
import SeriesData from "../data/series.json";

export default function FormUpdate({ path, data }) {
    // Global state
    const { setModal, dispatch } = useCategory();
    const formData = (path === 'TVShows') ? SeriesData : MovieFormData;
    // Local state
    const [form, setForm] = useState(data);

    // Method
    async function onSubmit(event) {
        event.preventDefault();
        const result = await updateDocument(path, form,form.id);
        result.status ? onSuccess() : onFailure(result.message);
    }

    function onSuccess() {
        dispatch({ type: 'UPDATE_ITEM', payload: form });
        setModal(null);
    }

    function onFailure(errorMessage) {
        alert(errorMessage);
    }

    function cancelform() {
        setModal(null);
    }

    return (
        <div className="updatecategory">
            <h1>Update {path} </h1>
            <span>Note: all * fields are mandatory</span>
            <form className="update-form" id="updateform" onSubmit={(event) => onSubmit(event)}>
                <FormFieldGenerator data={formData} state={[form, setForm]} />
                <button className="addform-btn" id="form-upate" >Update</button>
                <button className="addform-btn" id="update-cancel" onClick={() => cancelform()}>Cancel</button>
            </form>
        </div>
    );
}