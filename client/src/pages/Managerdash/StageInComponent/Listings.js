import React, { useState } from 'react';
import { Modal, Form, InputNumber, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const ListingsModal = ({ visible, onCancel, record, fetchData }) => {
  const [listingsIn, setListingsIn] = useState(record.listingsIn || '');
  const [listingsInDate, setListingsInDate] = useState(record.listingsInDate ? moment(record.listingsInDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Disable past dates (only yesterday, today, and future dates selectable)
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
        listingsIn,
        listingsInDate: listingsInDate ? listingsInDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Listings details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update listings details");
    }
  };

  return (
    <Modal title="Listings Details" open={visible} onCancel={onCancel} onOk={handleSave}>
      <Form layout="vertical">
        <Form.Item label="Listings In">
          <InputNumber
            value={listingsIn}
            onChange={setListingsIn}
            min={0}
            placeholder="Enter number of listings"
          />
        </Form.Item>

        <Form.Item label="Listings In Date">
          <DatePicker
            value={listingsInDate}
            onChange={setListingsInDate}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ListingsModal;
