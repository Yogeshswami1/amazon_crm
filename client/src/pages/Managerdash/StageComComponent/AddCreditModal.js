import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const AddCreditModal = ({ visible, onCancel, record, fetchData }) => {
  const [addCreditStatus, setAddCreditStatus] = useState(record.addCredit === 'Done');
  const [addCreditDate, setAddCreditDate] = useState(record.addCreditDate ? moment(record.addCreditDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday; // Allow yesterday, today, and future dates
  };

  const handleAddCreditSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        addCredit: addCreditStatus ? 'Done' : 'Not Done',
        addCreditDate: addCreditDate ? addCreditDate.format('YYYY-MM-DD') : null,
      });
      toast.success("addCredit details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update addCredit details");
    }
  };

  return (
    <Modal title="addCredit Details" open={visible} onCancel={onCancel} onOk={handleAddCreditSave}>
      <Form layout="vertical">
        <Form.Item label="addCredit Status">
          <Switch
            checked={addCreditStatus}
            onChange={(checked) => setAddCreditStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="addCredit Date">
          <DatePicker
            value={addCreditDate}
            onChange={(date) => setAddCreditDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCreditModal;
