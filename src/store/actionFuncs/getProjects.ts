import { db } from '@/firebase';
import {
  Project,
} from '@/types/DataTypes';

export default async (userId: string): Promise<{
  projects: Project[] | null,
  error: string | null,
}> => {
  let error: string | null = (null);
  let projects: Project[] | null = [];

  const userRef = db.collection('users').doc(userId).collection('projects');

  try {
    const res = await userRef.get();
    res.forEach((proj) => {
      if (proj.data() && projects) projects.push({ ...<Project>proj.data(), id: proj.id });
    });
  } catch (err) {
    error = err.message;
    projects = null;
  }

  return { projects, error };
};
