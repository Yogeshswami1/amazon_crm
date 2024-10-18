import React, { useState } from 'react';
import { Modal, Form, Select, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const { Option } = Select;

const AccountOpenStatusModal = ({ visible, onCancel, record, fetchData }) => {
  const [accountStatus, setAccountStatus] = useState(record.accountOpenStatus || 'Select Status');
  const [statusDate, setStatusDate] = useState(record.statusDate ? moment(record.statusDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        accountOpenStatus: accountStatus === 'Select Status' ? null : accountStatus, // Save null if "Select Status" is chosen
        statusDate: statusDate ? statusDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Account open status updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update account open status");
    }
  };

  return (
    <Modal title="Account Open Status" visible={visible} onCancel={onCancel} onOk={handleSave}>
      <Form layout="vertical">
        <Form.Item label="Account Open Status">
          <Select 
            value={accountStatus} 
            onChange={(value) => {
              // Allow selecting 'Select Status' back
              setAccountStatus(value);
            }}
          >
            <Option value="Select Status">Select Status</Option> {/* Allow selecting back */}
            <Option value="Already">Already</Option>
            <Option value="Saumiccraft">Saumiccraft</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Status Date">
          <DatePicker
            value={statusDate}
            onChange={setStatusDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AccountOpenStatusModal;
