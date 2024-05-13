import React, {useEffect, useState} from "react";
import axiosClient from "../api";

export default function User({id}) {
    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = () => {
            axiosClient.get(`/user/${id}`).then((response) => {
                setData(response);
            });
        };
        fetchData();
    }, []);
    return (
        <>{data ? <p className="font-semibold">{data.name || data.email}</p> :
            <p className="font-semibold">Loading...</p>}</>

    )
}