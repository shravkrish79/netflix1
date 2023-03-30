import CategoryData from "../data/category.json";
import MovieFormData from "../data/movies.json";
import FormFieldGenerator from "../components/FormFieldGenerator";
import { useState } from "react";

export default function ContentManager() {
    const [form, setForm] = useState({})
    return (
        <div id="contentmanager">
            <h1>Content Manager</h1>
            <div className="content-type">
                <FormFieldGenerator data={CategoryData} state={[form, setForm]} />
            </div>
            <div className="content-form">
                <FormFieldGenerator data={MovieFormData} state={[form, setForm]} />
            </div>
        </div>
    )
}