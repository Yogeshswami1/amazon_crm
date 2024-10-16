import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const RegionModal = ({ visible, onCancel, record, fetchData }) => {
  const [addRegionStatus, setAddRegionStatus] = useState(record.addRegion === 'Done');
  const [addRegionDate, setAddRegionDate] = useState(record.addRegionDate ? moment(record.addRegionDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  // const disabledDate = (current) => {
  //   const yesterday = moment().subtract(1, 'days').startOf('day');
  //   return current && current < yesterday; // Allow yesterday, today, and future dates
  // };
  const disabledDate = () => {
    return false; // No date is disabled, so all dates are selectable
  };

  const handleAddRegionSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        addRegion: addRegionStatus ? 'Done' : 'Not Done',
        addRegionDate: addRegionDate ? addRegionDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Region details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update Region details");
    }
  };

  return (
    <Modal title="Region Details" open={visible} onCancel={onCancel} onOk={handleAddRegionSave}>
      <Form layout="vertical">
        <Form.Item label="Region Status">
          <Switch
            checked={addRegionStatus}
            onChange={(checked) => setAddRegionStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="Region Date">
          <DatePicker
            value={addRegionDate}
            onChange={(date) => setAddRegionDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegionModal;
