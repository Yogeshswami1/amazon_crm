import React, { useEffect, useState } from 'react';
import { Table, Spin, message } from 'antd';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Amazon = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const managerId = localStorage.getItem("managerId");
      
      // Debugging: Log the managerId to see if it's being retrieved correctly
      console.log("Manager ID:", managerId);

      // Check if managerId exists before making the request
      if (!managerId) {
        message.error("Manager ID not found. Please log in.");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
      
      // Assuming the response has data in the expected format
      setUserData(response.data); // Set the data from the API response
      setLoading(false); // Stop loading once the data is fetched
    } catch (error) {
      console.error('Error fetching user data:', error);
      message.error("Failed to fetch user data.");
      setLoading(false); // Stop loading even if there's an error
    }
  };

  // Call fetchData on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Define the table columns
  const columns = [
    {
      title: 'Enrollment Number',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mobile No.',
      dataIndex: 'primaryContact',
      key: 'primaryContact',
    },
    {
      title: 'Email ID',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Legality',
      dataIndex: 'legality',
      key: 'legality',
    },
    {
      title: 'Total Invoice Value',
      dataIndex: 'totalInvoiceValue',
      key: 'totalInvoiceValue',
      render: (value) => `₹${value}`, // Assuming the currency is INR
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString(), // Formatting the date
    },
  ];

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <Table 
          dataSource={userData} // Populating data from API
          columns={columns} 
          rowKey="_id" 
          pagination={{ pageSize: 10 }} 
        />
      )}
    </div>
  );
};

export default Amazon;
