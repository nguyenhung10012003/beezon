"use client";
import { useAuth } from "@/hooks/auth-context";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const items = (id: string) => [
  { name: "Orders", href: `/${id}/orders` },
  { name: "Profile", href: `/${id}/profile` },
  { name: "Settings", href: `/settings` },
];

export default function Avatar() {
  const { signOut, user } = useAuth();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        className="inline-flex w-full justify-center rounded-full bg-orange-400 p-2 text-sm
          font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
      >
        <div className="bg-neutral text-neutral-content rounded-full w-5 h-5">
          {"T"}
        </div>
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {items(user.id).map((item, index) => (
              <MenuItem key={index}>
                {({ active }) => (
                  <Link
                    href={item.href}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </MenuItem>
            ))}
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  Sign out
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
