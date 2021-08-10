import { db } from '@/firebase';
import {
  Project,
} from '@/types/DataTypes';

export default async (): Promise<{
  projects: Project[] | null,
  error: string | null,
}> => {
  let error: string | null = (null);
  let projects: Project[] | null = null;

  const userRef = db.collection('users').doc(process.env.VUE_APP_USER_ID);

  try {
    const res = await userRef.get();
    projects = res.data()?.projects;
  } catch (err) {
    error = err.message;
  }

  return { projects, error };
};
