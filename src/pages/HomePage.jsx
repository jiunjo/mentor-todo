import { useNavigate } from "react-router-dom";
import "../App.css";
import Button from "../components/Button.jsx";
import { useTodoList } from "../hooks/useTodoList.js";

export default function HomePage() {
  const navigate = useNavigate();
  // 데이터 모드: 데이터 로직을 hook으로 분리
  const { todos, loading, deleteTodo } = useTodoList();

  const handleTodoClick = (id) => {
    navigate(`/edit?mode=update&id=${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const result = deleteTodo(id);
      if (!result.success) {
        alert(result.error || "삭제에 실패했습니다.");
      }
    }
  };

  return (
    <div className="container">
      <div className="header-actions">
        <Button mode="create">Todo 생성</Button>
      </div>
      <div className="todo-list">
        <h2>Todo 목록</h2>
        {loading ? (
          <div>로딩 중...</div>
        ) : todos.length === 0 ? (
          <div>등록된 Todo가 없습니다.</div>
        ) : (
          <div>
            {todos.map((todo) => (
              <div key={todo.id} className="todo-item">
                <h3>{todo.title}</h3>
                <p>{todo.content}</p>
                <div className="todo-actions">
                  <button onClick={() => handleTodoClick(todo.id)}>수정</button>
                  <button
                    className="danger"
                    onClick={() => handleDelete(todo.id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
