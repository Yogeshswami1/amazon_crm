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

// const Timeline2 = () => {
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
//       { key: 'gst', label: 'GST', descriptionKey: 'gstDescription', specialHandling: handleGstStatus },
//       { key: 'onboardingStatus', label: 'Onboarding Status', descriptionKey: 'onboardingDescription', specialHandling: handleOnboardingStatus },
//       { key: 'accountOpenIn', label: 'IN Account Open', specialHandling: handleAccountOpenStatus },
//       { key: 'gtin', label: 'GTIN', descriptionKey: 'gtinDescription', specialHandling: handleGtinStatus },
//       { key: 'listingsIn', label: 'IN Listings' },
//       { key: 'launchDateIn', label: 'IN Launch Date' },
//       { key: 'addRegionIn', label: 'IN Add Region' },
//       { key: 'fbaIn', label: 'IN FBA' },
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
//         if (field.key === 'listingsIn') {
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

//   const handleGstStatus = (value, description) => {
//     let status = 'Pending';
//     let formattedComment = 'GST: ';

//     if (value.startsWith('Yes')) {
//       status = 'Done';
//       formattedComment += 'Yes';
//     } else if (value.startsWith('No')) {
//       status = 'Pending';
//     }

//     if (value.includes('(updated on')) {
//       const [actualValue, datePart] = value.split(' (updated on ');
//       const date = datePart.replace(')', '');
//       const formattedDate = moment(date).format('DD-MM-YYYY');
//       formattedComment += ` (updated on ${formattedDate})`;
//     } else {
//       formattedComment += value;
//     }

//     if (status === 'Pending' && description) {
//       formattedComment += ` - ${description}`;
//     }

//     return { status, formattedComment };
//   };

//   const handleOnboardingStatus = (value, description) => {
//     let status = 'Pending';
//     let formattedComment = 'Onboarding Status: ';

//     if (value.startsWith('Done')) {
//       status = 'Done';
//       formattedComment += 'Yes';
//     } else if (value.startsWith('Pending')) {
//       status = 'Pending';
//       formattedComment += 'Pending';
//     }

//     if (value.includes('(updated on')) {
//       const [actualValue, datePart] = value.split(' (updated on ');
//       const date = datePart.replace(')', '');
//       const formattedDate = moment(date).format('DD-MM-YYYY');
//       formattedComment += ` (updated on ${formattedDate})`;
//     }

//     if (status === 'Pending' && description) {
//       formattedComment += ` - ${description}`;
//     }

//     return { status, formattedComment };
//   };

//   const handleAccountOpenStatus = (value, description) => {
//     let status = 'Pending';
//     let formattedComment = 'IN Account Open: ';

//     if (value.startsWith('Opened')) {
//       status = 'Done';
//       formattedComment += 'Opened';
//     } else if (value.startsWith('Not Opened')) {
//       status = 'Pending';
//       formattedComment += 'Not Opened';
//     }

//     if (value.includes('(updated on')) {
//       const [actualValue, datePart] = value.split(' (updated on ');
//       const date = datePart.replace(')', '');
//       const formattedDate = moment(date).format('DD-MM-YYYY');
//       formattedComment += ` (updated on ${formattedDate})`;
//     }

//     return { status, formattedComment };
//   };

//   const handleGtinStatus = (value, description) => {
//     let status = 'Pending';
//     let formattedComment = 'GTIN: ';

//     if (value.startsWith('Pending')) {
//       status = 'Pending';
//       formattedComment += 'Pending';
//       if (description) {
//         formattedComment += ` - ${description}`;
//       }
//     } else if (value.startsWith('Approved')) {
//       status = 'Done';
//       formattedComment += 'Approved';
//     }

//     if (value.includes('(updated on')) {
//       const [actualValue, datePart] = value.split(' (updated on ');
//       const date = datePart.replace(')', '');
//       const formattedDate = moment(date).format('DD-MM-YYYY');
//       formattedComment += ` (updated on ${formattedDate})`;
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
//       <VerticalTimeline>
//         {additionalTasks.map((task, index) => (
//           <VerticalTimelineElement
//             key={index}
//             date={`Status: ${task.status}`}
//             icon={getIcon(task.status)}
//             iconStyle={{
//               background: 'white',
//               color: '#fff',
//               boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
//             }}
//             contentStyle={getContentStyle(task.status)}
//             contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
//             dateStyle={{
//               color: '#999',
//               fontSize: '14px',
//             }}
//           >
//             <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>{task.comment.split(' - ')[0]}</Title>
//             {task.status === 'Pending' && task.description ? (
//               <Text style={{ color: '#666' }}>
//                 {task.description}
//               </Text>
//             ) : null}
//           </VerticalTimelineElement>
//         ))}
//       </VerticalTimeline>
//     </div>
//   );
// };

// export default Timeline2;





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

const Timeline2 = () => {
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
        {/* state Card */}
        <VerticalTimelineElement
          date={`State Date: ${userData?.stateDate || 'N/A'}`}
          icon={getIcon(userData?.state ? 'Done' : 'Pending')}
          contentStyle={getContentStyle(userData?.state ? 'Done' : 'Pending')}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>State</Title>
          <p><strong>State:</strong> {userData?.state || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.stateDate ? moment(userData?.stateDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>

       {/* GST Card */}
<VerticalTimelineElement
  date={`Status: ${userData?.gst || 'Pending'}`}
  icon={getIcon(userData?.gst)}
  iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
  contentStyle={getContentStyle(userData?.gst)}
  contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
  dateStyle={{ color: '#999', fontSize: '14px' }}
>
  <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>GST</Title>
  <p><strong>GST:</strong> {userData?.gst || 'Pending'}</p>
  <p><strong>GST Number:</strong> {userData?.gstNumber || 'N/A'}</p>
  <p><strong>Date:</strong> {userData?.gstDate ? moment(userData?.gstDate).format('DD-MM-YYYY') : 'N/A'}</p>
</VerticalTimelineElement>


{/* Brand Name card */}
<VerticalTimelineElement
          date={`Brand Name Date: ${userData?.brandNameDate || 'N/A'}`}
          icon={getIcon(userData?.brandName ? 'Done' : 'Pending')}
          contentStyle={getContentStyle(userData?.brandName ? 'Done' : 'Pending')}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Brand Name</Title>
          <p><strong>Name:</strong> {userData?.brandName || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.brandNameDate ? moment(userData?.brandNameDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* account open card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.accountOpenIn || 'Pending'}`}
          icon={getIcon(userData?.accountOpenIn)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.accountOpenIn)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Account Open .IN</Title>
          <p><strong>Account:</strong> {userData?.accountOpenIn || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.accountOpenInDate ? moment(userData?.accountOpenInDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* id and pass IN card */}
<VerticalTimelineElement
          date={`ID and PASS Provided`}
          icon={getIcon(userData?.idAndPassIn?.id || userData?.idAndPassIn?.pass ? 'Done' : 'Pending')}
          contentStyle={getContentStyle(userData?.idAndPassIn?.id || userData?.idAndPassIn?.pass ? 'Done' : 'Pending')}
        >
          <Title level={5}>ID and PASS .IN</Title>
          <p><strong>ID:</strong> {userData?.idAndPassIn?.id || 'N/A'}</p>
          <p><strong>Pass:</strong> {userData?.idAndPassIn?.pass || 'N/A'}</p>
        </VerticalTimelineElement>


{/* gtin card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.gtin || 'Pending'}`}
          icon={getIcon(userData?.gtin)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.gtin)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>GTIN</Title>
          <p><strong>GTIN:</strong> {userData?.gtin || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.gtinDate ? moment(userData?.gtinDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* listings card */}
<VerticalTimelineElement
          date={`Listings: ${userData?.listingsInDate || 'N/A'}`}
          icon={getIcon(userData?.listingsIn ? 'Done' : 'Pending')}
          contentStyle={getContentStyle(userData?.listingsIn ? 'Done' : 'Pending')}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Listings .IN</Title>
          <p><strong>Listings:</strong> {userData?.listingsIn || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.listingsInDate ? moment(userData?.listingsInDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* launch card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.launchIn || 'Pending'}`}
          icon={getIcon(userData?.launchIn)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.launchIn)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Launch Account .IN</Title>
          <p><strong>Launch:</strong> {userData?.launchIn || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.launchInDate ? moment(userData?.launchInDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* add region card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.addRegion || 'Pending'}`}
          icon={getIcon(userData?.addRegion)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.addRegion)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Add Region</Title>
          <p><strong>Add:</strong> {userData?.addRegion || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.addRegionDate ? moment(userData?.addRegionDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>

{/* shipping */}
<VerticalTimelineElement
          date={`Shipping Date: ${userData?.shippingDate || 'N/A'}`}
          icon={getIcon(userData?.shipping ? 'Done' : 'Pending')}
          contentStyle={getContentStyle(userData?.shipping ? 'Done' : 'Pending')}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Shipping</Title>
          <p><strong>Type:</strong> {userData?.shipping || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.shippingDate ? moment(userData?.shippingDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* fba card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.fbaIn || 'Pending'}`}
          icon={getIcon(userData?.fbaIn)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.fbaIn)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>FBA .IN</Title>
          <p><strong>FBA:</strong> {userData?.fbaIn || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.fbaInDate ? moment(userData?.fbaInDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* cvc card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.cvcIn || 'Pending'}`}
          icon={getIcon(userData?.cvcIn)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.cvcIn)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Closing Video Call</Title>
          <p><strong>CVC:</strong> {userData?.cvcIn || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.cvcInDate ? moment(userData?.cvcInDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>

{/* stage 2 completed card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.stage2Completion || 'Pending'}`}
          icon={getIcon(userData?.stage2Completion)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.stage2Completion)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Stage 2 Completion</Title>
          <p><strong>Stage 2:</strong> {userData?.stage2Completion || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.stage2CompletionDate ? moment(userData?.stage2CompletionDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>
        
      </VerticalTimeline>
    </div>
  );
};

export default Timeline2;