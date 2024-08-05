// pages/api/createTask.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createTask } from '@/modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, description, persona, group } = req.body;
    try {
      createTask(title, description, persona, group);
      res.status(200).json({ message: 'Task created successfully' });
    } catch (e) {
      res.status(400).json({ e });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
