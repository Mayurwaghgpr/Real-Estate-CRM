import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setLeadsFormData } from "../../store/leadsSlice";
import useLeadsService from "../../services/useLeadsService";

import LeadFromModel from "./components/LeadFromModel";

const AddLead = () => {
  const { leadsFormData, isLeadLoading } = useSelector((state) => state.leads);
  const { addNewLeads } = useLeadsService();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("propertyRequirement.")) {
      const key = name.split(".")[1];
      dispatch(
        setLeadsFormData({
          ...leadsFormData,
          propertyRequirement: {
            ...leadsFormData.propertyRequirement,
            [key]: value,
          },
        })
      );
    } else {
      dispatch(setLeadsFormData({ ...leadsFormData, [name]: value }));
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   dispatch(setLeadsFormData({ ...leadsFormData, [name]: value }));
  // };

  const handlePropertySelect = (propertyId) => {
    dispatch(
      setLeadsFormData({
        ...leadsFormData,
        interestedIn: prev.interestedIn.includes(propertyId)
          ? prev.interestedIn.filter((id) => id !== propertyId)
          : [...prev.interestedIn, propertyId],
      })
    );
  };

  const handleSubmit = () => {
    addNewLeads(leadsFormData);
    dispatch(
      setLeadsFormData({
        name: "",
        mobileNumber: "",
        email: "",
        source: "",
        status: "new",
        interestedIn: [],
        assignedTo: "",
        companyId: "",
      })
    );
  };

  const resetForm = () => {
    navigate(-1);
    dispatch(
      setLeadsFormData({
        name: "",
        mobileNumber: "",
        email: "",
        source: "",
        status: "new",
        interestedIn: [],
        assignedTo: "",
        companyId: "",
      })
    );
  };

  return (
    <LeadFromModel
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      resetForm={resetForm}
      data={leadsFormData}
      isLoading={isLeadLoading}
      heading={"Add New Lead"}
      subHeading={"Add a new customer for leads"}
    />
  );
};

export default AddLead;
