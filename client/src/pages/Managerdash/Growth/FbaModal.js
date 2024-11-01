import React, { useState } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';


const FbaModal = ({ visible, onCancel, record, fetchData }) => {
 const [fbaInStatus, setFbaInStatus] = useState(record.fbaIn === 'Done');
 const [fbaInDate, setFbaInDate] = useState(record.fbaInDate ? moment(record.fbaInDate) : null);
 const apiUrl = process.env.REACT_APP_BACKEND_URL;




 const handleFbaInSave = async () => {
   try {
     await axios.put(`${apiUrl}/api/contact/${record._id}`, {
       fbaIn: fbaInStatus ? 'Done' : 'Not Done',
       fbaInDate: fbaInDate ? fbaInDate.format('YYYY-MM-DD') : null,
     });
     toast.success("FBA details updated successfully");
     fetchData();
     onCancel();
   } catch (error) {
     toast.error("Failed to update FBA details");
   }
 };


 return (
   <Modal title="FBA Details" open={visible} onCancel={onCancel} onOk={handleFbaInSave}>
     <Form layout="vertical">
       <Form.Item label="FBA Status">
         <Switch
           checked={fbaInStatus}
           onChange={(checked) => setFbaInStatus(checked)}
           checkedChildren="Done"
           unCheckedChildren="Not Done"
         />
       </Form.Item>
      
       <Form.Item label="FBA Date">
         <DatePicker
           value={fbaInDate}
           onChange={(date) => setFbaInDate(date)}
         />
       </Form.Item>
     </Form>
   </Modal>
 );
};


export default FbaModal;



