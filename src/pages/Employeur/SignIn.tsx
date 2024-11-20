import { Typography, Input, Button, Form } from "antd"; // Import Form from antd
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type SignInProps = {
  onLogin: any;
};

const SignIn = ({ onLogin }: SignInProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (values: { username: string; password: string }) => {
    setLoading(true);
    setTimeout(() => {
      if (values.username === "admin" && values.password === "password") {
        localStorage.setItem("isAuthenticated", "true");
        onLogin(); // Notify App component of successful login
        navigate("/"); // Redirect to home
      } else {
        alert("Invalid username or password");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        name="signin"
        onFinish={handleSignIn}
        style={{ width: 300 }}
        layout="vertical"
      >
        <Typography.Title level={3}>Sign In</Typography.Title>
        <FormItem
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input />
        </FormItem>
        <FormItem
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Sign In
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default SignIn;
