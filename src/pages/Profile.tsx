import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { authAPI } from '../api/auth';
import { useAuthStore } from '../store/authStore';

const Profile = () => {
    const { token, user, setUser } = useAuthStore();
    const [nickname, setNickname] = useState(user?.nickname || '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) return;

        const fetchProfile = async () => {
            setLoading(true);
            try {
                const response = await authAPI.getUserProfile();
                setUser(response.user);
                setNickname(response.user.nickname);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                alert('프로필 정보를 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token, setUser]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!token || !nickname.trim()) {
            alert('닉네임을 입력해주세요.');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('nickname', nickname);

            const response = await authAPI.updateUserProfile(formData);
            alert(response.message || '프로필이 업데이트되었습니다.');
            setUser({
                ...user!,
                nickname,
            });
        } catch (error) {
            console.error('Profile update failed:', error);
            alert('프로필 업데이트에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6">프로필</h1>
            {loading ? (
                <p className="text-center text-gray-500">로딩 중...</p>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
                        placeholder="닉네임"
                        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`p-2 text-white font-bold rounded ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    >
                        {loading ? '업데이트 중...' : '프로필 업데이트'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default Profile;
