import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ConfirmationBox from "../../components/utils/ConfirmationBox";
import LinkBtn from "../../components/buttons/LinkBtn";
import SaveBtn from "../../components/buttons/SaveBtn";
import CancelBtn from "../../components/buttons/CancelBtn";
import { useParams } from "react-router";
import useDealsService from "../../services/useDealsService";
import CommonHeader from "../../components/header/CommonHeader";
import WrapperContainer from "../../components/WrapperContainer";
import { formatDate } from "../../utils/formatedDate";
import { formatCurrency } from "../../utils/formatedCurrency";
import { getStageColor } from "../../utils/getStageColor";
import DealHistory from "./components/DealHistory";

const DealDetails = () => {
  const { dealId } = useParams();
  const isLoading = useSelector((state) => state.deals.isLoading);
  const deal = useSelector((state) => state.deals.deal);
  const [showHistory, setShowHistory] = useState(false);
  const { fetchDealDetails } = useDealsService();

  // Fetch deal details
  useEffect(() => {
    fetchDealDetails(dealId);
  }, [dealId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading deal details...</p>
        </div>
      </div>
    );
  }

  const isClosed =
    deal?.stage === "closed_won" || deal?.stage === "closed_lost";

  return (
    <div className=" min-h-screen border-inherit">
      <CommonHeader
        title={deal?.property?.title || "Deal Details"}
        subTitle={<p className="">Deal ID: #{dealId}</p>}
      >
        <LinkBtn className={"border p-2"}>Add Followup</LinkBtn>
        <span
          className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${getStageColor(
            deal?.stage
          )}`}
        >
          {deal?.stage?.replace("_", " ").toUpperCase()}
        </span>
      </CommonHeader>

      {/* Content Section */}
      <WrapperContainer className="p-6 border-inherit">
        <div className="border-inherit space-y-8 ">
          {/* Key Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <div className="text-green-600 text-sm font-medium mb-1">
                Expected Value
              </div>
              <div className="text-2xl font-bold text-green-800">
                {formatCurrency(deal?.expectedValue)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <div className="text-purple-600 text-sm font-medium mb-1">
                Final Value
              </div>
              <div className="text-2xl font-bold text-purple-800">
                {formatCurrency(deal?.finalValue)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
              <div className="text-orange-600 text-sm font-medium mb-1">
                Expected Close
              </div>
              <div className="text-lg font-semibold text-orange-800">
                {formatDate(deal?.expectedCloseDate)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <div className="text-blue-600 text-sm font-medium mb-1">
                Actual Close
              </div>
              <div className="text-lg font-semibold text-blue-800">
                {formatDate(deal?.actualCloseDate)}
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-inherit">
            {/* Left Column - Deal Information */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Deal Information
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <span className="text-gray-600 font-medium">Lead:</span>
                    <span className="text-gray-900 font-semibold">
                      {deal?.lead?.name || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <span className="text-gray-600 font-medium">Property:</span>
                    <span className="text-gray-900 font-semibold text-right">
                      {deal?.property?.title || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <span className="text-gray-600 font-medium">
                      Assigned Agent:
                    </span>
                    <span className="text-gray-900 font-semibold">
                      {deal?.assignedTo?.name || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Timeline */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Timeline & Status
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <span className="text-gray-600 font-medium">
                      Current Stage:
                    </span>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStageColor(
                        deal?.stage
                      )}`}
                    >
                      {deal?.stage?.replace("_", " ").toUpperCase()}
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <span className="text-gray-600 font-medium">
                      Expected Close:
                    </span>
                    <span className="text-gray-900 font-semibold">
                      {formatDate(deal?.expectedCloseDate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium">
                      Actual Close:
                    </span>
                    <span className="text-gray-900 font-semibold">
                      {formatDate(deal?.actualCloseDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}

          <div className="bg-gray-50 rounded-lg p-6 text-start">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              Notes & Comments
            </h3>
            <div className="bg-white rounded-lg border border-gray-200 p-4 min-h-[100px]">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {deal?.notes || (
                  <span className="text-gray-400 italic">
                    No notes have been added to this deal yet.
                  </span>
                )}
              </p>
            </div>
          </div>
          {/* History Modal */}
          <DealHistory
            isOpen={showHistory}
            toggle={() => setShowHistory((prev) => !prev)}
            history={deal?.history}
            currentStage={deal?.stage}
          />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-inherit">
            {!isClosed ? (
              <SaveBtn
                onClick={() => {}}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                Edit Deal
              </SaveBtn>
            ) : (
              <LinkBtn
                stub={`/deals_management/deal/${dealId}/reopen`}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                Reopen Deal
              </LinkBtn>
            )}
          </div>
        </div>
      </WrapperContainer>
    </div>
  );
};

export default DealDetails;
