import {
  editRecord,
  getStudentList,
  deleteRecord,
  addRecord,
  logIn,
} from './service';
import { routerRedux } from 'dva/router';
export default {
  namespace: 'students',
  state: {},
  reducers: {
    add(state, { payload }) {
      return { ...state, data: payload };
    },
  },
  effects: {
    *login({ payload: values }, { put, call }) {
      // Call saveTodoToServer, then trigger `add` action to save data
      const { msg, name } = yield call(logIn, { values });
      if (msg == 'login!') {
        yield put(routerRedux.push('/student'));
      }
    },
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
    *addNew({ payload: { values } }, { put, call }) {
      // Call saveTodoToServer, then trigger `add` action to save data
      const { data } = yield call(addRecord, { values });
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
      return history.listen(({ pathname }) => {
        if (pathname === '/student') {
          dispatch({ type: 'save' });
        }
      });
    },
  },
};
