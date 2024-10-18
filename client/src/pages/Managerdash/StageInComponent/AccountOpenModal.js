import React, { useState, useEffect } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const AccountOpenModal = ({ visible, onCancel, record, fetchData }) => {
  const [accountOpenInStatus, setAccountOpenInStatus] = useState(record.accountOpenIn === 'Done');
  const [accountOpenInDate, setAccountOpenInDate] = useState(record.accountOpenInDate ? moment(record.accountOpenInDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Sync state with record when modal is opened
  useEffect(() => {
    setAccountOpenInStatus(record.accountOpenIn === 'Done');
    setAccountOpenInDate(record.accountOpenInDate ? moment(record.accountOpenInDate) : null);
  }, [record]);

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  const disabledDate = () => {
    return false; // No date is disabled, so all dates are selectable
  };

  const handleAccountOpenInSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        accountOpenIn: accountOpenInStatus ? 'Done' : 'Not Done',
        accountOpenInDate: accountOpenInDate ? accountOpenInDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Account Open details updated successfully");
      fetchData(); // Refresh the data
      onCancel(); // Close the modal
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
