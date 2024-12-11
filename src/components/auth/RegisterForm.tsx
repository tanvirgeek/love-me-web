"use client";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { auth } from "@/lib/firebase/firebase";
import { GiPadlock } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/lib/schemas/RegisterSchema";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { CreateUserInput } from "@/lib/types";

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onsubmit = async (data: RegisterSchema) => {
    setErrorMessage(null);
    setMessage(null);

    if (data.password !== data.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      // await sendEmailVerification(user);
      await createUser({
        firebaseUserId: user.uid,
        name: data.name,
        email: data.email,
      });

      setMessage("Registration successful!");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("email-already-in-use")) {
          setErrorMessage("Email Already Exists");
        } else {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  async function createUser(data: CreateUserInput) {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error);
    }

    return responseData;
  }

  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center gap-3">
          <GiPadlock size={30} />
          <h1 className="text-3xl font-semibold">Register</h1>
        </div>
        <p className="text-neutral-500">Welcome to Love Me</p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="space-y-4">
            <Input
              defaultValue=""
              label="Name"
              variant="bordered"
              placeholder="Enter your name"
              {...register("name")}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message as string}
            />
            <Input
              defaultValue=""
              label="Email"
              variant="bordered"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message as string}
            />

            <div>
              {/* Password Input */}
              <div className="relative mb-4">
                <Input
                  defaultValue=""
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="bordered"
                  placeholder="Enter your password"
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message as string}
                  {...register("password")}
                />
                <Button
                  onPress={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent"
                >
                  {showPassword ? <IoEyeOff size={18} /> : <IoEye size={18} />}
                </Button>
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <Input
                  defaultValue=""
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  variant="bordered"
                  placeholder="Confirm your password"
                  isInvalid={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword?.message as string}
                  {...register("confirmPassword")}
                />
                <Button
                  onPress={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent"
                >
                  {showConfirmPassword ? (
                    <IoEyeOff size={18} />
                  ) : (
                    <IoEye size={18} />
                  )}
                </Button>
              </div>
            </div>

            <Button
              fullWidth
              type="submit"
              className="bg-pink-400"
              isDisabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="loader mr-2"></span>
                  Registering...
                </span>
              ) : (
                "Register"
              )}
            </Button>
          </div>
        </form>
      </CardBody>

      {message && <p className="text-green-500 px-4 py-2">{message}</p>}
      {errorMessage && <p className="text-red-500 px-4 py-2">{errorMessage}</p>}
    </Card>
  );
};

export default RegisterForm;
