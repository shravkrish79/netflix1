import Logo from "../../assets/images/netflix-logo.svg"
import Background from "../../assets/images/background-img.jpg";
import SignInFields from "../../data/profile.json";
import FormFieldGenerator from "../../components/FormFieldGenerator";
import { useState } from "react";
import { login } from "../../scripts/auth";
import { useProfile } from "../../state/useProfile";
import { useUser } from "../../state/useUser";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const data = SignInFields.filter((recs) => recs.key === 'Email' || recs.key === 'Password');
    const [form, setForm] = useState({ Email: "", Password: "" });
    const { setUid, saveUID, setIsAdmin, saveAdmin } = useUser();
    const Navigate = useNavigate();
    const { profileData } = useProfile();


    async function onSubmit(event) {
        event.preventDefault();
        document.getElementById("login-btn").disabled = true;
        const result = await login(form.Email, form.Password);
        result.status ? onSuccess(result) : onFailure(result);
    }

    function onSuccess(result) {
        const profile = profileData.find((item) => item.uid === result.payload);

        if (profile !== undefined) {
            setIsAdmin(profile.isTeacher);
            saveAdmin(profile.isTeacher);
            setUid(result.payload);
            saveUID(result.payload);
            Navigate("/");
        }
        else {
            alert('Profile Data is not updated. please refresh the home page.');
        }
        document.getElementById("login-btn").disabled = false;
    }
    
    function onFailure(result) {
        alert(`Cannot login to the account, ${result.message}`);
        document.getElementById("login-btn").disabled = false;
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
                        <a href="/forgotpassword">Forgot Password?</a>
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