import { useNavigate, useSearchParams } from "react-router-dom";
import "../App.css";
import { useTodo } from "../hooks/useTodo.js";
import ErrorPage from "./ErrorPage.jsx";

export default function EditPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode");
  const id = searchParams.get("id");

  // 유효하지 않은 모드인 경우 먼저 체크
  if (mode !== "create" && mode !== "update") {
    return <ErrorPage />;
  }

  // 데이터 모드: 데이터 로직을 hook으로 분리
  const {
    title,
    setTitle,
    content,
    setContent,
    error,
    loading,
    save,
    TITLE_MAX,
    CONTENT_MAX,
  } = useTodo(mode, id);

  const handleSave = () => {
    const result = save();
    if (result.success) {
      alert(mode === "update" ? "수정되었습니다." : "저장되었습니다.");
      navigate("/");
    }
  };

  return (
    <div className="container">
      <h1 className={`page-title ${mode === "update" ? "update" : "create"}`}>
        {mode === "update" ? "Todo 수정" : "Todo 생성"}
      </h1>
      <div className="edit-container">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo 제목을 입력하시라요!"
            className="form-input"
            maxLength={TITLE_MAX}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="form-label">
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Todo 내용을 입력하셔야죠..."
            rows={5}
            className="form-textarea"
            maxLength={CONTENT_MAX}
          />
        </div>
        {error && (
          <div className="form-group">
            <div className="error-message">{error}</div>
          </div>
        )}
        <div className="form-group">
          <button className="primary" onClick={handleSave} disabled={loading}>
            {loading ? "저장 중..." : mode === "update" ? "수정 저장" : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}
