const Checkbox = ({ id, value, onChange, text }) => {
  return (
    <div className="checkbox-group">
      <input
        type="checkbox"
        id={id || text}
        name={id || text}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id || text}>{text}</label>
    </div>
  );
};

export default Checkbox;
