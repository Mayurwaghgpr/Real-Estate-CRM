import { useState } from "react";
import CommonInput from "../../components/input/CommonInput";
import axiosInstance from "../../services/axiosInstance";

const CompanyRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    teamSize: "",
    industry: "Real Estate",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fields = [
    {
      label: "Company Name",
      name: "name",
      type: "text",
      placeholder: "Enter company name",
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter email",
      required: true,
    },
    {
      label: "Phone",
      name: "phone",
      type: "text",
      placeholder: "Enter phone number",
    },
    {
      label: "Team Size",
      name: "teamSize",
      type: "text",
      placeholder: "e.g. 5, 10, 50+",
      required: true,
    },
    {
      label: "Industry",
      name: "industry",
      type: "text",
      placeholder: "e.g. Real Estate",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic required field check
    for (const field of fields) {
      if (field.required && !formData[field.name]) {
        setError(`${field.label} is required`);
        return;
      }
    }

    try {
      setError("");
      setSuccess("");
      const response = await axiosInstance.post();
      if (response.status == 201) {
        setSuccess("Company registered successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          teamSize: "",
          industry: "Real Estate",
        });
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Company Registration
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        {fields.map((field) => (
          <CommonInput
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            error={
              error.includes(field.label) ? error : "" // optional targeted error
            }
          />
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Register Company
        </button>
      </form>
    </div>
  );
};

export default CompanyRegistrationForm;
