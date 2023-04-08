import * as FormPrimitive from "@radix-ui/react-form";
import { clsx } from "clsx";

export const SignupForm = () => {
  return (
    <FormPrimitive.Root
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col space-y-4 items-center justify-center m-5"
    >
      <FormPrimitive.Field
        className="flex flex-col space-y-2 items-start"
        name="username"
      >
        <div className="font-semibold text-lg">
          <FormPrimitive.Label className="w-full text-left">
            Username
          </FormPrimitive.Label>
        </div>

        <FormPrimitive.Control asChild>
          <input
            className="w-full border border-gray-300 rounded-md p-3 text-lg"
            type="text"
            placeholder="johndoe"
            required
          />
        </FormPrimitive.Control>

        <FormPrimitive.Message
          className="text-sm font-medium text-red-500"
          match="valueMissing"
        >
          Please enter your username!
        </FormPrimitive.Message>
      </FormPrimitive.Field>

      <FormPrimitive.Submit asChild>
        <button
          type="submit"
          className={clsx(
            "py-3 px-5 bg-gray-900 text-xl text-white font-semibold rounded-md",
            "focus:outline-none focus-visible:ring focus-visible:ring-gray-700 focus-visible:ring-opacity-75"
          )}
        >
          Sign up
        </button>
      </FormPrimitive.Submit>
    </FormPrimitive.Root>
  );
};
