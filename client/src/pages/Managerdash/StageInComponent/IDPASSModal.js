import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const IDPASSModal = ({ visible, onCancel, record, fetchData }) => {
  const [id, setId] = useState(record.idAndPassIn?.id || '');
  const [pass, setPass] = useState(record.idAndPassIn?.pass || '');
  const [date, setDate] = useState(record.idAndPassIn?.date ? moment(record.idAndPassIn.date) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only yesterday, today, and future are selectable)
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday;
  };

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        idAndPassIn: {
          id,
          pass,
          date: date ? date.format('YYYY-MM-DD') : null,
        },
      });
      toast.success("ID and Password details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update details");
    }
  };

  return (
    <Modal title="ID and Password Details" open={visible} onCancel={onCancel} onOk={handleSave}>
      <Form layout="vertical">
        <Form.Item label="ID">
          <Input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter ID"
          />
        </Form.Item>

        <Form.Item label="Password">
          <Input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter Password"
          />
        </Form.Item>

        <Form.Item label="Date">
          <DatePicker
            value={date}
            onChange={(date) => setDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default IDPASSModal;
