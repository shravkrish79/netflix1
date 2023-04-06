// Project files
import { updateDocument } from "../scripts/fireStore";
import readFile from "../scripts/resize-image/readFile";
import resizeImage from "../scripts/resize-image/resizeImage";
import CategoryForm from "../data/mediafile.json";
import EpisodeForm from "../data/episodemedia.json";
import InitialData from "../data/initialdata.json";
import FormFieldGenerator from "./FormFieldGenerator";
import { uploadFile } from "../scripts/cloudStorage";
import { useCategory } from "../state/useCategory";
import { useState } from "react";
import { useSeason } from "../state/useSeason";
import { useEpisode } from "../state/useEpisode";


export default function UpdateMedia({ path, data, updatemediatype }) {
    // Global state
    const { setModal, dispatch } = useCategory();
    let formData,formFields;

    if(updatemediatype==='Category'){formData=InitialData[2]; formFields=CategoryForm;}
    if(updatemediatype==='Episode'){formData=InitialData[4]; formFields = EpisodeForm}
    const [form, setForm] = useState(formData);
    const {seasonData} = useSeason();
    const {episodeDispatch}=useEpisode();

    // Method
    async function onSubmit(event) {
        event.preventDefault();
        document.getElementById("upload-media-btn").disabled = true;
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
        let filePath
        
        if(updatemediatype === 'Category'){filePath = `${path}/${data.id}_${data.Title}/${propName}_${file.name}`;}
        if(updatemediatype === 'Episode'){filePath = `TVShows/${seasonData[0].id}_${seasonData[0].Title}/${data.SeasonNumber}_${data.EpisodeNumber}_${file.name}`;}
        const imageFromFile = await readFile(file);
        const resizedImage = await resizeImage(imageFromFile, 240, 180);
        const result = await uploadFile(resizedImage, filePath);
        return result;
    }

    function onSuccess(updatedItem) {
        if(updatemediatype === 'Category'){dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });}
        if(updatemediatype === 'Episode'){episodeDispatch({ type: 'UPDATE_ITEM', payload: updatedItem });}
        document.getElementById("upload-media-btn").disabled = false;
        setModal(null);
    }

    function onFailure(errorMessage) {
        document.getElementById("upload-media-btn").disabled = false;
        alert(errorMessage);
    }

    function cancelform() {
        setModal(null);
    }

    return (
        <div className="uploadmedia">
            <h1>Upload Media Files</h1>
            <form className="media-form" id="mediaform" onSubmit={(event) => onSubmit(event)}>
                <FormFieldGenerator data={formFields} state={[form, setForm]} />
                <button className="media-btn" id="upload-media-btn" >Upload</button>
                <button className="media-btn" id="cancel-media-btn" onClick={() => cancelform()}>Cancel</button>
            </form>
        </div>
    );
}
