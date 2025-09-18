import { useEffect, useState } from "react";
import { Home } from "lucide-react";
import useIcon from "../../hooks/useIcon";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import usePropertiesService from "../../services/usePropertiesService";

import WrapperContainer from "../../components/WrapperContainer";
import { formatPrice } from "../../utils/formatePrice";

const PropertyDetails = () => {
  const property = useSelector((state) => state.properties.property);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { fetchPropertyById } = usePropertiesService();
  const { propertyId } = useParams();
  const icons = useIcon();

  useEffect(() => {
    fetchPropertyById(propertyId);
  }, []);

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50">
  //       <div className="animate-pulse">
  //         <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
  //         <div className="space-y-4">
  //           <div className="h-6 bg-gray-200 rounded w-3/4"></div>
  //           <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  //           <div className="h-32 bg-gray-200 rounded"></div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm">
          <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Property Not Found
          </h3>
          <p className="text-gray-500">
            The property you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    if (property.images && property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property.images && property.images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + property.images.length) % property.images.length
      );
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this ${property.category} in ${property.location}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  return (
    <div className="min-h-screen space-y-6 border-inherit ">
      {/* Header Section */}
      <WrapperContainer>
        <div className="max-w-7xl text-start mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                {icons["location"]}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {property.title}
                </h1>
                <p className="text-gray-600 mb-4">{property.location}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${
                      property.listingType === "sale"
                        ? "bg-green-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    For {property.listingType}
                  </span>
                  <span className="text-3xl font-bold text-blue-600">
                    {formatPrice(property.price)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      property.status === "available"
                        ? "bg-green-100 text-green-700"
                        : property.status === "sold" ||
                          property.status === "rented"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {property.status?.charAt(0).toUpperCase() +
                      property.status?.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleShare}
                className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                {icons["share"]}
              </button>
            </div>
          </div>
        </div>
      </WrapperContainer>
      <WrapperContainer>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-inherit">
          {/* Image Gallery */}
          {property.images && property.images.length > 0 && (
            <div className="mb-8 border-inherit">
              <div className="relative group border-inherit">
                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-gray-200 mb-4 relative">
                  <img
                    src={property.images[currentImageIndex]}
                    alt={`Property view ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70 hover:scale-105"
                      >
                        {icons["leftArrow"]}
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70 hover:scale-105"
                      >
                        {icons["rightArrow"]}
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                        {currentImageIndex + 1} / {property.images.length}
                      </div>
                    </>
                  )}
                </div>

                {property.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {property.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                          index === currentImageIndex
                            ? "border-blue-500 shadow-lg transform scale-105"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-inherit">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 border-inherit">
              {/* Property Overview */}
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-inherit">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  {icons["home"]}
                  Property Overview
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-inherit">
                  <div className="flex items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-inherit">
                    {icons["home"]}

                    <div>
                      <p className="text-sm font-medium text-blue-600 mb-1">
                        Category
                      </p>
                      <p className="text-xl font-bold text-gray-900">
                        {property.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-inherit">
                    {/* <Ruler className="h-10 w-10 text-green-600 mr-4" /> */}
                    <div>
                      <p className="text-sm font-medium text-green-600 mb-1">
                        Area
                      </p>
                      <p className="text-xl font-bold text-gray-900">
                        {property.area} {property.unit}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-8 border-inherit">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {property.description}
                  </p>
                </div>
              </div>

              {/* Amenities */}
              {property.amenities?.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-inherit">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Amenities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.amenities.map((amenity, i) => (
                      <div
                        key={i}
                        className="flex items-center p-4 bg-gradient-to-r w-fit from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all"
                      >
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-gray-800 font-medium text-sm w-full">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6 border-inherit">
              {/* Quick Info Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-inherit sticky top-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Quick Info
                </h3>
                <div className="space-y-4 border-inherit">
                  <div className="flex justify-between items-center py-3 border-b border-inherit">
                    <span className="text-gray-600 font-medium">Price</span>
                    <span className="font-bold text-blue-600 text-lg">
                      {formatPrice(property.price)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-inherit">
                    <span className="text-gray-600 font-medium">Area</span>
                    <span className="font-semibold text-gray-900">
                      {property.area} {property.unit}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-inherit">
                    <span className="text-gray-600 font-medium">Category</span>
                    <span className="font-semibold text-gray-900">
                      {property.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600 font-medium">Status</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        property.status === "available"
                          ? "bg-green-100 text-green-700"
                          : property.status === "sold" ||
                            property.status === "rented"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {property.status?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Activity Logs */}
              {property.activityLogs?.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-inherit">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    {icons["calendar"]}
                    Recent Activity
                  </h3>
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {property.activityLogs.slice(0, 5).map((log, i) => (
                      <div
                        key={i}
                        className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="flex-shrink-0 mt-1">
                          {icons["user"]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-1">
                            {log.action}
                          </p>
                          <p className="text-xs text-gray-600 mb-1">
                            By {log.performedBy?.name || "User"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(log.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </WrapperContainer>
    </div>
  );
};

export default PropertyDetails;
