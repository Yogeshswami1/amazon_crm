// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
// import 'react-vertical-timeline-component/style.min.css';
// import { Typography } from 'antd';
// import { FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';
// import './Userdashboard.css';
// import moment from 'moment';
// import HorizontalTimeline from './Horizontaltimeline';

// const apiUrl = process.env.REACT_APP_BACKEND_URL;
// const { Title } = Typography;

// const Timeline1 = () => {
//   const [tasks, setTasks] = useState([]);
//   const [userCreatedDate, setUserCreatedDate] = useState('');
//   const [projectStatus, setProjectStatus] = useState('Pending');
//   const [completionDate, setCompletionDate] = useState('Pending');

//   useEffect(() => {
//     const id = localStorage.getItem('enrollmentId');
//     if (id) {
//       fetchUserData(id);
//       fetchTasks(id);
//     }
//   }, []);

//   useEffect(() => {
//     if (tasks.length > 0) {
//       checkProjectStatus(tasks);
//     }
//   }, [tasks]);

//   const fetchTasks = async (id) => {
//     try {
//       const [tasksResponse, additionalTasksResponse] = await Promise.all([
//         axios.get(`${apiUrl}/api/contact/${id}/tasks`),
//         axios.get(`${apiUrl}/api/contact/enrollmentId/${id}`)
//       ]);

//       const tasksData = tasksResponse.data;
//       const contactData = additionalTasksResponse.data;
//       const additionalTasksData = getAdditionalTasks(contactData);

//       setTasks([...tasksData, ...additionalTasksData]);
//     } catch (error) {
//       console.error('Error fetching tasks: ', error);
//     }
//   };

//   const fetchUserData = async (enrollmentId) => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/contact/enrollmentId/${enrollmentId}`);
//       const userData = response.data;
//       setUserCreatedDate(userData.date);
//     } catch (error) {
//       console.error('Error fetching user data: ', error);
//     }
//   };

//   const getAdditionalTasks = (contactData) => {
//     const fields = [
//       { key: 'idCard', label: 'ID Card' },
//       { key: 'training', label: 'Training' },
//       { key: 'ebook', label: 'Ebook' },
//       { key: 'supportPortal', label: 'Support Portal' },
//       { key: 'walletPortal', label: 'Wallet Portal' },
//       { key: 'gallery', label: 'Gallery' },
//       { key: 'legality', label: 'Legality' },
//     ];

//     return fields.map(field => {
//       const fieldValue = contactData[field.key];
//       let status = 'Pending';
//       let formattedComment = `${field.label}: ${fieldValue || 'N/A'}`;

//       if (fieldValue && fieldValue.includes('(updated on')) {
//         const [actualValue, datePart] = fieldValue.split(' (updated on ');
//         status = actualValue === 'Done' ? 'Done' : 'Pending';

//         if (datePart) {
//           const date = datePart.replace(')', ''); // Remove the closing parenthesis
//           const formattedDate = moment(date).format('DD-MM-YYYY');
//           formattedComment = `${field.label}: ${actualValue} (updated on ${formattedDate})`;
//         }
//       }

//       return {
//         comment: formattedComment,
//         status,
//       };
//     });
//   };

//   const checkProjectStatus = (tasks) => {
//     const allDone = tasks.every(task => task.status === 'Done');
//     setProjectStatus(allDone ? 'Completed' : 'Pending');
//     setCompletionDate(allDone ? moment().format('DD-MM-YYYY') : 'Pending');
//   };

//   const getIcon = (status) => {
//     switch (status) {
//       case 'Done':
//         return <FaCheckCircle style={{ color: 'green' }} />;
//       case 'Pending':
//         return <FaClock style={{ color: 'blue' }} />;
//       default:
//         return <FaExclamationCircle style={{ color: 'red' }} />;
//     }
//   };

//   const getContentStyle = (status) => {
//     switch (status) {
//       case 'Done':
//         return {
//           background: '#c8e6c9', // Light green background for Done tasks
//           borderRadius: '8px',
//           boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
//           padding: '20px',
//           border: '1px solid #ddd'
//         };
//       case 'Pending':
//         return {
//           background: '#bbdefb', // Light blue background for Pending tasks
//           borderRadius: '8px',
//           boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
//           padding: '20px',
//           border: '1px solid #ddd'
//         };
//       default:
//         return {
//           background: '#ffcdd2', // Light red background for Error tasks
//           borderRadius: '8px',
//           boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
//           padding: '20px',
//           border: '1px solid #ddd'
//         };
//     }
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <HorizontalTimeline userCreatedDate={userCreatedDate} projectStatus={projectStatus} completionDate={completionDate} />

//       <VerticalTimeline>
//         {tasks.slice().reverse().map((task, index) => (
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
//             <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>{task.comment}</Title>
//           </VerticalTimelineElement>
//         ))}
//       </VerticalTimeline>
//     </div>
//   );
// };

// export default Timeline1;




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

const Timeline1 = () => {
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
        {/* ovc Card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.ovc || 'Pending'}`}
          icon={getIcon(userData?.ovc)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.ovc)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Onboarding Video Call</Title>
          <p><strong>OVC:</strong> {userData?.ovc || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.ovcDate ? moment(userData?.ovcDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>

       {/* Legality Card */}
<VerticalTimelineElement
  date={`Status: ${userData?.legality || 'Pending'}`}
  icon={getIcon(userData?.legality)}
  iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
  contentStyle={getContentStyle(userData?.legality)}
  contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
  dateStyle={{ color: '#999', fontSize: '14px' }}
>
  <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Legality</Title>
  <p><strong>Legality:</strong> {userData?.legality || 'Pending'}</p>
  
  {/* Legality Link with full URL check */}
  <p><strong>Legality Link:</strong> 
    {userData?.legalityLink ? (
      <a 
        href={userData?.legalityLink.startsWith('http') ? userData?.legalityLink : `http://${userData?.legalityLink}`}
        target="_blank" 
        rel="noopener noreferrer"
      >
        View Document
      </a>
    ) : 'N/A'}
  </p>
  
  <p><strong>Date:</strong> {userData?.legalityDate ? moment(userData?.legalityDate).format('DD-MM-YYYY') : 'N/A'}</p>
</VerticalTimelineElement>


{/* ID Card */}
<VerticalTimelineElement
          date={`Status: ${userData?.idCard || 'Pending'}`}
          icon={getIcon(userData?.idCard)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.idCard)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>ID Card</Title>
          <p><strong>ID Card:</strong> {userData?.idCard || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.idCardDate ? moment(userData?.idCardDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* training card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.training || 'Pending'}`}
          icon={getIcon(userData?.training)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.training)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Training</Title>
          <p><strong>Training:</strong> {userData?.training || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.trainingDate ? moment(userData?.trainingDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* ebook card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.ebook || 'Pending'}`}
          icon={getIcon(userData?.ebook)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.ebook)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Ebook</Title>
          <p><strong>Ebook:</strong> {userData?.ebook || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.ebookDate ? moment(userData?.ebookDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* support portal card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.supportPortal || 'Pending'}`}
          icon={getIcon(userData?.supportPortal)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.supportPortal)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Support Portal</Title>
          <p><strong>Support:</strong> {userData?.supportPortal || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.supportPortalDate ? moment(userData?.supportPortalDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* wallet portal card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.walletPortal || 'Pending'}`}
          icon={getIcon(userData?.walletPortal)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.walletPortal)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Wallet Portal</Title>
          <p><strong>Wallet:</strong> {userData?.walletPortal || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.walletPortalDate ? moment(userData?.walletPortalDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>


{/* gallery card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.gallery || 'Pending'}`}
          icon={getIcon(userData?.gallery)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.gallery)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Gallery</Title>
          <p><strong>Gallery:</strong> {userData?.gallery || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.galleryDate ? moment(userData?.galleryDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>



{/* stage 1 completed card */}
        <VerticalTimelineElement
          date={`Status: ${userData?.stage1Completion || 'Pending'}`}
          icon={getIcon(userData?.stage1Completion)}
          iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
          contentStyle={getContentStyle(userData?.stage1Completion)}
          contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
          dateStyle={{ color: '#999', fontSize: '14px' }}
        >
          <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Stage 1 Completion</Title>
          <p><strong>Stage 1:</strong> {userData?.stage1Completion || 'N/A'}</p>
          <p><strong>Date:</strong> {userData?.stage1CompletionDate ? moment(userData?.stage1CompletionDate).format('DD-MM-YYYY') : 'N/A'}</p>
        </VerticalTimelineElement>
        
      </VerticalTimeline>
    </div>
  );
};

export default Timeline1;