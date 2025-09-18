import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setLeadsFormData } from "../../store/leadsSlice";
import useLeadsService from "../../services/useLeadsService";
import LeadFromModel from "./components/LeadFromModel";

function EditeLead() {
  const { leadsFormData, isLeadLoading } = useSelector((state) => state.leads);
  const { editLead } = useLeadsService();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setLeadsFormData({ ...leadsFormData, [name]: value }));
  };
  const handleSubmit = () => {
    editLead(leadsFormData);
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
      heading={"Edit Lead"}
    />
  );
}

export default EditeLead;
