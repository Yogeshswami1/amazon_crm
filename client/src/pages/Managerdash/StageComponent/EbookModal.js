import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const EbookModal = ({ visible, onCancel, record, fetchData }) => {
  const [ebookStatus, setEbookStatus] = useState(record.simpleStatus?.ebook === 'Done');
  const [ebookDate, setEbookDate] = useState(record.ebookDate ? moment(record.ebookDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday; // Allow yesterday, today, and future dates
  };

  const handleEbookSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        ebook: ebookStatus ? 'Done' : 'Not Done',
        ebookDate: ebookDate ? ebookDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Ebook details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update Ebook details");
    }
  };

  return (
    <Modal title="Ebook Details" open={visible} onCancel={onCancel} onOk={handleEbookSave}>
      <Form layout="vertical">
        <Form.Item label="Ebook Status">
          <Switch
            checked={ebookStatus}
            onChange={(checked) => setEbookStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="Ebook Date">
          <DatePicker
            value={ebookDate}
            onChange={(date) => setEbookDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EbookModal;
