import type { NextApiRequest, NextApiResponse } from "next";
import { completeTask } from '@/modules/taskManager';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const tasks = completeTask(req.body.title);
    res.status(200).json(tasks);
}
