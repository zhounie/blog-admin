import React from "react";

import { Form, Input, Button, Checkbox, Card, message } from "antd";
import "../styles/login.scss";
import { login } from "../api/index";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function Login(props) {
  const onFinish = (values) => {
    console.log(values);
    login(values).then((res) => {
      if (res.code === 200) {
        sessionStorage.setItem("token", res.data.token);
        props.history.push("/blog");
      } else {
        message.error(res.msg);
      }
    });
  };
  const onFinishFailed = () => {};
  return (
    <div className="login">
      <Card
        title="Login"
        bordered={false}
        style={{
          width: "520px",
          position: "absolute",
          left: "70%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
