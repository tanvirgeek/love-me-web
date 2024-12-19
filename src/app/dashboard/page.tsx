"use client";
import { useUserStore } from "@/store/useAuthStore";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import DistrictSearch, { District } from "@/components/auth/DistrictSearch";
import { districtToDivision, genders } from "@/components/auth/RegisterForm";

const DashboardPage = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null
  );
  const [gender, setGender] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (user?.district == "-" || user?.gender == "-") {
      onOpen(); // Open the modal when district or gender is falsy
    } else {
      // Fetch Matches
    }
  }, [user, onOpen]); // Include `onOpen` in dependencies for best practice

  const handleSaveDistrictAndGender = () => {
    if (user?.firebaseUserId && selectedDistrict && gender) {
      updateUser(user.firebaseUserId, {
        district: selectedDistrict?.label,
        gender: gender,
        division: districtToDivision[selectedDistrict?.label],
      });
    }
  };

  async function updateUser(
    firebaseUserId: string,
    updateData: { district: string; gender: string; division: string }
  ) {
    const url = `/api/users/${firebaseUserId}`; // Replace with your actual API route

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Specify JSON content
        },
        body: JSON.stringify(updateData), // Convert the update data to a JSON string
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        return null;
      }

      const result = await response.json();

      setUser(result);

      onClose();

      // Fetch Matches

      return result;
    } catch (error) {
      console.error("An error occurred while updating the user:", error);
    }
  }

  return (
    <div>
      {user?.firebaseUserId || "User is Loading.."}
      <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Need Your Information to show your Matches
                </ModalHeader>
                <ModalBody>
                  <DistrictSearch
                    onSelect={(district) => {
                      setSelectedDistrict(district); // Set selected district
                    }}
                  />

                  {/* Gender Select with validation */}
                  <Select
                    className="max-w-xs pb-28"
                    label="Your Gender"
                    placeholder="Gender"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    {genders.map((gender) => (
                      <SelectItem key={gender.key} value={gender.key}>
                        {gender.label}
                      </SelectItem>
                    ))}
                  </Select>
                </ModalBody>
                <ModalFooter>
                  {errorMessage && (
                    <p className="text-red-700 p-10">{errorMessage}</p>
                  )}
                  <Button
                    color="primary"
                    onPress={() => {
                      if (!gender || !selectedDistrict) {
                        setErrorMessage("Please select both of them!");
                      } else {
                        setErrorMessage(null);
                        handleSaveDistrictAndGender();
                      }
                    }}
                  >
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};

export default DashboardPage;
