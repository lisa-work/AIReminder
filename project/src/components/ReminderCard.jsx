import React from 'react';
import { Trash2, Play, Pause, Clock } from 'lucide-react';
import { formatTimeLeft, formatDateTime } from '../utils/timeUtils.js';

const categoryColors = {
  focus: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  health: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  fun: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  work: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  custom: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
};

const categoryIcons = {
  focus: '🎯',
  health: '💪',
  fun: '🎉',
  work: '💼',
  custom: '📝',
};

export const ReminderCard = ({
  reminder,
  timeLeft,
  onDelete,
  onToggle,
}) => {
  const isExpired = timeLeft.total <= 0;
  const isUrgent = timeLeft.total <= 60000 && timeLeft.total > 0; // Less than 1 minute

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md border transition-all duration-300 hover:shadow-lg ${
      isExpired ? 'border-red-300 bg-red-50 dark:bg-red-900/20' : 
      isUrgent ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20' : 
      'border-gray-200 dark:border-gray-700'
    }`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">{categoryIcons[reminder.category]}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[reminder.category]}`}>
                {reminder.category}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {reminder.title}
            </h3>
            {reminder.description && (
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {reminder.description}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggle(reminder.id)}
              className={`p-2 rounded-lg transition-colors ${
                reminder.isActive
                  ? 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-300'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-500'
              }`}
              title={reminder.isActive ? 'Pause' : 'Resume'}
            >
              {reminder.isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={() => onDelete(reminder.id)}
              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{formatDateTime(reminder.targetTime)}</span>
          </div>
          <div className={`text-2xl font-bold ${
            isExpired ? 'text-red-600' : 
            isUrgent ? 'text-yellow-600' : 
            'text-gray-900 dark:text-white'
          }`}>
            {formatTimeLeft(timeLeft)}
          </div>
        </div>

        {reminder.isCompleted && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-green-800 dark:text-green-200 text-sm font-medium">
              ✅ Completed!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};