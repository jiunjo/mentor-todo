import { Link } from "react-router-dom";
import "../App.css";

export default function NotFoundPage() {
  return (
    <div className="container">
      <div className="not-found-page">
        <h1>404</h1>
        <p>페이지를 찾을 수 없습니다.</p>
        <Link to="/">
          <button className="primary">홈으로</button>
        </Link>
      </div>
    </div>
  );
}
