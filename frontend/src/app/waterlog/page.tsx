'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logWaterIntake } from '@/lib/api';

export default function WaterLogPage() {
    const router = useRouter();
  const [userId] = useState('user1'); // Hardcoded for demo
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [intakeMl, setIntakeMl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);

  const handleSubmit = async () => {
    if (!intakeMl || isNaN(Number(intakeMl))) {
      setMessage({ text: 'Please enter a valid number', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      let params = {
        userId,
        date: new Date(date).toDateString(),
        intakeMl: Number(intakeMl),
      }
      await logWaterIntake(params);
      setMessage({ text: 'Logged successfully!', type: 'success' });
      setIntakeMl('');
    } catch (error) {
      setMessage({ text: 'Failed to log intake', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Log Water Intake</h1>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Water Intake (ml)</label>
          <input
            type="number"
            value={intakeMl}
            onChange={(e) => setIntakeMl(e.target.value)}
            placeholder="Enter milliliters"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white font-medium ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        
        <button
          onClick={() => router.push('/summary')}
          className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded text-gray-800 font-medium"
        >
          View Weekly Summary
        </button>
      </div>
    </div>
  );
}