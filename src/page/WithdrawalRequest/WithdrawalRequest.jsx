import React, { useState } from 'react';
import { Table, Select, Button, Row, Col, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

// Sample data for the table
const data = [
    {
        key: '1',
        providerName: 'Imran Khan',
        bankName: 'ABC Bank',
        accountNumber: '123456789',
        withdrawAmount: 5000,
        requestDate: '2025-09-12',
        status: 'Pending',
    },
    {
        key: '2',
        providerName: 'Ali Ahmed',
        bankName: 'XYZ Bank',
        accountNumber: '987654321',
        withdrawAmount: 3000,
        requestDate: '2025-06-12',
        status: 'Completed',
    },
    // More records as needed
];

// Define columns for the table
const columns = [
    {
        title: 'Provider Name',
        dataIndex: 'providerName',
        key: 'providerName',
    },
    {
        title: 'Bank Name',
        dataIndex: 'bankName',
        key: 'bankName',
    },
    {
        title: 'A/C Number',
        dataIndex: 'accountNumber',
        key: 'accountNumber',
    },
    {
        title: 'Withdraw Amount',
        dataIndex: 'withdrawAmount',
        key: 'withdrawAmount',
    },
    {
        title: 'Request Date',
        dataIndex: 'requestDate',
        key: 'requestDate',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <div>
                <Button
                    type="link"
                    icon={<EyeOutlined />}
                    onClick={() => handleShowDetails(record)}
                >
                    Show Details
                </Button>
            </div>
        ),
    },
];

const WithdrawalRequest = () => {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [filteredData, setFilteredData] = useState(data); // Store filtered data
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
    const [modalData, setModalData] = useState(null); // Data to display in the modal

    const handleFilterChange = (value) => {
        setSelectedFilter(value);
        filterData(value);
    };

    const filterData = (filterOption) => {
        const currentDate = moment();
        let filtered;

        switch (filterOption) {
            case '1 Month':
                filtered = data.filter(item => moment(item.requestDate).isAfter(currentDate.subtract(1, 'months')));
                break;
            case '3 Month':
                filtered = data.filter(item => moment(item.requestDate).isAfter(currentDate.subtract(3, 'months')));
                break;
            default:
                filtered = data; // No filtering, show all records
                break;
        }
        setFilteredData(filtered);
    };

    const handleShowDetails = (record) => {
        setModalData(record); // Set selected record data
        setIsModalVisible(true); // Open the modal
    };

    const handleCloseModal = () => {
        setIsModalVisible(false); // Close the modal
        setModalData(null); // Clear modal data
    };

    return (
        <div className='p-5'>
            <div>
                <div className='flex items-center justify-between gap-5'>
                    <h1 className="text-2xl font-semibold mb-4">Withdrawal Requests</h1>

                    {/* Filter by Period */}
                    <div className="mb-4">
                        <h3 className="text-lg">Filter by</h3>
                        <Select
                            value={selectedFilter}
                            onChange={handleFilterChange}
                            style={{ width: '150px' }}
                            placeholder="Select Time Period"
                        >
                            <Option value="All">All</Option>
                            <Option value="1 Month">1 Month</Option>
                            <Option value="3 Month">3 Months</Option>
                        </Select>
                    </div>
                </div>

                <div>
                    {/* Table */}
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        pagination={false}
                        rowKey="key"
                    />
                </div>
            </div>

            {/* Modal for showing details */}
            <Modal
                title="Withdrawal Request Details"
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={null} // Remove footer buttons
            >
                {modalData && (
                    <div>
                        <p><strong>Provider Name:</strong> {modalData.providerName}</p>
                        <p><strong>Bank Name:</strong> {modalData.bankName}</p>
                        <p><strong>A/C Number:</strong> {modalData.accountNumber}</p>
                        <p><strong>Withdraw Amount:</strong> {modalData.withdrawAmount}</p>
                        <p><strong>Request Date:</strong> {modalData.requestDate}</p>
                        <p><strong>Status:</strong> {modalData.status}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default WithdrawalRequest;
