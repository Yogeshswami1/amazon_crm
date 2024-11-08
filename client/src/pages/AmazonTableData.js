import React, { useState } from 'react';
import { Table, Radio, Input, Select, Tag } from 'antd';
import moment from 'moment';

const { Search } = Input;
const { Option } = Select;

const AmazonTable = ({ data, tlList = [] }) => {
  const [selectedOption, setSelectedOption] = useState('option1');
  const [searchText, setSearchText] = useState('');
  const [selectedTL, setSelectedTL] = useState('');

  // Function to format date
  const formatDate = (text) => (text ? moment(text).format('DD-MM-YYYY') : 'Unknown');

  // Status tag logic for showing "Done" or "Not Done"
  const getStatusTag = (status) => {
    if (status === 'Done' || status === 'Completed') {
      return <Tag color="green">Done</Tag>;
    } else {
      return <Tag color="red">{status ? "Not Done" : "No Status"}</Tag>;
    }
  };
  

  // Columns for Stage 1
  const columnsOption1 = [
    { title: "Date", dataIndex: "date", key: "date", render: formatDate },
    { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId" },
    { title: "OVC", dataIndex: "ovc", key: "ovc", render: getStatusTag },
    { title: "Legality", dataIndex: "legality", key: "legality", render: getStatusTag },
    { title: "ID Card", dataIndex: "idCard", key: "idCard", render: getStatusTag },
    { title: "Training", dataIndex: "training", key: "training", render: getStatusTag },
    { title: "Ebook", dataIndex: "ebook", key: "ebook", render: getStatusTag },
    { title: "Support Portal", dataIndex: "supportPortal", key: "supportPortal", render: getStatusTag },
    { title: "Wallet Portal", dataIndex: "walletPortal", key: "walletPortal", render: getStatusTag },
    { title: "Gallery", dataIndex: "gallery", key: "gallery", render: getStatusTag },
    { title: "Stage 1 Completed", dataIndex: "stage1Completion", key: "stage1Completion", render: getStatusTag },
    { title: "Remarks", dataIndex: "remarks", key: "remarks" }
  ];

  // Columns for Stage 2
  const columnsOption2 = [
    { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId" },
    { title: "State", dataIndex: "state", key: "state" },
    { title: "GST", dataIndex: "gst", key: "gst", render: getStatusTag },
    { title: "Brand Name", dataIndex: "brandName", key: "brandName" },
    { title: "Account Open IN", dataIndex: "accountOpenIn", key: "accountOpenIn" },
    // { title: "ID & PASS", dataIndex: "idPass", key: "idPass", render: getStatusTag },
    {
      title: "ID & PASS",
      dataIndex: "idAndPassIn", // Point to the field that contains id and pass
      key: "idPass",
      render: (idAndPassIn) => {
        if (!idAndPassIn) {
          return 'N/A'; // If no data is present
        }
        return (
          <>
            <div><strong>ID:</strong> {idAndPassIn.id}</div>
            <div><strong>Pass:</strong> {idAndPassIn.pass}</div>
          </>
        );
      }
    },    
    // { title: "ID and Pass In", dataIndex: "idAndPassIn", key: "idAndPassIn" },

    { title: "GTIN", dataIndex: "gtin", key: "gtin", render: getStatusTag },
    {
      title: "Listings",
      dataIndex: "listingsIn",  // Point to the correct field from the API response
      key: "listings",
      render: (listingsIn) => {
        return listingsIn ? listingsIn : 'N/A'; // If listingsIn has a value, show it; otherwise, show 'N/A'
      }
    },
        { title: "Launch", dataIndex: "launchIn", key: "launch", render: getStatusTag },
    { title: "Add Region", dataIndex: "addRegion", key: "addRegion", render: getStatusTag },
    {
      title: "Shipping",
      dataIndex: "shipping",  // Use the correct field from your API response
      key: "shipping",
      render: (shipping) => {
        return shipping ? shipping : 'N/A';  // If shipping has a value, show it; otherwise, display 'N/A'
      }
    },
        { title: "FBA", dataIndex: "fbaIn", key: "fba", render: getStatusTag },
    { title: "CVC", dataIndex: "cvcIn", key: "cvc", render: getStatusTag },
    { title: "Stage Completed", dataIndex: "stage2Completion", key: "stage2Completion", render: getStatusTag }
  ];

  // Columns for Stage 3
  const columnsOption3 = [
    { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId" },
    { title: "Document Status", dataIndex: "document", key: "documentStatus", render: getStatusTag },
    { title: "Store Name", dataIndex: "storeName", key: "storeName" },
    { title: "Account Open", dataIndex: "accountOpenCom", key: "accountOpen" },
    // { title: "ID & PASS", dataIndex: "idPass", key: "idPass", render: getStatusTag },
    {
      title: "ID & PASS",
      dataIndex: "idAndPassIn", // Point to the field that contains id and pass
      key: "idPass",
      render: (idAndPassIn) => {
        if (!idAndPassIn) {
          return 'N/A'; // If no data is present
        }
        return (
          <>
            <div><strong>ID:</strong> {idAndPassIn.id}</div>
            <div><strong>Pass:</strong> {idAndPassIn.pass}</div>
          </>
        );
      }
    },    
    { title: "Video KYC", dataIndex: "videoKyc", key: "videoKyc", render: getStatusTag },
    { title: "1$ Deduct", dataIndex: "deduct", key: "deduct1", render: getStatusTag },
    {
      title: "Listings",
      dataIndex: "listingsIn",  // Point to the correct field from the API response
      key: "listings",
      render: (listingsIn) => {
        return listingsIn ? listingsIn : 'N/A'; // If listingsIn has a value, show it; otherwise, show 'N/A'
      }
    },    
    { title: "Launch", dataIndex: "launchCom", key: "launchCom", render: getStatusTag },
    { title: "NIA", dataIndex: "nia", key: "nia", render: getStatusTag },
    { title: "50$ Add Credit", dataIndex: "addCredit", key: "addCredit50", render: getStatusTag },
    { title: "Ad Zone", dataIndex: "adzone", key: "adZone", render: getStatusTag },
    { title: "FBA", dataIndex: "fbaCom", key: "fba", render: getStatusTag },
    { title: "Stage Completed", dataIndex: "stage3Completion", key: "stage3Completion", render: getStatusTag }

  ];

  const getColumns = () => {
    switch (selectedOption) {
      case 'option2':
        return columnsOption2;
      case 'option3':
        return columnsOption3;
      default:
        return columnsOption1;
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleTLChange = (value) => {
    setSelectedTL(value);
  };

  // Filter data by TL and search text
  const filteredData = data
    .filter((item) => {
      return (
        (!selectedTL || item.teamLead === selectedTL) &&
        item.enrollmentId.toLowerCase().includes(searchText.toLowerCase())
      );
    });

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        {/* <Select
          placeholder="Select Team Lead"
          style={{ width: 200, marginRight: 16 }}
          onChange={handleTLChange}
          allowClear
        >
          {tlList.length > 0 ? (
            tlList.map((tl) => (
              <Option key={tl} value={tl}>
                {tl}
              </Option>
            ))
          ) : (
            <Option disabled>No Team Leads Available</Option>
          )}
        </Select> */}
        <Radio.Group
          onChange={(e) => setSelectedOption(e.target.value)}
          value={selectedOption}
          style={{ marginRight: 16 }}
        >
          <Radio.Button value="option1">Stage 1</Radio.Button>
          <Radio.Button value="option2">Stage 2</Radio.Button>
          <Radio.Button value="option3">Stage 3</Radio.Button>
        </Radio.Group>
        <Search
          placeholder="Search by Enrollment ID"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
        />
      </div>
      <Table
        columns={getColumns()}
        dataSource={filteredData}
        rowKey="_id"
      />
    </div>
  );
};

export default AmazonTable;





// import React, { useState } from 'react';
// import { Table, Radio, Input ,Button,Tag} from 'antd';
// import moment from 'moment';


// const { Search } = Input;


// const AmazonTableData = ({ data }) => {
// const [selectedOption, setSelectedOption] = useState('option1');
// const [searchText, setSearchText] = useState('');


// const extractStoreNameAndFormatDate = (text) => {
//  if (!text) return "Unknown";
//  const parts = text.split(" (updated on ");
//  const storeName = parts[0];
//  const date = parts[1]?.slice(0, -1); // Remove the closing parenthesis
//  if (date) {
//    const formattedDate = new Date(date).toLocaleDateString("en-GB");
//    return `${storeName} (${formattedDate})`;
//  }
//  return storeName;
// };

// const combineSocialMediaStatus = (record) => {
//   // Collect all relevant fields
//   const statuses = [record.socialMedia, record.socialMedia1, record.socialMedia2];
  
//   // Check for status in the order of priority
//   if (statuses.includes('Not Done')) {
//     return 'Not Done';
//   }
//   if (statuses.includes('Done') || statuses.includes('Completed')) {
//     return 'Done';
//   }
//   return 'N/A'; // Default status
// };




// const columnsOption1 = [
//   { 
//     title: "Date", 
//     dataIndex: "date", 
//     key: "date", 
//     render: (text) => moment(text).format("DD-MM-YYYY") 
//   },
//   { 
//     title: "Enrollment ID", 
//     dataIndex: "enrollmentId", 
//     key: "enrollmentId" 
//   },
//   { 
//     title: "Stage 1 Payment", 
//     key: "payment.stage1.status", 
//     render: (record) => getStatusTag(record?.payment?.stage1?.status) // Apply getStatusTag here
//   },
//   { 
//     title: "Legality", 
//     dataIndex: "legality", 
//     key: "legality", 
//     render: (text) => getStatusTag(text) // Apply getStatusTag here
//   },
//   { 
//     title: "OVC", 
//     dataIndex: "ovc", 
//     key: "ovc", 
//     render: (text) => getStatusTag(text) // Apply getStatusTag here
//   },
//   { 
//     title: "ID Card", 
//     dataIndex: "idCard", 
//     key: "idCard", 
//     render: (text) => getStatusTag(text) // Apply getStatusTag here
//   },
//   { 
//     title: "Theme", 
//     dataIndex: "theme", 
//     key: "theme", 
//     render: (text) => text || "N/A" 
//   },
//   { 
//     title: "Stage 1 Completion", 
//     dataIndex: "stage1Completion", 
//     key: "stage1Completion", 
//     render: (text) => getStatusTag(text) // Apply getStatusTag here
//   }
// ];



// const getStatusTag = (status) => {
//   if (status === 'Done' || status === 'Completed') {
//     return <Tag color="green">Done</Tag>;
//   } else {
//     return <Tag color="red">Not Done</Tag>;
//   }
// };









// const columnsOption2 = [
//   { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId" },
//   { 
//     title: "Stage 2 Payment", 
//     key: "payment.stage2.status", 
//     render: (text, record) => getStatusTag(record?.payment?.stage2?.status) // Apply getStatusTag here
//   }, {
//     title: "Cat File",
//     dataIndex: "catFile",
//     key: "catFile",
//     render: (text, record) => getStatusTag(record.catFile) // Show "Done" or "Not Done"
//   },
//   {
//     title: "Product File",
//     dataIndex: "productFile",
//     key: "productFile",
//     render: (text, record) => getStatusTag(record.productFile) // Show "Done" or "Not Done"
//   },
//   {
//     title: "Logo",
//     dataIndex: "logo",
//     key: "logo",
//     render: (text, record) => getStatusTag(record.logo) // Show "Done" or "Not Done"
//   },
//   {
//     title: "Banner",
//     dataIndex: "banner",
//     key: "banner",
//     render: (text, record) => getStatusTag(record.banner) // Show "Done" or "Not Done"
//   },
//   {
//     title: "Social Media Content",
//     dataIndex: "socialMedia1",
//     key: "socialMedia1",
//     render: (text, record) => getStatusTag(record.socialMedia1) // Apply getStatusTag here
//   },
//   {
//     title: "Gallery",
//     dataIndex: "gallery",
//     key: "gallery",
//     render: (text, record) => getStatusTag(record.gallery) // Show "Done" or "Not Done"
//   },
//   {
//     title: "Stage 2 Completion",
//     dataIndex: "stage2Completion",
//     key: "stage2Completion",
//     render: (text, record) => getStatusTag(record.stage2Completion) // Show "Done" or "Not Done"
//   },
// ];



// const getStatus = (data) => {
//   // Check ID and Pass Website status
//   const idAndPassStatus = data.idAndPassWebsite?.id && data.idAndPassWebsite?.pass ? 'Done' : 'Not Done';
  
//   // Check Payment Gateway status
//   const paymentGatewayStatus = data.paymentGateway ? 'Done' : 'Not Done';
  
//   // Return combined status as a string or use a more complex logic if needed
//   return `ID & Pass: ${idAndPassStatus}, Payment Gateway: ${paymentGatewayStatus}`;
// };


// const columnsOption3 = [
//   { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId" },
//   { 
//     title: "Stage 3 Payment", 
//     key: "payment.stage3.status", 
//     render: (text, record) => getStatusTag(record?.payment?.stage3?.status) // Apply getStatusTag here
//   },
  
//   // Use extractStoreNameAndFormatDate for date fields
//   { 
//     title: "Server Purchase", 
//     dataIndex: "serverPurchase", 
//     key: "serverPurchase", 
//     render: (text) => getStatusTag(text) 
//   },
  
//   // Use getStatusTag for status fields
//   { 
//     title: "Domain Claim", 
//     dataIndex: "domainClaim", 
//     key: "domainClaim", 
//     render: (text) => getStatusTag(text) // Apply getStatusTag here
//   },
  
//   { 
//     title: "Domain Mail Verification", 
//     dataIndex: "domainMailVerification", 
//     key: "domainMailVerification", 
//     render: (text) => getStatusTag(text) 
//   },
  
//   { 
//     title: "Website Uploaded", 
//     dataIndex: "websiteUploaded", 
//     key: "websiteUploaded", 
//     render: (text) => getStatusTag(text) 
//   },
  
//   {
//     title: "ID & Pass Website",
//     dataIndex: "idAndPassWebsite",
//     key: "idAndPassWebsite",
//     render: (text, record) => (
//       <div>
//         {record.idAndPassWebsite?.id ? (
//           <div>
//             <p><strong>ID:</strong> {record.idAndPassWebsite.id}</p>
//             <p><strong>Pass:</strong> {record.idAndPassWebsite.pass}</p>
//           </div>
//         ) : (
//           <span>No ID & Pass Set</span>
//         )}
//       </div>
//     ),
//   },

//   {
//     title: "Social Media Content",
//     key: 'socialMediaContent',
//     render: (text, record) => {
//       console.log("Record data:", record); // Debugging line
//       return getStatusTag(combineSocialMediaStatus(record)); // Apply getStatusTag here
//     }
//   },
  
//   {
//     title: "Payment Gateway",
//     dataIndex: "paymentGateway",
//     key: "paymentGateway",
//     render: (text, record) => {
//       // Determine the status based on the presence of paymentGateway data
//       const status = record.paymentGateway ? 'Done' : 'Not Done';
//       return getStatusTag(status); // Use getStatusTag for consistent styling
//     },
//   },
  
//   { 
//     title: "Ready to Handover", 
//     dataIndex: "readyToHandover", 
//     key: "readyToHandover", 
//     render: (text) => getStatusTag(text) 
//   },
  
//   { 
//     title: "Stage 3 Completion", 
//     dataIndex: "stage3Completion", 
//     key: "stage3Completion", 
//     render: (text) => getStatusTag(text) 
//   },
// ];

// const getColumns = () => {
//   switch (selectedOption) {
//     case 'option2':
//       return columnsOption2;
//     case 'option3':
//       return columnsOption3;
//     default:
//       return columnsOption1;
//   }
// };








// const handleSearch = (value) => {
//   setSearchText(value);
// };








// const filteredData = data.filter(item =>
//   item.enrollmentId.toLowerCase().includes(searchText.toLowerCase())
// );








// return (
//   <div>
//     <Radio.Group
//       onChange={(e) => setSelectedOption(e.target.value)}
//       value={selectedOption}
//       style={{ marginBottom: 16 }}
//     >
//       <Radio.Button value="option1">Stage 1</Radio.Button>
//       <Radio.Button value="option2">Stage 2</Radio.Button>
//       <Radio.Button value="option3">Stage 3</Radio.Button>
//     </Radio.Group>
//     <Search
//       placeholder="Search by Enrollment ID"
//       onSearch={handleSearch}
//       onChange={e => handleSearch(e.target.value)}
//       style={{ marginBottom: 16, width: 300 }}
//     />
//     <Table
//       columns={getColumns()}
//       dataSource={filteredData}
//       rowKey="_id"
//       // pagination={{ pageSize: 10 }}
//     />
//   </div>
// );
// };








// export default AmazonTableData;

   





