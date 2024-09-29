import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const VideokycModal = ({ visible, onCancel, record, fetchData }) => {
  const [videoKycStatus, setVideoKycStatus] = useState(record.videoKyc === 'Done');
  const [videoKycDate, setVideoKycDate] = useState(record.videoKycDate ? moment(record.videoKycDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday; // Allow yesterday, today, and future dates
  };

  const handleVideoKycSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        videoKyc: videoKycStatus ? 'Done' : 'Not Done',
        videoKycDate: videoKycDate ? videoKycDate.format('YYYY-MM-DD') : null,
      });
      toast.success("videoKyc details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update videoKyc details");
    }
  };

  return (
    <Modal title="videoKyc Details" open={visible} onCancel={onCancel} onOk={handleVideoKycSave}>
      <Form layout="vertical">
        <Form.Item label="videoKyc Status">
          <Switch
            checked={videoKycStatus}
            onChange={(checked) => setVideoKycStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="videoKyc Date">
          <DatePicker
            value={videoKycDate}
            onChange={(date) => setVideoKycDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default VideokycModal;
