import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const BrandModal = ({ visible, onCancel, record, fetchData }) => {
  const [brandName, setBrandName] = useState(record.brandName || '');
  const [brandNameDate, setBrandNameDate] = useState(record.brandNameDate ? moment(record.brandNameDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only yesterday, today, and future are selectable)
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday;
  };

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        brandName,
        brandNameDate: brandNameDate ? brandNameDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Brand details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update brand details");
    }
  };

  return (
    <Modal title="Brand Details" open={visible} onCancel={onCancel} onOk={handleSave}>
      <Form layout="vertical">
        <Form.Item label="Brand">
          <Input
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Enter Brand"
          />
        </Form.Item>

        <Form.Item label="Brand Date">
          <DatePicker
            value={brandNameDate}
            onChange={(date) => setBrandNameDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BrandModal;
