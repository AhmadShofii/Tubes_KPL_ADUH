function InputField({ type, placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border p-3 rounded-lg mb-4"
    />
  );
}

export default InputField;