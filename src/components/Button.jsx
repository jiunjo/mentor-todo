import { useNavigate } from "react-router-dom";

export default function Button({ mode, children }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!mode) return;
    navigate(`/edit?mode=${mode}`);
  };

  return (
    <button className="primary" onClick={handleClick}>
      {children}
    </button>
  );
}
