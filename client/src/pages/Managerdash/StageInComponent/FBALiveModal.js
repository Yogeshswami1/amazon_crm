import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const FBALiveModal = ({ visible, onCancel, record, fetchData }) => {
  // Initialize state for fbaLive status and date
  const [fbaLiveStatus, setFbaLiveStatus] = useState(record.fbaLive === 'Done');
  const [fbaLiveDate, setFbaLiveDate] = useState(record.fbaLiveDate ? moment(record.fbaLiveDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (or adjust as needed)
  const disabledDate = () => {
    return false; // No date is disabled, so all dates are selectable
  };

  // Handle Save for FBA Live status and date
  const handleFbaLiveSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        fbaLive: fbaLiveStatus ? 'Done' : 'Not Done',
        fbaLiveDate: fbaLiveDate ? fbaLiveDate.format('YYYY-MM-DD') : null,
      });
      toast.success("FBA Live details updated successfully");
      fetchData(); // Refresh data after successful update
      onCancel(); // Close the modal
    } catch (error) {
      toast.error("Failed to update FBA Live details");
    }
  };

  return (
    <Modal title="FBA Live Details" open={visible} onCancel={onCancel} onOk={handleFbaLiveSave}>
      <Form layout="vertical">
        <Form.Item label="FBA Live Status">
          <Switch
            checked={fbaLiveStatus}
            onChange={(checked) => setFbaLiveStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="FBA Live Date">
          <DatePicker
            value={fbaLiveDate}
            onChange={(date) => setFbaLiveDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FBALiveModal;
