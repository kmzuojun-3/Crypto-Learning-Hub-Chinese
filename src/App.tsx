import React, { useState } from 'react';
import { KeyRound, School, Trophy, Lock, User } from 'lucide-react';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import Login from './components/Login';
import { Task } from './types';

function App() {
  const [userType, setUserType] = useState<'teacher' | 'student' | null>(null);
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [leaderboard, setLeaderboard] = useState<Array<{
    studentName: string;
    taskId: string;
    time: number;
  }>>([]);

  const handleLogin = (type: 'teacher' | 'student', name: string) => {
    setUserType(type);
    setUsername(name);
  };

  const handleLogout = () => {
    setUserType(null);
    setUsername('');
  };

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const addToLeaderboard = (studentName: string, taskId: string, time: number) => {
    setLeaderboard([...leaderboard, { studentName, taskId, time }].sort((a, b) => a.time - b.time));
  };

  if (!userType) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-md px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {userType === 'teacher' ? (
              <KeyRound className="w-6 h-6 text-indigo-600" />
            ) : (
              <School className="w-6 h-6 text-indigo-600" />
            )}
            <h1 className="text-xl font-bold text-gray-800">
              解密游戏 - {userType === 'teacher' ? '教师端' : '学生端'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600">{username}</span>
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              退出登录
            </button>
          </div>
        </div>
      </nav>

      {userType === 'teacher' ? (
        <TeacherDashboard tasks={tasks} onAddTask={addTask} />
      ) : (
        <StudentDashboard
          tasks={tasks}
          username={username}
          leaderboard={leaderboard}
          onSolveTask={addToLeaderboard}
        />
      )}
    </div>
  );
}

export default App;