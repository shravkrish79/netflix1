import { useCategory } from "../../state/useCategory";
import { ImPlay2, ImInfo } from "react-icons/im";
import DisplayModal from "./DisplayModal";

export default function DisplayCard({ Category }) {
    let contentData;
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
        <li key={idx+recs}>{recs}
            <div className="content-cards" id={"contentcard" + idx + recs}>
                {contentData.map((itm) => itm.dataList.filter(idx => idx.Genres.includes(recs) || idx.OriginalLanguage.includes(recs) || idx.DubbedLanguage.includes(recs))
                    .map((itm1, idx) =>
                        <div className="datacard">
                            <img key={itm1.id + recs} src={itm1.ThumbnailImage || itm1.BannerImage} alt={itm1.Title} />
                            <div className="card-buttons" >
                                <ImPlay2 id={"playicon-" + idx} className="play-btn" />
                                <ImInfo id={"infoicon-" + idx} className="play-btn" onClick={() => setModal(<DisplayModal data={itm1} />)} />
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