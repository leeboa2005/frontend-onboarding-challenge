import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth';
import FormInput from '../components/common/FormInput';
import SubmitButton from '../components/common/SubmitButton';

const Signup = () => {
    const [form, setForm] = useState({ id: '', password: '', nickname: '' });
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!form.id.trim() || !form.password.trim() || !form.nickname.trim()) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        try {
            const response = await authAPI.register(form);
            alert(response.message || '회원가입 성공!');
            navigate('/login');
        } catch (error) {
            console.error('Signup failed:', error);
            alert('회원가입에 실패했습니다.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-md w-full p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-xl font-bold text-center mb-6">회원가입</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <FormInput name="id" placeholder="아이디" value={form.id} onChange={handleChange} />
                    <FormInput
                        name="password"
                        type="password"
                        placeholder="비밀번호"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <FormInput name="nickname" placeholder="닉네임" value={form.nickname} onChange={handleChange} />
                    <SubmitButton label="회원가입" />
                </form>
            </div>
        </div>
    );
};

export default Signup;
