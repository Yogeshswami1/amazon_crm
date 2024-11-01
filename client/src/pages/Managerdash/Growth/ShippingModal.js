import React, { useState } from 'react';
import { Modal, Form, Select, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';


const { Option } = Select;


const ShippingModal = ({ visible, onCancel, record, fetchData }) => {
 const [shipping, setShipping] = useState(record.shipping || 'self ship');
 const [shippingDate, setShippingDate] = useState(record.shippingDate ? moment(record.shippingDate) : null);
 const apiUrl = process.env.REACT_APP_BACKEND_URL;






 const handleSave = async () => {
   try {
     await axios.put(`${apiUrl}/api/contact/${record._id}`, {
       shipping,
       shippingDate: shippingDate ? shippingDate.format('YYYY-MM-DD') : null,
     });
     toast.success("Shipping details updated successfully");
     fetchData();
     onCancel();
   } catch (error) {
     toast.error("Failed to update shipping details");
   }
 };


 return (
   <Modal title="Shipping Details" open={visible} onCancel={onCancel} onOk={handleSave}>
     <Form layout="vertical">
       <Form.Item label="Shipping Method">
         <Select value={shipping} onChange={setShipping}>
           <Option value="self ship">Self Ship</Option>
           <Option value="easy ship">Easy Ship</Option>
         </Select>
       </Form.Item>


       <Form.Item label="Shipping Date">
         <DatePicker
           value={shippingDate}
           onChange={setShippingDate}
         />
       </Form.Item>
     </Form>
   </Modal>
 );
};


export default ShippingModal;



