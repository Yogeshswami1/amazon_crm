import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const FbaModal = ({ visible, onCancel, record, fetchData }) => {
  const [fbaComStatus, setFbaComStatus] = useState(record.fbaCom === 'Done');
  const [fbaComDate, setFbaComDate] = useState(record.fbaComDate ? moment(record.fbaComDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  // const disabledDate = (current) => {
  //   const yesterday = moment().subtract(1, 'days').startOf('day');
  //   return current && current < yesterday; // Allow yesterday, today, and future dates
  // };

  const disabledDate = () => {
    return false; // No date is disabled, so all dates are selectable
  };
  const handleFbaComSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        fbaCom: fbaComStatus ? 'Done' : 'Not Done',
        fbaComDate: fbaComDate ? fbaComDate.format('YYYY-MM-DD') : null,
      });
      toast.success("FBA details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update FBA details");
    }
  };

  return (
    <Modal title="FBA Details" open={visible} onCancel={onCancel} onOk={handleFbaComSave}>
      <Form layout="vertical">
        <Form.Item label="FBA Status">
          <Switch
            checked={fbaComStatus}
            onChange={(checked) => setFbaComStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="FBA Date">
          <DatePicker
            value={fbaComDate}
            onChange={(date) => setFbaComDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FbaModal;
