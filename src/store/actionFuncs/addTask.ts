import { db, firebase } from '@/firebase';
import { Task } from '@/types/DataTypes';

export default async (newTask: Task, userId: string, projectId: string): Promise<{
  task: Task | null,
  error: string |null,
}> => {
  let error: string | null = null;
  let task: Task | null = null;

  const tasksRef = db.collection('users').doc(userId)
    .collection('projects').doc(projectId)
    .collection('tasks');

  try {
    const res = await tasksRef.add(newTask);
    task = newTask;
    task.id = res.id;
  } catch (err) {
    error = err.message;
  }

  return { task, error };
};
