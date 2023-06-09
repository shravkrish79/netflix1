export default function InputSelect({ item, state }) {
  const [form, setForm] = state;

  // Properties
  const formKey = [item.key];
  const formValue = form[item.key];

  const Options = item.options.map((val) =>
    <option key={val} value={val}>{val}</option>
  );

  return (
    <label className="input-field" id={item.id}>
      <span> {item.label} </span>
      <select
        id={item.key}
        value={formValue}
        required={item.required}
        disabled={item.disabled}
        onChange={(event) =>
          setForm({ ...form, [formKey]: event.target.value })
        }>
        <option value="">None</option>
        {Options}
      </select>

    </label>
  );
}