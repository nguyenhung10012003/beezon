import React, {useEffect, useState} from "react";

import InfoCard from "../components/Cards/InfoCard";
import PageTitle from "../components/Typography/PageTitle";
import RoundIcon from "../components/RoundIcon";
import OrdersTable from "../components/OrdersTable";
import {BanknotesIcon, ShoppingCartIcon, UserIcon} from "@heroicons/react/20/solid";
import {useAuth} from "../context/AuthContext";
import axiosClient from "../api";

function Dashboard() {
    const {user} = useAuth();
    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = () => {
            axiosClient.get(`/order?seller=${user}`).then((response) => {
                setData(response);
            });
        };
        fetchData();
    }, []);
    return (
        <>
            <PageTitle>Dashboard</PageTitle>

            {/* <CTA /> */}

            {/* <!-- Cards --> */}
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <InfoCard title="Total customers" value={
                    data ? data.length : 0
                }>
                    <RoundIcon
                        icon={UserIcon}
                        iconColorClass="text-orange-500 dark:text-orange-100"
                        bgColorClass="bg-orange-100 dark:bg-orange-500"
                        className="mr-4"
                    />
                </InfoCard>

                <InfoCard title="Total income" value={
                    data ? data.reduce((acc, curr) => acc + curr.total, 0) : 0
                }>
                    <RoundIcon
                        icon={BanknotesIcon}
                        iconColorClass="text-green-500 dark:text-green-100"
                        bgColorClass="bg-green-100 dark:bg-green-500"
                        className="mr-4"
                    />
                </InfoCard>

                <InfoCard title="New Orders" value={
                    data ? data.filter((order) => order.status === "PENDING").length : 0
                }>
                    <RoundIcon
                        icon={ShoppingCartIcon}
                        iconColorClass="text-blue-500 dark:text-blue-100"
                        bgColorClass="bg-blue-100 dark:bg-blue-500"
                        className="mr-4"
                    />
                </InfoCard>
            </div>

            <PageTitle>Orders</PageTitle>
            <OrdersTable resultsPerPage={10}/>
        </>
    );
}

export default Dashboard;
