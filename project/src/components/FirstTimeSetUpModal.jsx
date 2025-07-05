import React, { useState } from 'react';

export default function FirstTimeSetupModal({ updateSettings }) {
  const [username, setUsername] = useState("");
  const [botName, setBotName] = useState("");
  const [botVibe, setBotVibe] = useState("");

  const handleSubmit = () => {
    updateSettings({ username, botName, botVibe });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96 space-y-4">
        <h2 className="text-xl font-bold">Welcome to Reminder Buddy!</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Bot Name"
          value={botName}
          onChange={(e) => setBotName(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Bot Vibe (e.g. cheerful, sleepy...)"
          value={botVibe}
          onChange={(e) => setBotVibe(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={!username || !botName || !botVibe}
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 disabled:opacity-50"
        >
          Let's go!
        </button>
      </div>
    </div>
  );
}
