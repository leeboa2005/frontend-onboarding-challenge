import { useState } from 'react';
import { useTodos, usePersistentLocalTodos } from '../../services/useTodoQueries';
import { Todo } from '../../types/todo';

const List = () => {
    const [newTodo, setNewTodo] = useState('');
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    const { data: serverTodos = [], isLoading, isError } = useTodos();
    const { localTodos, addLocalTodo, updateLocalTodo, deleteLocalTodo } = usePersistentLocalTodos();

    const handleAddTodo = () => {
        if (newTodo.trim()) {
            const newTodoItem: Todo = {
                id: Date.now(),
                title: newTodo,
                completed: false,
            };
            addLocalTodo(newTodoItem);
            setNewTodo('');
        }
    };

    const handleEditTodo = () => {
        if (editingTodo && editingTodo.title.trim()) {
            updateLocalTodo(editingTodo.id, { title: editingTodo.title });
            setEditingTodo(null);
        }
    };

    const handleToggleComplete = (id: string | number, completed: boolean) => {
        updateLocalTodo(id, { completed: !completed });
    };

    const handleDeleteTodo = (id: string | number) => {
        deleteLocalTodo(id);
    };

    if (isLoading) return <p>할 일을 불러오는 중...</p>;
    if (isError) return <p>할 일을 불러오는 데 실패했습니다. 다시 시도해 주세요.</p>;

    const allTodos = [...serverTodos, ...localTodos];

    return (
        <div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="새 할 일을 입력하세요"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="p-2 border rounded mr-2"
                />
                <button
                    onClick={handleAddTodo}
                    className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition-all"
                >
                    추가
                </button>
            </div>
            <ul>
                {allTodos.map((todo) => (
                    <li key={todo.id} className="flex items-center justify-between p-2 border-b">
                        {editingTodo?.id === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingTodo.title}
                                    onChange={(e) =>
                                        setEditingTodo({
                                            ...editingTodo,
                                            title: e.target.value,
                                        })
                                    }
                                    className="p-2 border rounded mr-2"
                                />
                                <div className="flex space-x-1">
                                    <button
                                        onClick={handleEditTodo}
                                        className="px-3 py-1 bg-orange-400 text-white rounded hover:bg-orange-500 transition-all"
                                    >
                                        저장
                                    </button>
                                    <button
                                        onClick={() => setEditingTodo(null)}
                                        className="px-3 py-1 bg-orange-300 text-white rounded hover:bg-orange-400 transition-all"
                                    >
                                        취소
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <span
                                    onClick={() =>
                                        localTodos.some((t) => t.id === todo.id) &&
                                        handleToggleComplete(todo.id, todo.completed)
                                    }
                                    className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
                                >
                                    {todo.title}
                                </span>
                                {localTodos.some((t) => t.id === todo.id) && (
                                    <div className="flex space-x-1">
                                        <button
                                            onClick={() => setEditingTodo(todo)}
                                            className="px-3 py-1 bg-orange-400 text-white rounded hover:bg-orange-500 transition-all"
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTodo(todo.id)}
                                            className="px-3 py-1 bg-orange-300 text-white rounded hover:bg-orange-400 transition-all"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default List;
