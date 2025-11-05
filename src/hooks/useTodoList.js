import { useEffect, useState } from "react";
import { todoStorage } from "../utils/todoStorage.js";

export const useTodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Todo 목록 로드
  const loadTodos = () => {
    try {
      setLoading(true);
      const allTodos = todoStorage.getAll();
      setTodos(allTodos);
    } catch (error) {
      console.error("Failed to load todos:", error);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  // Todo 삭제
  const deleteTodo = (id) => {
    try {
      const result = todoStorage.delete(id);
      if (result.success) {
        // 삭제 후 목록 새로고침
        loadTodos();
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return {
    todos,
    loading,
    loadTodos,
    deleteTodo,
  };
};

