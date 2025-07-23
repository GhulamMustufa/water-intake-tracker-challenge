'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { getWeeklySummary } from '@/lib/api';

interface WaterSummaryItem {
  date: string;
  totalIntake: number;
  percentageOfGoal: number;
}

export default function WaterSummaryPage() {
  const router = useRouter();
  const [data, setData] = useState<WaterSummaryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = 'user1';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getWeeklySummary(userId);
        let res = result.map((item: any) => ({ ...item, date: new Date(item.date).toISOString().split('T')[0]}));
        setData(res);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-blue-600">Weekly Water Intake</h1>
        <button
          onClick={() => router.push('/waterlog')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Log Water Intake
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: 'ml', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value) => [`${value} ml`, 'Intake']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <ReferenceLine y={2000} stroke="red" label="Goal" />
                <Bar dataKey="totalIntake" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Daily Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-3">
              {data.map((item) => (
                <div key={item.date} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="font-medium text-gray-900">{item.date}</div>
                  <div className="text-blue-600">{item.totalIntake} ml</div>
                  <div className={`text-sm ${item.percentageOfGoal >= 100 ? 'text-green-600' : 'text-amber-600'}`}>
                    {item.percentageOfGoal.toFixed(0)}% of goal
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}