import React, { useState } from "react";
import usePropertiesService from "../../services/usePropertiesService";

import PropertyFormModel from "./components/PropertyFormModel";
import { useLocation } from "react-router";

function EditProperty() {
  const {
    state: { listedBy, ...property },
  } = useLocation();
  const [formData, setFormData] = useState(property);
  const { editProperty } = usePropertiesService();

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
      images: [...formData.images, ...files],
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
    await editProperty(property._id, formData);
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

export default EditProperty;
