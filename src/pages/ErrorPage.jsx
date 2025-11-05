import { Link } from "react-router-dom";
import "../App.css";

export default function ErrorPage() {
  return (
    <div className="container">
      <div className="error-page">
        <h1>에러</h1>
        <p>잘못된 요청입니다.</p>
        <Link to="/">
          <button className="primary">홈으로</button>
        </Link>
      </div>
    </div>
  );
}
