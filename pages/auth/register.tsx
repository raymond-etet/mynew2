import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post("/api/auth?action=register", values);
      message.success(response.data.message);
      router.push("/auth/login");
    } catch (error) {
      message.error("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <Form onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
