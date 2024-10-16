import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const IDCardModal = ({ visible, onCancel, record, fetchData }) => {
  const [idCardStatus, setIdCardStatus] = useState(record.simpleStatus?.idCard === 'Done');
  const [idCardDate, setIdCardDate] = useState(record.idCardDate ? moment(record.idCardDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  // const disabledDate = (current) => {
  //   const yesterday = moment().subtract(1, 'days').startOf('day');
  //   return current && current < yesterday; // Allow yesterday, today, and future dates
  // };
  const disabledDate = () => {
    return false; // No date is disabled, so all dates are selectable
  };

  const handleIdCardSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        idCard: idCardStatus ? 'Done' : 'Not Done',
        idCardDate: idCardDate ? idCardDate.format('YYYY-MM-DD') : null,
      });
      toast.success("ID Card details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update ID Card details");
    }
  };

  return (
    <Modal title="ID Card Details" open={visible} onCancel={onCancel} onOk={handleIdCardSave}>
      <Form layout="vertical">
        <Form.Item label="IdCard Status">
          <Switch
            checked={idCardStatus}
            onChange={(checked) => setIdCardStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="IdCard Date">
          <DatePicker
            value={idCardDate}
            onChange={(date) => setIdCardDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default IDCardModal;
