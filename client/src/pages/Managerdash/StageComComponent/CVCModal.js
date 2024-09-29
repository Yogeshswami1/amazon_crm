import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const CVCModal = ({ visible, onCancel, record, fetchData }) => {
  const [cvcComStatus, setCvcComStatus] = useState(record.cvcCom === 'Done');
  const [cvcComDate, setCvcComDate] = useState(record.cvcComDate ? moment(record.cvcComDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday; // Allow yesterday, today, and future dates
  };

  const handleCvcComSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        cvcCom: cvcComStatus ? 'Done' : 'Not Done',
        cvcComDate: cvcComDate ? cvcComDate.format('YYYY-MM-DD') : null,
      });
      toast.success("CVC details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update CVC details");
    }
  };

  return (
    <Modal title="CVC Details" open={visible} onCancel={onCancel} onOk={handleCvcComSave}>
      <Form layout="vertical">
        <Form.Item label="CVC Status">
          <Switch
            checked={cvcComStatus}
            onChange={(checked) => setCvcComStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="CVC Date">
          <DatePicker
            value={cvcComDate}
            onChange={(date) => setCvcComDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CVCModal;
