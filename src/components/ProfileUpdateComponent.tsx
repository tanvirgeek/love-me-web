"use client";

import { useState } from "react";
import { useUserStore } from "@/store/useAuthStore"; // Assuming you're using Zustand or any other state management

const ProfileUpdateForm = () => {
  // Fetching the current user data from the global state or props
  const user = useUserStore((state) => state.user);

  // Initialize form data with user info or empty values
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    gender: user?.gender || "",
    district: user?.district || "",
    division: user?.division || "",
    fullName: user?.userInfo?.fullName || "",
    dateOfBirth: user?.userInfo?.dateOfBirth || "",
    bio: user?.userInfo?.bio || "",
    profilePictureUrl: user?.userInfo?.profilePictureUrl || "",
    preferredAgeMin: user?.userInfo?.preferredAgeMin || "",
    preferredAgeMax: user?.userInfo?.preferredAgeMax || "",
    preferredDistrict: user?.userInfo?.preferredDistrict || "",
    preferredDivision: user?.userInfo?.preferredDivision || "",
    interests: user?.userInfo?.interests?.join(", ") || "",
    attachmentStyle: user?.userInfo?.attachmentStyle || "",
    presentAddress: user?.userInfo?.presentAddress || "",
    parmanentAddress: user?.userInfo?.parmanentAddress || "",
    income: user?.userInfo?.income || "",
    education: user?.userInfo?.education || "",
    familyMembers: user?.userInfo?.familyMembers?.join(", ") || "",
    redFlags: user?.userInfo?.redFlags?.join(", ") || "",
    books: user?.userInfo?.books?.join(", ") || "",
    movies: user?.userInfo?.movies?.join(", ") || "",
    music: user?.userInfo?.music?.join(", ") || "",
    sports: user?.userInfo?.sports || "",
  });

  // Handle input changes for the form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/updateProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user?.firebaseUserId, // Assuming you have the userId stored in the global state
        ...formData, // Send all form data
      }),
    });

    const result = await response.json();

    if (result.success) {
      alert("Profile updated successfully!");
    } else {
      alert("Error updating profile.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic User Information */}
        <div className="space-y-2">
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="gender" className="block font-medium">
            Gender
          </label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="district" className="block font-medium">
            District
          </label>
          <input
            type="text"
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="division" className="block font-medium">
            Division
          </label>
          <input
            type="text"
            id="division"
            name="division"
            value={formData.division}
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* User Info Fields */}
        <div className="space-y-2">
          <label htmlFor="fullName" className="block font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="dateOfBirth" className="block font-medium">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={
              formData.dateOfBirth instanceof Date
                ? formData.dateOfBirth.toISOString().split("T")[0]
                : formData.dateOfBirth
            }
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="bio" className="block font-medium">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="profilePictureUrl" className="block font-medium">
            Profile Picture URL
          </label>
          <input
            type="text"
            id="profilePictureUrl"
            name="profilePictureUrl"
            value={formData.profilePictureUrl}
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* Preferences Fields */}
        <div className="space-y-2">
          <label htmlFor="preferredAgeMin" className="block font-medium">
            Preferred Age Min
          </label>
          <input
            type="number"
            id="preferredAgeMin"
            name="preferredAgeMin"
            value={formData.preferredAgeMin}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="preferredAgeMax" className="block font-medium">
            Preferred Age Max
          </label>
          <input
            type="number"
            id="preferredAgeMax"
            name="preferredAgeMax"
            value={formData.preferredAgeMax}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="preferredDistrict" className="block font-medium">
            Preferred District
          </label>
          <input
            type="text"
            id="preferredDistrict"
            name="preferredDistrict"
            value={formData.preferredDistrict}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="preferredDivision" className="block font-medium">
            Preferred Division
          </label>
          <input
            type="text"
            id="preferredDivision"
            name="preferredDivision"
            value={formData.preferredDivision}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="interests" className="block font-medium">
            Interests
          </label>
          <input
            type="text"
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* Additional Optional Fields */}
        <div className="space-y-2">
          <label htmlFor="attachmentStyle" className="block font-medium">
            Attachment Style
          </label>
          <input
            type="text"
            id="attachmentStyle"
            name="attachmentStyle"
            value={formData.attachmentStyle}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="presentAddress" className="block font-medium">
            Present Address
          </label>
          <input
            type="text"
            id="presentAddress"
            name="presentAddress"
            value={formData.presentAddress}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="parmanentAddress" className="block font-medium">
            Permanent Address
          </label>
          <input
            type="text"
            id="parmanentAddress"
            name="parmanentAddress"
            value={formData.parmanentAddress}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="income" className="block font-medium">
            Income
          </label>
          <input
            type="text"
            id="income"
            name="income"
            value={formData.income}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="education" className="block font-medium">
            Education
          </label>
          <input
            type="text"
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="familyMembers" className="block font-medium">
            Family Members
          </label>
          <input
            type="text"
            id="familyMembers"
            name="familyMembers"
            value={formData.familyMembers}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="redFlags" className="block font-medium">
            Red Flags
          </label>
          <input
            type="text"
            id="redFlags"
            name="redFlags"
            value={formData.redFlags}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="books" className="block font-medium">
            Books
          </label>
          <input
            type="text"
            id="books"
            name="books"
            value={formData.books}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="movies" className="block font-medium">
            Movies
          </label>
          <input
            type="text"
            id="movies"
            name="movies"
            value={formData.movies}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="music" className="block font-medium">
            Music
          </label>
          <input
            type="text"
            id="music"
            name="music"
            value={formData.music}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="sports" className="block font-medium">
            Sports
          </label>
          <input
            type="text"
            id="sports"
            name="sports"
            value={formData.sports}
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
