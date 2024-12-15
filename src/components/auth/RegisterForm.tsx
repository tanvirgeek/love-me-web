"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase/firebase";
import { GiPadlock } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/lib/schemas/RegisterSchema";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { CreateUserInput } from "@/lib/types";
import DistrictSearch, { District } from "./DistrictSearch";
import { useRouter } from "next/navigation";

// The RegisterForm Component
const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null
  );

  const genders = [
    { key: "Male", label: "Male" },
    { key: "Female", label: "Female" },
  ];

  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
    setValue,
    trigger, // This is used to manually trigger validation
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const router = useRouter();
  const provider = new GoogleAuthProvider();

  // Map of districts to divisions
  const districtToDivision: { [key: string]: string } = {
    Bagerhat: "Khulna",
    Bandarban: "Chattogram",
    Barguna: "Barishal",
    Barishal: "Barishal",
    Bhola: "Barishal",
    Bogra: "Rajshahi",
    Brahmanbaria: "Chattogram",
    Chandpur: "Chattogram",
    "Chapai Nawabganj": "Rajshahi",
    Chattogram: "Chattogram",
    Chuadanga: "Khulna",
    "Cox's Bazar": "Chattogram",
    Cumilla: "Chattogram",
    Dhaka: "Dhaka",
    Dinajpur: "Rangpur",
    Faridpur: "Dhaka",
    Feni: "Chattogram",
    Gaibandha: "Rangpur",
    Gazipur: "Dhaka",
    Gopalganj: "Dhaka",
    Habiganj: "Sylhet",
    Jamalpur: "Mymensingh",
    Jashore: "Khulna",
    Jhalokati: "Barishal",
    Jhenaidah: "Khulna",
    Joypurhat: "Rajshahi",
    Khagrachari: "Chattogram",
    Khulna: "Khulna",
    Kishoreganj: "Dhaka",
    Kurigram: "Rangpur",
    Kushtia: "Khulna",
    Lakshmipur: "Chattogram",
    Lalmonirhat: "Rangpur",
    Madaripur: "Dhaka",
    Magura: "Khulna",
    Manikganj: "Dhaka",
    Meherpur: "Khulna",
    Moulvibazar: "Sylhet",
    Munshiganj: "Dhaka",
    Mymensingh: "Mymensingh",
    Naogaon: "Rajshahi",
    Narail: "Khulna",
    Narayanganj: "Dhaka",
    Narsingdi: "Dhaka",
    Natore: "Rajshahi",
    Netrokona: "Mymensingh",
    Nilphamari: "Rangpur",
    Noakhali: "Chattogram",
    Pabna: "Rajshahi",
    Panchagarh: "Rangpur",
    Patuakhali: "Barishal",
    Pirojpur: "Barishal",
    Rajbari: "Dhaka",
    Rajshahi: "Rajshahi",
    Rangamati: "Chattogram",
    Rangpur: "Rangpur",
    Satkhira: "Khulna",
    Shariatpur: "Dhaka",
    Sherpur: "Mymensingh",
    Sirajganj: "Rajshahi",
    Sunamganj: "Sylhet",
    Sylhet: "Sylhet",
    Tangail: "Dhaka",
    Thakurgaon: "Rangpur",
  };

  // Function to get the division from a district
  function getDivision(districtKey: string): string | undefined {
    return districtToDivision[districtKey];
  }

  const onsubmit = async (data: RegisterSchema) => {
    setErrorMessage(null);
    setMessage(null);

    if (!selectedDistrict) {
      setErrorMessage("Please select a district");
      return;
    }

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
        district: data.district,
        gender: data.gender,
        division: getDivision(data.district) || "",
      });

      const token = await userCredential.user.getIdToken();

      // Send the token to the server and store it in an HTTP-only cookie
      await fetch("/api/set-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      router.push("/dashboard");
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

  async function createUser(
    data: CreateUserInput,
    isGoogleLogin: boolean = false
  ) {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!isGoogleLogin) {
      if (!response.ok) {
        throw new Error(responseData.error);
      }
    }

    return responseData;
  }

  const handleGoogleSignUP = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      // await sendEmailVerification(user);
      await createUser(
        {
          firebaseUserId: user.uid,
          name: user.displayName || "",
          email: user.email || "",
          district: "-",
          gender: "-",
          division: "-",
        },
        true
      );
      console.log("Google Login Success");
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

  // Trigger validation when the selected district changes
  useEffect(() => {
    if (selectedDistrict) {
      // Manually set the district value in the form
      setValue("district", selectedDistrict.label);

      // Trigger validation for the district field
      trigger("district");
    }
  }, [selectedDistrict, setValue, trigger]);

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
          <div className="space-y-4 grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              {/* District Search with validation */}
              <DistrictSearch
                onSelect={(district) => {
                  setSelectedDistrict(district); // Set selected district
                }}
              />
              {errors.district && (
                <p className="text-red-500">{errors.district.message}</p>
              )}

              {/* Gender Select with validation */}
              <Select
                className="max-w-xs"
                label="Your Gender"
                placeholder="Gender"
                {...register("gender")}
                isInvalid={!!errors.gender}
                aria-invalid={!!errors.gender}
              >
                {genders.map((gender) => (
                  <SelectItem key={gender.key} value={gender.key}>
                    {gender.label}
                  </SelectItem>
                ))}
              </Select>
              {errors.gender && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {/* Name Input */}
              <Input
                defaultValue=""
                label="Name"
                variant="bordered"
                placeholder="Enter your name"
                {...register("name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message as string}
              />

              {/* Email Input */}
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

              {/* Submit Button */}
              <Button
                fullWidth
                type="submit"
                color="primary"
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
              <Button color="primary" onPress={handleGoogleSignUP}>
                Sign Up with Google
              </Button>
            </div>
          </div>
        </form>
      </CardBody>
      {/* Error or Success Message */}
      {message && <p className="text-green-500 px-4 py-2">{message}</p>}
      {errorMessage && <p className="text-red-500 px-4 py-2">{errorMessage}</p>}
    </Card>
  );
};

export default RegisterForm;
