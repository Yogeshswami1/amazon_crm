
import React, { useState, useEffect } from 'react';
import { Table, Modal, Input, Button, List, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { toast } from "react-toastify";
import AccountOpenModal from './AccountOpenModal';
import AddCreditModal from './AddCreditModal';
import CVCModal from './CVCModal';
import DeductModal from './DeductModal';
import DocumentModal from './DocumentModal';
import FBAModal from './FBAModal';
import IDPASSModal from './IDPASSModal';
import LaunchModal from './LaunchModal';
import ListingsModal from './ListingsModal';
import NIAModal from './NIAModal';
import Stage3CompletionModal from './Stage3CompletionModal';
import StoreModal from './StoreModal';
import VideokycModal from './VideokycModal';
import AdzoneModal from './AdzoneModal';
import './ModalCss.css';


const apiUrl = process.env.REACT_APP_BACKEND_URL;


const Stagecomcomponent = (record) => {
  const [data, setData] = useState([]);
  const [isRemarksModalVisible, setIsRemarksModalVisible] = useState(false);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [remarks, setRemarks] = useState([]);
  const [newRemark, setNewRemark] = useState('');
  const [visibleModal, setVisibleModal] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
 
  const openModal = (modalType, record) => {
    setSelectedRecord(record);
    setVisibleModal(modalType);
  };
 
  const closeModal = () => setVisibleModal(null);


  useEffect(() => {
    fetchData();
  }, []);


    const fetchData = async () => {
    try {
      const managerId = localStorage.getItem("managerId");
      const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
      
      // Process the data
      const processedData = response.data.map((item) => ({
        ...item,
        simpleStatus: {
          document: item.document ? 'Done' : 'Not Done',
          storeName: item.storeName ? 'Done' : 'Not Done',
          accountOpenCom: item.accountOpenCom ? 'Done' : 'Not Done',
          idAndPassCom: item.idAndPassCom ? 'Done' : 'Not Done',
          videoKyc: item.videoKyc ? 'Done' : 'Not Done',
          deduct: item.deduct ? 'Done' : 'Not Done',
          listingsCom: item.listingsCom ? 'Done' : 'Not Done',
          launchCom: item.launchCom ? 'Done' : 'Not Done',
          nia: item.nia ? 'Done' : 'Not Done',
          addCredit: item.addCredit ? 'Done' : 'Not Done',
          adzone: item.adzone ? 'Done' : 'Not Done',
          fbaCom: item.fbaCom ? 'Done' : 'Not Done',
          cvcCom: item.cvcCom ? 'Done' : 'Not Done',
          stage3Completion: item.stage3Completion ? 'Done' : 'Not Done',




        }
      }));
  
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


  // Helper function to check if a date condition is met
const isConditionMet = (baseDate, daysAfter, condition) => {
  if (!baseDate) return false;
  const targetDate = moment(baseDate).add(daysAfter, 'days');
  return moment().isAfter(targetDate) && condition;
};


  const stageColumns = [
    {
      title: "Enrollment ID",
      dataIndex: "enrollmentId",
      key: "enrollmentId",
      fixed: 'left',
      width: 100,
    },
    {
      title: "Document Status",
      dataIndex: ["simpleStatus", "document"],
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.document === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.document === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('document', record)}
        >
          Status
        </Button>
      ),
    },
    {
      title: "Store Name",
      dataIndex: ["simpleStatus", "storeName"],
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.storeName === value,
      render: (text, record) => (
        <Button
        style={{ backgroundColor: record?.storeName ? '#90EE90' : undefined }}  // Light green if selectedTheme has a value
        onClick={() => openModal('storeName', record)}
        >
          Name
        </Button>
      ),
    },
    {
      title: "Account Open",
      dataIndex: ["simpleStatus", "accountOpenCom"],

      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.accountOpenCom === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.accountOpenCom === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('accountOpen', record)}
        >
          Status
        </Button>
      ),
    },
    {
      title: "ID & PASS",
      dataIndex: ["simpleStatus", "idAndPassCom"],
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.idAndPassCom === value,
      render: (text, record) => (
        <Button
          onClick={() => openModal('idAndPassCom', record)}
          style={{
            backgroundColor: record.idAndPassCom?.id ? '#90EE90' : '',  // Green if idAndPassCom.id exists
          }}
        >
          ID & PASS
        </Button>
      ),
    },    
    {
      title: "Video KYC",
      dataIndex: ["simpleStatus", "videoKyc"],
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.videoKyc === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.videoKyc === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('videoKyc', record)}
        >
          SET
        </Button>
      ),
    },
    {
      title: "1$ Deduct",
      dataIndex: ["simpleStatus", "deduct"],
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.deduct === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.deduct === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('deduct', record)}
        >
          Deduct
        </Button>
      ),
    },
    {
      title: "Listings",
      dataIndex: ["simpleStatus", "listingsCom"],
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.listingsCom === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.listingsCom ? '#90EE90' : undefined }}
          onClick={() => openModal('listings', record)}
        >
          Listings
        </Button>
      ),
    },
    {
      title: "Launch",
      dataIndex: ["simpleStatus", "launchCom"],
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.launchCom === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.launchCom === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('launch', record)}
        >
          Launch
        </Button>
      ),
    },
    {
      title: "NIA",
      dataIndex: ["simpleStatus", "nia"],

      dataIndex: "nia",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.nia === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.nia === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('nia', record)}
        >
          Status
        </Button>
      ),
    },
    {
      title: "50$ Add Credit",
      dataIndex: ["simpleStatus", "addCredit"],
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.addCredit === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.addCredit === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('addCredit', record)}
        >
          Status
        </Button>
      ),
    },
    {
      title: "Ads Status",
      dataIndex: ["simpleStatus", "adzone"],

      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.adzone === value,

      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.adzone === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('adzone', record)}
        >
          Status
        </Button>
      ),
    },
    {
      title: "FBA",
      dataIndex: ["simpleStatus", "fbaCom"],
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.fbaCom === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.fbaCom === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('fbaCom', record)}
        >
          FBA
        </Button>
      ),
    },
    {
      title: "CVC",
      dataIndex: ["simpleStatus", "cvcCom"],
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.cvcCom === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.cvcCom === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('cvc', record)}
        >
          CVC
        </Button>
      ),
    },
    {
      title: "Stage Completed",
      dataIndex: ["simpleStatus", "stage3Completion"],

      dataIndex: "stage3Completion",
      filters: [
        { text: 'Done', value: 'Done' },
        { text: 'Not Done', value: 'Not Done' },
      ],
      onFilter: (value, record) => record.simpleStatus.stage3Completion === value,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.stage3Completion === 'Done' ? '#90EE90' : undefined }}
          onClick={() => openModal('stage3Completion', record)}
        >
          Status
        </Button>
      ),
    },
    {
      title: "Remarks",
      key: "remarks",
      render: (text, record) => (
        <Button onClick={() => handleOpenRemarksModal(record)}>Remarks</Button>
      ),
    }
  ];
 

  // Table row class logic
const getRowClassName = (record) => {
  const documentDateCondition = isConditionMet(record.documentDate, 5, !record.accountOpenCom || record.accountOpenCom === 'Not Done');
  const accountOpenDateCondition = isConditionMet(record.accountOpenComDate, 3, (!record.listingsCom || record.listingsCom === 'Not Done') || (!record.nia || record.nia === 'Not Done'));
  const addCreditDateCondition = isConditionMet(record.addCreditDate, 2, !record.adzone || record.adzone === 'Not Done');

  // If any condition is met, return the class for red background
  if (documentDateCondition || accountOpenDateCondition || addCreditDateCondition) {
    return 'row-red';
  }
  return '';
};
 
  return (
    <div>
      <div style={{ maxHeight: '1000px', overflowY: 'auto' }}>
        <Table
          columns={stageColumns}
          dataSource={data}
          rowKey="_id"
          rowClassName={getRowClassName}
          scroll={{ x: 'max-content', y: 601 }}
          sticky
        />
      </div>


      {/* Modals */}


      {visibleModal === 'accountOpen' && (
        <AccountOpenModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}


      {visibleModal === 'addCredit' && (
        <AddCreditModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}


      {visibleModal === 'cvc' && (
        <CVCModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

          {visibleModal === 'deduct' && (
  <DeductModal
    visible={true}
    onCancel={closeModal}
    record={selectedRecord}
    fetchData={fetchData}
  />
)}


      {visibleModal === 'document' && (
        <DocumentModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}


      {visibleModal === 'fbaCom' && (
        <FBAModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

{visibleModal === 'idAndPassCom' && (
        <IDPASSModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

{visibleModal === 'launch' && (
        <LaunchModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

{visibleModal === 'listings' && (
        <ListingsModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

{visibleModal === 'nia' && (
        <NIAModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

{visibleModal === 'stage3Completion' && (
        <Stage3CompletionModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

{visibleModal === 'storeName' && (
        <StoreModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

{visibleModal === 'videoKyc' && (
        <VideokycModal
          visible={true}
          onCancel={closeModal}
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}

{visibleModal === 'adzone' && (
        <AdzoneModal
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


export default Stagecomcomponent;

