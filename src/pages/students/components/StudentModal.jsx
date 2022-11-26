import { Modal, Input, Form } from 'antd';
import React, { useEffect } from 'react';
const StudentModal = (props) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(props.record);
  }, [props.open]);

  const onFinishFailed = (values) => {
    console.log('Success:', values);
  };
  const onOk = () => {
    form.submit();
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={props.open}
        onOk={onOk}
        onCancel={props.handleCancel}
        forceRender
      >
        <Form
          form={form}
          name="basic"
          onFinish={props.onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default StudentModal;
