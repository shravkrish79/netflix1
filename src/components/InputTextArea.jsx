export default function InputTextArea({ item, state }) {
  const [form, setForm] = state;

  // Properties
  const formKey = [item.key];
  const formValue = form[item.key];

  return (
    <label className="input-textarea" id={item.id}>
      <span> {item.label} </span>
      <textarea
        // State
        value={formValue}
        onChange={(event) =>
          setForm({ ...form, [formKey]: event.target.value })
        }
        // Commpon properties
        id={item.key}
        required={item.required}
        disabled={item.disabled}
        placeholder={item.placeholder}
        minLength={item.min}
        maxLength={item.max}
        // rows={item.rows}
        // cols={item.cols}
      ></textarea>
    </label>
  );
}