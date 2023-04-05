// Project files
import { deleteCollection,updateDocument } from "../scripts/fireStore";
import { useCategory } from "../state/useCategory";
import { useSeason } from "../state/useSeason";


export default function DeleteSeason({ path, seasonNumber }) {
  // Global state
  const { setModal } = useCategory();
  const {seasonData,seasonDispatch} = useSeason();
  let updatedSeason = seasonData[0]; 

  // Method
  async function onConfirm() {
    document.getElementById("delete-btn").disabled = true;
    const result = await deleteCollection(path);  
    const seasons = updatedSeason.Seasons.filter((itm)=>itm !== seasonNumber);
    updatedSeason = { ...updatedSeason, Seasons: seasons };
    const result1 = await updateDocument('TVShows', updatedSeason, updatedSeason.id);
    result1.status && result.status ? onSuccess(updatedSeason) : onFailure(result.message);
  }

  function onSuccess(updatedSeason) {
    seasonDispatch({ type: 'UPDATE_ITEM', payload: updatedSeason });    
    document.getElementById("delete-btn").disabled = false;
    setModal(null);
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
