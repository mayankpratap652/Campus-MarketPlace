import { CalculatorIcon, DeleteIcon, HouseIcon, LocateIcon, PackageIcon, PencilIcon, PinIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {


  return (
<Card
  onClick={
    setCurrentSelectedAddress
      ? () => setCurrentSelectedAddress(addressInfo)
      : null
  }
  className={`cursor-pointer transition-all duration-300 ease-in-out 
    rounded-2xl p-5 shadow-sm hover:shadow-md 
    ${
selectedId?._id === addressInfo?._id
  ? "border-2 border-violet-200 bg-gradient-to-r  from-violet-500 to-gray-400 text-white scale-[1.03] shadow-lg"
  : "border border-gray-200 bg-white text-white  hover:border-violet-400 hover:shadow-md"

    }
  `}
>

      <CardContent className="grid p-4 gap-4 text-sm">
        <Label className="font-medium  text-black">
           <LocateIcon/> Address:{""}
          <span className="font-normal text-black">{addressInfo?.address}</span>
        </Label>
        <Label className="font-medium text-black">
          <HouseIcon/> City:{""}
          <span className="font-normal text-black">{addressInfo?.city}</span>
        </Label>
        <Label className="font-medium  text-black">
          <PinIcon/> Pincode:{""}
          <span className="font-normal  text-black">{addressInfo?.pincode}</span>
        </Label>
        <Label className="font-medium  text-black">
          <CalculatorIcon/> Phone:{""}
          <span className="font-normal  text-black">{addressInfo?.phone}</span>
        </Label>
        {addressInfo?.notes && (
          <Label className="font-medium  text-black">
            <PackageIcon/> Notes:{""}
            <span className="font-normal  text-black">{addressInfo?.notes}</span>
          </Label>
        )}
      </CardContent>

      <CardFooter className="p-3 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl text-black bg-gray-100 hover:text-indigo-600"
          onClick={() => handleEditAddress(addressInfo)}
        >
          <PencilIcon/> Edit
        </Button>
        <Button
          variant=""
          size="sm"
          className="rounded-xl text-black bg-gray-100"
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          <DeleteIcon/> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
