import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";

export default function InputField({ item, state }) {
  const [form, setForm] = state;

  // Properties
  const formKey = [item.key];
  const formValue = form[item.key];
  const [showPassword, setShowPassword] = useState(false);
  function handlePasswordView() {
    var x = document.getElementById("passwordField");
    if (x.type === "password") {
        x.type = "text";
        setShowPassword(true);
    } else {
        x.type = "password";
        setShowPassword(false);
    }
}

  return (
    <label className="input-field" id={item.key}>
     <span> {item.label} </span>
        <input
          // State
          value={formValue}
          onChange={(event) =>
            setForm({ ...form, [formKey]: event.target.value })
          }
          // Common properties
          id={item.id} type={item.type}
          required={item.required} disabled={item.disabled} placeholder={item.placeholder}
          // Specific properties
          maxLength={item.maxLength} minLength={item.minLength}
          min={item.min} max={item.max}
        />
      {(item.type === 'password') &&
        <div className="eye-btn" onClick={() => handlePasswordView()}>
          {(!showPassword) ? <AiFillEyeInvisible /> : <AiFillEye />}
        </div>
      }
    </label>
  );
}