import React, { useState } from "react";

import { DEAL_STAGES } from "../../../constant/deals";
import useDealsService from "../../../services/useDealsService";
import { useSelector } from "react-redux";
import SaveBtn from "../../../components/buttons/SaveBtn";
import CancelBtn from "../../../components/buttons/CancelBtn";
import CommonInput from "../../../components/input/CommonInput";
import CommonSelect from "../../../components/input/CommonSelect";
import CommonBtn from "../../../components/buttons/CommonBtn";
import useIcon from "../../../hooks/useIcon";
import { useLocation, useNavigate, useParams } from "react-router";

const ReopenDeal = () => {
  const { state } = useLocation();

  const { isDealSubmitting } = useSelector((state) => state.deals);

  const [formData, setFormData] = useState({
    newStage: "qualification",
    expectedValue: "",
    expectedCloseDate: "",
    notes: "",
  });
  const { reopenDeal } = useDealsService();
  const { dealId } = useParams();
  const nevigate = useNavigate();
  const icons = useIcon();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await reopenDeal(dealId, formData);
  };
  const handleClose = () => {
    nevigate(-1);
  };
  return (
    <div
      onClick={handleClose}
      className=" fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/30 z-50 h-screen border-inherit text-start"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl overflow-hidden border-inherit"
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6 text-white w-full">
          <div className="flex justify-between items-center space-x-3 w-full">
            <div className="flex justify-center items-center gap-3 ">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                {icons["deal"] || <Target className="w-6 h-6" />}
              </div>
              <div className="text-lg font-semibold">Reopen Deal</div>
            </div>
            <CommonBtn className={"rounded-full p-2"} action={handleClose}>
              {icons["close"]}
            </CommonBtn>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6 border-inherit">
          {/* New Stage */}
          <CommonSelect
            name="newStage"
            value={formData.newStage}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            label={"New Stage"}
            options={DEAL_STAGES.filter(
              (s) => s !== "closed_won" && s !== "closed_lost"
            )}
          />

          {/* Expected Value */}
          <CommonInput
            label={"Expected Value"}
            type="number"
            name="expectedValue"
            className="w-full border rounded-lg p-2"
            value={formData?.expectedValue || state?.expectedValue}
            onChange={handleChange}
          />

          {/* Expected Close Date */}
          <CommonInput
            label={"Expected Close Date"}
            type="date"
            name="expectedCloseDate"
            value={formData?.expectedCloseDate || state?.expectedCloseDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          {/* notes */}
          <div className="border-inherit">
            <label className="block text-sm font-medium">notes</label>
            <textarea
              name="notes"
              value={formData?.notes}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 border-inherit"
              required
              placeholder="Wite a note or reason for re-openning deals"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <CancelBtn type="button" onClick={handleClose}>
              Cancel
            </CancelBtn>
            <SaveBtn type="submit" disabled={isDealSubmitting}>
              {isDealSubmitting ? "Reopening..." : "Reopen Deal"}
            </SaveBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReopenDeal;
