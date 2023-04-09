import { useCategory } from "../../state/useCategory";
import { FaPlay, FaInfoCircle } from "react-icons/fa";

export default function RandomBanner() {
    const { displayData } = useCategory();
    const data = displayData[0].dataList[0];
    // const data =  displayData.map(itm=> { (itm.id === 'Movies') && itm.dataList.map(recs => recs).filter(idx => idx === 0 )});
    


    return (
        <div className="Banner" id="banner">
            <img src={data.BannerImage} alt={data.Title} />
            <div className="BannerContent">
                <span >{data.Title}</span>
                <p >{data.LongDesc}</p>
                <div className="Banner-btn">
                    <button className="play-btn"><FaPlay /><h3>Play</h3></button>
                    <button className="info-btn"><FaInfoCircle /><h3>More Info</h3></button>
                </div>
            </div>
        </div>
    )
}