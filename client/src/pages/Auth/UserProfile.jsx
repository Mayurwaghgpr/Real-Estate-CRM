import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../services/axiosInstance";
import useIcon from "../../hooks/useIcon";
import { setLogedInUser } from "../../store/authSlice";
import { toast } from "react-toastify";
import CommonBtn from "../../components/buttons/CommonBtn";
import CommonHeader from "../../components/header/CommonHeader";
import WrapperContainer from "../../components/WrapperContainer";
import SaveBtn from "../../components/buttons/SaveBtn";
import CancelBtn from "../../components/buttons/CancelBtn";

const profileFields = [
  { label: "Username", name: "userName" },
  { label: "Email", name: "email" },
  { label: "Mobile Number", name: "mobileNumber" },
  { label: "Territory", name: "territory" },
  { label: "Total Deals", name: "totalDeals" },
  { label: "Total Sales Value", name: "totalSalesValue" },
  { label: "Commission Rate", name: "commissionRate" },
  { label: "Role", name: "role" },
];

const UserProfile = () => {
  const { logedInUser } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateData, setUpdateData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const icons = useIcon();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUpdateData({ [e.target.name]: e.target.value });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(
        `/user/update/${logedInUser._id}`,
        updateData
      );
      if (response.status === 201) {
        setEditMode(false);
        setFormData({});
        sessionStorage.setItem(
          "_userDetails",
          JSON.stringify(response.data.data)
        );
        dispatch(setLogedInUser(response.data.data));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setFormData(logedInUser || {});
    setEditMode(true);
  };

  const handleCancel = () => {
    setFormData({});
    setEditMode(false);
  };

  if (!logedInUser?._id) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent mb-3"></div>
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full border-inherit">
      {/* Header */}
      <CommonHeader
        frontIcon={
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md hover:shadow-lg transition-shadow">
              {logedInUser?.userName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
          </div>
        }
        title={logedInUser?.userName || "User Profile"}
        subTitle={
          <p className="text-sm text-gray-500">
            {logedInUser?.role || "Member"} •{" "}
            {logedInUser?.territory || "Global"}
          </p>
        }
        className="justify-end items-center w-full px-6 py-4"
      >
        {!editMode && (
          <CommonBtn
            action={handleEdit}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors flex items-center gap-2"
          >
            <span>Edit Profile</span>
          </CommonBtn>
        )}
      </CommonHeader>

      {/* Profile Fields */}
      <WrapperContainer className="p-6 text-start">
        {/* Stats for agents */}
        {logedInUser.role === "agent" && (
          <div className="p-6 mb-6 rounded-xl bg-white shadow-md border border-gray-100">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                <div className="text-2xl font-semibold text-blue-700">
                  {logedInUser?.totalDeals || "0"}
                </div>
                <div className="text-sm text-gray-600">Total Deals</div>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                <div className="text-2xl font-semibold text-purple-700">
                  ${logedInUser?.totalSalesValue || "0"}
                </div>
                <div className="text-sm text-gray-600">Sales Value</div>
              </div>
              <div className="p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                <div className="text-2xl font-semibold text-green-700">
                  {logedInUser?.commissionRate || "0"}%
                </div>
                <div className="text-sm text-gray-600">Commission Rate</div>
              </div>
            </div>
          </div>
        )}

        {/* Info Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profileFields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              {editMode &&
              field.name !== "role" &&
              field.name !== "totalDeals" &&
              field.name !== "totalSalesValue" &&
              field.name !== "commissionRate" ? (
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow hover:shadow-md"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              ) : (
                <div className="py-2 px-4 bg-gray-50 rounded-lg text-gray-800">
                  {logedInUser?.[field.name] || (
                    <span className="italic text-gray-400">Not specified</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        {editMode && (
          <div className="flex justify-end gap-3 mt-8 pt-4 text-sm border-t border-gray-200">
            <CancelBtn
              onClick={handleCancel}
              disabled={isLoading}
              className="px-4 py-2 "
            >
              Cancel
            </CancelBtn>
            <SaveBtn
              onClick={handleSave}
              isLoading={isLoading}
              className="px-4 py-2 "
            >
              Save Changes
            </SaveBtn>
          </div>
        )}
      </WrapperContainer>
    </div>
  );
};

export default UserProfile;
