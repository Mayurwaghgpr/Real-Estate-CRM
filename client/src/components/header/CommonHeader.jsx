const CommonHeader = ({ title, subTitle, frontIcon, children, className }) => {
  return (
    <div className="rounded-lg border p-6 mb-6 border-inherit shadow-sm ">
      <div className="flex items-center justify-between capitalize gap-6 w-full border-inherit">
        <div className="flex items-start gap-4">
          {frontIcon}
          <div className=" text-nowrap w-fit text-start border-inherit">
            <h2 className="text-xl font-medium text-gray-900">{title}</h2>
            {subTitle && <div className="text-gray-600 mt-1">{subTitle}</div>}
          </div>
        </div>
        <div className={`flex gap-5  border-inherit ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommonHeader;
