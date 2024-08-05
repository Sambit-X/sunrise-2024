import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];

function task_separation() {
  let inprogressTasks: Task[] = tasks.filter(task => !task.completed).sort((a, b) => a.group - b.group);

  let lowestGroupTasks = inprogressTasks.filter(task => task.group === inprogressTasks[0]?.group);
  let higherGroupTasks = inprogressTasks.filter(task => task.group > inprogressTasks[0]?.group);

  if (lowestGroupTasks.length < 2) {
    inprogressTasks = [...lowestGroupTasks, ...higherGroupTasks.slice(0, 2 - lowestGroupTasks.length)];
  } else {
    inprogressTasks = lowestGroupTasks.slice(0, 2);
  }

  let todoTasks: Task[] = tasks.filter(task => !task.completed && !inprogressTasks.includes(task));

  let finishedTasks: Task[] = tasks.filter(task => task.completed === true);

  return ({ todoTasks: todoTasks, inprogressTasks: inprogressTasks, finishedTasks: finishedTasks })
}

export function initializeTasks() {
  const temp = task_separation();
  return temp;
}

export function getActiveTasks(): Task[] {
  const { inprogressTasks } = task_separation();
  const minGroup = Math.min(...inprogressTasks.map(t => t.group));
  return inprogressTasks.filter(task => task.group === minGroup);
}

export function getCompletedTasks(): Task[] {
  return tasks.filter(task => task.completed);
}

export function getAllTasks(): Task[] {
  return tasks;
}

export function canStartTask(newTaskGroup: number): boolean {
  const completedGroups = new Set(getCompletedTasks().map(task => task.group));
  return [...completedGroups].every(group => group < newTaskGroup);
}

export function completeTask(taskTitle: String) {
  let task = tasks.find(t => t.title === taskTitle);
  if (task) {
    task.completed = true;
  }
  const temp = task_separation();
  return temp;
}

export function createTask(title: string, description: string, persona: string, group: number): void {

  const newTask: Task = {
    id: tasks.length + 1,
    title,
    description,
    persona,
    group,
    completed: false,
  };
  tasks.push(newTask);
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
  }
}

export function deleteTask(taskId: number): void {
  tasks = tasks.filter(task => task.id !== taskId);
}
