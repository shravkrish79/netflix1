import { useCategory } from "../../state/useCategory";
import { useNavigate } from "react-router-dom";
import { ImPlay2, ImInfo } from "react-icons/im";
import DisplayModal from "./DisplayModal";

export default function DisplayCard({ Category }) {
    let contentData;
    const Navigate = useNavigate();
    const { displayData, setModal } = useCategory();
    if (Category === undefined) { contentData = displayData }
    else { contentData = displayData.filter(records => records.id === Category) }
    // console.log(contentData)
    let str = '';

    for (let i in contentData) {
        for (let j in contentData[i].dataList) {
            str = str + ',' + contentData[i].dataList[j].Genres + ',' + contentData[i].dataList[j].OriginalLanguage + ',' + contentData[i].dataList[j].DubbedLanguage;
        }

    }

    const data = (str.split(','));

    const List = [...new Set((data.map(arr => arr.trim())).filter(itm => itm !== ''))];
    const dataList = List.map((recs, idx) =>
        <li key={'displaycardlist-' + idx}> <h3>{recs}</h3>
            <div className="content-cards" key={"contentcards-" + idx}>
                {contentData.map((itm) => itm.dataList.filter(idx => idx.Genres.includes(recs) || idx.OriginalLanguage.includes(recs) || idx.DubbedLanguage.includes(recs))
                    .map((itm1, idx) =>
                        <div className="datacard" key={"datacard-" + idx}>
                            <img src={itm1.ThumbnailImage || itm1.BannerImage} alt={itm1.Title}  onClick={()=>Navigate(`/${itm.id}/${itm1.Title}`,{ state: { data:itm1 } } )}/>
                            <div className="card-buttons" >
                                <ImPlay2 id={"playicon-" + idx} className="play-btn" onClick={() => Navigate(`/${itm.id}/${itm1.Title}`,{ state: { data:itm1 } } ) }/>
                                <ImInfo id={"infoicon-" + idx} className="play-btn" onClick={() => setModal(<DisplayModal data={itm1} mediacategory={itm.id}/>)} />
                            </div>
                        </div>
                    ))}

            </div>
        </li>)

    return (
        <div id="displaycard">
            <ul>
                {dataList}
            </ul>
        </div>
    )
}