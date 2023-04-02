// Project files
import { updateDocument } from "../scripts/fireStore";
import readFile from "../scripts/resize-image/readFile";
import resizeImage from "../scripts/resize-image/resizeImage";
import FormData from "../data/mediafile.json";
import InitialData from "../data/initialdata.json";
import FormFieldGenerator from "./FormFieldGenerator";
import { uploadFile } from "../scripts/cloudStorage";
import { useCategory } from "../state/useCategory";
import { useState } from "react";


export default function UpdateMedia({ path, data, imageKey }) {
    // Global state
    const { setModal, dispatch } = useCategory();
    const [form, setForm] = useState(InitialData[2]);


    // Method
    async function onSubmit(event) {
        event.preventDefault();
        let updatedItem;

        for (var propName in form) {
            let result;
            const files = form[propName];
            if (files) {
                result = await uploadImage(files[0], propName);
                updatedItem = { ...data, ...updatedItem, [propName]: result.payload };
            }
        }
        
        if (updatedItem !== undefined) {
            const updateResult = await updateDocument(path, updatedItem,  data.id);
            updateResult.status ? onSuccess(updatedItem) : onFailure(updateResult.message);
        }
    }

    async function uploadImage(file,propName) {
        const filePath = `${path}/${data.id}_${data.Title}/${propName}_${file.name}`;
        const imageFromFile = await readFile(file);
        const resizedImage = await resizeImage(imageFromFile, 240, 180);
        const result = await uploadFile(resizedImage, filePath);
        return result;
    }

    function onSuccess(updatedItem) {
        dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
        setModal(null);
    }

    function onFailure(errorMessage) {
        alert(errorMessage);
    }

    function cancelform() {
        setModal(null);
    }

    return (
        <div className="uploadmedia">
            <h1>Upload Media Files</h1>
            <form className="media-form" id="mediaform" onSubmit={(event) => onSubmit(event)}>
                <FormFieldGenerator data={FormData} state={[form, setForm]} />
                <button className="media-btn" id="addCourse-submit" >Upload</button>
                <button className="media-btn" id="addCourse-cancel" onClick={() => cancelform()}>Cancel</button>
            </form>
        </div>
    );
}
