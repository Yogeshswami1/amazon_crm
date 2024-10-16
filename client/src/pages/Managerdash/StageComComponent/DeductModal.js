import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const DeductModal = ({ visible, onCancel, record, fetchData }) => {
  const [deductStatus, setDeductStatus] = useState(record.deduct === 'Done');
  const [deductDate, setDeductDate] = useState(record.deductDate ? moment(record.deductDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  // const disabledDate = (current) => {
  //   const yesterday = moment().subtract(1, 'days').startOf('day');
  //   return current && current < yesterday; // Allow yesterday, today, and future dates
  // };
  const disabledDate = () => {
    return false; // No date is disabled, so all dates are selectable
  };

  const handleDeductSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        deduct: deductStatus ? 'Done' : 'Not Done',
        deductDate: deductDate ? deductDate.format('YYYY-MM-DD') : null,
      });
      toast.success("deduct details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update deduct details");
    }
  };

  return (
    <Modal title="deduct Details" open={visible} onCancel={onCancel} onOk={handleDeductSave}>
      <Form layout="vertical">
        <Form.Item label="deduct Status">
          <Switch
            checked={deductStatus}
            onChange={(checked) => setDeductStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="deduct Date">
          <DatePicker
            value={deductDate}
            onChange={(date) => setDeductDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DeductModal;
