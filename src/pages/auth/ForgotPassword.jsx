import Logo from "../../assets/images/netflix-logo.svg";
import ForgotPasswordFields from "../../data/profile.json";
import FormFieldGenerator from "../../components/FormFieldGenerator";
import { useState } from "react";
import { recoverAccount } from "../../scripts/auth";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const data = ForgotPasswordFields.filter((recs) => recs.key === 'Email');
    const [form, setForm] = useState({ Email: "" });
    const Navigate = useNavigate();

    async function onSubmit(event) {
        event.preventDefault();
        document.getElementById("forgotpassword-btn").disabled = true;
        const result = await recoverAccount(form.Email);
        result.status ? onSuccess() : onFailure(result);
    }

    function onSuccess() {
        const text = "Email with a reset link sent. Please check your SPAM/Junk folder as well.";
        alert(text);
        document.getElementById("forgotpassword-btn").disabled = false;
        Navigate("/");
    }

    function onFailure(result) {
        alert(result.message);
        document.getElementById("forgotpassword-btn").disabled = false;
    }

    return (
        <div id="forgotpassword">
            <div className="content">
                <div className="header">
                    <a href="/"><img src={Logo} alt="neflix logo" /></a>
                    <a href="/">Sign In</a>
                </div>
                <div className="box">
                    <div className="forgotpassword-container">
                        <h1>Forgot Email/Password</h1>
                        <p>We will send you an email with instructions on how to reset your password.</p>
                        <form className="forgotpassword-form" onSubmit={(event) => onSubmit(event)}>
                            <FormFieldGenerator data={data} state={[form, setForm]} />
                            <button className="forgotpassword-btn" id="forgotpassword-btn">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}