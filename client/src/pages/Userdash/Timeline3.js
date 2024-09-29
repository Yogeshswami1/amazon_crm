// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
// import 'react-vertical-timeline-component/style.min.css';
// import { Typography } from 'antd';
// import { FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';
// import './Userdashboard.css';
// import moment from 'moment';

// const apiUrl = process.env.REACT_APP_BACKEND_URL;
// const { Title, Text } = Typography;

// const Timeline3 = () => {
//   const [additionalTasks, setAdditionalTasks] = useState([]);

//   useEffect(() => {
//     const id = localStorage.getItem('enrollmentId');
//     if (id) {
//       fetchAdditionalTasks(id);
//     }
//   }, []);

//   const fetchAdditionalTasks = async (enrollmentId) => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/contact/enrollmentId/${enrollmentId}`);
//       const contactData = response.data;
//       const additionalTasksData = getAdditionalTasks(contactData);
//       setAdditionalTasks(additionalTasksData);
//     } catch (error) {
//       console.error('Error fetching additional tasks: ', error);
//     }
//   };

//   const getAdditionalTasks = (contactData) => {
//     const fields = [
//       { key: 'accountOpenCom', label: 'COM Account Open', specialHandling: handleAccountOpenComStatus },
//       { key: 'videoKyc', label: 'COM Video KYC', descriptionKey: 'videoKycDescription', specialHandling: handleVideoKycStatus },
//       { key: 'deduct', label: 'COM 1$ Deduct', descriptionKey: 'deductDescription', specialHandling: handleDeductStatus },
//       { key: 'listingsCom', label: 'COM Listings' },
//       { key: 'launchDateCom', label: 'COM Launch Date' },
//       { key: 'nia', label: 'COM NIA' },
//       { key: 'addCredit', label: 'COM 50$ Add Credit', descriptionKey: 'addCreditDescription', specialHandling: handleAddCreditStatus },
//       { key: 'fbaCom', label: 'COM FBA' },
//     ];

//     const additionalTasks = fields.map(field => {
//       const fieldValue = contactData[field.key];
//       let status = 'Pending';
//       let formattedComment = `${field.label}: ${fieldValue}`;
//       let description = contactData[field.descriptionKey] || '';

//       if (field.specialHandling) {
//         if (fieldValue !== undefined) {
//           const result = field.specialHandling(fieldValue, description);
//           status = result.status;
//           formattedComment = result.formattedComment;
//         } else {
//           console.warn(`Field value for ${field.key} is undefined`);
//         }
//       } else if (fieldValue && fieldValue.includes('(updated on')) {
//         const [actualValue, datePart] = fieldValue.split(' (updated on ');
//         if (field.key === 'listingsCom') {
//           status = actualValue.trim() !== '0' ? 'Done' : 'Pending';
//         } else {
//           status = actualValue === 'Done' ? 'Done' : 'Pending';
//         }

//         if (datePart) {
//           const date = datePart.replace(')', '');
//           const formattedDate = moment(date).format('DD-MM-YYYY');
//           formattedComment = `${field.label}: ${actualValue} (updated on ${formattedDate})`;
//         }
//       }

//       return {
//         label: field.label,
//         comment: formattedComment,
//         status,
//         description,
//       };
//     });

//     return additionalTasks;
//   };

//   const handleAccountOpenComStatus = (fieldValue, description) => {
//     let status = 'Pending';
//     let formattedComment = `COM Account Open: ${fieldValue}`;
    
//     if (fieldValue.includes('(updated on')) {
//       const [actualValue, datePart] = fieldValue.split(' (updated on ');
//       const date = datePart.replace(')', '');
//       const formattedDate = moment(date).format('DD-MM-YYYY');
//       formattedComment = `COM Account Open: ${actualValue.trim()} (updated on ${formattedDate})`;
  
//       if (actualValue.trim() === 'Opened') {
//         status = 'Done';
//       } else if (actualValue.trim() === 'Not Opened') {
//         status = 'Pending';
//       }
//     }
    
//     return { status, formattedComment };
//   };

//   const handleVideoKycStatus = (fieldValue, description) => {
//     let status = 'Pending';
//     let formattedComment = `COM Video KYC: ${fieldValue}`;
  
//     if (fieldValue.includes('(updated on')) {
//       const [actualValue, datePart] = fieldValue.split(' (updated on ');
//       const date = datePart.replace(')', '');
//       const formattedDate = moment(date).format('DD-MM-YYYY');
//       formattedComment = `COM Video KYC: ${actualValue.trim()} (Updated on ${formattedDate})`;
  
//       if (actualValue.trim() === 'Done') {
//         status = 'Done';
//       } else if (actualValue.trim() === 'Pending') {
//         status = 'Pending';
//         formattedComment = `${formattedComment} - ${description}`;
//       } else if (actualValue.trim() === 'Not Done') {
//         status = 'Error';
//       }
//     }
  
//     return { status, formattedComment };
//   };

//   const handleDeductStatus = (fieldValue, description) => {
//     let status = 'Pending';
//     let formattedComment = `COM 1$ Deduct: ${fieldValue}`;
    
//     if (fieldValue.includes('(updated on')) {
//       const [actualValue, datePart] = fieldValue.split(' (updated on ');
//       const date = datePart.replace(')', '');
//       const formattedDate = moment(date).format('DD-MM-YYYY');
//       formattedComment = `COM 1$ Deduct: ${actualValue.trim()} (Updated on ${formattedDate})`;
  
//       if (actualValue.trim() === 'Deducted') {
//         status = 'Done';
//       } else if (actualValue.trim() === 'Pending') {
//         status = 'Pending';
//         formattedComment = `${formattedComment} - ${description}`;
//       }
//     }
    
//     return { status, formattedComment };
//   };

//   const handleAddCreditStatus = (fieldValue, description) => {
//     let status = 'Pending';
//     let formattedComment = `COM 50$ Add Credit: ${fieldValue}`;
  
//     if (fieldValue.includes('(updated on')) {
//       const [actualValue, datePart] = fieldValue.split(' (updated on ');
//       const date = datePart.replace(')', '');
//       const formattedDate = moment(date).format('DD-MM-YYYY');
//       formattedComment = `COM 50$ Add Credit: ${actualValue.trim()} (Updated on ${formattedDate})`;
  
//       if (actualValue.trim() === 'Done') {
//         status = 'Done';
//       } else if (actualValue.trim() === 'Pending') {
//         status = 'Pending';
//         formattedComment = `${formattedComment} - ${description}`;
//       }
//     } else {
//       if (fieldValue === 'Done') {
//         status = 'Done';
//       } else if (fieldValue === 'Not Done') {
//         status = 'Pending';
//         formattedComment = `${formattedComment} - ${description}`;
//       }
//     }
  
//     return { status, formattedComment };
//   };

//   const getIcon = (status) => {
//     switch (status) {
//       case 'Done':
//         return <FaCheckCircle style={{ color: 'green' }} />;
//       case 'Pending':
//         return <FaClock style={{ color: 'blue' }} />;
//       case 'Error':
//         return <FaExclamationCircle style={{ color: 'red' }} />;
//       default:
//         return <FaExclamationCircle style={{ color: 'red' }} />;
//     }
//   };

//   const getContentStyle = (status) => {
//     switch (status) {
//       case 'Done':
//         return {
//           background: '#c8e6c9',
//           borderRadius: '8px',
//           boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
//           padding: '20px',
//           border: '1px solid #ddd'
//         };
//       case 'Pending':
//         return {
//           background: '#bbdefb',
//           borderRadius: '8px',
//           boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
//           padding: '20px',
//           border: '1px solid #ddd'
//         };
//       case 'Error':
//         return {
//           background: '#ffcdd2',
//           borderRadius: '8px',
//           boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
//           padding: '20px',
//           border: '1px solid #ddd'
//         };
//       default:
//         return {
//           background: '#fff',
//           borderRadius: '8px',
//           boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
//           padding: '20px',
//           border: '1px solid #ddd'
//         };
//     }
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//   <VerticalTimeline>
//     {additionalTasks.map((task, index) => (
//       <VerticalTimelineElement
//         key={index}
//         date={`Status: ${task.status}`}
//         icon={getIcon(task.status)}
//         iconStyle={{
//           background: 'white',
//           color: '#fff',
//           boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
//         }}
//         contentStyle={getContentStyle(task.status)}
//         contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
//         dateStyle={{
//           color: '#999',
//           fontSize: '14px',
//         }}
//       >
//         <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>
//           {task.comment.split(' - ')[0]}
//         </Title>
//         {(task.status === 'Pending' || task.status === 'Error') && task.description ? (
//           <Text style={{ color: '#666' }}>
//             {task.description}
//           </Text>
//         ) : null}
//       </VerticalTimelineElement>
//     ))}
//   </VerticalTimeline>
// </div>
//   );
// };

// export default Timeline3;












import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Typography } from 'antd';
import { FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';
import './Userdashboard.css';
import moment from 'moment';
import HorizontalTimeline from './Horizontaltimeline';

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Title } = Typography;

const Timeline3 = () => {
  const [userData, setUserData] = useState(null);
  const [userCreatedDate, setUserCreatedDate] = useState('');
  const [projectStatus, setProjectStatus] = useState('Pending');
  const [completionDate, setCompletionDate] = useState('Pending');

  useEffect(() => {
    const id = localStorage.getItem('enrollmentId');
    if (id) {
      fetchUserData(id);
    }
  }, []);

  const fetchUserData = async (enrollmentId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/enrollmentId/${enrollmentId}`);
      const userData = response.data;
      setUserCreatedDate(userData.date);
      setUserData(userData);
      checkProjectStatus(userData);
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };

  const checkProjectStatus = (userData) => {
    const paymentDone = userData?.payment?.stage1?.status === 'Done';
    const legalityDone = userData?.legality === 'Done';

    setProjectStatus(paymentDone && legalityDone ? 'Completed' : 'Pending');
    setCompletionDate(paymentDone && legalityDone ? moment().format('DD-MM-YYYY') : 'Pending');
  };

  const getIcon = (status) => {
    switch (status) {
      case 'Done':
        return <FaCheckCircle style={{ color: 'green' }} />;
      case 'Pending':
      case undefined:
        return <FaClock style={{ color: 'blue' }} />;
      default:
        return <FaExclamationCircle style={{ color: 'red' }} />;
    }
  };

  const getContentStyle = (status) => {
    switch (status) {
      case 'Done':
        return {
          background: '#c8e6c9', // Light green background for Done tasks
          borderRadius: '8px',
          boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          border: '1px solid #ddd'
        };
      case 'Pending':
      case undefined:
        return {
          background: '#bbdefb', // Light blue background for Pending tasks
          borderRadius: '8px',
          boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          border: '1px solid #ddd'
        };
      default:
        return {
          background: '#ffcdd2', // Light red background for Error tasks
          borderRadius: '8px',
          boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          border: '1px solid #ddd'
        };
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* <HorizontalTimeline userCreatedDate={userCreatedDate} projectStatus={projectStatus} completionDate={completionDate} /> */}

      <VerticalTimeline>
        {/* document Card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.document || 'Pending'}`}
          icon={getIcon(userData?.document)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.document)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Documents Status</Title>
          <p><strong>Status:</strong> {userData?.document || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.documentDate ? moment(userData?.documentDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>

       {/* store name Card */}
       <VerticalTimelineElement
          date={`Store Name Date: ${userData?.storeNameDate || 'N/A'}`}
          icon={getIcon(userData?.storeName ? 'Done' : 'Pending')}
          contentStyle={getContentStyle(userData?.storeName ? 'Done' : 'Pending')}
        >
  <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Store Name</Title>
  <p><strong>Name:</strong> {userData?.storeName || 'Pending'}</p>
  <p><strong>Date:</strong> {userData?.storeNameDate ? moment(userData?.storeNameDate).format('DD-MM-YYYY') : 'N/A'}</p>
</VerticalTimelineElement>


{/* Account Open card */}
<VerticalTimelineElement
          date={`Status: ${userData?.accountOpenCom || 'Pending'}`}
          icon={getIcon(userData?.accountOpenCom)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.accountOpenCom)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Account Open .COM</Title>
          <p><strong>Account:</strong> {userData?.accountOpenCom || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.accountOpenComDate ? moment(userData?.accountOpenComDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* id and pass card */}
<VerticalTimelineElement
          date={`ID and PASS Provided`}
          icon={getIcon(userData?.idAndPassCom?.id || userData?.idAndPassCom?.pass ? 'Done' : 'Pending')}
          contentStyle={getContentStyle(userData?.idAndPassCom?.id || userData?.idAndPassCom?.pass ? 'Done' : 'Pending')}
        >
          <Title level={5}>ID and PASS .COM</Title>
          <p><strong>ID:</strong> {userData?.idAndPassCom?.id || 'N/A'}</p>
          <p><strong>Pass:</strong> {userData?.idAndPassCom?.pass || 'N/A'}</p>
        </VerticalTimelineElement>


{/* videokyc card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.videoKyc || 'Pending'}`}
          icon={getIcon(userData?.videoKyc)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.videoKyc)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Video KYC</Title>
          <p><strong>Status:</strong> {userData?.videoKyc || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.videoKycDate ? moment(userData?.videoKycDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* deduct card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.deduct || 'Pending'}`}
          icon={getIcon(userData?.deduct)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.deduct)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>1$ Deduct</Title>
          <p><strong>Status:</strong> {userData?.deduct || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.deductDate ? moment(userData?.deductDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* listings card */}
<VerticalTimelineElement
          date={`Listings Date: ${userData?.listingsComDate || 'N/A'}`}
          icon={getIcon(userData?.listingsCom ? 'Done' : 'Pending')}
          contentStyle={getContentStyle(userData?.listingsCom ? 'Done' : 'Pending')}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Listings .COM</Title>
          <p><strong>Listings:</strong> {userData?.listingsCom || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.listingsComDate ? moment(userData?.listingsComDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* launch card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.launchCom || 'Pending'}`}
          icon={getIcon(userData?.launchCom)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.launchCom)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Launch Account .COM</Title>
          <p><strong>Launch:</strong> {userData?.launchCom || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.launchComDate ? moment(userData?.launchComDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* nia card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.nia || 'Pending'}`}
          icon={getIcon(userData?.nia)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.nia)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>NIA</Title>
          <p><strong>NIA:</strong> {userData?.nia || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.niaDate ? moment(userData?.niaDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* add credit card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.addCredit || 'Pending'}`}
          icon={getIcon(userData?.addCredit)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.addCredit)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>50$ Add Credit</Title>
          <p><strong>Add:</strong> {userData?.addCredit || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.addCreditDate ? moment(userData?.addCreditDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* fba card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.fbaCom || 'Pending'}`}
          icon={getIcon(userData?.fbaCom)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.fbaCom)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>FBA .COM</Title>
          <p><strong>FBA:</strong> {userData?.fbaCom || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.fbaComDate ? moment(userData?.fbaComDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* cvc card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.cvcCom || 'Pending'}`}
          icon={getIcon(userData?.cvcCom)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.cvcCom)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Closing Video Call</Title>
          <p><strong>CVC:</strong> {userData?.cvcCom || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.cvcComDate ? moment(userData?.cvcComDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>

{/* stage 3 completed card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.stage3Completion || 'Pending'}`}
          icon={getIcon(userData?.stage3Completion)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.stage3Completion)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Stage 3 Completion</Title>
          <p><strong>Stage 3:</strong> {userData?.stage3Completion || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.stage3CompletionDate ? moment(userData?.stage3CompletionDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>
        
      </VerticalTimeline>
    </div>
  );
};

export default Timeline3;