import React, { useState } from 'react';
import { Modal, Button, Input, Form, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AllServices = () => {
    const [services, setServices] = useState([{ id: 1, name: 'AC-Repair', image: null }]); // Sample service with image
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentService, setCurrentService] = useState(null); // To track which service is being edited
    const [formAdd] = Form.useForm(); // AntD form for Add modal
    const [formEdit] = Form.useForm(); // AntD form for Edit modal

    const openAddModal = () => {
        setIsAddModalOpen(true);
        formAdd.resetFields(); // Reset form for Add modal
    };

    const openEditModal = (service) => {
        setCurrentService(service);
        setIsEditModalOpen(true);
        formEdit.setFieldsValue({ serviceName: service.name }); // Pre-fill service name in Edit modal
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentService(null);
    };

    const handleAddService = (values) => {
        const newService = {
            id: services.length + 1,
            name: values.serviceName,
            image: values.image ? values.image.file.originFileObj : null, // Store image file
        };
        setServices([...services, newService]);
        closeAddModal();
    };

    const handleEditService = (values) => {
        const updatedService = {
            id: currentService.id,
            name: values.serviceName,
            image: values.image ? values.image.file.originFileObj : currentService.image, // Update image if new
        };
        setServices(services.map(service => (service.id === currentService.id ? updatedService : service)));
        closeEditModal();
    };

    const handleDeleteService = (id) => {
        setServices(services.filter(service => service.id !== id));
    };

    return (
        <div className='p-5'>
            <div className="flex justify-between items-center mb-4 ">
                <h1 className="text-2xl font-semibold">All Services</h1>
                <button type="primary" onClick={openAddModal} className="bg-[#778beb]  text-white px-8 !py-2 rounded">
                    Add Service
                </button>
            </div>

            <div className="space-y-4 grid lg:grid-cols-4 sm:grid-cols-2 gap-10">
                {services.map(service => (
                    <div key={service.id} className=" p-4 border-2 border-[#778beb] rounded-lg">
                        <div className="">
                            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center">
                                <span className="text-[#778beb]">{service.name.charAt(0)}</span> {/* Display first letter of service */}
                            </div>
                        </div>
                        <span className="text-2xl font-semibold block my-5 border-b border-dashed">{service.name}</span>
                        <div className="flex gap-4">
                            <Button type="default" onClick={() => openEditModal(service)} className="bg-[#778beb] text-white px-4 py-2 rounded">
                                Edit
                            </Button>
                            <Button type="danger" onClick={() => handleDeleteService(service.id)} className="border border-[#778beb] text-[#778beb] px-4 py-2 rounded">
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Service Modal */}
            <Modal
                title="Add Service"
                visible={isAddModalOpen}
                onCancel={closeAddModal}
                footer={null}
            >
                <Form form={formAdd} onFinish={handleAddService}>
                    <Form.Item
                        name="serviceName"
                        rules={[{ required: true, message: 'Please input the service name!' }]}
                    >
                        <span>Service Name</span>
                        <Input className='block mt-2' />
                    </Form.Item>

                    <Form.Item
                        name="image"
                        valuePropName="file"
                        getValueFromEvent={(e) => e && e.fileList}
                        rules={[{ required: true, message: 'Please upload an image!' }]}
                    >
                        <span className='block mb-2'>Upload Image</span>
                        <Upload
                            name="image"
                            listType="picture"
                            beforeUpload={() => false} // Prevent automatic upload
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>

                    <div className="flex justify-end gap-4">
                        <Button onClick={closeAddModal}>Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal>

            {/* Edit Service Modal */}
            <Modal
                title="Edit Service"
                visible={isEditModalOpen}
                onCancel={closeEditModal}
                footer={null}
            >
                <Form form={formEdit} onFinish={handleEditService} initialValues={{ serviceName: currentService?.name }}>
                    <Form.Item
                        label="Service Name"
                        name="serviceName"
                        rules={[{ required: true, message: 'Please input the service name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Upload Image"
                        name="image"
                        valuePropName="file"
                        getValueFromEvent={(e) => e && e.fileList}
                    >
                        <Upload
                            name="image"
                            listType="picture"
                            beforeUpload={() => false} // Prevent automatic upload
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>

                    <div className="flex justify-end gap-4">
                        <Button onClick={closeEditModal}>Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default AllServices;