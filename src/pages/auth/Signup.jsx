import Logo from "../../assets/images/netflix-logo.svg";
import SignInFields from "../../data/profile.json";
import FormFieldGenerator from "../../components/FormFieldGenerator";
import {createAccount} from "../../scripts/auth";
import {createDocument} from "../../scripts/fireStore";
import { useProfile } from "../../state/useProfile";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const data = SignInFields.filter((recs) => recs.key === 'Email' || recs.key === 'Password');
    const [form, setForm] = useState({ Email: "", Password: "" });
    const {profileData, setProfileData} = useProfile();
    const Navigate = useNavigate();
    async function onSubmit(event) {
        event.preventDefault();
        document.getElementById("signup-btn").disabled = true;
        console.log(form);
        const result = await createAccount(form.Email, form.Password);
        result.status ? onSuccess(result, event) : onFailure(result);
    }

    async function onSuccess(result) {
        const data = {
            "email": form.Email,
            "isAdmin": false,
            "profiles":[],
            "uid": result.payload
        };
        await createDocument('Users', data);
        const updatedProfileData = [...profileData, { id: result.payload, ...data }]
        setProfileData(updatedProfileData);
        Navigate("/");
        alert('Account created!');
        document.getElementById("signup-btn").disabled = false;
    }
    
    function onFailure(result) {
        alert(`Cannot create an account, ${result.message}`);
        document.getElementById("signup-btn").disabled = false;
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
                        <button className="signup-btn" id="signup-btn">Create Account</button>
                    </form>
                </div>

            </div>
        </div>
    );
}