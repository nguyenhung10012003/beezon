import React, {useEffect, useState} from "react";
import {
    Badge,
    Button,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
    TableRow,
} from "@windmill/react-ui";
import {useAuth} from "../context/AuthContext";
import axiosClient from "../api";
import User from "./User";

const OrdersTable = ({resultsPerPage, filter}) => {
  const [toggle, setToggle] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const {user} = useAuth();
  useEffect(() => {
    const fetchData = () => {
      axiosClient.get(`/order?seller=${user}`).then((response) => {
        setData(response);
      });
    };
    fetchData();
  }, [toggle]);

  // pagination setup
  const totalResults = data ? data.length : 0;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }


  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    // If Filters Applied
    if (filter === "PENDING") {
      setData(
        data
          .filter((order) => order.status === "PENDING")
          .slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    }
    if (filter === "CONFIRMED") {
      setData(
        data
          .filter((order) => order.status === "CONFIRMED")
          .slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    }
    if (filter === "DELIVERING") {
      setData(
        data
          .filter((order) => order.status === "Completed")
          .slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    }
    if (filter === "DELIVERED") {
      setData(
        data
          .filter((order) => order.status === "Completed")
          .slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    }
    if (filter === "CANCELLED") {
      setData(
        data
          .filter((order) => order.status === "Completed")
          .slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    }

    // if filters dosent applied
    if (filter === "all" || !filter) {
      setData(
        data.slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    }
  }, [page, resultsPerPage, filter]);
  const handleConfirm = async (id) => {
    await axiosClient.patch(`/order/${id}`, {
      status: "CONFIRMED",
    });
    setToggle(!toggle);
  }
  return (
    <div>
      {/* Table */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((d, i) => {

              return <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <User id={d.user}></User>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                                    <span className="text-sm">{
                                      d.products.map((product, index) => (
                                        <span key={index} className="font-semibold">
                                                {product.product.name} x {product.quantity}
                                            </span>
                                      ))
                                    }</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$ {d.total}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    type={
                      d.status === "CANCELLED"
                        ? "danger"
                        : "success"
                    }
                  >
                    {d.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(d.createdAt).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  {d.status === "PENDING" ?
                    <Button onClick={() => handleConfirm(d['_id'])}>Confirm</Button> :
                    <Button disabled>Confirmed</Button>}
                </TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
    </div>
  );
};

export default OrdersTable;
