import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const GtinModal = ({ visible, onCancel, record, fetchData }) => {
  const [gtinStatus, setGtinStatus] = useState(record.gtin === 'Done');
  const [gtinDate, setGtinDate] = useState(record.gtinDate ? moment(record.gtinDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday; // Allow yesterday, today, and future dates
  };

  const handleGtinSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        gtin: gtinStatus ? 'Done' : 'Not Done',
        gtinDate: gtinDate ? gtinDate.format('YYYY-MM-DD') : null,
      });
      toast.success("GTIN details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update GTIN details");
    }
  };

  return (
    <Modal title="GTIN Details" open={visible} onCancel={onCancel} onOk={handleGtinSave}>
      <Form layout="vertical">
        <Form.Item label="GTIN Status">
          <Switch
            checked={gtinStatus}
            onChange={(checked) => setGtinStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="GTIN Date">
          <DatePicker
            value={gtinDate}
            onChange={(date) => setGtinDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GtinModal;
