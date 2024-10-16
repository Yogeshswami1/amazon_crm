import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const WalletPortalModal = ({ visible, onCancel, record, fetchData }) => {
  const [walletPortalStatus, setWalletPortalStatus] = useState(record.simpleStatus?.walletPortal === 'Done');
  const [walletPortalDate, setWalletPortalDate] = useState(record.walletPortalDate ? moment(record.walletPortalDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  // const disabledDate = (current) => {
  //   const yesterday = moment().subtract(1, 'days').startOf('day');
  //   return current && current < yesterday; // Allow yesterday, today, and future dates
  // };
  const disabledDate = () => {
    return false; // No date is disabled, so all dates are selectable
  };

  const handleWalletPortalSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        walletPortal: walletPortalStatus ? 'Done' : 'Not Done',
        walletPortalDate: walletPortalDate ? walletPortalDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Wallet Portal details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update Wallet Portal details");
    }
  };

  return (
    <Modal title="Wallet Portal Details" open={visible} onCancel={onCancel} onOk={handleWalletPortalSave}>
      <Form layout="vertical">
        <Form.Item label="Wallet Portal Status">
          <Switch
            checked={walletPortalStatus}
            onChange={(checked) => setWalletPortalStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="Wallet Portal Date">
          <DatePicker
            value={walletPortalDate}
            onChange={(date) => setWalletPortalDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WalletPortalModal;
