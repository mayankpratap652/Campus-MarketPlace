import React from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { filterOptions } from "@/config";

function ProductFilter({ filters = {}, handleFilter }) {
  return (
    <div className="bg-white rounded-xl shadow-md border">

      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          Filters
        </h2>
      </div>
      {/* Filter Content */}
      <div className="p-4 space-y-6">

        {Object.keys(filterOptions).map((keyItem) => (
          <div key={keyItem}>

            {/* Section Title */}
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide">
              {keyItem}
            </h3>

            {/* Options */}
          <div className="grid gap-2 mt-3">
  {filterOptions[keyItem].map((option) => (
    <Label
      key={option.id}
      className="flex items-center gap-2 cursor-pointer font-medium hover:text-yellow-600 transition"
    >
      <Checkbox
        checked={!!filters?.[keyItem]?.includes(option.id)}  // ✅ FIXED
        onCheckedChange={() =>
          handleFilter(keyItem, option.id)
        }
      />
      {option.label}
    </Label>
  ))}
</div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default ProductFilter;