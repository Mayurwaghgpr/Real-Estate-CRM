import React, { useEffect } from "react";
import FollowupFormModel from "./components/FollowupFormModel";
import useFolloupsService from "../../services/useFolloupsService";
import { setFollowUpsFormData } from "../../store/followupsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";

function EditFollowup() {
  const { updateFolloups } = useFolloupsService();
  const { state: followupData } = useLocation();
  const { followupId } = useParams();

  const followUpFormData = useSelector(
    (state) => state.followups.followUpFormData
  );
  const setIsfollowupSubmitting = useSelector(
    (state) => state.followups.setIsfollowupSubmitting
  );
  const resetFollowUpsForm = useSelector(
    (state) => state.followups.resetFollowUpsForm
  );
  const isFollowupSubmitting = useSelector(
    (state) => state.followups.isFollowupSubmitting
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setFollowUpsFormData(followupData));
  }, []);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(
      setFollowUpsFormData({
        ...followUpFormData,
        [name]: type === "checkbox" ? checked : value,
      })
    );
  };
  const handleSubmit = async () => {
    await updateFolloups({ data: followUpFormData, id: followupId });
  };
  const handleClose = () => {
    navigate(-1);
    resetFollowUpsForm();
  };

  return (
    <FollowupFormModel
      heading={"Edit Followup"}
      subHeading={"Edit / update  followup"}
      isSubmitting={isFollowupSubmitting}
      handleSubmit={handleSubmit}
      data={followUpFormData}
      handleChange={handleChange}
      handleClose={handleClose}
    />
  );
}

export default EditFollowup;
