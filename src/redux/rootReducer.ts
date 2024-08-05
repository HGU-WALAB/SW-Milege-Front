import { combineReducers } from 'redux';
import { PersistConfig } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import modalReducer from './slices/modal';
import filterReducer from './slices/filter';
import dataReducer from './slices/data';
import componentReducer from './slices/component';
import filterListReducer from './slices/filterList';
import chartReducer from './slices/chart';
import drawerReducer from './slices/drawer';
import tableReducer from './slices/table';

export const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

export const storage =
  typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

/**
 * @brief Persist 설정 부분
 */

export const rootPersistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['filter', 'modal', 'data', 'drawer'],
  whitelist: ['component', 'filterList'],
};

/**
 * @brief Reducer
 */

const rootReducer = combineReducers({
  /**
   * SW-Reducer
   */
  modal: modalReducer,
  filter: filterReducer,
  data: dataReducer,
  component: componentReducer,
  filterList: filterListReducer,
  chart: chartReducer,
  drawer: drawerReducer,
  table: tableReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
