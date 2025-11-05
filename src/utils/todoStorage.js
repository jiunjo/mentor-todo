// 데이터 로직 분리 - localStorage 조작 (키-값 구조)
const STORAGE_KEY = "todos";

export const todoStorage = {
  // 모든 Todo 가져오기 (배열 형태로 반환)
  getAll: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      const todosObject = data ? JSON.parse(data) : {};
      // 키-값 객체를 배열로 변환
      return Object.values(todosObject);
    } catch (error) {
      console.error("Failed to parse todos:", error);
      return [];
    }
  },

  // 내부: 키-값 객체 형태로 가져오기 (안전 파싱)
  _getAllAsObject: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        return {};
      }

      const parsed = JSON.parse(data);
      
      // 배열 형태인 경우 (이전 데이터 구조) 객체로 변환
      if (Array.isArray(parsed)) {
        const converted = {};
        parsed.forEach((todo) => {
          if (todo && todo.id) {
            converted[String(todo.id)] = todo;
          }
        });
        // 변환된 데이터를 다시 저장
        localStorage.setItem(STORAGE_KEY, JSON.stringify(converted));
        return converted;
      }

      // 객체 형태인 경우 그대로 반환
      if (typeof parsed === "object" && parsed !== null) {
        return parsed;
      }

      // 그 외의 경우 빈 객체 반환
      console.warn("잘못된 데이터 형식입니다. 빈 객체로 초기화합니다.");
      return {};
    } catch (error) {
      console.error("Failed to parse todos:", error);
      // 파싱 실패 시 빈 객체 반환
      return {};
    }
  },

  // Todo 저장하기 (항상 새로 추가, 기존 항목 탐색 안 함)
  save: (todo) => {
    try {
      if (!todo || !todo.title || !todo.content) {
        return { success: false, error: "Todo 데이터가 올바르지 않습니다." };
      }

      // 기존 데이터 가져오기 (안전 파싱)
      const existing = todoStorage._getAllAsObject();
      
      // 새 ID 생성 (중복 방지를 위해 루프)
      let id = Date.now();
      while (existing[String(id)]) {
        id = Date.now() + Math.random();
      }

      const newTodo = {
        id: id,
        title: todo.title.trim(),
        content: todo.content.trim(),
        createdAt: new Date().toISOString(),
      };
      
      // 키-값 구조로 저장 (id를 키로 사용)
      existing[String(id)] = newTodo;
      
      // localStorage에 저장
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      } catch (storageError) {
        console.error("localStorage 저장 오류:", storageError);
        return { success: false, error: "저장 공간이 부족하거나 저장할 수 없습니다." };
      }
      
      return { success: true, data: newTodo };
    } catch (error) {
      console.error("Failed to save todo:", error);
      return { success: false, error: error.message };
    }
  },

  // Todo 업데이트하기
  update: (id, todo) => {
    try {
      const existing = todoStorage._getAllAsObject();
      const idKey = String(id);
      
      if (!existing[idKey]) {
        return { success: false, error: "Todo를 찾을 수 없습니다." };
      }

      // 기존 todo를 업데이트
      existing[idKey] = {
        ...existing[idKey],
        title: todo.title.trim(),
        content: todo.content.trim(),
        updatedAt: new Date().toISOString(),
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      return { success: true };
    } catch (error) {
      console.error("Failed to update todo:", error);
      return { success: false, error: error.message };
    }
  },

  // ID로 Todo 찾기
  findById: (id) => {
    try {
      const existing = todoStorage._getAllAsObject();
      return existing[String(id)] || null;
    } catch (error) {
      console.error("Failed to find todo:", error);
      return null;
    }
  },

  // Todo 삭제하기
  delete: (id) => {
    try {
      const existing = todoStorage._getAllAsObject();
      const idKey = String(id);
      
      if (!existing[idKey]) {
        return { success: false, error: "Todo를 찾을 수 없습니다." };
      }

      // 해당 항목 삭제
      delete existing[idKey];
      
      // 나머지 정보를 localStorage에 저장
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      return { success: true };
    } catch (error) {
      console.error("Failed to delete todo:", error);
      return { success: false, error: error.message };
    }
  },
};

