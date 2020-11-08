import {
    Table, Form, Input, Button, Space,
    Tag, Row, Col, Modal, Select, message,
    Popconfirm, DatePicker, Upload, Image } from 'antd'
import { SearchOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState, useRef } from 'react'
import { getBookList, addBook, deleteBook } from '../api/index'

const { Option  } = Select

export default function Book (props) {
    const [data, setData] = useState([])
    const [visible, setVisible] = useState(false)
    const [searchParams, setSearchParams] = useState({})
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const formRef = useRef()
    useEffect(() => {
        onGetList()
    }, [searchParams])
    const [form] = Form.useForm()
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        }, {
            title: 'Author',
            dataIndex: 'author'
        }, {
            title: 'Img',
            dataIndex: 'img',
            render: (row) => (
                <Image width={100} src={row} fallback="data:image/png;base64,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"></Image>
            )
        }, {
            title: 'CreateTime',
            dataIndex: 'createdAt'
        }, {
            title: 'UpdateTime',
            dataIndex: 'updatedAt'
        }, {
            title: 'Action',
            key: 'action',
            render: (row) => (
                <Space>
                    <Popconfirm
                        placement="topRight"
                        title="delete"
                        onConfirm={() => onDelete(row)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>delete</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]
    const onGetList = () => {
        getBookList(searchParams).then(res => {
            if (res.code === 200) {
                setData(res.data)
            }
        })
    }
    const onFinish = (values) => {
        let params = values
        if (params.createTime) {
            params.createTime = params.createTime.format()
        }
        setSearchParams(params)
    }
    const onReset = () => {
        form.resetFields()
    }
    const onAdd = () => {
        setVisible(true)
    }
    const onConfirm = () => {
        formRef.current.submit()
    }
    const onAddFinish = (values) => {
        console.log(values);
        const params = values
        params.img = imageUrl
        console.log(params);
        addBook(params).then(res =>{
            if (res.code === 200) {
                message.success('添加成功');
                setVisible(false)
            } else {
                message.error(res.msg);
            }
        })
    }
    const onAddFinishFailed = () => {
        console.log('err');
    }
    const onCancel = () => {
        setVisible(false)
    }

    const onDelete = (row) => {
        deleteBook({
            id: row.id
        }).then(res => {
            if (res.code === 200) {
                message.success('删除成功')
                onGetList()
            } else {
                message.error(res.msg)
            }
        })
    }
    const onEditArticle = (row) => {
        props.history.push({
            pathname: `/addBlog/${row.id}`
        })
    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )
    const beforeUpload = () => {

    }
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            return setLoading(true)
        }
        if (info.file.status === 'done') {
            setLoading(false)
            setImageUrl(info.file.response.data.imgUrl)
        }
    }
    return (
        <>            
            <Row justify="space-between">
                <Col span={20}>
                    <Form form={form} layout="inline" onFinish={onFinish} style={{paddingBottom: '24px'}}>
                        <Form.Item label="Name" name="name">
                            <Input placeholder="请输入"></Input>
                        </Form.Item>
                        <Form.Item label="createTime" name="createTime">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                                    Search
                                </Button>
                                <Button htmlType="submit" onClick={onReset}>
                                    Reset
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={4}>
                    <Space>
                        <Button type="primary" onClick={onAdd}>
                            Add
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Table rowKey="id" columns={columns} dataSource={data}></Table>

            <Modal
                title="Add"
                visible={visible}
                onOk={onConfirm}
                onCancel={onCancel}
            >
                <Form ref={formRef} onFinish={onAddFinish} onFinishFailed={onAddFinishFailed}>
                    <Form.Item label="Name" name="name" rules={
                        [
                            { required: true, message: '请输入Name' }
                        ]
                    }>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="Author" name="author" rules={
                        [
                            { required: true, message: '请输入Author' }
                        ]
                    }>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="Img" name="img" rules={
                        [
                            { required: true, message: '请上传Img' }
                        ]
                    }>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="/api/upload"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {
                                imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton
                            }
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}