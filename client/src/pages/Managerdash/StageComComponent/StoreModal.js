import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const StoreModal = ({ visible, onCancel, record, fetchData }) => {
  const [storeName, setStoreName] = useState(record.storeName || '');
  const [storeNameDate, setStoreNameDate] = useState(record.storeNameDate ? moment(record.storeNameDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only yesterday, today, and future are selectable)
  // const disabledDate = (current) => {
  //   const yesterday = moment().subtract(1, 'days').startOf('day');
  //   return current && current < yesterday;
  // };
  const disabledDate = () => {
    return false; // No date is disabled, so all dates are selectable
  };

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        storeName,
        storeNameDate: storeNameDate ? storeNameDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Store details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update store details");
    }
  };

  return (
    <Modal title="Store Details" open={visible} onCancel={onCancel} onOk={handleSave}>
      <Form layout="vertical">
        <Form.Item label="Store">
          <Input
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            placeholder="Enter Store"
          />
        </Form.Item>

        <Form.Item label="Store Date">
          <DatePicker
            value={storeNameDate}
            onChange={(date) => setStoreNameDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StoreModal;
