

import React, { useState, useEffect } from 'react';
import { Table, Modal, Input, Button, List, message, Badge } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { toast } from "react-toastify";
import GMSModal from './GMSModal';
import SPModal from './SPModal';
import RegionModal from './RegionModal';
import ShippingModal from './ShippingModal';
import FbaModal from './FbaModal';
import './ModalCss.css';




const apiUrl = process.env.REACT_APP_BACKEND_URL;




const Stageincomponent = (record) => {
 const [data, setData] = useState([]);
 const [isRemarksModalVisible, setIsRemarksModalVisible] = useState(false);
 const [isContactModalVisible, setIsContactModalVisible] = useState(false);
 const [currentRecord, setCurrentRecord] = useState(null);
 const [remarks, setRemarks] = useState([]);
 const [newRemark, setNewRemark] = useState('');
 const [visibleModal, setVisibleModal] = useState(null);
 const [selectedRecord, setSelectedRecord] = useState(null);
 const openModal = (modalType, record) => {
   setSelectedRecord(record);
   setVisibleModal(modalType);
 };
 const closeModal = () => setVisibleModal(null);




 useEffect(() => {
   fetchData();
 }, []);




 //   const fetchData = async () => {
 //   try {
 //     const managerId = localStorage.getItem("managerId");
 //     const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
    
 //     // Process the data
 //     const processedData = response.data.map((item) => ({
 //       ...item,
 //       simpleStatus: {
 //         ovc: item.ovc?.startsWith('Done') ? 'Done' : 'Not Done',
 //         legality: item.legality?.startsWith('Done') ? 'Done' : 'Not Done',
 //         idCard: item.idCard?.startsWith('Done') ? 'Done' : 'Not Done',
 //         training: item.training?.startsWith('Done') ? 'Done' : 'Not Done',
 //         ebook: item.ebook?.startsWith('Done') ? 'Done' : 'Not Done',
 //         supportPortal: item.supportPortal?.startsWith('Done') ? 'Done' : 'Not Done',
 //         walletPortal: item.walletPortal?.startsWith('Done') ? 'Done' : 'Not Done',
 //         gallery: item.gallery?.startsWith('Done') ? 'Done' : 'Not Done',
 //         stage1Completion: item.stage1Completion?.startsWith('Done') ? 'Done' : 'Not Done',
 //       }
 //     }));
  //     // Debugging: Log the processed data to see the archive values
 //     console.log("Processed Data:", processedData);
  //     // Filter out entries where archive is either "false", empty, null, or undefined, and service is AMAZON
 //     const filteredData = processedData.filter(
 //       item =>
 //         (item.archive === "false" || item.archive === "" || item.archive === null || item.archive === undefined) &&
 //         item.service === "AMAZON"
 //     );
  //     // Sort the filtered data in descending order by enrollmentId
 //     const sortedData = filteredData.sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId));
  //     console.log("Filtered & Sorted Data:", sortedData);
  //     setData(sortedData);
 //   } catch (error) {
 //     message.error("Failed to fetch data");
 //   }
 // };
 const fetchData = async () => {
   try {
     const managerId = localStorage.getItem("managerId");
     const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
    
     // Process the data
     const processedData = response.data.map((item) => ({
       ...item,
       simpleStatus: {
         ovc: item.ovc?.startsWith('Done') ? 'Done' : 'Not Done',
         legality: item.legality?.startsWith('Done') ? 'Done' : 'Not Done',
         idCard: item.idCard?.startsWith('Done') ? 'Done' : 'Not Done',
         training: item.training?.startsWith('Done') ? 'Done' : 'Not Done',
         ebook: item.ebook?.startsWith('Done') ? 'Done' : 'Not Done',
         supportPortal: item.supportPortal?.startsWith('Done') ? 'Done' : 'Not Done',
         walletPortal: item.walletPortal?.startsWith('Done') ? 'Done' : 'Not Done',
         gallery: item.gallery?.startsWith('Done') ? 'Done' : 'Not Done',
         stage1Completion: item.stage1Completion?.startsWith('Done') ? 'Done' : 'Not Done',
       }
     }));
      // Debugging: Log the processed data to see the archive values
     console.log("Processed Data:", processedData);
      // Filter out entries where archive is either "false", empty, null, or undefined, service is AMAZON, and launchIn is "Done"
     const filteredData = processedData.filter(
       item =>
         (item.archive === "false" || item.archive === "" || item.archive === null || item.archive === undefined) &&
         item.service === "AMAZON" &&
         item.launchIn === "Done"
     );
      // Sort the filtered data in descending order by enrollmentId
     const sortedData = filteredData.sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId));
      console.log("Filtered & Sorted Data:", sortedData);
      setData(sortedData);
   } catch (error) {
     message.error("Failed to fetch data");
   }
 };






 const handleOpenRemarksModal = (record) => {
   setCurrentRecord(record);
   setRemarks(record.remarks || []);
   setIsRemarksModalVisible(true);
 };




 const handleOpenContactModal = (record) => {
   setCurrentRecord(record);
   setIsContactModalVisible(true);
 };




 const handleCancel = () => {
   setIsRemarksModalVisible(false);
   setIsContactModalVisible(false);
   setCurrentRecord(null);
   setNewRemark('');
 };




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
     fetchData();
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
     fetchData();
   } catch (error) {
     toast.error("Failed to delete remark");
   }
 };






// Helper function to check if a date condition is met
const isConditionMet = (baseDate, daysAfter, condition) => {
 if (!baseDate) return false;
 const targetDate = moment(baseDate).add(daysAfter, 'days');
 return moment().isAfter(targetDate) && condition;
};


 const stageColumns = [
   {
     title: "Enrollment ID",
     dataIndex: "enrollmentId",
     key: "enrollmentId",
     fixed: 'left',
     render: (text, record) => (
       <Button type="link" onClick={() => handleOpenContactModal(record)}>
         {text}
       </Button>
     ),
   },
   {
     title: "Add Region",
     dataIndex: "addRegion",
     // filters: [
     //   { text: 'Done', value: 'Done' },
     //   { text: 'Not Done', value: 'Not Done' },
     // ],
     onFilter: (value, record) => record.addRegion === value,
     render: (text, record) => (
       <Button
         style={{ backgroundColor: record.addRegion === 'Done' ? '#90EE90' : undefined }}
         onClick={() => openModal('region', record)}
       >
         ADD
       </Button>
     ),
   },
   {
     title: "Shipping",
     dataIndex: "shipping",
     // filters: [
     //   { text: 'Done', value: 'Done' },
     //   { text: 'Not Done', value: 'Not Done' },
     // ],
     onFilter: (value, record) => record.shipping === value,
     render: (text, record) => (
       <Button
       style={{ backgroundColor: record?.shipping ? '#90EE90' : undefined }}  // Light green if selectedTheme has a value
       onClick={() => openModal('shipping', record)}
       >
         Shipping
       </Button>
     ),
   },
   {
     title: "GMS",
     dataIndex: "gms",
     // filters: [
     //   { text: 'Done', value: 'Done' },
     //   { text: 'Not Done', value: 'Not Done' },
     // ],
     onFilter: (value, record) => record.gms === value,
     render: (text, record) => (
       <Button
       style={{ backgroundColor: record?.gms ? '#90EE90' : undefined }}  // Light green if selectedTheme has a value
       onClick={() => openModal('gms', record)}
       >
         Status
       </Button>
     ),
   },
   {
     title: "FBA",
     dataIndex: "fbaIn",
     // filters: [
     //   { text: 'Done', value: 'Done' },
     //   { text: 'Not Done', value: 'Not Done' },
     // ],
     onFilter: (value, record) => record.fbaIn === value,
     render: (text, record) => (
       <Button
         style={{ backgroundColor: record.fbaIn === 'Done' ? '#90EE90' : undefined }}
         onClick={() => openModal('fbaIn', record)}
       >
         FBA
       </Button>
     ),
   },
   {
     title: "Sponsor Product",
     dataIndex: "sp",
     // filters: [
     //   { text: 'Done', value: 'Done' },
     //   { text: 'Not Done', value: 'Not Done' },
     // ],
     onFilter: (value, record) => record.sp === value,
     render: (text, record) => (
       <Button
         style={{ backgroundColor: record.sp === 'Done' ? '#90EE90' : undefined }}
         onClick={() => openModal('sp', record)}
       >
         Status
       </Button>
     ),
   },
   {
     title: "Remarks",
     key: "remarks",
     render: (text, record) => (
       <Badge count={record.remarks.length} offset={[-6, 5]} /* Adjust offset as needed */>
         <Button onClick={() => handleOpenRemarksModal(record)}>Remarks</Button>
       </Badge>
     ),
   }


 ];




 // Table row class logic
const getRowClassName = (record) => {
 const gstDateCondition = isConditionMet(record.gstDate, 7, (!record.gtin || record.gtin === 'Not Done') || (!record.launchIn || record.launchIn === 'Not Done'));
 const gstOpenDateCondition = isConditionMet(record.gstDate, 3, !record.accountOpenIn || record.accountOpenIn === 'Not Done');


 // If any condition is met, return the class for red background
 if (gstDateCondition || gstOpenDateCondition) {
   return 'row-red';
 }
 return '';
};
 return (
   <div>
     <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
       <Table
         columns={stageColumns}
         dataSource={data}
         rowKey="_id"
         rowClassName={getRowClassName}
         scroll={{ x: 'max-content', y: 601 }}
         sticky
       />
     </div>




     {/* Modals */}


     {visibleModal === 'gms' && (
       <GMSModal
         visible={true}
         onCancel={closeModal}
         record={selectedRecord}
         fetchData={fetchData}
       />
     )}


{visibleModal === 'sp' && (
       <SPModal
         visible={true}
         onCancel={closeModal}
         record={selectedRecord}
         fetchData={fetchData}
       />
     )}




{visibleModal === 'region' && (
       <RegionModal
         visible={true}
         onCancel={closeModal}
         record={selectedRecord}
         fetchData={fetchData}
       />
     )}


{visibleModal === 'shipping' && (
       <ShippingModal
         visible={true}
         onCancel={closeModal}
         record={selectedRecord}
         fetchData={fetchData}
       />
     )}


{visibleModal === 'fbaIn' && (
       <FbaModal
         visible={true}
         onCancel={closeModal}
         record={selectedRecord}
         fetchData={fetchData}
       />
     )}




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
       />
       <Button type="primary" onClick={handleAddRemark}>Add Remark</Button>
     </Modal>


   </div>
 );
};




export default Stageincomponent;





