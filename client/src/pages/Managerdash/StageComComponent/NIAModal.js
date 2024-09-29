import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const NIAModal = ({ visible, onCancel, record, fetchData }) => {
  const [niaStatus, setNiaStatus] = useState(record.nia === 'Done');
  const [niaDate, setNiaDate] = useState(record.niaDate ? moment(record.niaDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday; // Allow yesterday, today, and future dates
  };

  const handleNiaSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        nia: niaStatus ? 'Done' : 'Not Done',
        niaDate: niaDate ? niaDate.format('YYYY-MM-DD') : null,
      });
      toast.success("NIA details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update NIA details");
    }
  };

  return (
    <Modal title="NIA Details" open={visible} onCancel={onCancel} onOk={handleNiaSave}>
      <Form layout="vertical">
        <Form.Item label="NIA Status">
          <Switch
            checked={niaStatus}
            onChange={(checked) => setNiaStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="NIA Date">
          <DatePicker
            value={niaDate}
            onChange={(date) => setNiaDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NIAModal;
