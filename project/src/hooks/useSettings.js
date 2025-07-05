import { useState, useEffect } from 'react';
import { loadSettings, saveSettings } from '../store/reminderStore.js';


// export const useSettings = () => {
//   const [settings, setSettings] = useState(loadSettings());

//   useEffect(() => {
//     saveSettings(settings);
//   }, [settings]);

//   const updateSettings = (newSettings) => {
//     setSettings(prev => ({ ...prev, ...newSettings }));
//   };

//   return {
//     settings,
//     updateSettings,
//   };
// };

export const useSettings = () => {
  const [settings, setSettings] = useState(loadSettings());

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const isSetupComplete = settings.username !== 'Friend' && settings.botName !== 'ReminderBuddy';

  return {
    settings,
    updateSettings,
    isSetupComplete, // ✅ expose this
  };
};
