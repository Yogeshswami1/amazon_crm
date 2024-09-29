import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const AdzoneModal = ({ visible, onCancel, record, fetchData }) => {
  const [adzoneStatus, setAdzoneStatus] = useState(record.adzone === 'Done');
  const [adzoneDate, setAdzoneDate] = useState(record.adzoneDate ? moment(record.adzoneDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday; // Allow yesterday, today, and future dates
  };

  const handleAdzoneSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        adzone: adzoneStatus ? 'Done' : 'Not Done',
        adzoneDate: adzoneDate ? adzoneDate.format('YYYY-MM-DD') : null,
      });
      toast.success("adzone details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update adzone details");
    }
  };

  return (
    <Modal title="adzone Details" open={visible} onCancel={onCancel} onOk={handleAdzoneSave}>
      <Form layout="vertical">
        <Form.Item label="adzone Status">
          <Switch
            checked={adzoneStatus}
            onChange={(checked) => setAdzoneStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="adzone Date">
          <DatePicker
            value={adzoneDate}
            onChange={(date) => setAdzoneDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdzoneModal;
