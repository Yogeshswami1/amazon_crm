import React, { useState } from 'react';
import { Table, Tag, Badge, Button, List, Input, Modal } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { toast } from "react-toastify";


const apiUrl = process.env.REACT_APP_BACKEND_URL;


const UserTable = ({ data }) => {
 const [remarks, setRemarks] = useState([]);
 const [newRemark, setNewRemark] = useState('');
 const [isRemarksModalVisible, setIsRemarksModalVisible] = useState(false);
 const [currentRecord, setCurrentRecord] = useState(null);


 const handleAddRemark = async () => {
   if (!newRemark) {
     toast.error('Remark cannot be empty');
     return;
   }
   try {
     const updatedRemarks = [...remarks, { text: newRemark, date: new Date() }];
     await axios.put(`${apiUrl}/api/contact/remark/${currentRecord._id}`, { remarks: updatedRemarks });
     toast.success("Remark added successfully");
     setRemarks(updatedRemarks);
     setNewRemark('');
   } catch (error) {
     toast.error("Failed to add remark");
   }
 };


 const handleDeleteRemark = async (remark) => {
   const updatedRemarks = remarks.filter(r => r._id !== remark._id);
   try {
     await axios.put(`${apiUrl}/api/contact/remark/${currentRecord._id}`, { remarks: updatedRemarks });
     toast.success("Remark deleted successfully");
     setRemarks(updatedRemarks);
   } catch (error) {
     toast.error("Failed to delete remark");
   }
 };


 const handleOpenRemarksModal = (record) => {
   setCurrentRecord(record);
   setRemarks(record.remarks || []);
   setIsRemarksModalVisible(true);
 };


 const handleCancel = () => {
   setIsRemarksModalVisible(false);
   setCurrentRecord(null);
   setNewRemark('');
 };


 const columns = [
   {
     title: 'Date',
     dataIndex: 'date',
     key: 'date',
     render: (text) => moment(text).format('YYYY-MM-DD'),
   },
   {
     title: 'Enrollment ID',
     dataIndex: 'enrollmentId',
     key: 'enrollmentId',
   },
   {
     title: 'Stage 1 Completed',
     dataIndex: 'stage1Completion',
     key: 'stage1Completion',
     render: (text) => (
       <Tag color={text === 'Done' ? 'green' : 'volcano'}>
         {text === 'Done' ? 'Done' : 'Not Done'}
       </Tag>
     ),
   },
   {
     title: 'Stage 2 (In)',
     dataIndex: 'stage2Completion',
     key: 'stage2Completion',
     render: (text) => (
       <Tag color={text === 'Done' ? 'green' : 'volcano'}>
         {text === 'Done' ? 'Done' : 'Not Done'}
       </Tag>
     ),
   },
   {
     title: 'Stage 2 (COM)',
     dataIndex: 'stage3Completion',
     key: 'stage3Completion',
     render: (text) => (
       <Tag color={text === 'Done' ? 'green' : 'volcano'}>
         {text === 'Done' ? 'Done' : 'Not Done'}
       </Tag>
     ),
   },
   {
     title: "Remarks",
     key: "remarks",
     render: (text, record) => (
       <Badge count={record.remarks.length} offset={[-6, 5]}>
         <Button onClick={() => handleOpenRemarksModal(record)}>Remarks</Button>
       </Badge>
     ),
   },
 ];


 return (
   <>
     <Table
       dataSource={data}
       columns={columns}
       rowKey="enrollmentId"
       pagination={{ pageSize: 10 }}
     />


     {/* Remarks Modal */}
     <Modal
       title="Remarks"
       open={isRemarksModalVisible}
       onCancel={handleCancel}
       footer={null}
     >
       <List
         dataSource={remarks}
         renderItem={(item) => (
           <List.Item
             actions={[<Button onClick={() => handleDeleteRemark(item)}>Delete</Button>]}
           >
             <List.Item.Meta
               title={moment(item.date).format('DD-MM-YYYY')}
               description={item.text}
             />
           </List.Item>
         )}
       />
       <Input.TextArea
         rows={4}
         value={newRemark}
         onChange={(e) => setNewRemark(e.target.value)}
         placeholder="Enter your remark here"
       />
       <Button type="primary" onClick={handleAddRemark} style={{ marginTop: '10px' }}>Add Remark</Button>
     </Modal>
   </>
 );
};


export default UserTable;



