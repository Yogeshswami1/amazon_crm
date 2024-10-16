import React, { useState, useEffect } from 'react';
import { Card, Row, Col, message } from 'antd';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './Dashadmin.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Admin1 = () => {
  const [contacts, setContacts] = useState([]);
  const [totalClients, setTotalClients] = useState(0);
  const [tlClients, setTlClients] = useState({});
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [pieChartData, setPieChartData] = useState([]);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/getcontact`);
      const contactData = response.data;

      setContacts(contactData);

      // Calculate total number of clients
      const total = contactData.length;
      setTotalClients(total);

      // Calculate number of clients per TL
      const clientsByTL = contactData.reduce((acc, contact) => {
        const tlPosition = contact.managerId?.position || 'Unknown TL';
        acc[tlPosition] = (acc[tlPosition] || 0) + 1;
        return acc;
      }, {});
      setTlClients(clientsByTL);

      // Generate chart data based on the API response
      const stagesCount = contactData.reduce((acc, contact) => {
        const tl = contact.managerId?.position || 'Unknown TL';
        if (!acc[tl]) {
          acc[tl] = { 
            stage1: 0, 
            stage2: 0, 
            stage3: 0, 
            fbaDone: 0, 
            fbaNotDone: 0,
            accountOpenCom: 0,  // Track accountOpenCom count
            accountOpenIn: 0     // Track accountOpenIn count
          };
        }

        // Count completed stages
        acc[tl].stage1 += contact.stage1Completion === 'Done' ? 1 : 0;
        acc[tl].stage2 += contact.stage2Completion === 'Done' ? 1 : 0;
        acc[tl].stage3 += contact.stage3Completion === 'Done' ? 1 : 0;
        acc[tl].fbaDone += contact.fbaStatus === 'Done' ? 1 : 0;
        acc[tl].fbaNotDone += contact.fbaStatus === 'Not Done' ? 1 : 0;
        
        // Count accountOpenCom and accountOpenIn
        acc[tl].accountOpenCom += contact.accountOpenCom === 'Done' ? 1 : 0;
        acc[tl].accountOpenIn += contact.accountOpenIn === 'Done' ? 1 : 0;

        return acc;
      }, {});

      // Prepare data for the bar chart
      const labels = Object.keys(stagesCount);
      const stage1Data = labels.map((tl) => stagesCount[tl].stage1);
      const stage2Data = labels.map((tl) => stagesCount[tl].stage2);
      const stage3Data = labels.map((tl) => stagesCount[tl].stage3);
      const accountOpenComData = labels.map((tl) => stagesCount[tl].accountOpenCom);  // Data for accountOpenCom
      const accountOpenInData = labels.map((tl) => stagesCount[tl].accountOpenIn);    // Data for accountOpenIn

      setChartData({
        labels: labels.length ? labels : ['No TLs Available'],
        datasets: [
          {
            label: 'Stage 1 Completed',
            backgroundColor: '#3e95cd',
            data: stage1Data.length ? stage1Data : [0],
          },
          {
            label: 'Stage 2 Completed',
            backgroundColor: '#8e5ea2',
            data: stage2Data.length ? stage2Data : [0],
          },
          {
            label: 'Stage 3 Completed',
            backgroundColor: '#3cba9f',
            data: stage3Data.length ? stage3Data : [0],
          },
          {
            label: 'Account Open .COM',
            backgroundColor: '#4BC0C0',
            data: accountOpenComData.length ? accountOpenComData : [0],  // Adding accountOpenCom data to the chart
          },
          {
            label: 'Account Open .IN',
            backgroundColor: '#9966FF',
            data: accountOpenInData.length ? accountOpenInData : [0],    // Adding accountOpenIn data to the chart
          },
        ],
      });

      // Prepare data for the pie chart showing the breakdown of each stage for each TL
      const pieData = Object.keys(stagesCount).map((tl) => ({
        tl,
        data: {
          labels: ['Stage 1 Completed', 'Stage 2 Completed', 'Stage 3 Completed','Account Open .COM','Account Open .IN'],
          datasets: [
            {
              label: `Completion for ${tl}`,
              backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384','#4BC0C0','#9966FF'],
              data: [
                stagesCount[tl].stage1,
                stagesCount[tl].stage2,
                stagesCount[tl].stage3,
                stagesCount[tl].accountOpenCom,
                stagesCount[tl].accountOpenIn
              ],
            },
          ],
        },
      }));

      setPieChartData(pieData);
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Failed to load data. Please try again.');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="dashboard-container">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card className="custom-card" title="Total Clients" bordered={false}>
            <div className="card-content">
              <div className="client-count">{totalClients}</div>
              <div className="chart-placeholder">
                <Pie
                  data={{
                    labels: ['Total Clients'],
                    datasets: [
                      {
                        label: 'Total Clients',
                        backgroundColor: ['#36A2EB'],
                        data: [totalClients],
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                    },
                  }}
                />
              </div>
            </div>
          </Card>
        </Col>

        {Object.keys(tlClients).map((tl, index) => (
          <Col span={8} key={index}>
            <Card className="custom-card" title={`Clients under ${tl}`} bordered={false}>
              {tlClients[tl]}
              {pieChartData.length > 0 && pieChartData.find((pie) => pie.tl === tl) && (
                <div className="pie-chart-container">
                  <Pie data={pieChartData.find((pie) => pie.tl === tl).data} />
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>

      
    </div>
  );
};

export default Admin1;
