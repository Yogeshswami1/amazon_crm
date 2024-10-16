// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Layout, Card, Avatar, Spin, Modal, Row, Col, message } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
// import AmazonTable from './Amazontable';
// import WebsiteTable from './Websitetable';
// import './Home.css';

// const { Header, Content } = Layout;
// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const AdminDashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [modalData, setModalData] = useState([]);
//   const [selectedManager, setSelectedManager] = useState(null);
//   const [serviceType, setServiceType] = useState('');

//   useEffect(() => {
//     // Fetch managers data
//     axios.get(`${apiUrl}/api/managers/get`)
//       .then(response => {
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the data!", error);
//         setLoading(false);
//       });
//   }, []);

//   const handleCardClick = (manager) => {
//     console.log('Manager object:', manager); // Debugging step

//     if (!manager || !manager._id) {
//       message.error("Manager ID is undefined.");
//       return;
//     }

//     // Fetch users data based on manager ID
//     axios.get(`${apiUrl}/api/managers/getcontact/${manager._id}`)
//       .then(response => {
//         setModalData(response.data);
//         setSelectedManager(manager);
//         setServiceType(manager.service); // Set service type for conditional rendering
//         setIsModalVisible(true);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the users data!", error);
//         message.error("Failed to load assigned contacts. Please try again.");
//       });
//   };

//   const handleModalClose = () => {
//     setIsModalVisible(false);
//     setModalData([]);
//     setSelectedManager(null);
//     setServiceType('');
//   };

//   return (
//     <Layout className="dashboard-layout">
//       {/* <Header className="dashboard-header">
//         <h1>Admin Dashboard</h1>
//       </Header> */}
//       <Content className="dashboard-content">
//         {loading ? (
//           <div className="spinner">
//             <Spin size="large" />
//           </div>
//         ) : (
//           <div className="manager-grid">
//             <Row gutter={16}>
//               {data.map(item => (
//                 <Col span={24} sm={12} md={8} lg={6} key={item._id}>
//                   <Card
//                     title={item.name}
//                     className="manager-card"
//                     extra={<Avatar icon={<UserOutlined />} />}
//                     onClick={() => handleCardClick(item)}
//                   >
//                     <div>
//                       <p><strong>Position:</strong> {item.position}</p>
//                       <p><strong>Status:</strong> {item.status}</p>
//                       <p><strong>Service:</strong> {item.service}</p>
//                       <p><strong>Contact Number:</strong> {item.contactNumber}</p>
//                       <p><strong>Date of Joining:</strong> {item.dateOfJoining}</p>
//                       <p><strong>Email:</strong> {item.email}</p>
//                     </div>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           </div>
//         )}
//       </Content>
//       <Modal
//         title={`Assigned Users for ${selectedManager ? selectedManager.name : ''}`}
//         visible={isModalVisible}
//         onCancel={handleModalClose}
//         footer={null}
//         width={800}
//       >
//         {serviceType === 'AMAZON' ? (
//           <AmazonTable data={modalData} />
//         ) : serviceType === 'WEBSITE' ? (
//           <WebsiteTable data={modalData} />
//         ) : null}
//       </Modal>
//     </Layout>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Card, Spin, Select, message } from 'antd';
// import WebsiteTable from './WebsiteTable'; // Assuming you have a WebsiteTable component
import AmazonTableData from './AmazonTableData';

const { Header, Content } = Layout;
const { Option } = Select;
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [managers, setManagers] = useState([]); // List of all managers
  const [selectedManager, setSelectedManager] = useState(null); // Selected manager
  const [assignedUsers, setAssignedUsers] = useState([]); // Contacts/Users assigned to the selected manager
  const [serviceType, setServiceType] = useState(''); // Service type for the selected manager

  // Fetch all managers when the component mounts
  useEffect(() => {
    axios.get(`${apiUrl}/api/managers/get`)
      .then(response => {
        setManagers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching managers:", error);
        setLoading(false);
      });
  }, []);

  // Handle manager selection
  const handleManagerSelect = (managerId) => {
    const manager = managers.find(item => item._id === managerId);
    if (!manager) {
      message.error("Manager not found.");
      return;
    }

    // Fetch assigned users based on the selected manager
    axios.get(`${apiUrl}/api/managers/getcontact/${manager._id}`)
      .then(response => {
        setAssignedUsers(response.data);
        setSelectedManager(manager);
        setServiceType(manager.service); // Set the service type for the manager
      })
      .catch(error => {
        console.error("Error fetching assigned users:", error);
        message.error("Failed to load assigned users. Please try again.");
      });
  };

  return (
    <Layout className="admin-dashboard-layout" style={{ minHeight: '100vh', overflow: 'auto', marginLeft: "2rem" }}>
      <Header className="admin-dashboard-header" style={{ backgroundImage: 'linear-gradient(90deg, #FC6076, #FF9A44, #EF9D43, #E75516)', padding: '0 20px' }}>
        <h1 className="heading-animation" style={{ color: '#FFFFFF', textAlign: 'center', margin: 0 }}>
          {selectedManager ? `Manager: ${selectedManager.name}` : 'Select a Manager to View Data'}
        </h1>
      </Header>

      <div className="search-bar" style={{ padding: '20px', textAlign: 'center' }}>
        <Select
          placeholder="Select a manager"
          onChange={handleManagerSelect}
          style={{ width: '50%', minWidth: '200px', margin: '0 auto', display: 'block' }}
          size="large"
        >
          {managers.map(manager => (
            <Option key={manager._id} value={manager._id}>
              {manager.name} - {manager.position}
            </Option>
          ))}
        </Select>
      </div>

      <Content className="admin-dashboard-content" style={{ padding: '20px', width: '90rem', overflowX: 'auto', marginLeft: "-1rem" }}>
        {loading ? (
          <div className="spinner" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Spin size="large" />
          </div>
        ) : selectedManager ? (
          <Card
            title={`Details for ${selectedManager.name}`}
            style={{ width: '100%', margin: '20px 0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            headStyle={{ backgroundColor: '#f0f2f5', borderRadius: '8px 8px 0 0' }}
          >
            <p><strong>Position:</strong> {selectedManager.position}</p>
            <p><strong>Status:</strong> {selectedManager.status}</p>
            <p><strong>Service:</strong> {selectedManager.service}</p>
            <p><strong>Contact Number:</strong> {selectedManager.contactNumber}</p>
            <p><strong>Date of Joining:</strong> {new Date(selectedManager.dateOfJoining).toLocaleDateString()}</p>
            <p><strong>Email:</strong> {selectedManager.email}</p>
            <h3>Assigned Users</h3>
            <div style={{ width: '100%' }}>
              {serviceType ? (
                <AmazonTableData data={assignedUsers} /> // Render WebsiteTable component with assigned users
              ) : (
                <p>No users assigned or data available.</p>
              )}
            </div>
          </Card>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>Please select a manager to see the details.</div>
        )}
      </Content>
    </Layout>
  );
};

export default AdminDashboard;
