import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const Stage1CompletionModal = ({ visible, onCancel, record, fetchData }) => {
  const [stage1CompletionStatus, setStage1CompletionStatus] = useState(record.stage1Completion === 'Done');
  const [stage1CompletionDate, setStage1CompletionDate] = useState(record.stage1CompletionDate ? moment(record.stage1CompletionDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday; // Allow yesterday, today, and future dates
  };

  const handleStage1CompletedSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        stage1Completion: stage1CompletionStatus ? 'Done' : 'Not Done',
        stage1CompletionDate: stage1CompletionDate ? stage1CompletionDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Stage 1 Completed details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update Stage 1 Completed details");
    }
  };

  return (
    <Modal title="Stage 1 Completed Details" open={visible} onCancel={onCancel} onOk={handleStage1CompletedSave}>
      <Form layout="vertical">
        <Form.Item label="Stage 1 Completed Status">
          <Switch
            checked={stage1CompletionStatus}
            onChange={(checked) => setStage1CompletionStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="Stage 1 Completed Date">
          <DatePicker
            value={stage1CompletionDate}
            onChange={(date) => setStage1CompletionDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Stage1CompletionModal;
