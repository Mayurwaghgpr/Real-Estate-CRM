import React, { useState, useCallback, useEffect } from "react";
import CommonInput from "../../components/input/CommonInput";
import CommonSelect from "../../components/input/CommonSelect";
import { useDispatch, useSelector } from "react-redux";
import useFolloupsService from "../../services/useFolloupsService";
import useIcon from "../../hooks/useIcon";
import { useNavigate, useParams } from "react-router";
import { setFollowUpsFormData } from "../../store/followupsSlice";
import FollowupFormModel from "./components/FollowupFormModel";

function AddFollowUp() {
  const { leadId } = useParams();
  const { followUpFormData, resetFollowUpsForm, setIsfollowupSubmitting } =
    useSelector((state) => state.followups);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addFolloups } = useFolloupsService();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(
      setFollowUpsFormData({
        ...followUpFormData,
        [name]: type === "checkbox" ? checked : value,
      })
    );
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addFolloups({ ...followUpFormData, leadId });
  };

  const handleClose = () => {
    navigate(-1);
    resetFollowUpsForm();
  };

  return (
    <FollowupFormModel
      heading={"Add Follow-Up"}
      handleChange={handleChange}
      handleClose={handleClose}
      data={followUpFormData}
      handleSubmit={handleSubmit}
      isSubmitting={setIsfollowupSubmitting}
    />
  );
}

export default AddFollowUp;
