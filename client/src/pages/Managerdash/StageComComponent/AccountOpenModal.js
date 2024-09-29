import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const AccountOpenModal = ({ visible, onCancel, record, fetchData }) => {
  const [accountOpenComStatus, setAccountOpenComStatus] = useState(record.accountOpenCom === 'Done');
  const [accountOpenComDate, setAccountOpenComDate] = useState(record.accountOpenComDate ? moment(record.accountOpenComDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday; // Allow yesterday, today, and future dates
  };

  const handleAccountOpenComSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        accountOpenCom: accountOpenComStatus ? 'Done' : 'Not Done',
        accountOpenComDate: accountOpenComDate ? accountOpenComDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Account details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update Account details");
    }
  };

  return (
    <Modal title="Account Details" open={visible} onCancel={onCancel} onOk={handleAccountOpenComSave}>
      <Form layout="vertical">
        <Form.Item label="Account Status">
          <Switch
            checked={accountOpenComStatus}
            onChange={(checked) => setAccountOpenComStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="Account Date">
          <DatePicker
            value={accountOpenComDate}
            onChange={(date) => setAccountOpenComDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AccountOpenModal;
