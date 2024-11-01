import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';


const SPModal = ({ visible, onCancel, record, fetchData }) => {
 const [spStatus, setSpStatus] = useState(record.sp === 'Done');
 const [spDate, setSpDate] = useState(record.spDate ? moment(record.spDate) : null);
 const apiUrl = process.env.REACT_APP_BACKEND_URL;


 const handleSpSave = async () => {
   try {
     await axios.put(`${apiUrl}/api/contact/${record._id}`, {
       sp: spStatus ? 'Done' : 'Not Done',
       spDate: spDate ? spDate.format('YYYY-MM-DD') : null,
     });
     toast.success("SP details updated successfully");
     fetchData();
     onCancel();
   } catch (error) {
     toast.error("Failed to update SP details");
   }
 };


 return (
   <Modal title="SP Details" open={visible} onCancel={onCancel} onOk={handleSpSave}>
     <Form layout="vertical">
       <Form.Item label="SP Status">
         <Switch
           checked={spStatus}
           onChange={(checked) => setSpStatus(checked)}
           checkedChildren="Done"
           unCheckedChildren="Not Done"
         />
       </Form.Item>
      
       <Form.Item label="SP Date">
         <DatePicker
           value={spDate}
           onChange={(date) => setSpDate(date)}
         />
       </Form.Item>
     </Form>
   </Modal>
 );
};


export default SPModal;



