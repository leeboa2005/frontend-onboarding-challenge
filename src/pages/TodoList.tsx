import List from '../components/todolist/List';

const TodoListPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="max-w-2xl w-full p-6 bg-white shadow-md rounded">
                <h1 className="text-2xl font-bold mb-4">매일 기록</h1>
                <List />
            </div>
        </div>
    );
};

export default TodoListPage;
