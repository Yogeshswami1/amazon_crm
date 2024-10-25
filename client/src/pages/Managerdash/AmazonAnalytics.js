// import React, { useEffect, useState } from 'react';
// import { Card, Row, Col, Spin, Typography, Select, DatePicker, Input, Button } from 'antd';
// import axios from 'axios';
// import {
//  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
// } from 'recharts';
// import moment from 'moment';
// import Papa from 'papaparse';


// const apiUrl = process.env.REACT_APP_BACKEND_URL;
// const { Title } = Typography;
// const { Option } = Select;
// const { RangePicker } = DatePicker;


// const AmazonAnalytics = () => {
//  const [userData, setUserData] = useState([]);
//  const [filteredData, setFilteredData] = useState([]);
//  const [loading, setLoading] = useState(true);
//  const [selectedYear, setSelectedYear] = useState(null);
//  const [selectedMonth, setSelectedMonth] = useState(null);
//  const [selectedBatch, setSelectedBatch] = useState(null);
//  const [enrollmentIdRange, setEnrollmentIdRange] = useState({ min: '', max: '' }); // Enrollment ID Range
//  const [dateRange, setDateRange] = useState(null); // Date Range filter
//  const [brobatches, setBatches] = useState([]);




//  const managerId = localStorage.getItem('managerId');


//  useEffect(() => {
//    if (managerId) {
//      axios
//        .get(`${apiUrl}/api/contact/getall?managerId=${managerId}`)
//        .then(response => {
//          setUserData(response.data);
//          setFilteredData(response.data); // Initialize with full data
//          setLoading(false);
//        })
//        .catch(error => {
//          console.error('Error fetching user data:', error);
//          setLoading(false);
//        });
//    }
//  }, [managerId]);
//  useEffect(() => {
//    const fetchBatches = async () => {
//      try {
//        const response = await axios.get(`${apiUrl}/api/batches`); // Replace with the actual API URL
//        setBatches(response.data); // Assuming API returns an array of batch objects
//      } catch (error) {
//        console.error('Error fetching batches:', error);
//      }
//    };


//    fetchBatches();
//  }, []);


//  // Handle year, month, batch, enrollment ID range, and date range changes
//  const handleYearChange = (year) => {
//    setSelectedYear(year);
//    filterData(year, selectedMonth, selectedBatch, enrollmentIdRange, dateRange);
//  };


//  const handleMonthChange = (month) => {
//    setSelectedMonth(month);
//    filterData(selectedYear, month, selectedBatch, enrollmentIdRange, dateRange);
//  };


//  const handleBatchChange = (batch) => {
//    setSelectedBatch(batch);
//    filterData(selectedYear, selectedMonth, batch, enrollmentIdRange, dateRange);
//  };


//  const handleEnrollmentIdChange = (min, max) => {
//    setEnrollmentIdRange({ min, max });
//    filterData(selectedYear, selectedMonth, selectedBatch, { min, max }, dateRange);
//  };


//  const handleDateRangeChange = (dates) => {
//    setDateRange(dates);
//    filterData(selectedYear, selectedMonth, selectedBatch, enrollmentIdRange, dates);
//  };


//  // Filter data based on selected year, month, batch, enrollment ID range, and date range
//  const filterData = (year, month, batch, enrollmentRange, dates) => {
//    const filtered = userData.filter(item => {
//      const itemDate = moment(item.date); // Assuming `date` field is in ISO format
//      const matchesYear = year ? itemDate.year() === year : true;
//      const matchesMonth = month ? itemDate.month() === month : true;
//      const matchesBatch = batch ? item.batch === batch : true;
    
//      const matchesEnrollmentId = (!enrollmentRange.min || item.enrollmentId >= enrollmentRange.min) &&
//                                  (!enrollmentRange.max || item.enrollmentId <= enrollmentRange.max);
                                
//      const matchesDateRange = dates ? (itemDate.isSameOrAfter(dates[0], 'day') && itemDate.isSameOrBefore(dates[1], 'day')) : true;


//      return matchesYear && matchesMonth && matchesBatch && matchesEnrollmentId && matchesDateRange;
//    });
//    setFilteredData(filtered);
//  };


//  // Filtering metrics
//  const totalUsers = filteredData.length;
//  const usersWithGst = filteredData.filter(item => item.gst === 'Done').length;
//  const accountLaunchIn = filteredData.filter(item => item.launchIn === 'Done').length;
//  const accountLaunchCom = filteredData.filter(item => item.launchCom === 'Done').length;
//  const fbaInDone = filteredData.filter(item => item.fbaIn === 'Done').length;
//  const fbaComDone = filteredData.filter(item => item.fbaCom === 'Done').length;


//  // Prepare data for the chart
//  const chartData = [
//    { name: 'Total Users', value: totalUsers },
//    { name: 'GST Done', value: usersWithGst },
//    { name: 'Launch .IN', value: accountLaunchIn },
//    { name: 'Launch .COM', value: accountLaunchCom },
//    { name: 'FBA .IN', value: fbaInDone },
//    { name: 'FBA .COM', value: fbaComDone },
//  ];


//  const currentYear = moment().year();
//  const years = Array.from({ length: 5 }, (_, i) => currentYear - i); // Last 5 years
//  const batches = Array.from({ length: 200 }, (_, i) => `B${i + 1}`); // Generate B1 to B200


//  const downloadCSV = () => {
//    // Define the fields you want in the CSV
//    const csvData = filteredData.map(item => ({
//      date: moment(item.date).format('YYYY-MM-DD'),
//      enrollmentId: item.enrollmentId,
//      managerPosition: item.managerId?.position,
//      gst: item.gst,
//      launchIn: item.launchIn,
//      launchCom: item.launchCom,
//      fbaIn: item.fbaIn,
//      fbaCom: item.fbaCom,
//    }));


//    // Convert JSON data to CSV
//    const csv = Papa.unparse(csvData);


//    // Create a downloadable link for the CSV
//    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//    const url = URL.createObjectURL(blob);
//    const link = document.createElement('a');
//    link.href = url;
//    link.setAttribute('download', 'user_data.csv');
//    document.body.appendChild(link);
//    link.click();
//    document.body.removeChild(link);
//  };


//  return (
//    <div style={{ padding: '40px' }}>
//      <Title level={3} style={{ textAlign: 'center', marginBottom: '30px' }}>
//        User Statistics Dashboard
//      </Title>
//      {loading ? (
//        <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />
//      ) : (
//        <>
//          <Row justify="center" gutter={[16, 16]} style={{ marginBottom: '20px' }}>
//          <Button type="primary" onClick={downloadCSV} disabled={loading}>
//        Download CSV
//      </Button>
//            <Col xs={12} md={6}>
//              <Select
//                placeholder="Select Year"
//                onChange={handleYearChange}
//                style={{ width: '100%' }}
//                allowClear
//              >
//                {years.map(year => (
//                  <Option key={year} value={year}>
//                    {year}
//                  </Option>
//                ))}
//              </Select>
//            </Col>
//            <Col xs={12} md={6}>
//              <Select
//                placeholder="Select Month"
//                onChange={handleMonthChange}
//                style={{ width: '100%' }}
//                allowClear
//              >
//                {moment.months().map((month, index) => (
//                  <Option key={index} value={index}>
//                    {month}
//                  </Option>
//                ))}
//              </Select>
//            </Col>
//            <Col xs={12} md={6}>
//              <Select
//                placeholder="Select Batch"
//                onChange={handleBatchChange}
//                style={{ width: '100%' }}
//                allowClear
//              >
//               {brobatches.map((batch) => (
//        <Option key={batch._id} value={batch.batchName}>
//          {batch.batchName}
//        </Option>
//      ))}
//              </Select>
//            </Col>
//            <Col xs={12} md={6}>
//              <Row gutter={8}>
//                <Col span={12}>
//                  <Input
//                    placeholder="Min Enrollment ID"
//                    onChange={(e) => handleEnrollmentIdChange(e.target.value, enrollmentIdRange.max)}
//                  />
//                </Col>
//                <Col span={12}>
//                  <Input
//                    placeholder="Max Enrollment ID"
//                    onChange={(e) => handleEnrollmentIdChange(enrollmentIdRange.min, e.target.value)}
//                  />
//                </Col>
//              </Row>
//            </Col>
//            <Col xs={12} md={6}>
//              <RangePicker
//                onChange={handleDateRangeChange}
//                style={{ width: '100%' }}
//              />
//            </Col>
//          </Row>
//          <Row justify="center">
//            <Col xs={24} md={18} lg={16}>
//              <Card style={{ padding: '20px' }}>
//                <ResponsiveContainer width="100%" height={400}>
//                  <BarChart
//                    data={chartData}
//                    margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
//                  >
//                    <CartesianGrid strokeDasharray="3 3" />
//                    <XAxis dataKey="name" />
//                    <YAxis />
//                    <Tooltip />
//                    <Legend />
//                    <Bar dataKey="value" fill="#1890ff" barSize={50} />
//                  </BarChart>
//                </ResponsiveContainer>
//              </Card>
//            </Col>
//          </Row>
//        </>
//      )}
//    </div>
//  );
// };


// export default AmazonAnalytics;



import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Typography, Select, DatePicker, Input, Button } from 'antd';
import axios from 'axios';
import {
 BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import moment from 'moment';
import Papa from 'papaparse';
import UserTable from './UserTable';


const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;


const AmazonAnalytics = () => {
 const [userData, setUserData] = useState([]);
 const [filteredData, setFilteredData] = useState([]);
 const [loading, setLoading] = useState(true);
 const [selectedYear, setSelectedYear] = useState(null);
 const [selectedMonth, setSelectedMonth] = useState(null);
 const [selectedBatch, setSelectedBatch] = useState(null);
 const [enrollmentIdRange, setEnrollmentIdRange] = useState({ min: '', max: '' }); // Enrollment ID Range
 const [dateRange, setDateRange] = useState(null); // Date Range filter
 const [brobatches, setBatches] = useState([]);




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
 useEffect(() => {
   const fetchBatches = async () => {
     try {
       const response = await axios.get(`${apiUrl}/api/batches`); // Replace with the actual API URL
       setBatches(response.data); // Assuming API returns an array of batch objects
     } catch (error) {
       console.error('Error fetching batches:', error);
     }
   };


   fetchBatches();
 }, []);


 // Handle year, month, batch, enrollment ID range, and date range changes
 const handleYearChange = (year) => {
   setSelectedYear(year);
   filterData(year, selectedMonth, selectedBatch, enrollmentIdRange, dateRange);
 };


 const handleMonthChange = (month) => {
   setSelectedMonth(month);
   filterData(selectedYear, month, selectedBatch, enrollmentIdRange, dateRange);
 };


 const handleBatchChange = (batch) => {
   setSelectedBatch(batch);
   filterData(selectedYear, selectedMonth, batch, enrollmentIdRange, dateRange);
 };


 const handleEnrollmentIdChange = (min, max) => {
   setEnrollmentIdRange({ min, max });
   filterData(selectedYear, selectedMonth, selectedBatch, { min, max }, dateRange);
 };


 const handleDateRangeChange = (dates) => {
   setDateRange(dates);
   filterData(selectedYear, selectedMonth, selectedBatch, enrollmentIdRange, dates);
 };


 // Filter data based on selected year, month, batch, enrollment ID range, and date range
 const filterData = (year, month, batch, enrollmentRange, dates) => {
   const filtered = userData.filter(item => {
     const itemDate = moment(item.date); // Assuming `date` field is in ISO format
     const matchesYear = year ? itemDate.year() === year : true;
     const matchesMonth = month ? itemDate.month() === month : true;
     const matchesBatch = batch ? item.batch === batch : true;
    
     const matchesEnrollmentId = (!enrollmentRange.min || item.enrollmentId >= enrollmentRange.min) &&
                                 (!enrollmentRange.max || item.enrollmentId <= enrollmentRange.max);
                                
     const matchesDateRange = dates ? (itemDate.isSameOrAfter(dates[0], 'day') && itemDate.isSameOrBefore(dates[1], 'day')) : true;


     return matchesYear && matchesMonth && matchesBatch && matchesEnrollmentId && matchesDateRange;
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
 const batches = Array.from({ length: 200 }, (_, i) => `B${i + 1}`); // Generate B1 to B200


 const downloadCSV = () => {
   // Define the fields you want in the CSV
   const csvData = filteredData.map(item => ({
     date: moment(item.date).format('YYYY-MM-DD'),
     enrollmentId: item.enrollmentId,
     managerPosition: item.managerId?.position,
     gst: item.gst,
     gstDate: moment(item.gstDate).format('YYYY-MM-DD'),
     launchIn: item.launchIn,
     launchInDate: moment(item.launchInDate).format('YYYY-MM-DD'),
     launchCom: item.launchCom,
     launchComDate: moment(item.launchComDate).format('YYYY-MM-DD'),
     fbaIn: item.fbaIn,
     fbaInDate: moment(item.fbaInDate).format('YYYY-MM-DD'),
     fbaCom: item.fbaCom,
     fbaComDate: moment(item.fbaComDate).format('YYYY-MM-DD'),
   }));


   // Convert JSON data to CSV
   const csv = Papa.unparse(csvData);


   // Create a downloadable link for the CSV
   const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
   const url = URL.createObjectURL(blob);
   const link = document.createElement('a');
   link.href = url;
   link.setAttribute('download', 'user_data.csv');
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
 };


 return (
   <div style={{ padding: '40px' }}>
     <Title level={3} style={{ textAlign: 'center', marginBottom: '30px' }}>
       User Statistics Dashboard
     </Title>
     {loading ? (
       <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />
     ) : (
       <>
         <Row justify="center" gutter={[16, 16]} style={{ marginBottom: '20px' }}>
         <Button type="primary" onClick={downloadCSV} disabled={loading}>
       Download CSV
     </Button>
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
           <Col xs={12} md={6}>
             <Select
               placeholder="Select Batch"
               onChange={handleBatchChange}
               style={{ width: '100%' }}
               allowClear
             >
              {brobatches.map((batch) => (
       <Option key={batch._id} value={batch.batchName}>
         {batch.batchName}
       </Option>
     ))}
             </Select>
           </Col>
           <Col xs={12} md={6}>
             <Row gutter={8}>
               <Col span={12}>
                 <Input
                   placeholder="Min Enrollment ID"
                   onChange={(e) => handleEnrollmentIdChange(e.target.value, enrollmentIdRange.max)}
                 />
               </Col>
               <Col span={12}>
                 <Input
                   placeholder="Max Enrollment ID"
                   onChange={(e) => handleEnrollmentIdChange(enrollmentIdRange.min, e.target.value)}
                 />
               </Col>
             </Row>
           </Col>
           <Col xs={12} md={6}>
             <RangePicker
               onChange={handleDateRangeChange}
               style={{ width: '100%' }}
             />
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
         <Row justify="center" style={{ marginBottom: '20px' }}>
 <Col xs={24}>
   <Card title="User Details" bordered={false} style={{ marginBottom: '20px' }}>
     <UserTable data={filteredData} />
   </Card>
 </Col>
</Row>


       </>
     )}
   </div>
 );
};


export default AmazonAnalytics;



