import * as FormPrimitive from "@radix-ui/react-form";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import { useMutation } from "@tanstack/react-query";
import { clsx } from "clsx";
import { useState, useEffect } from "react";
import { setUserData } from "../../redux/slice/userDataSlice";
import { useDispatch } from "react-redux";

export const AuthForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const [authForm, setAuthForm] = useState({
    username: "",
    password: "",
    userType: "Select a user type",
  });
  const [userTypeError, setUserTypeError] = useState(
    authForm.userType === "Select a user type"
  );

  // determines if the user is logging in or signing up
  const [isLogin, setIsLogin] = useState(true);

  // handles the user type error
  useEffect(() => {
    setUserTypeError(authForm.userType === "Select a user type");

    return () => {
      setUserTypeError(false);
    };
  }, [authForm.userType]);

  const auth = useMutation({
    mutationKey: ["auth"],

    mutationFn: async () => {
      setIsLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/${authForm.userType}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: authForm.username,
            password: authForm.password,
          }),
        }
      );

      if (response.status === 200) {
        const result = await response.json();

        if ("token" in result) {
          localStorage.setItem("token", result.token);

          // set the user data in the redux store
          dispatch(
            setUserData({
              username: authForm.username,
              userType: authForm.userType,
            })
          );
        }
      } else if (response.status === 400) {
        const result = await response.json();

        if ("error" in result && result.error === "username already exists") {
          setIsError({
            error: true,
            message:
              "Username already exists. Please choose a different username.",
          });
        }
      }
    },

    onError: () => {
      setIsError({
        error: true,
        message: "Internal server error. Please try again later.",
      });
    },

    onSettled: () => {
      setIsLoading(false);
    },
  });

  return (
    <FormPrimitive.Root
      onSubmit={(e) => {
        e.preventDefault();
        auth.mutate();
      }}
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

        <FormPrimitive.Control
          asChild
          onChange={(e) =>
            setAuthForm((prevState) => ({
              ...prevState,
              username: e.target.value,
            }))
          }
        >
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

      <FormPrimitive.Field
        className="flex flex-col space-y-2 items-start"
        name="password"
      >
        <div className="font-semibold text-lg">
          <FormPrimitive.Label className="w-full text-left">
            Password
          </FormPrimitive.Label>
        </div>

        <FormPrimitive.Control
          asChild
          onChange={(e) =>
            setAuthForm((prevState) => ({
              ...prevState,
              password: e.target.value,
            }))
          }
        >
          <input
            className="w-full border border-gray-300 rounded-md p-3 text-lg"
            type="password"
            placeholder="********"
            required
          />
        </FormPrimitive.Control>

        <FormPrimitive.Message
          className="text-sm font-medium text-red-500"
          match="valueMissing"
        >
          Please enter your password!
        </FormPrimitive.Message>
      </FormPrimitive.Field>

      <FormPrimitive.Field name="user-type">
        <FormPrimitive.Control asChild>
          <SelectPrimitive.Root
            defaultValue="Select user type"
            onValueChange={(value) =>
              setAuthForm((prevState) => ({ ...prevState, userType: value }))
            }
          >
            <SelectPrimitive.Trigger asChild aria-label="User type">
              <button
                type="button"
                className="w-full border border-gray-300 rounded-md py-3 px-12 text-base flex items-center justify-between"
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
                  {["Select user type", "Customer", "Employee"].map(
                    (user, index) => (
                      <SelectPrimitive.Item
                        value={user}
                        key={`${user}-${index}`}
                        disabled={user === "Select user type"}
                        className={clsx(
                          "relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 font-medium focus:bg-gray-100",
                          "radix-disabled:opacity-50",
                          "focus:outline-none select-none cursor-pointer"
                        )}
                      >
                        <SelectPrimitive.ItemText>
                          {user}
                        </SelectPrimitive.ItemText>

                        <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                          <CheckIcon />
                        </SelectPrimitive.ItemIndicator>
                      </SelectPrimitive.Item>
                    )
                  )}
                </SelectPrimitive.Group>
              </SelectPrimitive.Viewport>

              <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700">
                <ChevronDownIcon />
              </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
          </SelectPrimitive.Root>
        </FormPrimitive.Control>

        {userTypeError && (
          <FormPrimitive.Message className="text-sm font-medium text-red-500">
            Are you a customer or an employee?
          </FormPrimitive.Message>
        )}
      </FormPrimitive.Field>

      <div className="flex flex-row gap-x-5">
        <FormPrimitive.Submit asChild name="login">
          <button
            type="submit"
            disabled={userTypeError}
            onClick={() => setIsLogin(true)}
            className={clsx(
              "py-2.5 px-5 bg-gray-900 text-xl text-white font-semibold rounded-md",
              "focus:outline-none focus-visible:ring focus-visible:ring-gray-700 focus-visible:ring-opacity-75",
              userTypeError && "bg-gray-400 cursor-not-allowed"
            )}
          >
            {isLogin && isLoading ? "Loading..." : "Log in"}
          </button>
        </FormPrimitive.Submit>

        <FormPrimitive.Submit asChild name="signup">
          <button
            type="submit"
            disabled={userTypeError}
            onClick={() => setIsLogin(false)}
            className={clsx(
              "py-2.5 px-5 bg-gray-900 text-xl text-white font-semibold rounded-md",
              "focus:outline-none focus-visible:ring focus-visible:ring-gray-700 focus-visible:ring-opacity-75",
              userTypeError && "bg-gray-400 cursor-not-allowed"
            )}
          >
            {!isLogin && isLoading ? "Loading..." : "Sign up"}
          </button>
        </FormPrimitive.Submit>
      </div>

      {isError.error && (
        <div className="text-red-500 text-lg font-semibold">
          {isError.message}
        </div>
      )}
    </FormPrimitive.Root>
  );
};
