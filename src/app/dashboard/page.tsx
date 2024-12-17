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
import { genders } from "@/components/auth/RegisterForm";

const DashboardPage = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null
  );
  const [gender, setGender] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useUserStore();

  useEffect(() => {
    if (user?.district == "-" || user?.gender == "-") {
      onOpen(); // Open the modal when district or gender is falsy
    }
  }, [user, onOpen]); // Include `onOpen` in dependencies for best practice

  const handleSaveDistrictAndGender = () => {};

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
                {errorMessage && (
                  <div className="text-red-700 p-10">{errorMessage}</div>
                )}
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};

export default DashboardPage;
