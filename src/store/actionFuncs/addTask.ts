import { db, firebase } from '@/firebase';
import { Task } from '@/types/DataTypes';

export default async (newTask: Task): Promise<{
  task: Task | null,
  error: string |null,
}> => {
  let error: string | null = null;
  let task: Task | null = null;
  // const userRef = db.collection('users').doc(process.env.VUE_APP_USER_ID);

  try {
    // const res = await userRef.update({
    //   projects:
    // })
    task = newTask;
  } catch (err) {
    error = err.message;
  }

  return { task, error };
};
