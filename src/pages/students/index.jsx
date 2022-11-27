import { Space, Table, Button } from 'antd';
import StudentModal from './components/StudentModal';
import ConfirmModal from './components/ConfirmModal';
import { connect } from 'umi';
import './index.css';
import React, { useState } from 'react';
const index = ({ students, dispatch }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'role',
      dataIndex: 'role',
      key: 'role',
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
  const [method, setMethod] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setconfirmVisible] = useState(false);
  const [record, setRecord] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('删除该条记录？');
  const handleConfirmOk = () => {
    const id = record.id;
    setModalText('正在删除......');
    setConfirmLoading(true);
    dispatch({
      type: 'students/delete',
      payload: {
        id,
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
  const handleRecord = (recor) => {
    setModalTitle('编辑');
    setMethod('edit');
    setVisible(true);
    setRecord(recor);
  };
  const deleteRecord = (record) => {
    setconfirmVisible(true);
    setRecord(record);
  };
  const handleConfirmCancel = () => {
    setconfirmVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
    setRecord({
      id: '',
      name: '',
      password: '',
      email: '',
      phone: '',
      title: '',
      role: '',
    });
  };
  const addNewRecord = () => {
    setModalTitle('新增');
    setMethod('add');
    setVisible(true);
  };
  const onFinish = (values) => {
    const id = record.id;
    if (method == 'edit') {
      dispatch({
        type: 'students/edit',
        payload: {
          id,
          values,
        },
      })
        .then(() => {
          setRecord({
            id: '',
            name: '',
            password: '',
            email: '',
            phone: '',
            title: '',
            role: '',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (method == 'add') {
      dispatch({
        type: 'students/addNew',
        payload: {
          values,
        },
      })
        .then(() => {
          setRecord({
            id: '',
            name: '',
            password: '',
            email: '',
            phone: '',
            title: '',
            role: '',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setVisible(false);
  };
  return (
    <div>
      <Button type="primary" shape="round" onClick={addNewRecord}>
        新增学生信息
      </Button>
      <Table rowKey="id" columns={columns} dataSource={students.data} />
      <StudentModal
        modalTitle={modalTitle}
        open={visible}
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
