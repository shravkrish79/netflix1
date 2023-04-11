import { useCategory } from "../../state/useCategory";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import DisplayModal from "./DisplayModal";
import { useNavigate } from "react-router-dom";

export default function RandomBanner() {
    const { displayData } = useCategory();
    const data = displayData[0].dataList[0];
    const {setModal} = useCategory();
    const Navigate = useNavigate();
// console.log(data);

    return (
        <div className="Banner" id="banner">
            <img src={data.BannerImage} alt={data.Title} />
            <div className="BannerContent">
                <span >{data.Title}</span>
                <p >{data.ShortDesc}</p>
                <div className="Banner-btn">
                    <button className="play-btn" onClick={() => Navigate(`/${displayData[0].id}/${data.Title}`,{ state: { data:data } } ) }><FaPlay  /><h3>Play</h3></button>
                    <button className="info-btn" onClick={()=>setModal(<DisplayModal data={data}/>)}><FaInfoCircle /><h3>More Info</h3></button>
                </div>
            </div>
        </div>
    )
}