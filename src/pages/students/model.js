import { editRecord, getStudentList, deleteRecord } from './service';
export default {
  namespace: 'students',
  state: {},
  reducers: {
    add(state, { payload }) {
      return { ...state, data: payload };
    },
  },
  effects: {
    *save({ payload: todo }, { put, call }) {
      // Call saveTodoToServer, then trigger `add` action to save data
      const { data } = yield call(getStudentList);
      yield put({ type: 'add', payload: data });
    },
    *edit({ payload: { id, values } }, { put, call }) {
      // Call saveTodoToServer, then trigger `add` action to save data
      const { data } = yield call(editRecord, { id, values });
      yield put({ type: 'add', payload: data });
    },
    *delete({ payload: { id } }, { put, call }) {
      // Call saveTodoToServer, then trigger `add` action to save data
      const { data } = yield call(deleteRecord, { id });
      yield put({ type: 'add', payload: data });
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'save' });
        }
      });
    },
  },
};
