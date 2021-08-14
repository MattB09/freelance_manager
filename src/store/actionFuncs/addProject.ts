import { db, firebase } from '@/firebase';
import {
  Project,
} from '@/types/DataTypes';

export default async (newProject: Project, userId: string): Promise<{
  project: Project | null,
  error: string | null,
}> => {
  let error: string | null = null;
  let project: Project | null = null;

  const projectsRef = db.collection('users').doc(userId).collection('projects');

  try {
    await projectsRef.add(newProject);
    project = newProject;
  } catch (err) {
    error = err.message;
  }

  return { project, error };
};
