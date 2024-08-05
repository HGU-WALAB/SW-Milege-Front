import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector, TypedUseSelectorHook } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer, { rootPersistConfig } from './rootReducer';

// ----------------------------------------------------------------------

/**
 * @brief Redux-Persist
 * @description 전역 상태를 영속화하여 저장한다.
 *
 * @detail reducer - persisReducer : ( 영속화에 대한 설정 , Reducer의 모음 ) 을 묶어준다.
 * @detail middleware : 데이터가 다른 곳으로 전달 될 때 상태를 처리해주는 중간 역할
 * 1) serializable : 데이터가 전달 될 때 JSON 형식으로 변환 시켜준다. (ex - JSON.parse)
 * 2) immutable : 데이터가 한번 생성되면 변경/대체 될 수 없다.
 */
const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

const { dispatch } = store;

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
const useDispatch = () => useAppDispatch();

export { store, persistor, dispatch, useSelector, useDispatch };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
