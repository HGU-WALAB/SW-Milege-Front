import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices
import modalReducer from './slices/modal';
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import filterReducer from './slices/filter';
import dataReducer from './slices/data';
import componentReducer from './slices/component';
import filterListReducer from './slices/filterList';
import chartReducer from './slices/chart';
import drawerReducer from './slices/drawer';

// ----------------------------------------------------------------------

export const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
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
export const rootPersistConfig = {
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
});

export default rootReducer;
