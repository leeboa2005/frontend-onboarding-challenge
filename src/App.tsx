import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Main from './pages/Main';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import TodoList from './pages/TodoList';

const App = () => {
    const { token } = useAuthStore();

    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" replace />} />
                <Route path="/" element={<Main />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/todolist" element={<TodoList />} />
            </Routes>
        </Router>
    );
};

export default App;
