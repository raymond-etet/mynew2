import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post("/api/auth?action=login", values);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("expiresAt", response.data.expiresAt);

      message.success("Login successful");
      router.push("/user");
    } catch (error) {
      message.error("Login failed. Please check your username and password.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
