// pages/api/deleteTask.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteTask } from '@/modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { taskId } = req.body;
    deleteTask(taskId);
    res.status(200).json({ message: 'Task deleted successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
