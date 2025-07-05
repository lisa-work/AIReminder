import { useState, useEffect, useCallback } from 'react';
import { loadReminders, saveReminders, generateId } from '../store/reminderStore.js';
import { calculateTimeLeft, isTimeUp } from '../utils/timeUtils.js';
import { showNotification, playNotificationSound } from '../utils/notifications.js';

export const useReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [timers, setTimers] = useState({});

  useEffect(() => {
    const savedReminders = loadReminders();
    setReminders(savedReminders);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = {};
      const updatedReminders = [];

      reminders.forEach(reminder => {
        const timeLeft = calculateTimeLeft(reminder.targetTime);
        newTimers[reminder.id] = timeLeft;

        if (isTimeUp(timeLeft) && reminder.isActive && !reminder.isCompleted) {
          // Trigger notification
          showNotification(
            `⏰ ${reminder.title}`,
            `Your reminder is due now!`,
            '/vite.svg'
          );
          
          if (reminder.soundEnabled) {
            playNotificationSound();
          }

          // Mark as completed
          updatedReminders.push({
            ...reminder,
            isCompleted: true,
            isActive: false,
          });
        } else {
          updatedReminders.push(reminder);
        }
      });

      setTimers(newTimers);

      // Update reminders if any were completed
      if (updatedReminders.some((r, i) => r.isCompleted !== reminders[i]?.isCompleted)) {
        setReminders(updatedReminders);
        saveReminders(updatedReminders);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [reminders]);

  const addReminder = useCallback((reminderData) => {
    const newReminder = {
      ...reminderData,
      id: generateId(),
      createdAt: new Date(),
    };

    const updatedReminders = [...reminders, newReminder];
    setReminders(updatedReminders);
    saveReminders(updatedReminders);
  }, [reminders]);

  const deleteReminder = useCallback((id) => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    setReminders(updatedReminders);
    saveReminders(updatedReminders);
  }, [reminders]);

  const toggleReminder = useCallback((id) => {
    const updatedReminders = reminders.map(reminder =>
      reminder.id === id
        ? { ...reminder, isActive: !reminder.isActive }
        : reminder
    );
    setReminders(updatedReminders);
    saveReminders(updatedReminders);
  }, [reminders]);

  const activeReminders = reminders.filter(r => r.isActive && !r.isCompleted);
  const completedReminders = reminders.filter(r => r.isCompleted);

  return {
    reminders,
    activeReminders,
    completedReminders,
    timers,
    addReminder,
    deleteReminder,
    toggleReminder,
  };
};