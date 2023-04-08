// Project files
import { deleteDocument, updateDocument } from "../scripts/fireStore";
import { useCategory } from "../state/useCategory";
import { useEpisode } from "../state/useEpisode";
import { useSeason } from "../state/useSeason";
import { useNavigate } from "react-router-dom";

export default function DeleteCategory({ path, id, deleteType }) {
  // Global state
  const { setModal, dispatch } = useCategory();
  const { seasonData, seasonDispatch } = useSeason();
  const { episodeData, episodeDispatch } = useEpisode();
  const Navigate = useNavigate();
  
  const showname = seasonData.length>0 && seasonData[0].Title.replace(/ /g, "");

  // Method
  async function onConfirm() {
    document.getElementById("delete-btn").disabled = true;
    const result = await deleteDocument(path, id);

    result.status ? onSuccess() : onFailure(result.message);
  }

  async function onSuccess() {
    if (deleteType === 'Category') { dispatch({ type: 'DELETE_ITEM', payload: id }); }
    if (deleteType === 'Episode') {
      var documentCount = episodeData.length;
      episodeDispatch({ type: 'DELETE_ITEM', payload: id });
      if (documentCount === 1) {
        let season = path.split("/").slice(-1).toString();
        let updatedSeason = seasonData[0];
        const seasons = updatedSeason.Seasons.filter((itm) => itm !== season);
        updatedSeason = { ...updatedSeason, Seasons: seasons };
        const updateresult = await updateDocument('TVShows', updatedSeason, updatedSeason.id);
        if (updateresult) { seasonDispatch({ type: 'UPDATE_ITEM', payload: updatedSeason }); }
      }
    }
    document.getElementById("delete-btn").disabled = false;
    setModal(null);
    if (deleteType === 'Episode' && documentCount===1 ) {Navigate(`/tvshows/${showname}`)}    
  }

  function onFailure(errorMessage) {
    document.getElementById("delete-btn").disabled = false;
    alert(errorMessage);
  }

  return (
    <div className="deletecategory">
      <h1>Delete item</h1>
      <p>
        ℹ️ Warning, deleting the item is a permanent action. Press the button
        below if you are sure about it
      </p>
      <button onClick={onConfirm} id="delete-btn">Confirm</button>
    </div>
  );
}
