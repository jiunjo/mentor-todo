import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../App.css";

export default function EditPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode"); // ✅ URL에서 mode 추출
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    if (!trimmedTitle || !trimmedContent) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("todos") || "[]");
    const newTodo = {
      id: Date.now(),
      title: trimmedTitle,
      content: trimmedContent,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("todos", JSON.stringify([...existing, newTodo]));
    alert("저장되었습니다.");
    setTitle("");
    setContent("");
  };

  if (mode === "create") {
    return (
      <div>
        <h1>Todo 생성</h1>
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
              placeholder="Todo 제목을 입력하세요"
              className="form-input"
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
              placeholder="Todo 내용을 입력하세요"
              rows={5}
              className="form-textarea"
            />
          </div>
          <div className="form-group">
            <button onClick={handleSave}>저장</button>
          </div>
        </div>
      </div>
    );
  }

  return <h1>{mode === "edit" ? "수정 모드" : "생성 모드"}</h1>;
}
