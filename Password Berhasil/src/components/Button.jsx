function Button({ text, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 rounded-lg text-white ${color}`}
    >
      {text}
    </button>
  );
}

export default Button;