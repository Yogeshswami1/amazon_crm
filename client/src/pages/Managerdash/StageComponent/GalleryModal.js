import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const GalleryModal = ({ visible, onCancel, record, fetchData }) => {
  const [galleryStatus, setGalleryStatus] = useState(record.simpleStatus?.gallery === 'Done');
  const [galleryDate, setGalleryDate] = useState(record.galleryDate ? moment(record.galleryDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only today, tomorrow, and future are selectable)
  // const disabledDate = (current) => {
  //   const yesterday = moment().subtract(1, 'days').startOf('day');
  //   return current && current < yesterday; // Allow yesterday, today, and future dates
  // };
  const disabledDate = () => {
    return false; // No date is disabled, so all dates are selectable
  };

  const handleGallerySave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        gallery: galleryStatus ? 'Done' : 'Not Done',
        galleryDate: galleryDate ? galleryDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Gallery details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update Gallery details");
    }
  };

  return (
    <Modal title="Gallery Details" open={visible} onCancel={onCancel} onOk={handleGallerySave}>
      <Form layout="vertical">
        <Form.Item label="Gallery Status">
          <Switch
            checked={galleryStatus}
            onChange={(checked) => setGalleryStatus(checked)}
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        
        <Form.Item label="Gallery Date">
          <DatePicker
            value={galleryDate}
            onChange={(date) => setGalleryDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GalleryModal;
