import { Space, Table, Tag } from 'antd';
import StudentModal from './components/StudentModal';
import ConfirmModal from './components/ConfirmModal';
import { connect } from 'umi';
import './index.css';
import React, { useState } from 'react';
const index = ({ students, dispatch }) => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              handleRecord(record);
            }}
          >
            Edit
          </a>
          <a
            onClick={() => {
              deleteRecord(record);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setconfirmVisible] = useState(false);
  const [record, setRecord] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('删除该条记录？');
  const handleConfirmOk = () => {
    const id = record.id;

    // setVisible(false);
    setModalText('正在删除......');
    setConfirmLoading(true);
    dispatch({
      type: 'students/delete',
      payload: {
        id
      },
    })
      .then(() => {
        setconfirmVisible(false);
        setConfirmLoading(false);
        setModalText('删除该条记录？');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRecord = (record) => {
    setVisible(true);
    setRecord(record);
  };
  const deleteRecord = (record) => {
    setconfirmVisible(true);
    setRecord(record);
  };
  const handleConfirmCancel = () => {
    setconfirmVisible(false);
  };
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    const id = record.id;
    dispatch({
      type: 'students/edit',
      payload: {
        id,
        values,
      },
    });
    setVisible(false);
  };

  return (
    <div>
      <Table rowKey="id" columns={columns} dataSource={students.data} />
      <StudentModal
        open={visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        record={record}
        onFinish={onFinish}
      ></StudentModal>
      <ConfirmModal
        confirmLoading={confirmLoading}
        handleOk={handleConfirmOk}
        open={confirmVisible}
        handleCancel={handleConfirmCancel}
        modalText={modalText}
      ></ConfirmModal>
    </div>
  );
};
const mapStateToProps = ({ students }) => {
  return {
    students,
  };
};

export default connect(mapStateToProps)(index);
