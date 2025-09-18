import React, { useState, useEffect } from "react";
import { DEAL_STAGES } from "../../constant/deals";
import CommonInput from "../../components/input/CommonInput";
import CommonBtn from "../../components/buttons/CommonBtn";
import {
  X,
  Edit3,
  DollarSign,
  Calendar,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  Target,
} from "lucide-react";
import useIcon from "../../hooks/useIcon";
import SaveBtn from "../../components/buttons/SaveBtn";
import CancelBtn from "../../components/buttons/CancelBtn";

export default function EditDealPopup({ deal, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    stage: "",
    expectedValue: "",
    finalValue: "",
    expectedCloseDate: "",
    actualCloseDate: "",
    notes: "",
  });
  const icons = useIcon();

  // Pre-fill data when popup opens
  useEffect(() => {
    if (deal) {
      setFormData({
        stage: deal.stage || "qualification",
        expectedValue: deal.expectedValue || "",
        finalValue: deal.finalValue || "",
        expectedCloseDate: deal.expectedCloseDate
          ? deal.expectedCloseDate.split("T")[0]
          : "",
        actualCloseDate: deal.actualCloseDate
          ? deal.actualCloseDate.split("T")[0]
          : "",
        notes: deal.notes || "",
      });
    }
  }, [deal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const stageOptions = [
    {
      value: "contacted",
      label: "Contacted",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      value: "qualification",
      label: "Qualification",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
    },
    {
      value: "site_visit_scheduled",
      label: "Site Visit Scheduled",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
    },
    {
      value: "negotiation",
      label: "Negotiation",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
    {
      value: "proposal_sent",
      label: "Proposal Sent",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      value: "closed_won",
      label: "Closed Won",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      value: "closed_lost",
      label: "Closed Lost",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
  ];

  const getCurrentStage = () => {
    return (
      stageOptions.find((stage) => stage.value === formData.stage) ||
      stageOptions[1]
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 border-inherit"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] text-start overflow-hidden animate-in fade-in duration-200 border-inherit">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                {icons["edit"]}
              </div>
              <div>
                <h2 className="text-2xl font-bold">Edit Deal</h2>
                <p className="text-blue-100 text-sm mt-1">
                  Update deal information and track progress
                </p>
              </div>
            </div>
            <CommonBtn
              onClick={onClose}
              className="p-2  rounded-full transition-colors duration-200"
            >
              {icons["close"]}
            </CommonBtn>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto border-inherit">
          <form onSubmit={handleSubmit} className="space-y-6 border-inherit">
            {/* Deal Stage */}
            {/* <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-800">
                <Target className="w-4 h-4 inline mr-2" />
                Deal Stage
              </label>
              <select
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-900 font-medium bg-white"
              >
                {stageOptions.map((stage) => (
                  <option key={stage.value} value={stage.value}>
                    {stage.label}
                  </option>
                ))}
              </select>

              Stage indicator
              <div
                className={`p-3 rounded-xl border-2 ${
                  getCurrentStage().bgColor
                } ${getCurrentStage().borderColor} transition-all duration-300`}
              >
                <span
                  className={`font-semibold ${getCurrentStage().color} text-sm`}
                >
                  Current Stage: {getCurrentStage().label}
                </span>
              </div>
            </div> */}

            {/* Value Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-inherit">
              {/* Expected Value */}

              <CommonInput
                label={<>{icons["rupee"]} Expected Value</>}
                type="number"
                name="expectedValue"
                value={formData.expectedValue}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-900 font-medium"
              />

              {/* Final Value */}

              <CommonInput
                label={
                  <>
                    {icons["trendingUp"]}
                    Final Value
                  </>
                }
                type="number"
                name="finalValue"
                value={formData.finalValue}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-900 font-medium"
              />
            </div>

            {/* Date Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-inherit">
              {/* Expected Close Date */}

              <CommonInput
                label={
                  <>
                    {" "}
                    {icons["calendar"]}
                    Expected Close Date
                  </>
                }
                type="date"
                name="expectedCloseDate"
                value={formData.expectedCloseDate}
                onChange={handleChange}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-900 font-medium"
              />

              {/* Actual Close Date */}

              <CommonInput
                label={<>{icons["calendar"]} Actual Close Date</>}
                type="date"
                name="actualCloseDate"
                value={formData.actualCloseDate}
                onChange={handleChange}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-900 font-medium"
              />
            </div>

            {/* Notes */}
            <div className="space-y-3">
              <label className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                {icons["messageSq"]}
                Notes & Updates
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add updates, changes, or additional information about this deal..."
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 resize-none text-gray-900 placeholder-gray-500"
                rows={4}
              />
              <p className="text-xs text-gray-600">
                Document any changes, client feedback, or important updates
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col justify-end sm:flex-row gap-3 pt-6 border-t text-sm border-gray-100">
              <CancelBtn type="button" onClick={onClose}>
                Cancel
              </CancelBtn>
              <SaveBtn type="submit">Save Changes</SaveBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
