import { InjectionKey } from 'vue';
import { createStore, useStore as baseUserStore, Store } from 'vuex';

type View = 'projects' | 'single' | 'task';

export interface State {
  view: View;
}

export const key: InjectionKey<Store<State>> = Symbol('key for typed state');

export const store = createStore<State>({
  state: {
    view: 'projects',
  },
  mutations: {
    changeView(state:State, payload: View):void {
      state.view = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});

export function useStore(): Store<State> {
  return baseUserStore(key);
}
