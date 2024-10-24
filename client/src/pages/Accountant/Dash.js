



import React, { useEffect, useState } from 'react';
import { Card, Table, Input, Typography, Modal, Switch, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import './Dash.css';








const { Search } = Input;
const { Title } = Typography;








const apiUrl = process.env.REACT_APP_BACKEND_URL;








const Dash = () => {
const [userData, setUserData] = useState([]);
const [filteredData, setFilteredData] = useState([]);
const [isModalVisible, setIsModalVisible] = useState(false);
const [selectedContact, setSelectedContact] = useState(null);








const [legalityStatus, setLegalityStatus] = useState(selectedContact?.legalityStatus || 'false');
const [billSent, setBillSent] = useState(selectedContact?.billSent || 'false');
const fetchContacts = () => {
  axios.get(`${apiUrl}/api/contact/getcontact`)
    .then(response => {
      // Filter by 'WEBSITE' service
      const websiteServiceData = response.data.filter(item => item.service === 'AMAZON');








      // Sort data by enrollmentId in descending order
      const sortedData = websiteServiceData.sort((a, b) => {
        // Extract numeric part from enrollmentId (e.g., WB100 -> 100)
        const aId = parseInt(a.enrollmentId.replace(/[^\d]/g, ''), 10);
        const bId = parseInt(b.enrollmentId.replace(/[^\d]/g, ''), 10);








        return bId - aId; // Sort in descending order based on the numeric part
      });








      setUserData(sortedData);
      setFilteredData(sortedData);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
};








// Call fetchContacts on component mount
useEffect(() => {
 if (selectedContact) {
   setBillSent(selectedContact.billsSent === 'true' ? 'true' : 'false');
   setLegalityStatus(selectedContact.legalityStatus === 'true' ? 'true' : 'false');
 }
}, [selectedContact]);






// For fetching contacts only once when the component mounts
useEffect(() => {
 fetchContacts();
}, []); 




 // Single search function across multiple fields
const handleSearch = (value) => {
  const filtered = userData.filter(item => {
    const enrollmentIdMatch = item.enrollmentId.toLowerCase().includes(value.toLowerCase());
    const nameMatch = item.name.toLowerCase().includes(value.toLowerCase());
    const emailMatch = item.email.toLowerCase().includes(value.toLowerCase());
    const primaryContactMatch = item.primaryContact.toLowerCase().includes(value.toLowerCase());








    // Return true if any of the fields match the search value
    return enrollmentIdMatch || nameMatch || emailMatch || primaryContactMatch;
  });
  setFilteredData(filtered);
};








const handleEnrollmentClick = (record) => {
  setSelectedContact(record);
  setIsModalVisible(true);
};








const handleCancel = () => {
  setIsModalVisible(false);
  setSelectedContact(null);
};












const handleLegalityStatusChange = async (record, checked) => {
 const updatedStatus = checked ? 'true' : 'false';
  // Update local state for live UI feedback
 setLegalityStatus(updatedStatus);


 try {
   await axios.put(`${apiUrl}/api/contact/${record._id}`, {
     legalityStatus: updatedStatus, // Send updated status to backend
   });
   message.success(`Legality status updated to ${updatedStatus} for ${record.name}`);
   fetchContacts(); // Optionally refresh the data from the server
 } catch (error) {
   console.error("Error updating legality status:", error);
   message.error("Failed to update legality status. Please try again.");
 }
};


const handleBillSentChange = async (record, checked) => {
 const updatedStatus = checked ? 'true' : 'false';


 // Update local state for live UI feedback
 setBillSent(updatedStatus);


 try {
   await axios.put(`${apiUrl}/api/contact/${record._id}`, {
     billsSent: updatedStatus, // Send updated status to backend
   });
   message.success(`Bills status updated to ${updatedStatus} for ${record.name}`);
   fetchContacts();  // Optionally refresh the data from the server
 } catch (error) {
   console.error("Error updating bills status:", error);
   message.error("Failed to update bills status. Please try again.");
 }
};




const paymentColumns = [
 {
   title: 'Enrollment ID',
   dataIndex: 'enrollmentId',
   key: 'enrollmentId',
   width: 130,
   render: (text, record) => {
     let backgroundColor = '';
      // Check conditions for legalityStatus and billsSent
     if (record.legalityStatus === 'true' && record.billsSent === 'true') {
       // Both statuses true, split background (half yellow, half green)
       backgroundColor = 'linear-gradient(90deg, yellow 70%, lightgreen 30%)';
     } else if (record.legalityStatus === 'true') {
       // Only legalityStatus true, full yellow background
       backgroundColor = 'yellow';
     } else if (record.billsSent === 'true') {
       // Only billsSent true, full green background
       backgroundColor = 'lightgreen';
     }
      // Apply the background color (gradient or solid)
     return (
       <a
         onClick={() => handleEnrollmentClick(record)}
         style={{ background: backgroundColor, padding: '5px', borderRadius: '4px', display: 'inline-block', width: '100%' }} // Apply the gradient and other styles
       >
         {text}
       </a>
     );
   },
 },
   {
     title: "GST",
     dataIndex: "gst",
     key: "gst",
   },
   {
     title: "GST Number",
     dataIndex: "gstNumber",
     key: "gstNumber",
   },
   {
     title: "State",
     dataIndex: "state",
     key: "state",
   },
   {
     title: "Legality",
     dataIndex: "legality",
     key: "legality",
   },
   {
     title: "Manager Position",
     dataIndex: ["managerId", "position"],
     key: "managerPosition",
   },
  
];








const dataSource = [
  {
    key: '1',
    label: 'Date',
    value: selectedContact?.date ? moment(selectedContact.date).format('DD-MM-YYYY') : 'N/A',
  },
  {
    key: '2',
    label: 'Enrollment ID',
    value: selectedContact?.enrollmentId || 'N/A',
  },
  {
    key: '3',
    label: 'Name',
    value: selectedContact?.name || 'N/A',
  },
  {
    key: '4',
    label: 'Primary Contact',
    value: selectedContact?.primaryContact || 'N/A',
  },
  {
    key: '5',
    label: 'Email',
    value: selectedContact?.email || 'N/A',
  },
  {
    key: '6',
    label: 'Legality Link',
    value: selectedContact?.legalityLink ? (
      <a href={selectedContact.legalityLink} target="_blank" rel="noopener noreferrer">Open Legality Link</a>
    ) : 'N/A',
  },
  {
   key: '7',
   label: 'Legality Status',
   value: (
     <Switch
       checked={legalityStatus === 'true'}
       onChange={(checked) => handleLegalityStatusChange(selectedContact, checked)}
       checkedChildren="true"
       unCheckedChildren="false"
     />
   ),
 },
 {
   key: '8',
   label: 'Bill Sent',
   value: (
     <Switch
       checked={billSent === 'true'}
       onChange={(checked) => handleBillSentChange(selectedContact, checked)}
       checkedChildren="true"
       unCheckedChildren="false"
     />
   ),
 },




];








const columns = [
  {
    title: 'Label',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
];
return (
  <div style={{ maxHeight: '1000px', overflowY: 'auto',padding: '20px' }}>
    <Card title="Welcome Accountant" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <Title level={4} style={{ textAlign: 'center' }}>Payment Table</Title>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Search
          placeholder="Search by Enrollment ID, Name, Email, or Primary Contact"
          onSearch={handleSearch}
          enterButton
          style={{ width: "30rem" }}
        />
      </div>
      <Table
        columns={paymentColumns}
        dataSource={filteredData}
        rowKey="enrollmentId"
        className="custom-table"
      />
      {selectedContact && (
       <Modal
       title="Contact Details"
       open={isModalVisible}
       onCancel={handleCancel}
       footer={null}
     >
       <Table
         dataSource={dataSource}
         columns={columns}
         pagination={false} // Disable pagination
         showHeader={false} // Hide the header
       />
     </Modal>
   
      )}
    </Card>
  </div>
);
};








export default Dash;

































