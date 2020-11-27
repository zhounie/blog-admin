import {
  Table,
  Form,
  Input,
  Button,
  Space,
  Tag,
  Row,
  Col,
  Modal,
  Select,
  message,
  Popconfirm,
  DatePicker,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState, useRef } from "react";
import { getBlogList, addBlog, deleteBlog, showBlog } from "../../api/index";
const { Option } = Select;

export default function Book(props) {
  console.log(props);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [searchParams, setSearchParams] = useState({});
  const formRef = useRef();
  useEffect(() => {
    onGetList();
  }, [searchParams]);
  const [form] = Form.useForm();
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Tag",
      dataIndex: "tags",
      render: (tags) => {
        tags = tags.split(",");
        {
          return tags.map((tag) => (
            <Tag color="geekblue" key={tag}>
              {tag.toUpperCase()}
            </Tag>
          ));
        }
      },
    },
    {
      title: "CreateTime",
      dataIndex: "createdAt",
    },
    {
      title: "UpdateTime",
      dataIndex: "updatedAt",
    },
    {
      title: "Action",
      key: "action",
      render: (row) => (
        <Space>
          {row.is_show === 1 ? (
            <Button onClick={() => onShowBlog(row)} success="true">
              已发布
            </Button>
          ) : (
            <Button onClick={() => onShowBlog(row)} success="true">
              未发布
            </Button>
          )}
          <Button success="true" onClick={() => onEditArticle(row)}>
            edit article
          </Button>
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
      ),
    },
  ];
  const onShowBlog = (row) => {
    showBlog({
      id: row.id,
      isShow: row.is_show === 1 ? 0 : 1,
    }).then((res) => {
      if (res.code === 200) {
        onGetList();
      }
    });
  };
  const onGetList = () => {
    getBlogList(searchParams).then((res) => {
      if (res.code === 200) {
        setData(res.data);
      }
    });
  };
  const onFinish = (values) => {
    let params = values;
    if (params.createTime) {
      params.createTime = params.createTime.format();
    }
    setSearchParams(params);
  };
  const onReset = () => {
    form.resetFields();
  };
  const onAdd = () => {
    setVisible(true);
  };
  const onConfirm = () => {
    formRef.current.submit();
  };
  const onAddFinish = (values) => {
    const params = values;
    params.tags = values.tags.join(",");
    addBlog(params).then((res) => {
      if (res.code === 200) {
        message.success("添加成功");
        setVisible(false);
      } else {
        message.error(res.msg);
      }
    });
  };
  const onAddFinishFailed = () => {
    console.log("err");
  };
  const onCancel = () => {
    setVisible(false);
  };

  const onDelete = (row) => {
    deleteBlog({
      id: row.id,
    }).then((res) => {
      if (res.code === 200) {
        message.success("删除成功");
        onGetList();
      } else {
        message.error(res.msg);
      }
    });
  };
  const onEditArticle = (row) => {
    console.log(props);
    props.history.push({
      pathname: `/addBlog/${row.id}`,
    });
  };
  return (
    <>
      <Row justify="space-between">
        <Col span={20}>
          <Form
            form={form}
            layout="inline"
            onFinish={onFinish}
            style={{ paddingBottom: "24px" }}
          >
            <Form.Item label="Title" name="title">
              <Input placeholder="请输入"></Input>
            </Form.Item>
            <Form.Item label="createTime" name="createTime">
              <DatePicker />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                >
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

      <Modal title="Add" visible={visible} onOk={onConfirm} onCancel={onCancel}>
        <Form
          ref={formRef}
          onFinish={onAddFinish}
          onFinishFailed={onAddFinishFailed}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "请输入title" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Tags"
            name="tags"
            rules={[{ required: true, message: "请输入title" }]}
          >
            <Select
              mode="tags"
              placeholder="Please select"
              style={{ width: "100%" }}
            >
              <Option key="vue">vue</Option>
              <Option key="react">react</Option>
              <Option key="javascript">javascript</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
