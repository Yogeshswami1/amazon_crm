


import React, { useState, useEffect } from 'react';
import 'react-vertical-timeline-component/style.min.css';
import { Typography, Radio, message } from 'antd';
import TypewriterEffect from '../../components/TypewriterEffect';
import './Userdashboard.css';
import Dash from "./Dash";
import Dashwebsite from "./Dashwebsite";
import Timeline1 from "./Timeline1";
import Timeline2 from "./Timeline2";
import Timeline3 from "./Timeline3";
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Stage3 from './Stage3';
import axios from 'axios';
import Changes from './Changes';
import Dashboard from './franchise/Dashboard';
import Ecommerce from './franchise/Ecommerce';
import Payments from './franchise/Payments';
import Socialmedia from './franchise/Socialmedia';

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Title } = Typography;

const Userdashboard = () => {
  const [enrollmentId, setEnrollmentId] = useState('');
  const [view, setView] = useState('');
  const [serviceType, setServiceType] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('enrollmentId');
    setEnrollmentId(id);

    const fetchServiceType = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/contact/service/${id}`);
        const fetchedServiceType = response.data.serviceType;
        setServiceType(fetchedServiceType);

        // Set the default view based on the serviceType
        if (fetchedServiceType === 'AMAZON') {
          setView('dashamazon');
        } else if (fetchedServiceType === 'WEBSITE') {
          setView('dashwebsite');
        } else if (fetchedServiceType === 'FRANCHISE') {
          setView('dashfranchise');
        }
      } catch (error) {
        message.error('Failed to fetch service type');
        console.error('Error fetching service type:', error);
      }
    };

    if (id) {
      fetchServiceType();
    }
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        <TypewriterEffect text={`Welcome, ${enrollmentId}`} />
      </Title>
      {serviceType && (
        <Radio.Group 
          onChange={(e) => setView(e.target.value)} 
          value={view} 
          style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}
        >
          {serviceType === 'AMAZON' && (
            <>
              <Radio.Button value="dashamazon">Dashboard</Radio.Button>
              <Radio.Button value="timeline">Timeline</Radio.Button>
              <Radio.Button value="intimeline">IN Timeline</Radio.Button>
              <Radio.Button value="comtimeline">COM Timeline</Radio.Button>
            </>
          )}
          {serviceType === 'WEBSITE' && (
            <>
              <Radio.Button value="dashwebsite">Dashboard</Radio.Button>
              <Radio.Button value="stage1">Stage 1</Radio.Button>
              <Radio.Button value="stage2">Stage 2</Radio.Button>
              <Radio.Button value="stage3">Stage 3</Radio.Button>
              <Radio.Button value="changes">Changes</Radio.Button>
            </>
          )}
          {serviceType === 'FRANCHISE' && (
            <>
              <Radio.Button value="dashfranchise">Dashboard</Radio.Button>
              <Radio.Button value="social">Social Media</Radio.Button>
              <Radio.Button value="ecommerce">Ecommerce</Radio.Button>
              <Radio.Button value="payment">Payments</Radio.Button>
            </>
          )}
        </Radio.Group>
      )}
      {view === 'dashamazon' && (<Dash/>)}
      {view === 'dashwebsite' && (<Dashwebsite/>)}
      {view === 'timeline' && (<Timeline1/>)}
      {view === 'intimeline' && (<Timeline2/>)}
      {view === 'comtimeline' && (<Timeline3/>)}
      {view === 'stage1' && (<Stage1/>)}
      {view === 'stage2' && (<Stage2/>)}
      {view === 'stage3' && (<Stage3/>)}
      {view === 'changes' && (<Changes/>)}

      {view === 'dashfranchise' && (<Dashboard/>)}
      {view === 'social' && (<Socialmedia/>)}
      {view === 'ecommerce' && (<Ecommerce/>)}
      {view === 'payment' && (<Payments/>)}

    </div>
  );
};

export default Userdashboard;
