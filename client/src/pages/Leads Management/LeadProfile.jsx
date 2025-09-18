import { useEffect } from "react";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Users,
  Star,
  Plus,
  Clock,
  Edit2,
  ChevronRight,
  Building,
  Lightbulb,
  TrendingUp,
  Heart,
  Send,
} from "lucide-react";
import { getStageColor } from "../../utils/getStageColor";
import { getStatusColor } from "../../utils/getStatusColor";
import { useNavigate, useParams } from "react-router";
import useFolloupsService from "../../services/useFolloupsService";
import { useDispatch, useSelector } from "react-redux";
import { setLeadsFormData } from "../../store/leadsSlice";
import CommonBtn from "../../components/buttons/CommonBtn";
import LinkBtn from "../../components/buttons/LinkBtn";
import useLeadsService from "../../services/useLeadsService";
import { formatDate } from "../../utils/formatedDate";
import useIcon from "../../hooks/useIcon";
import CommonHeader from "../../components/header/CommonHeader";
import WrapperContainer from "../../components/WrapperContainer";
import AuthorizedOnly from "../../components/utils/AuthorizedOnly";

const LeadsProfile = () => {
  const { leadFolloups, lead } = useSelector((state) => state.leads);
  const { getFolloupsByLeadId } = useFolloupsService();
  const { fetchLeadById } = useLeadsService();
  const { leadId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const icons = useIcon();

  // Mock suggested properties preview (top 2) - in real app, this would come from an API
  const suggestedPropertiesPreview = [
    {
      _id: "prop1",
      title: "Luxury Villa in Baner",
      price: "₹2.5 Cr",
      location: "Baner, Pune",
      type: "Villa",
      matchScore: 92,
      reasons: ["Price range match", "Preferred location"],
    },
    {
      _id: "prop2",
      title: "Modern Apartment in Koregaon Park",
      price: "₹1.8 Cr",
      location: "Koregaon Park, Pune",
      type: "Apartment",
      matchScore: 87,
      reasons: ["Budget aligned", "Premium location"],
    },
  ];

  useEffect(() => {
    if (leadId) {
      getFolloupsByLeadId(leadId);
      fetchLeadById(leadId);
    }
  }, [leadId]);

  const handleAddFolloup = (id) => {
    navigate("/leads_management/followup/" + id);
  };

  const handleSuggestProperty = (propertyId, leadId) => {
    // In real app, this would make an API call to suggest the property
    console.log(`Suggesting property ${propertyId} to lead ${leadId}`);
    // You could show a toast notification or modal confirmation
  };

  const handleViewAllSuggestions = () => {
    navigate(`/leads_management/property_suggestions/${leadId}`);
  };

  return (
    <div className="min-h-screen border-inherit text-start">
      {/* Header */}
      <CommonHeader
        title={
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
              {lead?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{lead?.name}</h1>
              <p className="text-gray-500 text-sm font-medium">
                ID: {lead?.voucherId}
              </p>
            </div>
          </div>
        }
      >
        <LinkBtn
          stub={"/leads_management/edit_leads"}
          action={() => dispatch(setLeadsFormData(lead))}
          className="flex items-center gap-2 px-5 py-2.5  text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium shadow-sm"
        >
          <Edit2 className="w-4 h-4" />
          Edit Lead
        </LinkBtn>
      </CommonHeader>

      <WrapperContainer className="px-6 py-8 border-inherit">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 border-inherit">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-8 border-inherit">
            {/* Contact Information */}
            <div className=" rounded-2xl p-8 shadow-sm border border-inherit">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-inherit">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600"> {icons["phone"]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Mobile</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {lead?.mobileNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-lg font-semibold text-gray-900 truncate">
                      {lead?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Source</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {lead?.source}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interested Properties */}
            <div className=" rounded-2xl p-8 shadow-sm border border-inherit">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Building className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Interested Properties
                </h2>
              </div>

              <div className="space-y-4">
                {lead?.interestedIn?.map((property) => (
                  <div
                    key={property._id}
                    className="group border border-inherit rounded-2xl p-6 hover:border-blue-200 hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-gray-50/30"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {property.title}
                        </h3>
                        <div>
                          <span className="flex gap-2 items-center  text-sm">
                            {icons["location"]}
                            {property.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                            {property.listingType}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                            {property.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          {property.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <LinkBtn
                        stub={`/deals_management/create_deal/${leadId}/${property._id}`}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm"
                      >
                        {icons["deal"]}
                        Create Deal
                        <ChevronRight className="w-4 h-4" />
                      </LinkBtn>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Suggestions Preview */}
            <div className=" rounded-2xl p-6 shadow-sm border border-inherit">
              <div className="flex items-center justify-between mb-6 border-inherit">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Property Suggestions
                    </h2>
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                      AI Powered
                    </span>
                  </div>
                </div>
                <CommonBtn
                  action={handleViewAllSuggestions}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-all duration-200 font-medium shadow-sm"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </CommonBtn>
              </div>

              <div className="space-y-4 border-inherit">
                {suggestedPropertiesPreview.map((property) => (
                  <div
                    key={property._id}
                    className="group border border-inherit rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-amber-50/20"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-base font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                            {property.title}
                          </h3>
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            <TrendingUp className="w-3 h-3" />
                            {property.matchScore}% match
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {property.location}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                            {property.category}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          {property.reasons.map((reason, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                            >
                              {reason}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-right ml-4">
                        <p className="text-lg font-bold text-green-600">
                          {property.price}
                        </p>
                        <CommonBtn
                          action={() =>
                            handleSuggestProperty(property._id, lead._id)
                          }
                          className="mt-2 flex items-center gap-1 px-3 py-1 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-200 text-sm font-medium"
                        >
                          <Send className="w-3 h-3" />
                          Suggest
                        </CommonBtn>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="text-center pt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500 justify-center">
                    <Heart className="w-4 h-4 text-amber-500" />
                    <span>
                      Showing top 2 matches • View all for complete analysis
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow-ups */}
            <div className=" rounded-2xl p-8 shadow-sm border border-inherit">
              <div className="flex items-center gap-3 mb-6 border-inherit">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center border-inherit">
                  <Clock className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Follow-ups</h2>
              </div>

              <div className="space-y-6 border-inherit">
                <CommonBtn
                  action={() => handleAddFolloup(lead._id)}
                  className="w-full border-2 border-dashed bborder-inherit rounded-2xl p-6 text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-300 flex items-center justify-center group"
                >
                  <Plus className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Schedule New Follow-up</span>
                </CommonBtn>

                {leadFolloups?.map((folloup) => (
                  <div
                    key={folloup._id}
                    className="bg-gradient-to-r from-white to-blue-50/30 rounded-2xl p-6 border border-inherit hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-900">
                          {folloup.title}
                        </h3>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {folloup.status}
                          </span>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            {folloup.priority}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            <span className="font-medium">Follow-up:</span>{" "}
                            {formatDate(folloup.followupsDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            <span className="font-medium">Reminder:</span>{" "}
                            {folloup.reminderSent ? "Sent" : "Pending"}
                          </span>
                        </div>
                      </div>

                      {folloup.description && (
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-gray-700 leading-relaxed">
                            {folloup.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 border-inherit text-start">
            {/* Status & Stage */}
            <div className=" rounded-2xl p-6 shadow-sm border border-inherit">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">
                  Status & Stage
                </h2>
              </div>

              <div className="space-y-4 border-inherit">
                <div className="border-inherit">
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    Current Stage
                  </p>
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold capitalize ${getStageColor(
                      lead?.stage
                    )}`}
                  >
                    {lead?.stage?.replace("_", " ")}
                  </span>
                </div>
                <div className="border-inherit">
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    Status
                  </p>
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold capitalize ${getStatusColor(
                      lead?.status
                    )}`}
                  >
                    {lead?.status?.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Follow-up */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg border-inherit">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6" />
                <h2 className="text-lg font-bold">Next Follow-up</h2>
              </div>
              <div className="/20 rounded-xl p-4 backdrop-blur-sm text-wrap">
                <p className="text-blue-100 text-sm mb-1">Scheduled for</p>
                <p className="text-white font-bold text-sm">
                  No upcoming follow-ups
                </p>
              </div>
            </div>

            {/* Assigned Agent */}
            <AuthorizedOnly>
              <div className=" rounded-2xl p-6 shadow-sm border  border-inherit">
                <div className="flex items-center gap-3 mb-4 border-inherit">
                  <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-teal-600" />
                  </div>
                  <h2 className="text-lgfont-bold text-gray-900">
                    Assigned Agent
                  </h2>
                </div>

                <div className="flex items-center gap-3 border-inherit">
                  <div className=" w-fit  p-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center text-white text-sm font-bold">
                    {lead?.assignedTo?.userName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {lead?.assignedTo?.userName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {lead?.assignedTo?.email}
                    </p>
                  </div>
                </div>
              </div>
            </AuthorizedOnly>

            {/* Timeline */}
            <div className=" rounded-2xl p-6 shadow-sm border border-inherit">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-rose-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Timeline</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Created
                    </p>
                    <p className="text-xs text-gray-600">
                      {formatDate(lead?.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Last Updated
                    </p>
                    <p className="text-xs text-gray-600">
                      {formatDate(lead?.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WrapperContainer>
    </div>
  );
};

export default LeadsProfile;
