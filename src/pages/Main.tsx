import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Main = () => {
    const { token, user } = useAuthStore(); // 로그인 상태 가져오기
    const navigate = useNavigate();

    useEffect(() => {
        if (token && user) {
            // 로그인 상태일 때 TodoList로 리다이렉트
            navigate('/todolist');
        }
    }, [token, user, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
            <div className="max-w-md lg:max-w-4xl w-full bg-white shadow-lg rounded-lg p-4 lg:p-6 flex flex-col lg:flex-row items-center lg:items-start">
                <div className="w-full lg:w-1/2 h-64 lg:h-auto overflow-hidden rounded-lg mb-4 lg:mb-0 lg:mr-6">
                    <img src="/welcome-image.webp" alt="환영 이미지" className="w-full h-full object-cover" />
                </div>
                <div className="text-center lg:text-left lg:w-1/2 lg:mt-28">
                    <h1 className="text-3xl lg:text-4xl font-bold text-orange-600 mb-3 lg:mb-4">매일 기록해보세요.</h1>
                    <p className="text-base lg:text-lg mb-4 lg:mb-6 text-gray-600">
                        로그인하거나 회원가입을 진행해 주세요.
                    </p>
                    {token && user ? (
                        <div>
                            <p className="text-base lg:text-lg mb-3 lg:mb-4">
                                안녕하세요, <strong>{user.nickname}</strong>님! 👋
                            </p>
                            <button
                                onClick={() => navigate('/profile')}
                                className="mt-4 px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition-all"
                            >
                                마이페이지로 이동
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row justify-center lg:justify-start gap-3 lg:gap-4">
                            <button
                                onClick={() => navigate('/login')}
                                className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition-all"
                            >
                                로그인
                            </button>
                            <button
                                onClick={() => navigate('/signup')}
                                className="px-4 py-2 bg-orange-300 text-white rounded hover:bg-orange-400 transition-all"
                            >
                                회원가입
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Main;
