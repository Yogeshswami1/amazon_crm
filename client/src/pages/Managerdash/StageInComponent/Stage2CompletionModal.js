import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const Stage2CompletionModal = ({ visible, onCancel, record, fetchData }) => {
  const [stage2CompletionStatus, setStage2CompletionStatus] = useState(record.stage2Completion === 'Done');
  const [stage2CompletionDate, setStage2CompletionDate] = useState(record.stage2CompletionDate ? moment(record.stage2CompletionDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  // const disabledDate = (current) => {
  //   const yesterday = moment().subtract(1, 'days').startOf('day');
  //   return current && current < yesterday; // Allow yesterday, today, and future dates
  // };
  const disabledDate = () => {
    return false; // No date is disabled, so all dates are selectable
  };

  const handleStage2CompletionSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        stage2Completion: stage2CompletionStatus ? 'Done' : 'Not Done',
        stage2CompletionDate: stage2CompletionDate ? stage2CompletionDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Stage 2 Completed successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update Stage 2 details");
    }
  };

  return (
    <Modal title="Stage 2 Details" open={visible} onCancel={onCancel} onOk={handleStage2CompletionSave}>
      <Form layout="vertical">
        <Form.Item label="Stage 2 Status">
          <Switch
            checked={stage2CompletionStatus}
            onChange={(checked) => setStage2CompletionStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="Stage 2 Date">
          <DatePicker
            value={stage2CompletionDate}
            onChange={(date) => setStage2CompletionDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Stage2CompletionModal;
