// pages/api/updateTask.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { updateTask } from '@/modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { taskId, updatedTask } = req.body;
    updateTask(taskId, updatedTask);
    res.status(200).json({ message: 'Task updated successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
