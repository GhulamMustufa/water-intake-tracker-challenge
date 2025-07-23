const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export const logWaterIntake = async (data: {
  userId: string;
  date: string;
  intakeMl: number;
}) => {
  const response = await fetch(`${API_BASE_URL}/water-log`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getWeeklySummary = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/water-log/summary/${userId}`);
  return response.json();
};