import CategoryData from "../data/category.json";
import MovieFormData from "../data/movies.json";
import FormFieldGenerator from "../components/FormFieldGenerator";
import { useState } from "react";

export default function ContentManager1() {
    const [form, setForm] = useState({});
    function onSubmit(event){
        event.preventDefault();
    }
    function cancelform(){

    }
    return (
        <div id="contentmanager">
            <h1>Content Manager</h1>
            <div className="content-type">
                <FormFieldGenerator data={CategoryData} state={[form, setForm]} />
            </div>
            <form className="content-form" id="contentform" onSubmit={(event) => onSubmit(event)}>
                <FormFieldGenerator data={MovieFormData} state={[form, setForm]} />
                <button className="content-submit-btn" id="addCourse-submit" >Submit</button>
                <button className="content-cancel-btn" id="addCourse-cancel" onClick={() => cancelform()}>Cancel</button>
            </form>
        </div>
    )
}