import { db } from '@/firebase';
import {
  Task,
} from '@/types/DataTypes';

export default async (userId: string, projectId: string): Promise<{
  tasks: Task[] | null,
  error: string | null,
}> => {
  let error: string | null = (null);
  let tasks: Task[] | null = [];

  const tasksRef = db.collection('users').doc(userId)
    .collection('projects').doc(projectId)
    .collection('tasks');

  try {
    const res = await tasksRef.get();
    res.forEach((task) => {
      if (task.data() && tasks) tasks.push({ ...<Task>task.data(), id: task.id });
    });
  } catch (err) {
    error = err.message;
    tasks = null;
  }

  return { tasks, error };
};
