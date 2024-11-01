import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';


const GMSModal = ({ visible, onCancel, record, fetchData }) => {
 const [gms, setGms] = useState(record.gms || '');
 const [gmsDate, setGmsDate] = useState(record.gmsDate ? moment(record.gmsDate) : null);
 const apiUrl = process.env.REACT_APP_BACKEND_URL;




 const handleSave = async () => {
   try {
     await axios.put(`${apiUrl}/api/contact/${record._id}`, {
       gms,
       gmsDate: gmsDate ? gmsDate.format('YYYY-MM-DD') : null,
     });
     toast.success("GMS details updated successfully");
     fetchData();
     onCancel();
   } catch (error) {
     toast.error("Failed to update GMS details");
   }
 };


 return (
   <Modal title="GMS Details" open={visible} onCancel={onCancel} onOk={handleSave}>
     <Form layout="vertical">
       <Form.Item label="GMS">
         <Input
           value={gms}
           onChange={(e) => setGms(e.target.value)}
           placeholder="Enter GMS"
         />
       </Form.Item>


       <Form.Item label="GMS Date">
         <DatePicker
           value={gmsDate}
           onChange={(date) => setGmsDate(date)}
         />
       </Form.Item>
     </Form>
   </Modal>
 );
};


export default GMSModal;



