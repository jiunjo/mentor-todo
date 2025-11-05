import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div>
      <h1>에러</h1>
      <p>잘못된 요청입니다.</p>
      <Link to="/">홈으로</Link>
    </div>
  );
}
