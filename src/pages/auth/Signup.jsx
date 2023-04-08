import Logo from "../../assets/images/netflix-logo.svg";
import SignInFields from "../../data/profile.json";
import FormFieldGenerator from "../../components/FormFieldGenerator";
import {useState} from "react";

export default function Signup() {
    const data = SignInFields.filter((recs) => recs.key === 'Email' || recs.key === 'Password');
    const [form, setForm] = useState({ Email: "", Password: "" });

    function onSubmit(event){

    }

    return (
        <div id="signup">
            <div className="content">
                <div className="header">
                    <a href="/"><img src={Logo} alt="neflix logo" /></a>
                    <a href="/">Sign In</a>
                </div>
                <div className="signup-container">
                    <span>STEP 1 OF 1</span>
                    <h1>Welcome back!</h1>
                    <h1>Joining Netflix is easy.</h1>
                    <p>Enter your password and you'll be watching in no time.</p>
                    <form className="signup-form" onSubmit={(event) => onSubmit(event)}>
                        <FormFieldGenerator data={data} state={[form, setForm]} />
                        <button className="signup-btn" id="signup-btn">Sign In</button>
                    </form>
                </div>

            </div>
        </div>
    );
}