import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const SupportPortalModal = ({ visible, onCancel, record, fetchData }) => {
  const [supportPortalStatus, setSupportPortalStatus] = useState(record.simpleStatus?.supportPortal === 'Done');
  const [supportPortalDate, setSupportPortalDate] = useState(record.supportPortalDate ? moment(record.supportPortalDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  // const disabledDate = (current) => {
  //   const yesterday = moment().subtract(1, 'days').startOf('day');
  //   return current && current < yesterday; // Allow yesterday, today, and future dates
  // };
  const disabledDate = () => {
    return false; // No date is disabled, so all dates are selectable
  };

  const handleSupportPortalSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        supportPortal: supportPortalStatus ? 'Done' : 'Not Done',
        supportPortalDate: supportPortalDate ? supportPortalDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Support Portal details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update Support Portal details");
    }
  };

  return (
    <Modal title="Support Portal Details" open={visible} onCancel={onCancel} onOk={handleSupportPortalSave}>
      <Form layout="vertical">
        <Form.Item label="Support Portal Status">
          <Switch
            checked={supportPortalStatus}
            onChange={(checked) => setSupportPortalStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="Support Portal Date">
          <DatePicker
            value={supportPortalDate}
            onChange={(date) => setSupportPortalDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SupportPortalModal;
