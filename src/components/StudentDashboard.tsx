import React, { useState } from 'react';
import { Trophy, Clock, Lock } from 'lucide-react';
import { Task } from '../types';

interface StudentDashboardProps {
  tasks: Task[];
  username: string;
  leaderboard: Array<{
    studentName: string;
    taskId: string;
    time: number;
  }>;
  onSolveTask: (studentName: string, taskId: string, time: number) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({
  tasks,
  username,
  leaderboard,
  onSolveTask,
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [answer, setAnswer] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [error, setError] = useState('');

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
    setAnswer('');
    setError('');
    setStartTime(Date.now());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask || !startTime) return;

    if (answer === selectedTask.plaintext) {
      const timeTaken = (Date.now() - startTime) / 1000;
      onSolveTask(username, selectedTask.id, timeTaken);
      setSelectedTask(null);
      setAnswer('');
      setStartTime(null);
    } else {
      setError('答案错误，请重试！');
    }
  };

  const formatTime = (seconds: number): string => {
    return `${seconds.toFixed(1)}秒`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2" />
            解密挑战
          </h2>
          <div className="grid gap-4">
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => handleTaskSelect(task)}
                className={`p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors ${
                  selectedTask?.id === task.id ? 'border-indigo-500 bg-indigo-50' : ''
                }`}
              >
                <p className="font-medium">密文: {task.encrypted}</p>
                <p className="text-sm text-gray-600">规则: 偏移 {task.rule} 位</p>
              </button>
            ))}
            {tasks.length === 0 && (
              <p className="text-gray-500 text-center py-4">暂无可用的解密任务</p>
            )}
          </div>
        </div>

        {selectedTask && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">解决挑战</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  你的答案
                </label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="请输入解密后的文本"
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                提交答案
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          排行榜
        </h2>
        <div className="space-y-4">
          {leaderboard.map((entry, index) => (
            <div
              key={`${entry.studentName}-${entry.taskId}-${entry.time}`}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <span className={`font-bold ${
                  index === 0 ? 'text-yellow-500' :
                  index === 1 ? 'text-gray-500' :
                  index === 2 ? 'text-amber-600' :
                  'text-gray-600'
                }`}>
                  第{index + 1}名
                </span>
                <span className="font-medium">{entry.studentName}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{formatTime(entry.time)}</span>
              </div>
            </div>
          ))}
          {leaderboard.length === 0 && (
            <p className="text-gray-500 text-center py-4">暂无解题记录</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;