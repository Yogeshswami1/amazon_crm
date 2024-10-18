import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Typography, Select, DatePicker } from 'antd';
import axios from 'axios';
import {
 BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import moment from 'moment';


const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Title } = Typography;
const { Option } = Select;


const AmazonAnalytics = () => {
 const [userData, setUserData] = useState([]);
 const [filteredData, setFilteredData] = useState([]);
 const [loading, setLoading] = useState(true);
 const [selectedYear, setSelectedYear] = useState(null);
 const [selectedMonth, setSelectedMonth] = useState(null);


 const managerId = localStorage.getItem('managerId');


 useEffect(() => {
   if (managerId) {
     axios
       .get(`${apiUrl}/api/contact/getall?managerId=${managerId}`)
       .then(response => {
         setUserData(response.data);
         setFilteredData(response.data); // Initialize with full data
         setLoading(false);
       })
       .catch(error => {
         console.error('Error fetching user data:', error);
         setLoading(false);
       });
   }
 }, [managerId]);


 // Handle year and month change
 const handleYearChange = (year) => {
   setSelectedYear(year);
   filterData(year, selectedMonth);
 };


 const handleMonthChange = (month) => {
   setSelectedMonth(month);
   filterData(selectedYear, month);
 };


 // Filter data based on the selected year and month
 const filterData = (year, month) => {
   const filtered = userData.filter(item => {
     const itemDate = moment(item.date); // Assuming `date` field is in ISO format
     const matchesYear = year ? itemDate.year() === year : true;
     const matchesMonth = month ? itemDate.month() === month : true;
     return matchesYear && matchesMonth;
   });
   setFilteredData(filtered);
 };


 // Filtering metrics
 const totalUsers = filteredData.length;
 const usersWithGst = filteredData.filter(item => item.gst === 'Done').length;
 const accountLaunchIn = filteredData.filter(item => item.launchIn === 'Done').length;
 const accountLaunchCom = filteredData.filter(item => item.launchCom === 'Done').length;
 const fbaInDone = filteredData.filter(item => item.fbaIn === 'Done').length;
 const fbaComDone = filteredData.filter(item => item.fbaCom === 'Done').length;


 // Prepare data for the chart
 const chartData = [
   { name: 'Total Users', value: totalUsers },
   { name: 'GST Done', value: usersWithGst },
   { name: 'Launch .IN', value: accountLaunchIn },
   { name: 'Launch .COM', value: accountLaunchCom },
   { name: 'FBA .IN', value: fbaInDone },
   { name: 'FBA .COM', value: fbaComDone },
 ];


 const currentYear = moment().year();
 const years = Array.from({ length: 5 }, (_, i) => currentYear - i); // Last 5 years


 return (
   <div style={{ padding: '40px' }}>
     <Title level={3} style={{ textAlign: 'center', marginBottom: '30px' }}>
       User Statistics Dashboard
     </Title>
     {loading ? (
       <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />
     ) : (
       <>
         <Row justify="center" style={{ marginBottom: '20px' }}>
           <Col xs={12} md={6}>
             <Select
               placeholder="Select Year"
               onChange={handleYearChange}
               style={{ width: '100%' }}
               allowClear
             >
               {years.map(year => (
                 <Option key={year} value={year}>
                   {year}
                 </Option>
               ))}
             </Select>
           </Col>
           <Col xs={12} md={6}>
             <Select
               placeholder="Select Month"
               onChange={handleMonthChange}
               style={{ width: '100%' }}
               allowClear
             >
               {moment.months().map((month, index) => (
                 <Option key={index} value={index}>
                   {month}
                 </Option>
               ))}
             </Select>
           </Col>
         </Row>
         <Row justify="center">
           <Col xs={24} md={18} lg={16}>
             <Card style={{ padding: '20px' }}>
               <ResponsiveContainer width="100%" height={400}>
                 <BarChart
                   data={chartData}
                   margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
                 >
                   <CartesianGrid strokeDasharray="3 3" />
                   <XAxis dataKey="name" />
                   <YAxis />
                   <Tooltip />
                   <Legend />
                   <Bar dataKey="value" fill="#1890ff" barSize={50} />
                 </BarChart>
               </ResponsiveContainer>
             </Card>
           </Col>
         </Row>
       </>
     )}
   </div>
 );
};


export default AmazonAnalytics;