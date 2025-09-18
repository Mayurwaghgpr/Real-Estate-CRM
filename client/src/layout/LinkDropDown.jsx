import React, { useState } from "react";
import SideNavBtn from "../components/buttons/SideNavBtn";

function LinkDropDown({ link, isOpen }) {
  const [expand, setExpand] = useState(false);
  return (
    <>
      <SideNavBtn
        className={`text-nowrap ${isOpen ? "p-3  w-full" : " w-fit"}`}
        {...link}
        hideText={isOpen}
        action={() => setExpand((prv) => !prv)}
      />
      {expand && (
        <div className={`space-y-1 ${isOpen ? "pl-2" : ""}`}>
          {link?.chidrens?.map((sublk) => {
            return (
              <SideNavBtn
                key={JSON.stringify(sublk)}
                className={`text-nowrap py-1 ${
                  isOpen ? "w-full " : "w-fit"
                }    `}
                {...sublk}
                hideText={isOpen}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default LinkDropDown;
