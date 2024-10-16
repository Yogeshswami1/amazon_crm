import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const LaunchModal = ({ visible, onCancel, record, fetchData }) => {
  const [launchInStatus, setLaunchInStatus] = useState(record.launchIn === 'Done');
  const [launchInDate, setLaunchInDate] = useState(record.launchInDate ? moment(record.launchInDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  // const disabledDate = (current) => {
  //   const yesterday = moment().subtract(1, 'days').startOf('day');
  //   return current && current < yesterday; // Allow yesterday, today, and future dates
  // };
  const disabledDate = () => {
    return false; // No date is disabled, so all dates are selectable
  };
  const handleLaunchInSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        launchIn: launchInStatus ? 'Done' : 'Not Done',
        launchInDate: launchInDate ? launchInDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Launch details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update Launch details");
    }
  };

  return (
    <Modal title="Launch Details" open={visible} onCancel={onCancel} onOk={handleLaunchInSave}>
      <Form layout="vertical">
        <Form.Item label="Launch Status">
          <Switch
            checked={launchInStatus}
            onChange={(checked) => setLaunchInStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="Launch Date">
          <DatePicker
            value={launchInDate}
            onChange={(date) => setLaunchInDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LaunchModal;
