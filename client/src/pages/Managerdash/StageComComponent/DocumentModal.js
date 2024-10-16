import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const DocumentModal = ({ visible, onCancel, record, fetchData }) => {
  const [documentStatus, setDocumentStatus] = useState(record.document === 'Done');
  const [documentDate, setDocumentDate] = useState(record.documentDate ? moment(record.documentDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  // const disabledDate = (current) => {
  //   const yesterday = moment().subtract(1, 'days').startOf('day');
  //   return current && current < yesterday; // Allow yesterday, today, and future dates
  // };
  const disabledDate = () => {
    return false; // No date is disabled, so all dates are selectable
  };
  const handleDocumentSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        document: documentStatus ? 'Done' : 'Not Done',
        documentDate: documentDate ? documentDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Document details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update Document details");
    }
  };

  return (
    <Modal title="Document Details" open={visible} onCancel={onCancel} onOk={handleDocumentSave}>
      <Form layout="vertical">
        <Form.Item label="Document Status">
          <Switch
            checked={documentStatus}
            onChange={(checked) => setDocumentStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="Document Date">
          <DatePicker
            value={documentDate}
            onChange={(date) => setDocumentDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DocumentModal;
