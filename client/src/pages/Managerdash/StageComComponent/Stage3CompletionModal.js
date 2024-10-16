import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const Stage3CompletionModal = ({ visible, onCancel, record, fetchData }) => {
  const [stage3CompletionStatus, setStage3CompletionStatus] = useState(record.stage3Completion === 'Done');
  const [stage3CompletionDate, setStage3CompletionDate] = useState(record.stage3CompletionDate ? moment(record.stage3CompletionDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  // const disabledDate = (current) => {
  //   const yesterday = moment().subtract(1, 'days').startOf('day');
  //   return current && current < yesterday; // Allow yesterday, today, and future dates
  // };
  const disabledDate = () => {
    return false; // No date is disabled, so all dates are selectable
  };

  const handleStage3CompletedSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        stage3Completion: stage3CompletionStatus ? 'Done' : 'Not Done',
        stage3CompletionDate: stage3CompletionDate ? stage3CompletionDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Stage 3 Completed details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update Stage 3 Completed details");
    }
  };

  return (
    <Modal title="Stage 3 Completed Details" open={visible} onCancel={onCancel} onOk={handleStage3CompletedSave}>
      <Form layout="vertical">
        <Form.Item label="Stage 3 Completed Status">
          <Switch
            checked={stage3CompletionStatus}
            onChange={(checked) => setStage3CompletionStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="Stage 3 Completed Date">
          <DatePicker
            value={stage3CompletionDate}
            onChange={(date) => setStage3CompletionDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Stage3CompletionModal;
