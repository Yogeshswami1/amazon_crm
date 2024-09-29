import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const OvcModal = ({ visible, onCancel, record, fetchData }) => {
  const [ovcStatus, setOvcStatus] = useState(record.simpleStatus?.ovc === 'Done');
  const [ovcDate, setOvcDate] = useState(record.ovcDate ? moment(record.ovcDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday; // Allow yesterday, today, and future dates
  };

  const handleOvcSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        ovc: ovcStatus ? 'Done' : 'Not Done',
        ovcDate: ovcDate ? ovcDate.format('YYYY-MM-DD') : null,
      });
      toast.success("OVC details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update OVC details");
    }
  };

  return (
    <Modal title="OVC Details" open={visible} onCancel={onCancel} onOk={handleOvcSave}>
      <Form layout="vertical">
        {/* OVC Done/Not Done Toggle */}
        <Form.Item label="OVC Status">
          <Switch
            checked={ovcStatus}
            onChange={(checked) => setOvcStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        {/* OVC Date Picker */}
        <Form.Item label="OVC Date">
          <DatePicker
            value={ovcDate}
            onChange={(date) => setOvcDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default OvcModal;
