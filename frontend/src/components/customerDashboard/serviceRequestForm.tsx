import * as FormPrimitive from "@radix-ui/react-form";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
  "Select a product type": ["Select issue type"],
  "Mobile Phone": ["Broken Screen", "Faulty Camera", "Overheating Issue"],
  TV: ["Damaged Screen", "Discoloration Of Screen", "Adapter Issues"],
  Refrigerator: [
    "Panel Controls Broken",
    "Compressor Not Working",
    "Unable To Turn On",
  ],
  "Washing Machine": ["Water overflowing", "Motor not working"],
};

type RequestFormType = {
  productType: string;
  issueType: string[];
  issueDescription?: string;
  policyUpload: File;
};

export const ServiceRequestForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedIssueTypes, setSelectedIssueTypes] = useState<IssueType[]>([]);
  const [selectedProductType, setSelectedProductType] = useState<ProductType>(
    "Select a product type"
  );

  const [requestForm, setRequestForm] = useState<RequestFormType>({
    productType: selectedProductType,
    issueType: [...selectedIssueTypes.map((issue) => issue.value)],
    policyUpload: new File([], ""),
  });

  const navigate = useNavigate();

  // validated request form
  useEffect(() => {
    if (
      requestForm.productType === "Select a product type" ||
      !requestForm.issueType.length ||
      requestForm.policyUpload.name === ""
    ) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [requestForm]);

  // Reset issue types when product type is changed
  useEffect(() => {
    setSelectedIssueTypes([]);
  }, [selectedProductType]);

  // set issue types to request form
  useEffect(() => {
    setRequestForm({
      ...requestForm,
      issueType: [...selectedIssueTypes.map((issue) => issue.value)],
    });
  }, [selectedIssueTypes]);

  const sendForm = useMutation({
    mutationKey: ["sendForm"],

    mutationFn: async () => {
      setIsLoading(true);

      // send request form data
      const formData = new FormData();
      formData.append("productType", requestForm.productType);
      formData.append("issueType", requestForm.issueType.join(", "));
      if (requestForm.issueDescription) {
        formData.append("issueDescription", requestForm.issueDescription);
      }
      formData.append("policyUpload", requestForm.policyUpload);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/customer/requestform`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (response.status === 201) {
        toast.success(
          "Your request has been successfully submitted! A customer care executive will be in touch with you soon."
        );

        navigate("/dashboard/customer");
      } else {
        toast.error("Interval server error. Please try again!");
      }
    },

    onError: () => {
      toast.error("Interval server error. Please try again!");
    },

    onSettled: () => {
      setIsLoading(false);
    },
  });

  return (
    <div className="flex flex-col h-[calc(100vh-150px)] gap-3 items-center justify-center mb-3">
      <div className="font-bold text-3xl underline pb-5 text-black">
        Request Form
      </div>

      <FormPrimitive.Root
        className="flex flex-col gap-y-3 justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          sendForm.mutate();
        }}
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

                if (value === "Select a product type") {
                  setSelectedIssueTypes([]);
                } else {
                  setSelectedIssueTypes(issueTypes);
                }

                setRequestForm({
                  ...requestForm,
                  productType: value as ProductType,
                });
              }}
            >
              <SelectPrimitive.Trigger asChild aria-label="Product type">
                <button
                  type="button"
                  className="max-w-sm w-80 lg:max-w-md lg:w-96 border border-gray-300 rounded-md py-3 px-5 text-base flex items-center justify-between"
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

        <FormPrimitive.Field name="Issue Type">
          <FormPrimitive.Label className="text-lg font-semibold text-black">
            Issue Type
          </FormPrimitive.Label>

          <FormPrimitive.Control asChild>
            <Listbox
              value={selectedIssueTypes}
              onChange={(newValues) => {
                // Check if the selected option is already in the list of selectedIssueTypes
                const index = selectedIssueTypes.findIndex(
                  (issue) =>
                    issue.type === newValues[newValues.length - 1].type &&
                    issue.value === newValues[newValues.length - 1].value
                );

                if (index === -1) {
                  // If the selected option is not already in the list, update the list
                  setSelectedIssueTypes(newValues);
                } else {
                  // If the selected option is already in the list, remove it from the list
                  setSelectedIssueTypes([
                    ...selectedIssueTypes.slice(0, index),
                    ...selectedIssueTypes.slice(index + 1),
                  ]);
                }
              }}
              multiple
              as="div"
              aria-labelledby="issue-type-label"
            >
              <Listbox.Label id="issue-type-label" className="sr-only">
                Issue Type
              </Listbox.Label>

              <Listbox.Button className="max-w-sm w-80 lg:max-w-md lg:w-96 border border-gray-300 rounded-md py-3 px-8 text-base flex items-center justify-between">
                {selectedIssueTypes.length === 0
                  ? "Select issue type"
                  : selectedIssueTypes.map((issue) => issue.value).join(", ")}
              </Listbox.Button>

              <Listbox.Options>
                {issueTypesMap[selectedProductType].map((issue) => (
                  <Listbox.Option
                    className={clsx(
                      "relative flex items-center px-8 py-2 m-3 rounded-md text-sm text-gray-700 font-medium focus:bg-gray-100",
                      "border-2 border-solid border-gray-900",
                      "focus:outline-none select-none cursor-pointer",
                      selectedIssueTypes.some(
                        (selected) =>
                          selected.type === selectedProductType &&
                          selected.value === issue
                      ) && "bg-gray-200"
                    )}
                    key={issue}
                    value={{ type: selectedProductType, value: issue }}
                  >
                    {issue}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </FormPrimitive.Control>
        </FormPrimitive.Field>

        <FormPrimitive.Field
          name="Issue Description"
          className="max-w-sm w-80 lg:max-w-md lg:w-96"
        >
          <FormPrimitive.Label className="text-lg font-semibold text-black">
            {"Issue Description (Optional)"}
          </FormPrimitive.Label>

          <FormPrimitive.Control asChild>
            <textarea
              onChange={(e) =>
                setRequestForm({
                  ...requestForm,
                  issueDescription: e.target.value,
                })
              }
              className="max-w-sm w-80 lg:max-w-md lg:w-96 border border-gray-300 rounded-md py-3 px-8 text-base"
              placeholder="Describe your issue"
            />
          </FormPrimitive.Control>
        </FormPrimitive.Field>

        <FormPrimitive.Field
          name="Policy Upload"
          className="max-w-sm w-80 lg:max-w-md lg:w-96"
        >
          <FormPrimitive.Label className="leading-none text-lg font-semibold text-black">
            {"Policy Upload "}
            <p className="pb-1 text-base leading-none">
              {"(only .doc,.docx, .pdf, .png, .jpg below 2MB)"}
            </p>
          </FormPrimitive.Label>

          <FormPrimitive.Control asChild>
            <input
              type="file"
              multiple={false}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setRequestForm({
                    ...requestForm,
                    policyUpload: e.target.files[0],
                  });
                }
              }}
              className="max-w-sm w-80 lg:max-w-md lg:w-96 border border-gray-300 rounded-md py-3 px-8 text-base"
              placeholder="Upload your policy"
            />
          </FormPrimitive.Control>
        </FormPrimitive.Field>

        <div className="flex flex-row gap-x-12">
          <FormPrimitive.Submit
            asChild
            className="bg-gray-800 text-white rounded-md py-2.5 px-12 text-base mt-3"
          >
            <button
              type="button"
              onClick={() => navigate("/dashboard/customer")}
              className={clsx(
                "py-2.5 px-5 bg-gray-900 text-xl text-white font-semibold rounded-md",
                "focus:outline-none focus-visible:ring focus-visible:ring-gray-700 focus-visible:ring-opacity-75"
              )}
            >
              Go Back
            </button>
          </FormPrimitive.Submit>

          <FormPrimitive.Submit
            asChild
            className="bg-gray-800 text-white rounded-md py-2.5 px-12 text-base mt-3"
          >
            <button
              disabled={isError}
              className={clsx(
                "py-2.5 px-5 bg-gray-900 text-xl text-white font-semibold rounded-md",
                "focus:outline-none focus-visible:ring focus-visible:ring-gray-700 focus-visible:ring-opacity-75",
                (isLoading || isError) && "cursor-not-allowed"
              )}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </FormPrimitive.Submit>
        </div>
      </FormPrimitive.Root>
    </div>
  );
};
