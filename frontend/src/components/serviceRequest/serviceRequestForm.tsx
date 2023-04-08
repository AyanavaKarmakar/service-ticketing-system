import * as FormPrimitive from "@radix-ui/react-form";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { clsx } from "clsx";
import { useState } from "react";

type ProductType =
  | "Select a product type"
  | "Mobile Phone"
  | "TV"
  | "Refrigerator"
  | "Washing Machine";

type IssueType = {
  type: ProductType;
  value: string;
};

const issueTypesMap: Record<ProductType, string[]> = {
  "Select a product type": [],
  "Mobile Phone": ["Broken Screen", "Faulty Camera", "Overheating Issue"],
  TV: ["Damaged Screen", "Discoloration Of Screen", "Adapter Issues"],
  Refrigerator: [
    "Panel Controls Broken",
    "Compressor Not Working",
    "Unable To Turn On",
  ],
  "Washing Machine": ["Water overflowing", "Motor not working"],
};

export const ServiceRequestForm = () => {
  const [selectedIssueTypes, setSelectedIssueTypes] = useState<IssueType[]>([]);
  const [selectedProductType, setSelectedProductType] = useState<ProductType>(
    "Select a product type"
  );

  console.log(selectedProductType, selectedIssueTypes);

  return (
    <div className="flex flex-col gap-3 items-center justify-center mb-3">
      <div className="font-bold text-3xl underline text-black">
        New Request Form
      </div>

      <FormPrimitive.Root
        className="flex flex-col gap-y-3 justify-center items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <FormPrimitive.Field name="Product type">
          <FormPrimitive.Label className="text-lg font-semibold text-black">
            Product type
          </FormPrimitive.Label>

          <FormPrimitive.Control asChild>
            <SelectPrimitive.Root
              defaultValue="Select product type"
              onValueChange={(value) => {
                setSelectedProductType(value as ProductType);
                const issues = issueTypesMap[value as ProductType];
                const issueTypes = issues.map((issue) => ({
                  type: value as ProductType,
                  value: issue,
                }));
                setSelectedIssueTypes(issueTypes);
              }}
            >
              <SelectPrimitive.Trigger asChild aria-label="Product type">
                <button
                  type="button"
                  className="w-full border border-gray-300 rounded-md py-3 px-40 text-base flex items-center justify-between"
                >
                  <SelectPrimitive.Value />
                  <SelectPrimitive.Icon className="ml-2">
                    <ChevronDownIcon />
                  </SelectPrimitive.Icon>
                </button>
              </SelectPrimitive.Trigger>

              <SelectPrimitive.Content>
                <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700">
                  <ChevronUpIcon />
                </SelectPrimitive.ScrollUpButton>

                <SelectPrimitive.Viewport className="bg-white p-2 rounded-lg shadow-lg">
                  <SelectPrimitive.Group>
                    {[
                      "Select product type",
                      "Mobile Phone",
                      "TV",
                      "Refrigerator",
                      "Washing Machine",
                    ].map((product, index) => (
                      <SelectPrimitive.Item
                        value={product}
                        key={`${product}-${index}`}
                        disabled={product === "Select product type"}
                        className={clsx(
                          "relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 font-medium focus:bg-gray-100",
                          "radix-disabled:opacity-50",
                          "focus:outline-none select-none cursor-pointer"
                        )}
                      >
                        <SelectPrimitive.ItemText>
                          {product}
                        </SelectPrimitive.ItemText>

                        <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                          <CheckIcon />
                        </SelectPrimitive.ItemIndicator>
                      </SelectPrimitive.Item>
                    ))}
                  </SelectPrimitive.Group>
                </SelectPrimitive.Viewport>

                <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700">
                  <ChevronDownIcon />
                </SelectPrimitive.ScrollDownButton>
              </SelectPrimitive.Content>
            </SelectPrimitive.Root>
          </FormPrimitive.Control>
        </FormPrimitive.Field>

        <FormPrimitive.Field name="Issue Description">
          <FormPrimitive.Label className="text-lg font-semibold text-black">
            {"Issue Description (Optional)"}
          </FormPrimitive.Label>

          <FormPrimitive.Control asChild>
            <textarea
              className="w-full border border-gray-300 rounded-md py-3 px-12 text-base"
              placeholder="Describe your issue"
            />
          </FormPrimitive.Control>
        </FormPrimitive.Field>

        <FormPrimitive.Field name="Policy Upload">
          <FormPrimitive.Label className="text-lg font-semibold text-black">
            Policy Upload
          </FormPrimitive.Label>

          <FormPrimitive.Control asChild>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md py-3 px-12 text-base"
              placeholder="Upload your policy"
            />
          </FormPrimitive.Control>
        </FormPrimitive.Field>

        <FormPrimitive.Submit
          asChild
          className="w-full bg-gray-800 text-white rounded-md py-3 px-12 text-base"
        >
          <button
            className={clsx(
              "py-2.5 px-5 bg-gray-900 text-xl text-white font-semibold rounded-md",
              "focus:outline-none focus-visible:ring focus-visible:ring-gray-700 focus-visible:ring-opacity-75"
            )}
          >
            Submit
          </button>
        </FormPrimitive.Submit>
      </FormPrimitive.Root>
    </div>
  );
};
