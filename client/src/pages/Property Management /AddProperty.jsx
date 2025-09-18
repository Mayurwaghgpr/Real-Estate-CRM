import React, { useState } from "react";
import usePropertiesService from "../../services/usePropertiesService";

import PropertyFormModel from "./components/PropertyFormModel";

function AddProperty() {
  const [formData, setFormData] = useState({
    title: "",
    listingType: "sale",
    category: "",
    description: "",
    location: "",
    price: "",
    area: "",
    unit: "",
    amenities: "",
    status: "available",
    images: [],
  });

  const { addNewProperty } = usePropertiesService();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNewProperty(formData);
  };

  return (
    <PropertyFormModel
      removeImage={removeImage}
      handleChange={handleChange}
      handleFileChange={handleFileChange}
      data={formData}
      setData={setFormData}
      handleSubmit={handleSubmit}
    />
  );
}

export default AddProperty;
