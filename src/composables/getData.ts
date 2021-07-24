import axios from 'axios';
import { ref, Ref } from 'vue';
import {
  ProjectPartial,
  Project,
  Task,
  Client,
} from '../types/DataTypes';

export default (): {
  projects: Ref<Project[] | undefined>,
  error: Ref< string | null>,
  load: () => void
} => {
  const URLBASE = 'http://localhost:3000';
  const error = ref<string | null>(null);
  const projects = ref<Project[]>();
  let projectsPartial: ProjectPartial[] = [];
  let clients: Client[];
  let tasks: Task[];

  const load = async () => {
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
      error.value = err.message;
    }

    console.log('error value', error.value);
    if (error.value === null) {
      console.log('projectsvalue if-statement triggered', projectsPartial);
      projects.value = projectsPartial.map((project: ProjectPartial) => {
        let clientName: string | null = null;
        if (project.clientId) {
          clientName = clients.find((client: Client) => client.id === project.clientId)!.name;
        }
        const projectTasks: Task[] = tasks.filter((task: Task) => task.projectId === project.id);
        return { ...project, clientName, tasks: projectTasks };
      });
      console.log('projectsvalue if-statement finished', projects);
    }
  };

  return { projects, error, load };
};
