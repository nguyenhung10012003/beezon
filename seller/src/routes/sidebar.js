import {
    ArrowLeftStartOnRectangleIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    HomeIcon,
    ShoppingCartIcon,
    TruckIcon,
    UserGroupIcon,
    UserIcon
} from "@heroicons/react/20/solid";

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
    {
        path: "/app/dashboard", // the url
        icon: <HomeIcon className="w-5 h-5"/>, // the component being exported from icons/index.js
        name: "Dashboard", // name that appear in Sidebar
    },
    {
        path: "/app/orders",
        icon: <ShoppingCartIcon className="w-5 h-5"/>,
        name: "Orders",
    },
    {
        icon: <TruckIcon className="w-5 h-5"/>,
        name: "Products",
        routes: [
            {
                path: "/app/all-products",
                name: "All Products",
            },
            {
                path: "/app/add-product",
                name: "Add Product",
            },
        ],
    },
    {
        path: "/app/customers",
        icon: <UserGroupIcon className="h-5 w-5"/>,
        name: "Customers",
    },
    {
        path: "/app/chats",
        icon: <ChatBubbleLeftEllipsisIcon className="h-5 w-5"/>,
        name: "Chats",
    },
    {
        path: "/app/manage-profile",
        icon: <UserIcon className="h-5 w-5"/>,
        name: "Profile",
    },
    {
        path: "/app/settings",
        icon: <Cog6ToothIcon className="h-5 w-5"/>,
        name: "Settings",
    },
    {
        path: "/app/logout",
        icon: <ArrowLeftStartOnRectangleIcon className="h-5 w-5"/>,
        name: "Logout",
    },
];

export default routes;
