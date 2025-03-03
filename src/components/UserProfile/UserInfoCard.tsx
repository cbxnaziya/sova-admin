import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { GET_USER } from "../../utills/endpoint";
import { fetchHandler } from "../../utills/api";
import { toast } from "react-toastify";

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [loader, setLoader] = useState(false)
  const [userData, setUserData] = useState({
    company: "",
    account_name: "",
    email: "",
    phone: "",
    bio: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
  });

  // Fetch user data
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchHandler(GET_USER, "", true, setLoader, "GET");
        setUserData(response.data);
        console.log("Response:", response);
      } catch (error:any) {
        toast.error(error?.response?.data?.message)
        console.error("Error fetching user data:", error);
      }
    };
    getData();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Save user data
  const handleSave = useCallback(async () => {
    try {
      await axios.put("/api/update-user", userData); // Replace with actual API endpoint
      console.log("User info updated successfully");
      closeModal();
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  }, [userData, closeModal]);

  // Capitalize first letter of field names
  const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            {Object.entries(userData).map(([key, value]) =>
              ["company", "account_name", "email", "phone"].includes(key) ? (
                <div key={key}>
                  <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                    {capitalizeFirstLetter(key.replace("_", " "))}
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {value || "N/A"}
                  </p>
                </div>
              ) : null
            )}
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          Edit
        </button>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>

          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Social Links
              </h5>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                {["facebook", "twitter", "linkedin", "instagram"].map((field) => (
                  <div key={field}>
                    <Label>{capitalizeFirstLetter(field)}</Label>
                    <Input
                      type="text"
                      name={field}
                      value={userData[field as keyof typeof userData]}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  {["company", "account_name", "email", "phone", "bio"].map((field) => (
                    <div key={field} className="col-span-2 lg:col-span-1">
                      <Label>{capitalizeFirstLetter(field.replace("_", " "))}</Label>
                      <Input
                        type="text"
                        name={field}
                        value={userData[field as keyof typeof userData]}
                        onChange={handleInputChange}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
