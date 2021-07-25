import { InjectionKey } from 'vue';
import { createStore, useStore as baseUserStore, Store } from 'vuex';
import { Project } from '@/types/DataTypes';
import getData from '@/composables/getData';

export type View = 'projects' | 'single' | 'task';

interface GetDataPayload {
  projects: Project[] | null;
  error: string | null;
}

export interface State extends GetDataPayload {
  view: View;
  selectedProject: number | null;
}

export const actionTypes = {
  GET_DATA: 'GET_DATA',
};

export const mutationTypes = {
  CHANGE_VIEW: 'CHANGE_VIEW',
  SET_DATA: 'SET_DATA',
  SET_SELECTED_PROJECT: 'SET_SELECTED_PROJECT',
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
    [mutationTypes.SET_SELECTED_PROJECT](state: State, payload: number): void {
      state.selectedProject = payload;
    },
  },
  actions: {
    async [actionTypes.GET_DATA]({ commit }:any): Promise<void> {
      commit(mutationTypes.SET_DATA, await getData());
    },
  },
});

export function useStore(): Store<State> {
  return baseUserStore(key);
}
