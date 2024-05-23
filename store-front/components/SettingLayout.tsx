'use client';

import {useAuth} from "@/hooks/auth-context";
import Link from "next/link";

export default function SettingLayout() {
  const {user} = useAuth();
  return (
    <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
      <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
        <Link
          href={`/${user.id}/profile`}
          className="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
        >
          Profile
        </Link>
        <Link
          href={`/${user.id}/settings`}
          className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full"
        >
          Settings
        </Link>
        <Link
          href={`/${user.id}/orders`}
          className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  "
        >
          Orders
        </Link>
      </div>
    </aside>
  )
}