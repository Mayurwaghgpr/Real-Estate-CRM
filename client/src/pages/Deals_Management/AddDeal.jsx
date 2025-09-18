import { useParams } from "react-router";
import DealFormModel from "./components/DealFormModel";
import useDealsService from "../../services/useDealsService";

function AddDeal() {
  const { leadId, propertyId } = useParams();

  const { createDeal } = useDealsService();

  const handelSubmit = async (data) => {
    await createDeal(data);
  };
  return (
    <DealFormModel
      leadId={leadId}
      propertyId={propertyId}
      onSubmit={handelSubmit}
    />
  );
}

export default AddDeal;
