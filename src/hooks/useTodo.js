import { useEffect, useState } from "react";
import { todoStorage } from "../utils/todoStorage.js";

const TITLE_MAX = 30;
const CONTENT_MAX = 200;

export const useTodo = (mode, id) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (mode === "update" && id) {
      const todo = todoStorage.findById(id);
      if (todo) {
        setTitle(todo.title || "");
        setContent(todo.content || "");
      }
    }
  }, [mode, id]);

  // 저장 함수
  const save = () => {
    setError("");
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    // 유효성 검사
    if (!trimmedTitle || !trimmedContent) {
      setError("제목과 내용을 모두 입력하세요.");
      return { success: false };
    }
    if (trimmedTitle.length > TITLE_MAX) {
      setError(`제목은 최대 ${TITLE_MAX}자까지 입력 가능합니다.`);
      return { success: false };
    }
    if (trimmedContent.length > CONTENT_MAX) {
      setError(`내용은 최대 ${CONTENT_MAX}자까지 입력 가능합니다.`);
      return { success: false };
    }

    // mode/id 분기 검증
    if (mode === "update") {
      if (!id) {
        setError("수정 모드에서는 ID가 필요합니다.");
        return { success: false };
      }
    } else if (mode === "create") {
      // create 모드에서는 id가 없어야 함
      if (id) {
        setError("생성 모드에서는 ID가 필요하지 않습니다.");
        return { success: false };
      }
    }

    setLoading(true);

    try {
      let result;
      if (mode === "update" && id) {
        // 수정 모드
        result = todoStorage.update(id, {
          title: trimmedTitle,
          content: trimmedContent,
        });
      } else {
        // 생성 모드 (기본값)
        result = todoStorage.save({
          title: trimmedTitle,
          content: trimmedContent,
        });
      }

      if (result.success) {
        setTitle("");
        setContent("");
        setError("");
        return { success: true };
      } else {
        setError(result.error || "저장에 실패했습니다.");
        return { success: false };
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    error,
    loading,
    save,
    TITLE_MAX,
    CONTENT_MAX,
  };
};

