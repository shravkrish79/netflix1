import {useLocation} from "react-router-dom";

export default function PlayVideo() {
    const Location = useLocation();
    const videourl = Location.state.data;
    console.log(videourl)
    if(videourl.Trailer===null) { return <h1> video unavailable.</h1>}
    return (
        <div id="playvideo">
            <iframe
                key={videourl.id}
                src={videourl.Trailer}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={videourl.Title}
            />
        </div>
    )
}