import React, { useState } from 'react';
import { KeyRound, School } from 'lucide-react';

interface LoginProps {
  onLogin: (type: 'teacher' | 'student', username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [selectedType, setSelectedType] = useState<
    'teacher' | 'student' | null
  >(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (selectedType === 'teacher') {
      if (password === 'admin') {
        onLogin('teacher', '教师');
      } else {
        setError('密码错误');
      }
    } else if (username.trim()) {
      onLogin('student', username);
    } else {
      setError('请输入姓名');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          解密游戏
        </h1>

        {!selectedType ? (
          <div className="space-y-4">
            <button
              onClick={() => setSelectedType('teacher')}
              className="w-full p-4 bg-white border-2 border-indigo-600 rounded-lg flex items-center justify-center space-x-3 hover:bg-indigo-50 transition-colors"
            >
              <KeyRound className="w-6 h-6 text-indigo-600" />
              <span className="text-lg font-medium text-indigo-600">
                教师登录
              </span>
            </button>
            <button
              onClick={() => setSelectedType('student')}
              className="w-full p-4 bg-white border-2 border-green-600 rounded-lg flex items-center justify-center space-x-3 hover:bg-green-50 transition-colors"
            >
              <School className="w-6 h-6 text-green-600" />
              <span className="text-lg font-medium text-green-600">
                学生登录
              </span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {selectedType === 'teacher' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  密码
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="请输入密码"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  姓名
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="请输入姓名"
                />
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setSelectedType(null)}
                className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                返回
              </button>
              <button
                type="submit"
                className={`flex-1 px-4 py-2 text-white rounded-lg ${
                  selectedType === 'teacher'
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                登录
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
