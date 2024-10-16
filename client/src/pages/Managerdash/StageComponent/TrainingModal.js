import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const TrainingModal = ({ visible, onCancel, record, fetchData }) => {
  const [trainingStatus, setTrainingStatus] = useState(record.simpleStatus?.training === 'Done');
  const [trainingDate, setTrainingDate] = useState(record.trainingDate ? moment(record.trainingDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  // const disabledDate = (current) => {
  //   const yesterday = moment().subtract(1, 'days').startOf('day');
  //   return current && current < yesterday; // Allow yesterday, today, and future dates
  // };
  const disabledDate = () => {
    return false; // No date is disabled, so all dates are selectable
  };

  const handleTrainingSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        training: trainingStatus ? 'Done' : 'Not Done',
        trainingDate: trainingDate ? trainingDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Training details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update Training details");
    }
  };

  return (
    <Modal title="Training Details" open={visible} onCancel={onCancel} onOk={handleTrainingSave}>
      <Form layout="vertical">
        <Form.Item label="Training Status">
          <Switch
            checked={trainingStatus}
            onChange={(checked) => setTrainingStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="Training Date">
          <DatePicker
            value={trainingDate}
            onChange={(date) => setTrainingDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TrainingModal;
