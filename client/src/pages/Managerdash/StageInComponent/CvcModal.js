import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const CvcModal = ({ visible, onCancel, record, fetchData }) => {
  const [cvcInStatus, setCvcInStatus] = useState(record.cvcIn === 'Done');
  const [cvcInDate, setCvcInDate] = useState(record.cvcInDate ? moment(record.cvcInDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  // const disabledDate = (current) => {
  //   const yesterday = moment().subtract(1, 'days').startOf('day');
  //   return current && current < yesterday; // Allow yesterday, today, and future dates
  // };
  const disabledDate = () => {
    return false; // No date is disabled, so all dates are selectable
  };

  const handleCvcInSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        cvcIn: cvcInStatus ? 'Done' : 'Not Done',
        cvcInDate: cvcInDate ? cvcInDate.format('YYYY-MM-DD') : null,
      });
      toast.success("CVC details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update CVC details");
    }
  };

  return (
    <Modal title="CVC Details" open={visible} onCancel={onCancel} onOk={handleCvcInSave}>
      <Form layout="vertical">
        <Form.Item label="CVC Status">
          <Switch
            checked={cvcInStatus}
            onChange={(checked) => setCvcInStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="CVC Date">
          <DatePicker
            value={cvcInDate}
            onChange={(date) => setCvcInDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CvcModal;
