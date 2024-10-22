




import React, { useState, useEffect } from 'react';
import { Table, Modal, Input, Button, List, message,Badge,DatePicker ,Select} from 'antd';
import axios from 'axios';
import moment from 'moment';
import { toast } from "react-toastify";
import OvcModal from './OvcModal';
import LegalityModal from './LegalityModal';
import IDCardModal from './IDCardModal';
import TrainingModal from './TrainingModal';
import EbookModal from './EbookModal';
import SupportPortalModal from './SupportPortalModal';
import WalletPortalModal from './WalletPortalModal';
import GalleryModal from './GalleryModal';
import Stage1Completion from './Stage1Completion';
import './ModalCss.css';
const { Option } = Select;





const apiUrl = process.env.REACT_APP_BACKEND_URL;


const Stagecomponent = (record) => {
  const [data, setData] = useState([]);
  const [isRemarksModalVisible, setIsRemarksModalVisible] = useState(false);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [remarks, setRemarks] = useState([]);
  const [newRemark, setNewRemark] = useState('');
  const [visibleModal, setVisibleModal] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [batchFilter, setBatchFilter] = useState(null);
  const [enrollmentIdRange, setEnrollmentIdRange] = useState({ min: '', max: '' });
const [dateRange, setDateRange] = useState([]);


const [batches, setBatches] = useState([]);


  const openModal = (modalType, record) => {
    setSelectedRecord(record);
    setVisibleModal(modalType);
  };
 
  const closeModal = () => setVisibleModal(null);


  useEffect(() => {
    fetchData();
    fetchBatches();


  }, []);


    const fetchData = async () => {
    try {
      const managerId = localStorage.getItem("managerId");
      const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
      
      // Process the data
      // const processedData = response.data.map((item) => ({
      //   ...item,
      //   simpleStatus: {
      //     ovc: item.ovc?.startsWith('Done') ? 'Done' : 'Not Done',
      //     legality: item.legality?.startsWith('Done') ? 'Done' : 'Not Done',
      //     idCard: item.idCard?.startsWith('Done') ? 'Done' : 'Not Done',
      //     training: item.training?.startsWith('Done') ? 'Done' : 'Not Done',
      //     ebook: item.ebook?.startsWith('Done') ? 'Done' : 'Not Done',
      //     supportPortal: item.supportPortal?.startsWith('Done') ? 'Done' : 'Not Done',
      //     walletPortal: item.walletPortal?.startsWith('Done') ? 'Done' : 'Not Done',
      //     gallery: item.gallery?.startsWith('Done') ? 'Done' : 'Not Done',
      //     stage1Completion: item.stage1Completion?.startsWith('Done') ? 'Done' : 'Not Done',
      //   }
      // }));
      const processedData = response.data.map((item) => {
        const status = {
          ovc: item.ovc ? 'Done' : 'Not Done',
          legality: item.legality ? 'Done' : 'Not Done',
          idCard: item.idCard ? 'Done' : 'Not Done',
          training: item.training ? 'Done' : 'Not Done',
          ebook: item.ebook ? 'Done' : 'Not Done',
          supportPortal: item.supportPortal ? 'Done' : 'Not Done',
          walletPortal: item.walletPortal ? 'Done' : 'Not Done',
          gallery: item.gallery ? 'Done' : 'Not Done',
          stage1Completion: item.stage1Completion ? 'Done' : 'Not Done',
          payment1: item.payment1.amount > 0 ? 'Done' : 'Not Done',
          payment2: item.payment2.amount > 0 ? 'Done' : 'Not Done',
          payment3: item.payment3.amount > 0 ? 'Done' : 'Not Done',
          payment4: item.payment4.amount > 0 ? 'Done' : 'Not Done',
        };
      
        return { ...item, simpleStatus: status };
      });
      
      
  
      // Debugging: Log the processed data to see the archive values
      console.log("Processed Data:", processedData);
  
      // Filter out entries where archive is either "false", empty, null, or undefined, and service is AMAZON
      const filteredData = processedData.filter(
        item =>
          (item.archive === "false" || item.archive === "" || item.archive === null || item.archive === undefined) &&
          item.service === "AMAZON"
      );
  
      // Sort the filtered data in descending order by enrollmentId
      const sortedData = filteredData.sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId));
  
      console.log("Filtered & Sorted Data:", sortedData);
  
      setData(sortedData);
    } catch (error) {
      message.error("Failed to fetch data");
    }
  };
  const fetchBatches = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/batches`);
      if (response.status === 200) {
        setBatches(response.data); // Assuming API returns array of batches
      } else {
        throw new Error("Failed to fetch batches");
      }
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };
 
 
 
 


  const handleOpenRemarksModal = (record) => {
    setCurrentRecord(record);
    setRemarks(record.remarks || []);
    setIsRemarksModalVisible(true);
  };


  const handleOpenContactModal = (record) => {
    setCurrentRecord(record);
    setIsContactModalVisible(true);
  };


  const handleCancel = () => {
    setIsRemarksModalVisible(false);
    setIsContactModalVisible(false);
    setCurrentRecord(null);
    setNewRemark('');
  };


  const handleAddRemark = async () => {
    if (!newRemark) {
      toast.error('Remark cannot be empty');
      return;
    }
    try {
      const updatedRemarks = [...remarks, { text: newRemark, date: new Date() }];
      await axios.put(`${apiUrl}/api/contact/remark/${currentRecord._id}`, { remarks: updatedRemarks });
      toast.success("Remark added successfully");
      setRemarks(updatedRemarks);
      setNewRemark('');
      fetchData();
    } catch (error) {
      toast.error("Failed to add remark");
    }
  };


  const handleDeleteRemark = async (remark) => {
    const updatedRemarks = remarks.filter(r => r._id !== remark._id);
    try {
      await axios.put(`${apiUrl}/api/contact/remark/${currentRecord._id}`, { remarks: updatedRemarks });
      toast.success("Remark deleted successfully");
      setRemarks(updatedRemarks);
      fetchData();
    } catch (error) {
      toast.error("Failed to delete remark");
    }
  };


  // Function to determine if a row should be highlighted
const isRowRed = (record) => {
  const stage1CompletionDate = record.date; // Assuming `record.date` contains the date for checking
  const stage1Completion = record.stage1Completion;
  
  // Check if it's been more than 3 days and stage1Completion is Not Done or blank
  if (
    (!stage1Completion || stage1Completion === 'Not Done') && 
    moment().diff(moment(stage1CompletionDate), 'days') > 3
  ) {
    return true;
  }
  return false;
};

  const stageColumns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).format('DD-MM-YYYY'),
    },
    {
      title: "Enrollment ID",
      dataIndex: "enrollmentId",
      key: "enrollmentId",
      fixed: 'left',
      render: (text, record) => (
        <Button type="link" onClick={() => handleOpenContactModal(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: "OVC",
      dataIndex: ["simpleStatus", "ovc"],
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.ovc === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.ovc === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('ovc', record)}
        >
          OVC
        </Button>
      ),
    },
    // {
    //   title: "Legality",
    //   dataIndex: "legality",
    //   filters: [
    //     { text: 'Done', value: 'Done' },
    //     { text: 'Not Done', value: 'Not Done' },
    //   ],
    //   onFilter: (value, record) => record.legality === value,
    //   render: (text, record) => (
    //     <Button
    //       style={{ backgroundColor: record.legality === 'Done' ? '#90EE90' : undefined }}
    //       onClick={() => openModal('legality', record)}
    //     >
    //       Legality
    //     </Button>
    //   ),
    // },
    {
      title: "Legality",
      dataIndex: ["simpleStatus", "legality"],
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.legality === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.simpleStatus.legality === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('legality', record)}
        >
          Legality
        </Button>
      ),
    },
    
    {
      title: "ID Card",
      dataIndex: ["simpleStatus", "idCard"],
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.idCard === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.simpleStatus.idCard === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('idCard', record)}
        >
          ID Card
        </Button>
      ),
    },
    {
      title: "Training",
      dataIndex: ["simpleStatus", "training"],
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.training === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.simpleStatus.training === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('training', record)}
        >
          Training
        </Button>
      ),
    },
    {
      title: "Ebook",
      dataIndex: ["simpleStatus", "ebook"],
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.ebook === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.simpleStatus.ebook === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('ebook', record)}
        >
          Ebook
        </Button>
      ),
    },
    {
      title: "Support Portal",
      dataIndex: ["simpleStatus", "supportPortal"],
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.supportPortal === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.simpleStatus.supportPortal === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('supportPortal', record)}
        >
          Support Portal
        </Button>
      ),
    },
    {
      title: "Wallet Portal",
      dataIndex: ["simpleStatus", "walletPortal"],
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.walletPortal === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.simpleStatus.walletPortal === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('walletPortal', record)}
        >
          Wallet Portal
        </Button>
      ),
    },
    {
      title: "Gallery",
      dataIndex: ["simpleStatus", "gallery"],
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.gallery === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.simpleStatus.gallery === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('gallery', record)}
        >
          Gallery
        </Button>
      ),
    },
    {
      title: "Stage 1 Completed",
      dataIndex: ["simpleStatus", "stage1Completion"],
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.stage1Completion === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.simpleStatus.stage1Completion === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('stage1Completion', record)}
        >
          Status
        </Button>
      ),
    },
    {
      title: "Remarks",
      key: "remarks",
      render: (text, record) => (
        <Badge count={record.remarks.length} offset={[-6, 5]} /* Adjust offset as needed */>
          <Button onClick={() => handleOpenRemarksModal(record)}>Remarks</Button>
        </Badge>
      ),
    }
  ];
 
 
  return (
    <div>
     <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
      {/* Enrollment ID Range Filter */}
 <Input
   placeholder="Min Enrollment ID"
   style={{ width: 200, marginRight: 8 }}
   value={enrollmentIdRange.min}
   onChange={(e) => setEnrollmentIdRange({ ...enrollmentIdRange, min: e.target.value })}
 />
 <Input
   placeholder="Max Enrollment ID"
   style={{ width: 200, marginRight: 8 }}
   value={enrollmentIdRange.max}
   onChange={(e) => setEnrollmentIdRange({ ...enrollmentIdRange, max: e.target.value })}
 />


 {/* Date Range Filter */}
 <DatePicker.RangePicker
     value={dateRange} // Controlled component: value comes from state
     onChange={(dates) => {
       console.log('Selected dates from RangePicker:', dates);
       setDateRange(dates || null); // Reset to null if no dates selected
     }}
     format="YYYY-MM-DD"
     placeholder={['Start Date', 'End Date']} // Placeholder for better UX
   />
     <Select
 placeholder="Select Batch"
 style={{ width: 200, marginBottom: 16 }}
 onChange={(value) => setBatchFilter(value)}
 allowClear
>
{batches.map((batch) => (
       <Option key={batch._id} value={batch.batchName}>
         {batch.batchName}
       </Option>
     ))}
</Select>


<Table
     columns={stageColumns}
     dataSource={data
       .filter((item) => (batchFilter ? item.batch === batchFilter : true))
       .filter((item) =>
         (!enrollmentIdRange.min || item.enrollmentId >= enrollmentIdRange.min) &&
         (!enrollmentIdRange.max || item.enrollmentId <= enrollmentIdRange.max)
       )
       .filter((item) => {
         console.log('Date range in the filter function:', dateRange);


         // Only apply date range filter if both dates are selected
         if (Array.isArray(dateRange) && dateRange.length === 2 && dateRange[0] && dateRange[1]) {
           const itemDate = new Date(item.date); // Convert item date to native Date
           const [startDate, endDate] = dateRange.map((d) => new Date(d.format('YYYY-MM-DD'))); // Convert range to Date


           console.log(
             'Checking item:',
             item.enrollmentId,
             'Item Date:',
             itemDate.toISOString().split('T')[0], // Format for debugging
             'Start Date:',
             startDate.toISOString().split('T')[0],
             'End Date:',
             endDate.toISOString().split('T')[0]
           );


           return itemDate >= startDate && itemDate <= endDate;
         }
         return true; // If no valid date range is selected, return all
       })
     }
     rowKey="_id"
     scroll={{ x: 'max-content', y: 601 }}
     sticky
     rowClassName={(record) => (isRowRed(record) ? 'highlight-row' : '')}
   />


{/* <Table
 columns={stageColumns}
 dataSource={batchFilter ? data.filter(item => item.batch === batchFilter) : data}
 rowKey="_id"
 scroll={{ x: 'max-content', y: 601 }}
 sticky
 rowClassName={(record) => (isRowRed(record) ? 'highlight-row' : '')}
/> */}
     </div>



      {/* Modals */}


      {visibleModal === 'ovc' && (
        <OvcModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}


      {visibleModal === 'legality' && (
        <LegalityModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}


      {visibleModal === 'idCard' && (
        <IDCardModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}
          {visibleModal === 'training' && (
  <TrainingModal
    visible={true}
    onCancel={closeModal}
    record={selectedRecord}
    fetchData={fetchData}
  />
)}


      {visibleModal === 'ebook' && (
        <EbookModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}


      {visibleModal === 'supportPortal' && (
        <SupportPortalModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

{visibleModal === 'walletPortal' && (
        <WalletPortalModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

{visibleModal === 'gallery' && (
        <GalleryModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

{visibleModal === 'stage1Completion' && (
        <Stage1Completion
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}


      {/* Remarks Modal */}
      <Modal
        title="Remarks"
        open={isRemarksModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <List
          dataSource={remarks}
          renderItem={(item) => (
            <List.Item
              actions={[<Button onClick={() => handleDeleteRemark(item)}>Delete</Button>]}
            >
              <List.Item.Meta
                title={moment(item.date).format('DD-MM-YYYY')}
                description={item.text}
              />
            </List.Item>
          )}
        />
        <Input.TextArea
          rows={4}
          value={newRemark}
          onChange={(e) => setNewRemark(e.target.value)}
        />
        <Button type="primary" onClick={handleAddRemark}>Add Remark</Button>
      </Modal>

    </div>
  );
};


export default Stagecomponent;








// import React, { useState, useEffect } from 'react';
// import { Table, Modal, Input, Button, List, message, Select, Badge } from 'antd';
// import axios from 'axios';
// import moment from 'moment';
// import { toast } from "react-toastify";
// import OvcModal from './OvcModal';
// import LegalityModal from './LegalityModal';
// import IDCardModal from './IDCardModal';
// import TrainingModal from './TrainingModal';
// import EbookModal from './EbookModal';
// import SupportPortalModal from './SupportPortalModal';
// import WalletPortalModal from './WalletPortalModal';
// import GalleryModal from './GalleryModal';
// import Stage1Completion from './Stage1Completion';
// import './ModalCss.css';




// const apiUrl = process.env.REACT_APP_BACKEND_URL;




// const Stagecomponent = (record) => {
//  const [data, setData] = useState([]);
//  const [isRemarksModalVisible, setIsRemarksModalVisible] = useState(false);
//  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
//  const [currentRecord, setCurrentRecord] = useState(null);
//  const [remarks, setRemarks] = useState([]);
//  const [newRemark, setNewRemark] = useState('');
//  const [visibleModal, setVisibleModal] = useState(null);
//  const [selectedRecord, setSelectedRecord] = useState(null);


//  const [batchFilter, setBatchFilter] = useState(null);


//  const openModal = (modalType, record) => {
//    setSelectedRecord(record);
//    setVisibleModal(modalType);
//  };
//  const closeModal = () => setVisibleModal(null);




//  useEffect(() => {
//    fetchData();
//  }, []);




//    const fetchData = async () => {
//    try {
//      const managerId = localStorage.getItem("managerId");
//      const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
    
//      // Process the data
//      const processedData = response.data.map((item) => ({
//        ...item,
//        simpleStatus: {
//          ovc: item.ovc?.startsWith('Done') ? 'Done' : 'Not Done',
//          legality: item.legality?.startsWith('Done') ? 'Done' : 'Not Done',
//          idCard: item.idCard?.startsWith('Done') ? 'Done' : 'Not Done',
//          training: item.training?.startsWith('Done') ? 'Done' : 'Not Done',
//          ebook: item.ebook?.startsWith('Done') ? 'Done' : 'Not Done',
//          supportPortal: item.supportPortal?.startsWith('Done') ? 'Done' : 'Not Done',
//          walletPortal: item.walletPortal?.startsWith('Done') ? 'Done' : 'Not Done',
//          gallery: item.gallery?.startsWith('Done') ? 'Done' : 'Not Done',
//          stage1Completion: item.stage1Completion?.startsWith('Done') ? 'Done' : 'Not Done',
//        }
//      }));
//       // Debugging: Log the processed data to see the archive values
//      console.log("Processed Data:", processedData);
//       // Filter out entries where archive is either "false", empty, null, or undefined, and service is AMAZON
//      const filteredData = processedData.filter(
//        item =>
//          (item.archive === "false" || item.archive === "" || item.archive === null || item.archive === undefined) &&
//          item.service === "AMAZON"
//      );
//       // Sort the filtered data in descending order by enrollmentId
//      const sortedData = filteredData.sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId));
//       console.log("Filtered & Sorted Data:", sortedData);
//       setData(sortedData);
//    } catch (error) {
//      message.error("Failed to fetch data");
//    }
//  };




//  const handleOpenRemarksModal = (record) => {
//    setCurrentRecord(record);
//    setRemarks(record.remarks || []);
//    setIsRemarksModalVisible(true);
//  };




//  const handleOpenContactModal = (record) => {
//    setCurrentRecord(record);
//    setIsContactModalVisible(true);
//  };




//  const handleCancel = () => {
//    setIsRemarksModalVisible(false);
//    setIsContactModalVisible(false);
//    setCurrentRecord(null);
//    setNewRemark('');
//  };




//  const handleAddRemark = async () => {
//    if (!newRemark) {
//      toast.error('Remark cannot be empty');
//      return;
//    }
//    try {
//      const updatedRemarks = [...remarks, { text: newRemark, date: new Date() }];
//      await axios.put(`${apiUrl}/api/contact/remark/${currentRecord._id}`, { remarks: updatedRemarks });
//      toast.success("Remark added successfully");
//      setRemarks(updatedRemarks);
//      setNewRemark('');
//      fetchData();
//    } catch (error) {
//      toast.error("Failed to add remark");
//    }
//  };




//  const handleDeleteRemark = async (remark) => {
//    const updatedRemarks = remarks.filter(r => r._id !== remark._id);
//    try {
//      await axios.put(`${apiUrl}/api/contact/remark/${currentRecord._id}`, { remarks: updatedRemarks });
//      toast.success("Remark deleted successfully");
//      setRemarks(updatedRemarks);
//      fetchData();
//    } catch (error) {
//      toast.error("Failed to delete remark");
//    }
//  };




//  // Function to determine if a row should be highlighted
// const isRowRed = (record) => {
//  const stage1CompletionDate = record.date; // Assuming `record.date` contains the date for checking
//  const stage1Completion = record.stage1Completion;
//   // Check if it's been more than 3 days and stage1Completion is Not Done or blank
//  if (
//    (!stage1Completion || stage1Completion === 'Not Done') &&
//    moment().diff(moment(stage1CompletionDate), 'days') > 3
//  ) {
//    return true;
//  }
//  return false;
// };


//  const stageColumns = [
//    {
//      title: "Date",
//      dataIndex: "date",
//      key: "date",
//      render: (text) => moment(text).format('DD-MM-YYYY'),
//    },
//    {
//      title: "Enrollment ID",
//      dataIndex: "enrollmentId",
//      key: "enrollmentId",
//      fixed: 'left',
//      render: (text, record) => (
//        <Button type="link" onClick={() => handleOpenContactModal(record)}>
//          {text}
//        </Button>
//      ),
//    },
//    {
//      title: "Batch",
//      dataIndex: "batch",
//      key: "batch",
//      width: 70,
//    },
//    {
//      title: "OVC",
//      dataIndex: "ovc",
//      filters: [
//        { text: 'Done', value: 'Done' },
//        { text: 'Not Done', value: 'Not Done' },
//      ],
//      onFilter: (value, record) => record.ovc === value,
//      render: (text, record) => (
//        <Button
//          style={{ backgroundColor: record.ovc === 'Done' ? '#90EE90' : undefined }}
//          onClick={() => openModal('ovc', record)}
//        >
//          OVC
//        </Button>
//      ),
//    },
//    {
//      title: "Legality",
//      dataIndex: "legality",
//      filters: [
//        { text: 'Done', value: 'Done' },
//        { text: 'Not Done', value: 'Not Done' },
//      ],
//      onFilter: (value, record) => record.legality === value,
//      render: (text, record) => (
//        <Button
//          style={{ backgroundColor: record.legality === 'Done' ? '#90EE90' : undefined }}
//          onClick={() => openModal('legality', record)}
//        >
//          Legality
//        </Button>
//      ),
//    },
//    {
//      title: "ID Card",
//      dataIndex: "idCard",
//      filters: [
//        { text: 'Done', value: 'Done' },
//        { text: 'Not Done', value: 'Not Done' },
//      ],
//      onFilter: (value, record) => record.idCard === value,
//      render: (text, record) => (
//        <Button
//          style={{ backgroundColor: record.idCard === 'Done' ? '#90EE90' : undefined }}
//          onClick={() => openModal('idCard', record)}
//        >
//          ID Card
//        </Button>
//      ),
//    },
//    {
//      title: "Training",
//      dataIndex: "training",
//      filters: [
//        { text: 'Done', value: 'Done' },
//        { text: 'Not Done', value: 'Not Done' },
//      ],
//      onFilter: (value, record) => record.training === value,
//      render: (text, record) => (
//        <Button
//          style={{ backgroundColor: record.training === 'Done' ? '#90EE90' : undefined }}
//          onClick={() => openModal('training', record)}
//        >
//          Training
//        </Button>
//      ),
//    },
//    {
//      title: "Ebook",
//      dataIndex: "ebook",
//      filters: [
//        { text: 'Done', value: 'Done' },
//        { text: 'Not Done', value: 'Not Done' },
//      ],
//      onFilter: (value, record) => record.ebook === value,
//      render: (text, record) => (
//        <Button
//          style={{ backgroundColor: record.ebook === 'Done' ? '#90EE90' : undefined }}
//          onClick={() => openModal('ebook', record)}
//        >
//          Ebook
//        </Button>
//      ),
//    },
//    {
//      title: "Support Portal",
//      dataIndex: "supportPortal",
//      filters: [
//        { text: 'Done', value: 'Done' },
//        { text: 'Not Done', value: 'Not Done' },
//      ],
//      onFilter: (value, record) => record.supportPortal === value,
//      render: (text, record) => (
//        <Button
//          style={{ backgroundColor: record.supportPortal === 'Done' ? '#90EE90' : undefined }}
//          onClick={() => openModal('supportPortal', record)}
//        >
//          Support Portal
//        </Button>
//      ),
//    },
//    {
//      title: "Wallet Portal",
//      dataIndex: "walletPortal",
//      filters: [
//        { text: 'Done', value: 'Done' },
//        { text: 'Not Done', value: 'Not Done' },
//      ],
//      onFilter: (value, record) => record.walletPortal === value,
//      render: (text, record) => (
//        <Button
//          style={{ backgroundColor: record.walletPortal === 'Done' ? '#90EE90' : undefined }}
//          onClick={() => openModal('walletPortal', record)}
//        >
//          Wallet Portal
//        </Button>
//      ),
//    },
//    {
//      title: "Gallery",
//      dataIndex: "gallery",
//      filters: [
//        { text: 'Done', value: 'Done' },
//        { text: 'Not Done', value: 'Not Done' },
//      ],
//      onFilter: (value, record) => record.gallery === value,
//      render: (text, record) => (
//        <Button
//          style={{ backgroundColor: record.gallery === 'Done' ? '#90EE90' : undefined }}
//          onClick={() => openModal('gallery', record)}
//        >
//          Gallery
//        </Button>
//      ),
//    },
//    {
//      title: "Stage 1 Completed",
//      dataIndex: "stage1Completion",
//      filters: [
//        { text: 'Done', value: 'Done' },
//        { text: 'Not Done', value: 'Not Done' },
//      ],
//      onFilter: (value, record) => record.stage1Completion === value,
//      render: (text, record) => (
//        <Button
//          style={{ backgroundColor: record.stage1Completion === 'Done' ? '#90EE90' : undefined }}
//          onClick={() => openModal('stage1Completion', record)}
//        >
//          Status
//        </Button>
//      ),
//    },
//    // {
//    //   title: "Remarks",
//    //   key: "remarks",
//    //   render: (text, record) => (
//    //     <Button onClick={() => handleOpenRemarksModal(record)}>Remarks</Button>
//    //   ),
//    // }
//   {
//      title: "Remarks",
//      key: "remarks",
//      render: (text, record) => (
//        <Badge count={record.remarks.length} offset={[-6, 5]} /* Adjust offset as needed */>
//          <Button onClick={() => handleOpenRemarksModal(record)}>Remarks</Button>
//        </Badge>
//      ),
//    }


//  ];
//  return (
//    <div>
//      <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
//      <Select
//  placeholder="Select Batch"
//  style={{ width: 200, marginBottom: 16 }}
//  onChange={(value) => setBatchFilter(value)}
//  allowClear
// >
//  {Array.from({ length: 200 }, (_, index) => `B${index + 1}`).map((batch) => (
//    <Select.Option key={batch} value={batch}>
//      {batch}
//    </Select.Option>
//  ))}
// </Select>
// <Table
//  columns={stageColumns}
//  dataSource={batchFilter ? data.filter(item => item.batch === batchFilter) : data}
//  rowKey="_id"
//  scroll={{ x: 'max-content', y: 601 }}
//  sticky
//  rowClassName={(record) => (isRowRed(record) ? 'highlight-row' : '')}
// />
//      </div>




//      {/* Modals */}




//      {visibleModal === 'ovc' && (
//        <OvcModal
//          visible={true}
//          onCancel={closeModal}
//          record={selectedRecord}
//          fetchData={fetchData}
//        />
//      )}




//      {visibleModal === 'legality' && (
//        <LegalityModal
//          visible={true}
//          onCancel={closeModal}
//          record={selectedRecord}
//          fetchData={fetchData}
//        />
//      )}




//      {visibleModal === 'idCard' && (
//        <IDCardModal
//          visible={true}
//          onCancel={closeModal}
//          record={selectedRecord}
//          fetchData={fetchData}
//        />
//      )}
//          {visibleModal === 'training' && (
//  <TrainingModal
//    visible={true}
//    onCancel={closeModal}
//    record={selectedRecord}
//    fetchData={fetchData}
//  />
// )}




//      {visibleModal === 'ebook' && (
//        <EbookModal
//          visible={true}
//          onCancel={closeModal}
//          record={selectedRecord}
//          fetchData={fetchData}
//        />
//      )}




//      {visibleModal === 'supportPortal' && (
//        <SupportPortalModal
//          visible={true}
//          onCancel={closeModal}
//          record={selectedRecord}
//          fetchData={fetchData}
//        />
//      )}


// {visibleModal === 'walletPortal' && (
//        <WalletPortalModal
//          visible={true}
//          onCancel={closeModal}
//          record={selectedRecord}
//          fetchData={fetchData}
//        />
//      )}


// {visibleModal === 'gallery' && (
//        <GalleryModal
//          visible={true}
//          onCancel={closeModal}
//          record={selectedRecord}
//          fetchData={fetchData}
//        />
//      )}


// {visibleModal === 'stage1Completion' && (
//        <Stage1Completion
//          visible={true}
//          onCancel={closeModal}
//          record={selectedRecord}
//          fetchData={fetchData}
//        />
//      )}




//      {/* Remarks Modal */}
//      <Modal
//        title="Remarks"
//        open={isRemarksModalVisible}
//        onCancel={handleCancel}
//        footer={null}
//      >
//        <List
//          dataSource={remarks}
//          renderItem={(item) => (
//            <List.Item
//              actions={[<Button onClick={() => handleDeleteRemark(item)}>Delete</Button>]}
//            >
//              <List.Item.Meta
//                title={moment(item.date).format('DD-MM-YYYY')}
//                description={item.text}
//              />
//            </List.Item>
//          )}
//        />
//        <Input.TextArea
//          rows={4}
//          value={newRemark}
//          onChange={(e) => setNewRemark(e.target.value)}
//        />
//        <Button type="primary" onClick={handleAddRemark}>Add Remark</Button>
//      </Modal>


//    </div>
//  );
// };




// export default Stagecomponent;





