import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import FormInput from '../components/FormInput';
import SubmitButton from '../components/SubmitButton';

const Login = () => {
    const [form, setForm] = useState({ id: '', password: '' });
    const navigate = useNavigate();
    const { setToken, setUser } = useAuthStore();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!form.id || !form.password) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        try {
            const response = await authAPI.login(form);
            setToken(response.accessToken);
            setUser({ id: response.userId, nickname: response.nickname });
            alert('로그인 성공!');
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            alert('로그인에 실패했습니다.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-6">로그인</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <FormInput name="id" placeholder="아이디" value={form.id} onChange={handleChange} />
                    <FormInput
                        name="password"
                        type="password"
                        placeholder="비밀번호"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <SubmitButton label="로그인" />
                </form>
            </div>
        </div>
    );
};

export default Login;
