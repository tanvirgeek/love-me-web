"use client";

import ProfileUpdateForm from "@/components/ProfileUpdateComponent";
import { useUserStore } from "@/store/useAuthStore";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";

const UserProfile = () => {
  const user = useUserStore((state) => state.user);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (!user) return <div>No User Found...</div>;

  return (
    <div className="profile-page">
      {/* Grid container to hold the 3 columns */}

      <>
        <Button onPress={onOpen}>Update Profile</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Update Profile
                </ModalHeader>
                <ModalBody>
                  <ProfileUpdateForm />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <h4>Basic Information</h4>
          </CardHeader>
          <CardBody>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Gender: {user.gender}</p>
            <p>District: {user.district}</p>
            <p>Division: {user.division}</p>
          </CardBody>
        </Card>

        {/* User Details */}
        {user.userInfo && (
          <Card>
            <CardHeader>
              <h4>User Details</h4>
            </CardHeader>
            <CardBody>
              <p>Full Name: {user.userInfo.fullName}</p>
              <p>
                Date of Birth:{" "}
                {new Date(user.userInfo.dateOfBirth).toLocaleDateString()}
              </p>
              <p>Bio: {user.userInfo.bio || "N/A"}</p>
              <p>
                Preferred Age Range: {user.userInfo.preferredAgeMin} -{" "}
                {user.userInfo.preferredAgeMax}
              </p>
              <p>Preferred District: {user.userInfo.preferredDistrict}</p>
              <p>Preferred Division: {user.userInfo.preferredDivision}</p>
              <p>Interests: {user.userInfo.interests.join(", ")}</p>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
