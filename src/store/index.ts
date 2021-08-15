import { InjectionKey } from 'vue';
import { createStore, useStore as baseUserStore, Store } from 'vuex';
import { Project, Task } from '@/types/DataTypes';
import getProjects from '@/store/actionFuncs/getProjects';
import getTasks from '@/store/actionFuncs/getTasks';
import addProject from '@/store/actionFuncs/addProject';
import addTask from '@/store/actionFuncs/addTask';

export type View = 'projects' | 'single' | 'task';

interface GetProjectsPayload {
  projects: Project[] | null;
  error: string | null;
}

export interface State extends GetProjectsPayload {
  view: View;
  selectedProject: string | null;
  user: string;
}

interface AddProjectPayload {
  newProject: Project;
  user: string;
}

interface GetTasksPayload {
  user: string,
  project: string
}

interface SetTasksPayload {
  tasks: Task[] | null;
  error: string | null;
}

interface AddTaskPayload {
  newTask: Task;
  user: string;
  project: string;
}

export const actionTypes = {
  GET_PROJECTS: 'GET_PROJECTS',
  GET_TASKS: 'GET_TASKS',
  ADD_PROJECT: 'ADD_PROJECT',
  ADD_TASK: 'ADD_TASK',
};

export const mutationTypes = {
  CHANGE_VIEW: 'CHANGE_VIEW',
  SET_PROJECTS: 'SET_PROJECTS',
  SET_SELECTED_PROJECT: 'SET_SELECTED_PROJECT',
  SET_TASKS: 'SET_TASKS',
  ADD_PROJECT: 'ADD_PROJECT',
  ADD_TASK: 'ADD_TASK',
};

export const key: InjectionKey<Store<State>> = Symbol('key for typed state');

export const store = createStore<State>({
  state: {
    view: 'projects',
    projects: null,
    error: null,
    selectedProject: null,
    user: process.env.VUE_APP_USER_ID!,
  },
  mutations: {
    [mutationTypes.CHANGE_VIEW](state: State, payload: View):void {
      state.view = payload;
    },
    [mutationTypes.SET_PROJECTS](state: State, payload: GetProjectsPayload): void {
      state.projects = payload.projects;
      state.error = payload.error;
    },
    [mutationTypes.SET_SELECTED_PROJECT](state: State, payload: string): void {
      state.selectedProject = payload;
    },
    [mutationTypes.SET_TASKS](state: State, payload: SetTasksPayload): void {
      if (payload.tasks && state.projects) {
        const projectsCopy = [...state.projects];
        const projInd = projectsCopy.findIndex((proj) => proj.id === state.selectedProject);
        const updatedProj = projectsCopy[projInd];
        updatedProj.tasks = payload.tasks;
        projectsCopy.splice(projInd, 1, updatedProj);
        state.projects = [...projectsCopy];
      }
      state.error = payload.error;
    },
    [mutationTypes.ADD_PROJECT](state: State, payload: Project): void {
      state.projects = state.projects ? [...state.projects, payload] : [payload];
    },
    [mutationTypes.ADD_TASK](state: State, payload: Task): void {
      if (state.projects) {
        const projectsCopy = [...state.projects];
        const projInd = projectsCopy.findIndex((proj) => proj.id === state.selectedProject);
        const updatedProj = projectsCopy[projInd];
        if (updatedProj.tasks) updatedProj.tasks.push(payload);
        projectsCopy.splice(projInd, 1, updatedProj);
        state.projects = [...projectsCopy];
      }
    },
  },
  actions: {
    async [actionTypes.GET_PROJECTS]({ commit }:any, payload: string): Promise<void> {
      commit(mutationTypes.SET_PROJECTS, await getProjects(payload));
    },
    async [actionTypes.GET_TASKS]({ commit }:any, { user, project }: GetTasksPayload)
    : Promise<void> {
      commit(mutationTypes.SET_TASKS, await getTasks(user, project));
    },
    async [actionTypes.ADD_PROJECT]({ commit }:any, { newProject, user }: AddProjectPayload)
    : Promise<void> {
      const { project, error } = await addProject(newProject, user);
      console.log('error', error);
      commit(mutationTypes.ADD_PROJECT, project);
    },
    async [actionTypes.ADD_TASK]({ commit }:any, { newTask, user, project }: AddTaskPayload)
    : Promise<void> {
      const { error, task } = await addTask(newTask, user, project);
      console.log('from store', error, task);
      commit(mutationTypes.ADD_TASK, task);
    },
  },
});

export function useStore(): Store<State> {
  return baseUserStore(key);
}
