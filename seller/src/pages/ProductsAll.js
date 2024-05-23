import {
  Bars4Icon,
  EyeIcon,
  HomeIcon,
  PencilIcon,
  Squares2X2Icon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axiosClient from "../api";
import PageTitle from "../components/Typography/PageTitle";
import { useAuth } from "../context/AuthContext";
import response from "../utils/demo/productData";
import { genRating } from "../utils/genarateRating";

const ProductsAll = () => {
  const [view, setView] = useState("grid");
  const { user } = useAuth();

  // Table and grid data handlling
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  // pagination setup
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null);

  useEffect(() => {
    axiosClient.get(`product?owner=${user}`).then((response) => {
      setData(
        response.slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    });
  }, [page, resultsPerPage, selectedDeleteProduct]);

  // Delete action model

  async function openModal(productId) {
    // console.log(product);
    setSelectedDeleteProduct(productId);
    setIsModalOpen(true);
  }

  const handleDelete = () => {
    axiosClient.delete(`product/${selectedDeleteProduct}`).then((response) => {
      //console.log(response, selectedDeleteProduct);
      setIsModalOpen(false);
      setSelectedDeleteProduct(null);
    });
  };

  function closeModal() {
    setIsModalOpen(false);
  }

  // Handle list view
  const handleChangeView = () => {
    if (view === "list") {
      setView("grid");
    }
    if (view === "grid") {
      setView("list");
    }
  };

  return (
    <div>
      <PageTitle>All Products</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <HomeIcon className="h-5 w-5" />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">All Products</p>
      </div>

      {/* Sort */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All Products
              </p>

              <Label className="mx-3">
                <Select className="py-3">
                  <option>Sort by</option>
                  <option>Asc</option>
                  <option>Desc</option>
                </Select>
              </Label>

              <Label className="mr-8">
                {/* <!-- focus-within sets the color for the icon when input is focused --> */}
                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                  <input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Number of Results"
                    value={resultsPerPage}
                    onChange={(e) => setResultsPerPage(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                    {/* <SearchIcon className="w-5 h-5" aria-hidden="true" /> */}
                    Results on {`${view}`}
                  </div>
                </div>
              </Label>
            </div>
            <div className="">
              <Button
                icon={view === "list" ? Bars4Icon : Squares2X2Icon}
                className="p-2"
                aria-label="Edit"
                onClick={handleChangeView}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Delete product model */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader className="flex items-center">
          {/* <div className="flex items-center"> */}
          <TrashIcon className="w-6 h-6 mr-3" />
          Delete Product
          {/* </div> */}
        </ModalHeader>
        <ModalBody>Make sure you want to delete product </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block" onClick={handleDelete}>
            <Button>Delete</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      {/* Product Views */}
      {view === "list" ? (
        <>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Name</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>QUANTITY</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Action</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {data.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Avatar
                          className="hidden mr-4 md:block"
                          src={product.image}
                          alt="Product image"
                        />
                        <div>
                          <p className="font-semibold">{product.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {genRating(product.rating || 5, 0, 5)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {product.quantity}
                    </TableCell>
                    <TableCell className="text-sm">{product.price}</TableCell>
                    <TableCell>
                      <div className="flex">
                        <Link to={`/app/product/${product._id}`}>
                          <Button
                            icon={EyeIcon}
                            className="mr-3"
                            aria-label="Preview"
                          />
                        </Link>
                        <Button
                          icon={PencilIcon}
                          className="mr-3"
                          layout="outline"
                          aria-label="Edit"
                        />
                        <Button
                          icon={TrashIcon}
                          layout="outline"
                          onClick={() => openModal(product._id)}
                          aria-label="Delete"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
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
        </>
      ) : (
        <>
          {/* Card list */}
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
            {data.map((product) => {
              //console.log(product);
              return (
                <div className="flex" key={product._id}>
                  <Card>
                    <img
                      className="object-cover w-full aspect-square"
                      src={product.image}
                      alt="product"
                    />
                    <CardBody>
                      <div className="mb-3 flex items-center justify-between">
                        <p className="font-semibold truncate  text-gray-600 dark:text-gray-300">
                          {product.name}
                        </p>
                        <Badge
                          type={product.quantity > 0 ? "success" : "danger"}
                          className="whitespace-nowrap"
                        >
                          <p className="break-normal">
                            {product.quantity > 0 ? `In Stock` : "Out of Stock"}
                          </p>
                        </Badge>
                      </div>

                      <p className="mb-2 text-purple-500 font-bold text-lg">
                        {`$ ${product.price}`}
                      </p>

                      <p className="mb-8 flex flex-wrap h-[150px] text-gray-600 dark:text-gray-400">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <Link to={`/app/product/${product._id}`}>
                            <Button
                              icon={EyeIcon}
                              className="mr-3"
                              aria-label="Preview"
                              size="small"
                            />
                          </Link>
                        </div>
                        <div>
                          <Button
                            icon={PencilIcon}
                            className="mr-3"
                            layout="outline"
                            aria-label="Edit"
                            size="small"
                          />
                          <Button
                            icon={TrashIcon}
                            layout="outline"
                            aria-label="Delete"
                            onClick={() => openModal(product._id)}
                            size="small"
                          />
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
          </div>

          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </>
      )}
    </div>
  );
};

export default ProductsAll;
