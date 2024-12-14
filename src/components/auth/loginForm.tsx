"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { GiPadlock } from "react-icons/gi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "@/lib/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetEmail, setResetEmail] = useState<string>("");
  const [resetSent, setResetSent] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false); // Control modal visibility
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] =
    React.useState<ModalProps["scrollBehavior"]>("inside");

  // Trigger onChange after 1-second delay on view appear
  useEffect(() => {
    const triggerAutofillChange = () => {
      const emailField = document.querySelector<HTMLInputElement>(
        "input[name='email']"
      );
      const passwordField = document.querySelector<HTMLInputElement>(
        "input[name='password']"
      );

      if (emailField) {
        const event = new Event("input", { bubbles: true });
        emailField.dispatchEvent(event);
      }

      if (passwordField) {
        const event = new Event("input", { bubbles: true });
        passwordField.dispatchEvent(event);
      }
    };

    const timeout = setTimeout(triggerAutofillChange, 1000);

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, []);

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Login Success");

      const token = await result.user.getIdToken();

      // Send the token to the server and store it in an HTTP-only cookie
      await fetch("/api/set-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  // Handle Email/Password Login
  const handleLogin = async (data: LoginSchema) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const token = await userCredential.user.getIdToken();

      // Send the token to the server and store it in an HTTP-only cookie
      await fetch("/api/set-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      router.replace("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  const onsubmit = (data: LoginSchema) => {
    handleLogin(data);
  };

  const handleForgotPassword = async () => {
    setErrorMessage(null);
    if (!resetEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSent(true);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

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
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="space-y-4">
            {/* Email Field */}
            <Input
              label="Email"
              variant="bordered"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message as string}
            />
            {/* Password Field */}
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"} // Toggle input type
                variant="bordered"
                placeholder="Enter your password"
                {...register("password")}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message as string}
              />
              {/* Eye Icon to Toggle Password Visibility */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-2 text-gray-500"
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </button>
            </div>
            <Button
              fullWidth
              type="submit"
              className="bg-pink-400"
              isDisabled={!!errors.email || !!errors.password}
            >
              Login
            </Button>
            <Button
              fullWidth
              variant="flat"
              className="bg-blue-500 text-white"
              onPress={handleGoogleLogin}
            >
              Login with Google
            </Button>

            {/* Forgot Password Link */}
            <div className="text-center mt-4 flex justify-end">
              <Button
                size="sm"
                onClick={onOpen} // Open modal
                className="text-blue-600"
              >
                Forgot Password?
              </Button>
            </div>

            {/* Display error message */}
            {errorMessage && <p color="error">{errorMessage}</p>}
          </div>
        </form>
      </CardBody>

      <Modal
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Reset Password by Email
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Enter your email to reset password"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  variant="bordered"
                  placeholder="Your email"
                />
                {resetSent && (
                  <p color="success" className="mt-2">
                    A password reset email has been sent to your email address.
                  </p>
                )}
                {errorMessage && (
                  <p className="mt-2 text-red-500">{errorMessage}</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleForgotPassword}>
                  Send Reset Password Email
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default LoginForm;
