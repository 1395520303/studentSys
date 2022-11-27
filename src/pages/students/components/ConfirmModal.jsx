import React from 'react';
import { Modal } from 'antd';
const App = (props) => {
  return (
    <Modal
      title="删除记录"
      open={props.open}
      onOk={props.handleOk}
      confirmLoading={props.confirmLoading}
      onCancel={props.handleCancel}
    >
      <p>{props.modalText}</p>
    </Modal>
  );
};
export default App;
