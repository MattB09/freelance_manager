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
    const res = await projectsRef.add(newProject);
    console.log(res.id);
    project = newProject;
    project.id = res.id;
  } catch (err) {
    error = err.message;
  }

  return { project, error };
};
