import { db, firebase } from '@/firebase';
import {
  Project,
} from '@/types/DataTypes';

export default async (newProject: Project): Promise<{
  project: Project | null,
  error: string | null,
}> => {
  let error: string | null = null;
  let project: Project | null = null;

  const userRef = db.collection('users').doc(process.env.VUE_APP_USER_ID);

  try {
    const res = await userRef.update({
      projects: firebase.firestore.FieldValue.arrayUnion(newProject),
    });
    console.log(res);
    project = newProject;
  } catch (err) {
    error = err.message;
  }

  return { project, error };
};
