import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React from "react";
import { GiPadlock } from "react-icons/gi";

const LoginForm = () => {
  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center gap-3">
          <GiPadlock size={30} />
          <h1 className="text-3xl font-semibold">Login</h1>
        </div>
        <p className="text-neutral-500">Welcome back to Love Me</p>
      </CardHeader>
      <CardBody>
        <form>
          <div className="space-y-4">
            <Input
              defaultValue=""
              label="Email"
              variant="bordered"
              type="email"
              placeholder="Enter your email"
            />
            <Input
              defaultValue=""
              label="Password"
              type="password"
              variant="bordered"
              placeholder="Enter your password"
            />
            <Button fullWidth type="submit" className="bg-pink-400">
              Login
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default LoginForm;
