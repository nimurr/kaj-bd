import React, { useState } from 'react';
import { Table, Select, Calendar, Row, Col, Button, Form } from 'antd';
import moment from 'moment';

const { Option } = Select;

// Sample data for the table
const data = [
    {
        key: '1',
        no: 1,
        username: 'John Doe',
        userPhoneNumber: '123-456-7890',
        providerName: 'Imran Khan',
        providerPhoneNumber: '987-654-3210',
        servicesBookingDate: '2025-09-12',
        status: 'Completed',
    },
    {
        key: '2',
        no: 2,
        username: 'Jane Smith',
        userPhoneNumber: '555-666-7777',
        providerName: 'Ali Ahmed',
        providerPhoneNumber: '999-888-7777',
        servicesBookingDate: '2025-09-13',
        status: 'Pending',
    },
    // Add more records as needed
];

const columns = [
    {
        title: 'No',
        dataIndex: 'no',
        key: 'no',
        render: (text) => <span>{text}</span>,
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'User Phone Number',
        dataIndex: 'userPhoneNumber',
        key: 'userPhoneNumber',
    },
    {
        title: 'Provider Name',
        dataIndex: 'providerName',
        key: 'providerName',
    },
    {
        title: 'Provider Phone Number',
        dataIndex: 'providerPhoneNumber',
        key: 'providerPhoneNumber',
    },
    {
        title: 'Services Booking Date',
        dataIndex: 'servicesBookingDate',
        key: 'servicesBookingDate',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
];

const WorkTraker = () => {
    const [selectedMonth, setSelectedMonth] = useState(null); // For storing selected month
    const [selectedStatus, setSelectedStatus] = useState(''); // For storing selected status filter

    // Filter data based on month and status
    const filterData = (data) => {
        return data.filter((item) => {
            const bookingMonth = moment(item.servicesBookingDate).month(); // Get the month (0-indexed)
            const monthMatches = selectedMonth === null || bookingMonth === selectedMonth;
            const statusMatches = selectedStatus ? item.status === selectedStatus : true;
            return monthMatches && statusMatches;
        });
    };

    // Handle month selection from the calendar
    const onMonthChange = (date, dateString) => {
        const month = date ? date.month() : null;
        setSelectedMonth(month);
    };

    // Handle work status filter change
    const onStatusChange = (value) => {
        setSelectedStatus(value);
    };

    return (
        <div className='p-5'>
            <div className='' >
                <div className='flex items-center justify-between w-full' >
                    <h1 className="text-2xl font-semibold mb-4">Work Tracker</h1>

                    {/* Work Status Filter */}
                    <div className="mb-4">
                        <h3 className="text-lg">Work Status</h3>
                        <Select
                            value={selectedStatus}
                            onChange={onStatusChange}
                            style={{ width: '100px' }}
                            placeholder="Select Status"
                        >
                            <Option value="">All</Option>
                            <Option value="Completed">Completed</Option>
                            <Option value="Pending">Pending</Option>
                        </Select>
                    </div>
                </div>

            </div>
            <div >
                {/* Table */}
                <Table
                    columns={columns}
                    dataSource={filterData(data)}
                    pagination={false}
                    rowKey="key"
                />
            </div>
        </div>
    );
};

export default WorkTraker;