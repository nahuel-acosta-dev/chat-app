import {store} from '../store/store';

export type AppState = ReturnType<typeof store.getState>;