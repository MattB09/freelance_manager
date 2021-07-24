import axios from 'axios';
import { ref, Ref } from 'vue';
import { Project } from '../types/DataTypes';

export default (): {
  projects: Ref<Project[] | undefined>,
  error: Ref< string | null>,
  load: () => void
} => {
  const urlBase = 'http://localhost:3000';
  const projects = ref<Project[]>();
  const error = ref<string | null>(null);

  const load = async () => {
    try {
      const data = await axios.get(`${urlBase}/projects`);
      console.log(data);
      if (data.statusText !== 'OK') throw Error('data not available');
      projects.value = data.data;
    } catch (err) {
      error.value = err.message;
    }
  };

  return { projects, error, load };
};
