import React from 'react';
import { connect } from 'umi';
import { Button, Form, Input } from 'antd';
const App = ({ students, dispatch }) => {
  const onFinish = (values) => {
    dispatch({
      type: 'students/login',
      payload: {
        ...values,
      },
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div style={{ width: '400px', margin: '140px auto' }}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="name"
          
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input placeholder="admin"/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password placeholder="123456"/>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
const mapStateToProps = ({ students }) => {
  return {
    students,
  };
};

export default connect(mapStateToProps)(App);
