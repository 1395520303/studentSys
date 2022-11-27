import request from 'umi-request';
request.interceptors.request.use((url, options) => {
  let { data } = options;
  let ret = '';
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
  }
  options = { ...options, data: ret };
  return {
    url: url,
    options: { ...options, interceptors: true },
  };
});
export const getStudentList = async () => {
  return request('http://localhost:3000/student', {
    method: 'get',
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const editRecord = async ({ id, values }) => {
  return request(`http://localhost:3000/student/${id}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    method: 'post',
    data: {
      ...values,
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const addRecord = async ({ values }) => {
  return request(`http://localhost:3000/student`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    method: 'post',
    data: {
      ...values,
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const deleteRecord = async ({ id }) => {
  return request(`http://localhost:3000/student/${id}`, {
    method: 'delete',
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const logIn = async ({ values }) => {
  return request(`http://localhost:3000/login`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    method: 'post',
    data: {
      ...values,
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};
