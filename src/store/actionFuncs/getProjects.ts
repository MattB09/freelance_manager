import { db } from '@/firebase';
import {
  Project,
} from '@/types/DataTypes';

export default async (): Promise<{
  projects: Project[] | null,
  error: string | null,
}> => {
  let error: string | null = (null);
  let projects: Project[] | null = [];

  const userRef = db.collection('users').doc(process.env.VUE_APP_USER_ID).collection('projects');

  try {
    const res = await userRef.get();
    res.forEach((proj) => {
      if (proj.data() && projects) projects.push(<Project>proj.data());
    });
  } catch (err) {
    error = err.message;
    projects = null;
  }

  return { projects, error };
};
