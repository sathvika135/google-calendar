import React from 'react';
import Calendar from './components/Calendar';
import events from './data/events.json';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Calendar events={events} />
    </div>
  );
}
