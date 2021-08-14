import { InjectionKey } from 'vue';
import { createStore, useStore as baseUserStore, Store } from 'vuex';
import { Project, Task } from '@/types/DataTypes';
import getData from '@/store/actionFuncs/getProjects';
import addProject from '@/store/actionFuncs/addProject';
import addTask from '@/store/actionFuncs/addTask';

export type View = 'projects' | 'single' | 'task';

interface GetDataPayload {
  projects: Project[] | null;
  error: string | null;
}

export interface State extends GetDataPayload {
  view: View;
  selectedProject: string | null;
}

export const actionTypes = {
  GET_DATA: 'GET_DATA',
  ADD_PROJECT: 'ADD_PROJECT',
  ADD_TASK: 'ADD_TASK',
};

export const mutationTypes = {
  CHANGE_VIEW: 'CHANGE_VIEW',
  SET_DATA: 'SET_DATA',
  SET_SELECTED_PROJECT: 'SET_SELECTED_PROJECT',
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
  },
  mutations: {
    [mutationTypes.CHANGE_VIEW](state: State, payload: View):void {
      state.view = payload;
    },
    [mutationTypes.SET_DATA](state: State, payload: any): void {
      state.projects = payload.projects;
      state.error = payload.error;
    },
    [mutationTypes.SET_SELECTED_PROJECT](state: State, payload: string): void {
      state.selectedProject = payload;
    },
    [mutationTypes.ADD_PROJECT](state: State, payload: Project): void {
      console.log('from mutation', payload);
      state.projects = state.projects ? [...state.projects, payload] : [payload];
    },
  },
  actions: {
    async [actionTypes.GET_DATA]({ commit }:any): Promise<void> {
      commit(mutationTypes.SET_DATA, await getData());
    },
    async [actionTypes.ADD_PROJECT]({ commit }:any, payload: Project): Promise<void> {
      addProject(payload);
      commit(mutationTypes.ADD_PROJECT, payload);
    },
    async [actionTypes.ADD_TASK]({ commit }:any, payload: Task): Promise<void> {
      console.log('payload in add task', addTask(payload));
      // commit(mutationTypes.ADD_PROJECT, payload);
    },
  },
});

export function useStore(): Store<State> {
  return baseUserStore(key);
}
