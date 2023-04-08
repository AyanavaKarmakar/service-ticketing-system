import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { clsx } from "clsx";

export const Navbar = () => {
  return (
    <NavigationMenuPrimitive.Root className="relative">
      <NavigationMenuPrimitive.List
        className={clsx(
          "flex flex-row p-2 space-x-2",
          "shadow-sm shadow-gray-800 bg-gray-50 border-solid border-b-2 border-gray-800"
        )}
      >
        <NavigationMenuPrimitive.Item>
          <NavigationMenuPrimitive.Trigger
            // reloads the page
            onClick={() => location.assign("/")}
            title="Home"
            className={clsx(
              "hover:bg-gray-100 text-gray-700",
              "px-3 py-2 text-xl lg:text-3xl font-bold rounded-md",
              "focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
            )}
          >
            Service Ticketing System
          </NavigationMenuPrimitive.Trigger>
        </NavigationMenuPrimitive.Item>
      </NavigationMenuPrimitive.List>
    </NavigationMenuPrimitive.Root>
  );
};
