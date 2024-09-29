import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const LaunchModal = ({ visible, onCancel, record, fetchData }) => {
  const [launchComStatus, setLaunchComStatus] = useState(record.launchCom === 'Done');
  const [launchComDate, setLaunchComDate] = useState(record.launchComDate ? moment(record.launchComDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday; // Allow yesterday, today, and future dates
  };

  const handleLaunchComSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        launchCom: launchComStatus ? 'Done' : 'Not Done',
        launchComDate: launchComDate ? launchComDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Launch details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update Launch details");
    }
  };

  return (
    <Modal title="Launch Details" open={visible} onCancel={onCancel} onOk={handleLaunchComSave}>
      <Form layout="vertical">
        <Form.Item label="Launch Status">
          <Switch
            checked={launchComStatus}
            onChange={(checked) => setLaunchComStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="Launch Date">
          <DatePicker
            value={launchComDate}
            onChange={(date) => setLaunchComDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LaunchModal;
