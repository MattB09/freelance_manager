import axios from 'axios';
import { db, firebase } from '@/firebase';
import {
  ProjectPartial,
  Project,
  Task,
  Client,
} from '../types/DataTypes';

export default async (): Promise<{
  projects: Project[] | null,
  error: string | null,
}> => {
  const URLBASE = 'http://localhost:3000';
  let error: string | null = (null);
  let projects: Project[] | null = null;
  let projectsPartial: ProjectPartial[] = [];
  let clients: Client[];
  let tasks: Task[];

  const newProjObj = {
    name: 'test project',
    isActive: true,
    tasks: [
      { name: 'task1', isBillable: false, isComplete: true },
      { name: 'task2', isBillable: true, isComplete: false },
    ],
  };

  db.collection('users').doc(process.env.VUE_APP_USER_ID).update({
    projects: firebase.firestore.FieldValue.arrayUnion(newProjObj),
  })
    .then((res) => console.log('res', res))
    .catch((err) => console.log(err));

  try {
    const projectData = await axios.get(`${URLBASE}/projects`);
    const clientData = await axios.get(`${URLBASE}/clients`);
    const taskData = await axios.get(`${URLBASE}/tasks`);
    if (
      projectData.statusText !== 'OK'
      || clientData.statusText !== 'OK'
      || taskData.statusText !== 'OK'
    ) throw Error('data not available');
    projectsPartial = projectData.data;
    clients = clientData.data;
    tasks = taskData.data;
  } catch (err) {
    error = err.message;
  }

  if (error === null) {
    projects = projectsPartial.map((project: ProjectPartial) => {
      let clientName: string | null = null;
      if (project.clientId) {
        clientName = clients.find((client: Client) => client.id === project.clientId)!.name;
      }
      const projectTasks: Task[] = tasks.filter((task: Task) => task.projectId === project.id);
      return { ...project, clientName, tasks: projectTasks };
    });
  }

  return { projects, error };
};
