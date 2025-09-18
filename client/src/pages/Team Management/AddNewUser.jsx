import { useState } from "react";
import CommonInput from "../../components/input/CommonInput";
import CommonSelect from "../../components/input/CommonSelect";
import useIcon from "../../hooks/useIcon";
import ToggleBtn from "../../components/buttons/ToggleBtn";
import useTeamService from "../../services/useTeamService";
import { toast } from "react-toastify";
import CommonHeader from "../../components/header/CommonHeader";
import SaveBtn from "../../components/buttons/SaveBtn";
import CancelBtn from "../../components/buttons/CancelBtn";

const initialFormState = {
  userName: "",
  email: "",
  mobileNumber: "",
  password: "",
  territory: "",
  totalDeals: "",
  totalSalesValue: "",
  commissionRate: "",
  active: true,
  role: "agent",
};

const AddNewUser = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { addNewUser } = useTeamService();
  const icons = useIcon();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.userName.trim()) newErrors.userName = "User name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (
      formData.mobileNumber &&
      !/^\d{10}$/.test(formData.mobileNumber.replace(/\D/g, ""))
    ) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    toast.error(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    await addNewUser(formData);
  };

  const roleOptions = [
    { value: "agent", label: "Agent" },
    { value: "manager", label: "Manager" },
    { value: "admin", label: "Admin" },
  ];
  return (
    <>
      {/* Header */}
      <CommonHeader
        title={"Add New User"}
        subTitle="Create a new agent profile for your real estate team"
        className="justify-end items-center w-full border-inherit"
      >
        <div className="hidden md:block">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <span className=" text-blue-600">{icons["userPlus"]}</span>
          </div>
        </div>
      </CommonHeader>

      {/* Main Form */}
      <div className="bg-white rounded-lg shadow-sm border  p-6 border-inherit mb-5 ">
        <div className="space-y-8 border-inherit">
          {/* Personal Information Section */}
          <div className="border-inherit">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              {icons["user"]}
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-inherit">
              <CommonInput
                className="py-3 px-4"
                label="Full Name"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                error={errors.userName}
                //   icon={User}
              />
              <CommonInput
                className="py-3 px-4"
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
                error={errors.email}
                //   icon={Mail}
              />
              <CommonInput
                className="py-3 px-4"
                label="Mobile Number"
                name="mobileNumber"
                type="tel"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter mobile number"
                error={errors.mobileNumber}
                //   icon={Phone}
              />
              <CommonInput
                className="py-3 px-4"
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a secure password"
                required
                error={errors.password}
              />
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="border-inherit">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2 border-inherit">
              <span className="w-5 h-5 text-green-600">
                {icons["trendingUp"]}
              </span>
              Professional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-inherit">
              <CommonInput
                className="py-3 px-4"
                label="Territory"
                name="territory"
                value={formData.territory}
                onChange={handleChange}
                placeholder="Enter assigned territory"
                //   icon={MapPin}
              />
              <CommonSelect
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={roleOptions}
                required
                //   icon={Shield}
              />
              <CommonInput
                className="py-3 px-4"
                label="Total Deals"
                name="totalDeals"
                type="number"
                value={formData.totalDeals}
                onChange={handleChange}
                placeholder="Enter number of deals"
                //   icon={TrendingUp}
              />
              <CommonInput
                className="py-3 px-4"
                label="Commission Rate"
                name="commissionRate"
                type="number"
                value={formData.commissionRate}
                onChange={handleChange}
                placeholder="Enter commission rate"
                //   icon={Percent}
              />
            </div>

            <div className="mt-6 border-inherit">
              <CommonInput
                className="py-3 px-4"
                label="Total Sales Value"
                name="totalSalesValue"
                type="number"
                value={formData.totalSalesValue}
                onChange={handleChange}
                placeholder="Enter total sales value"
                //   icon={DollarSign}
              />
            </div>
          </div>

          {/* Status Section */}
          <div className="text-start">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <ToggleBtn
                isOn={formData.active}
                onToggle={() =>
                  handleChange({
                    target: {
                      name: "active",
                      type: "checkbox",
                      checked: !formData.active,
                    },
                  })
                }
              />

              <div>
                <label
                  htmlFor="active"
                  className="text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Active Status
                </label>
                <p className="text-xs text-gray-600">
                  {formData.active
                    ? "Agent is active and can access the system"
                    : "Agent is inactive and cannot access the system"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
            <CancelBtn
              className="px-8 py-3"
              onClick={() => setFormData(initialFormState)}
            >
              Cancel
            </CancelBtn>

            <SaveBtn
              className=" px-8 py-3  "
              type="submit"
              isLoading={loading}
              onClick={handleSubmit}
              disabled={loading}
            >
              Register Agent
            </SaveBtn>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewUser;
