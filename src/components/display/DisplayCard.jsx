import { useCategory } from "../../state/useCategory"

export default function DisplayCard() {
    const { displayData } = useCategory();
    let str = '';

    for (let i in displayData) {
        for (let j in displayData[i].dataList) {
            str = str + ',' + displayData[i].dataList[j].Genres + ',' + displayData[i].dataList[j].OriginalLanguage + ',' + displayData[i].dataList[j].DubbedLanguage;
        }

    }

    const data = (str.split(','));

    const List = [...new Set((data.map(arr => arr.trim())).filter(itm => itm !== ''))];
    const dataList = List.map((recs, idx) =>
        <li key={idx}>{recs}
            <div className="content-cards">
                {displayData.map((itm) => itm.dataList.filter(idx => idx.Genres.includes(recs) || idx.OriginalLanguage.includes(recs) || idx.DubbedLanguage.includes(recs))
                    .map(itm1 => <img key={itm1.id} src={itm1.ThumbnailImage || itm1.BannerImage} alt={itm1.Title} />))}
            </div></li>)

    return (
        <div id="displaycard">
            <ul>
                {dataList}
            </ul>
        </div>
    )
}