import ReactDOM from "react-dom";
// import { useLocation } from "react-router-dom";

export default function Modal({ modalState, id }) {
    const [modal, setModal] = modalState;
    // const location = useLocation();

    // Safeguard
    //Test case 1: Not to open when you pass null on modal
    if (modal === null) return null;

    return ReactDOM.createPortal(
        <div className="overlay" >
            <div className="modalview">
                <button className="modalview-btn" onClick={() => setModal(null)}>X</button>
                <div className="modal-content">{modal}</div>
            </div>
        </div>,
        document.getElementById("portal")
    );
}
