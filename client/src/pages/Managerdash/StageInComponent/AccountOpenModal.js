import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const AccountOpenModal = ({ visible, onCancel, record, fetchData }) => {
  const [accountOpenInStatus, setAccountOpenInStatus] = useState(record.simpleStatus?.accountOpenIn === 'Done');
  const [accountOpenInDate, setAccountOpenInDate] = useState(record.accountOpenInDate ? moment(record.accountOpenInDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday; // Allow yesterday, today, and future dates
  };

  const handleAccountOpenInSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        accountOpenIn: accountOpenInStatus ? 'Done' : 'Not Done',
        accountOpenInDate: accountOpenInDate ? accountOpenInDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Account Open details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update Account Open details");
    }
  };

  return (
    <Modal title="Account Open Details" open={visible} onCancel={onCancel} onOk={handleAccountOpenInSave}>
      <Form layout="vertical">
        <Form.Item label="Account Open Status">
          <Switch
            checked={accountOpenInStatus}
            onChange={(checked) => setAccountOpenInStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="Account Opening Date">
          <DatePicker
            value={accountOpenInDate}
            onChange={(date) => setAccountOpenInDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AccountOpenModal;
