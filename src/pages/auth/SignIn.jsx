import Logo from "../../assets/images/netflix-logo.svg"
import Background from "../../assets/images/background-img.jpg";
import SignInFields from "../../data/profile.json";
import FormFieldGenerator from "../../components/FormFieldGenerator";
import { useState } from "react";

export default function SignIn() {
    const data = SignInFields.filter((recs) => recs.key === 'Email' || recs.key === 'Password');
    const [form, setForm] = useState({ Email: "", Password: "" });

    function onSubmit(event) {

    }

    return (
        <div id="signin">
            <img className="background" src={Background} alt="netflix  cinemas" />
            <a href="."><img src={Logo} alt="neflix logo" /></a>
            <div className="box-container">
                <div className="box-content">
                    <h1>Sign In</h1>
                    <form className="login-form" onSubmit={(event) => onSubmit(event)}>
                        <FormFieldGenerator data={data} state={[form, setForm]} />
                        <button className="login-btn" id="login-btn">Sign In</button>
                    </form>
                    <div className="login-help">

                        <label for="remember-chk">
                            <input type="checkbox" id="remember-chk" name="remember-chk" />
                            Remember me</label>
                        <a href=".">Forgot Password?</a>
                    </div>
                    <div className="box-link">
                        <span>New to Netflix? <a href="/signup">Sign up now</a></span>
                        <p>This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}