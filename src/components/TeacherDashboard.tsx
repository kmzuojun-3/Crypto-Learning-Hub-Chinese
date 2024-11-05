import React, { useState } from 'react';
import { Lock, Plus, List } from 'lucide-react';
import { Task } from '../types';

interface TeacherDashboardProps {
  tasks: Task[];
  onAddTask: (task: Task) => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ tasks, onAddTask }) => {
  const [plaintext, setPlaintext] = useState('');
  const [rule, setRule] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plaintext || !rule) return;

    const encrypted = encryptText(plaintext, rule);
    onAddTask({
      id: Date.now().toString(),
      rule,
      encrypted,
      plaintext,
      createdAt: new Date().toISOString(),
    });

    setPlaintext('');
    setRule('');
    setShowForm(false);
  };

  const encryptText = (text: string, rule: string): string => {
    const shift = parseInt(rule) || 1;
    return text
      .split('')
      .map(char => {
        // 处理中文字符
        if (/[\u4e00-\u9fa5]/.test(char)) {
          const code = char.charCodeAt(0);
          return String.fromCharCode(code + shift);
        }
        // 处理英文字符
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const base = isUpperCase ? 65 : 97;
          return String.fromCharCode(
            ((code - base + shift) % 26) + base
          );
        }
        return char;
      })
      .join('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">任务管理</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5" />
          <span>创建新任务</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                原文
              </label>
              <input
                type="text"
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="请输入需要加密的文本"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                加密规则（偏移量）
              </label>
              <input
                type="number"
                value={rule}
                onChange={(e) => setRule(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="请输入偏移量（如：3）"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              创建任务
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <List className="w-5 h-5 mr-2" />
            任务列表
          </h3>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">任务编号: {task.id}</p>
                    <p className="font-medium">密文: {task.encrypted}</p>
                    <p className="text-sm text-gray-600">规则: 偏移 {task.rule} 位</p>
                  </div>
                  <Lock className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
            ))}
            {tasks.length === 0 && (
              <p className="text-gray-500 text-center py-4">暂无任务</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;