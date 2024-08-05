import type { NextApiRequest, NextApiResponse } from "next";
import { initializeTasks } from '@/modules/taskManager';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const tasks = initializeTasks();
    res.status(200).json(tasks);
}
