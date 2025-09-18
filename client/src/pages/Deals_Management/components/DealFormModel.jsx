import React, { useState } from "react";
import CommonSelect from "../../../components/input/CommonSelect";
import CommonInput from "../../../components/input/CommonInput";
import useIcon from "../../../hooks/useIcon";
import {
  FileText,
  DollarSign,
  Calendar,
  MessageSquare,
  Target,
} from "lucide-react";
import { useSelector } from "react-redux";

const DealFormModel = ({ leadId, propertyId, onSubmit }) => {
  const { isDealSubmitting } = useSelector((state) => state.deals);
  const [formData, setFormData] = useState({
    leadId: leadId || "",
    propertyId: propertyId || "",
    stage: "qualification",
    expectedValue: "",
    expectedCloseDate: "",
    notes: "",
  });

  const icons = useIcon();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const stageOptions = [
    {
      value: "contacted",
      label: "Contacted",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      dotColor: "bg-blue-500",
    },
    {
      value: "qualification",
      label: "Qualification",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      dotColor: "bg-gray-500",
    },
    {
      value: "site_visit_scheduled",
      label: "Site Visit Scheduled",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      dotColor: "bg-indigo-500",
    },
    {
      value: "negotiation",
      label: "Negotiation",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      dotColor: "bg-amber-500",
    },
    {
      value: "proposal_sent",
      label: "Proposal Sent",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      dotColor: "bg-purple-500",
    },
    {
      value: "closed_won",
      label: "Closed Won",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      dotColor: "bg-emerald-500",
    },
    {
      value: "closed_lost",
      label: "Closed Lost",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      dotColor: "bg-red-500",
    },
  ];

  const getStageInfo = (stage) => {
    return (
      stageOptions.find((option) => option.value === stage) || stageOptions[1]
    );
  };

  const currentStage = getStageInfo(formData.stage);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            {icons["deal"] || <Target className="w-6 h-6" />}
          </div>
          <div>
            <h2 className="text-2xl font-bold">Add New Deal</h2>
            <p className="text-blue-100 mt-1 text-sm">
              Create a new deal to track progress and close opportunities
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Hidden fields */}
        <CommonInput type="hidden" name="leadId" value={formData.leadId} />
        <CommonInput
          type="hidden"
          name="propertyId"
          value={formData.propertyId}
        />

        <div className="space-y-6">
          {/* Stage Selection with Enhanced Visual */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              <Target className="w-4 h-4 inline mr-2" />
              Deal Stage
            </label>

            <div className="relative">
              <CommonSelect
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 appearance-none bg-white text-gray-900 font-medium"
                options={stageOptions}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <div
                  className={`w-3 h-3 rounded-full ${currentStage.dotColor} shadow-sm`}
                ></div>
              </div>
            </div>

            {/* Stage indicator card */}
            <div
              className={`p-4 rounded-xl border-2 ${currentStage.bgColor} ${currentStage.borderColor} transition-all duration-300`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${currentStage.dotColor}`}
                  ></div>
                  <span className={`font-semibold ${currentStage.color}`}>
                    Current Stage: {currentStage.label}
                  </span>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${currentStage.color} ${currentStage.bgColor}`}
                >
                  Active
                </div>
              </div>
            </div>
          </div>

          {/* Expected Value with Currency Icon */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800">
              <DollarSign className="w-4 h-4 inline mr-2" />
              Expected Value
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-500 font-medium">₹</span>
              </div>
              <CommonInput
                type="number"
                name="expectedValue"
                value={formData.expectedValue}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-900 font-medium"
              />
            </div>
            <p className="text-xs text-gray-600">
              Enter the expected deal value in INR
            </p>
          </div>

          {/* Expected Close Date */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800">
              <Calendar className="w-4 h-4 inline mr-2" />
              Expected Close Date
            </label>
            <CommonInput
              type="date"
              name="expectedCloseDate"
              value={formData.expectedCloseDate}
              onChange={handleChange}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-900 font-medium"
            />
            <p className="text-xs text-gray-600">
              When do you expect to close this deal?
            </p>
          </div>

          {/* Notes Section */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Notes & Comments
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any additional information about this deal, client requirements, special considerations, or next steps..."
              rows={4}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 resize-none text-gray-900 placeholder-gray-500"
            />
            <p className="text-xs text-gray-600">
              Optional: Add context, requirements, or special considerations
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-8">
          <button
            type="submit"
            disabled={isDealSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isDealSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Creating Deal...</span>
              </>
            ) : (
              <>
                <Target className="w-5 h-5" />
                <span>Create Deal</span>
              </>
            )}
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Once created, you can update the deal stage and add activities from
            the deals dashboard
          </p>
        </div>
      </form>
    </div>
  );
};

export default DealFormModel;
