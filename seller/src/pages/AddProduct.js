import {
  ArchiveBoxIcon,
  BarsArrowUpIcon,
  HomeIcon,
} from "@heroicons/react/20/solid";
import {
  Button,
  Card,
  CardBody,
  Input,
  Label,
  Select,
  Textarea,
} from "@windmill/react-ui";
import React from "react";
import { NavLink } from "react-router-dom";
import axiosClient from "../api";
import PageTitle from "../components/Typography/PageTitle";
import { useAuth } from "../context/AuthContext";
import { minifyImage } from "../utils/minifyImage";

const FormTitle = ({ children }) => {
  return (
    <h2 className="mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
      {children}
    </h2>
  );
};

const AddProduct = () => {
  const [categories, setCategories] = React.useState();
  const { user } = useAuth();
  React.useEffect(() => {
    axiosClient.get("category").then((res) => {
      setCategories(res);
    });
  }, []);
  const nameRef = React.useRef();
  const priceRef = React.useRef();
  const descriptionRef = React.useRef();
  const quantityRef = React.useRef();
  const detailRef = React.useRef();
  const categoryRef = React.useRef();
  const imageRef = React.useRef();

  const handleSubmit = () => {
    if (imageRef.current.files[0]) {
      const reader = new FileReader();
      reader.onload = async function () {
        const base64 = reader.result;
        const formData = {
          name: nameRef.current.value,
          price: priceRef.current.value,
          description: descriptionRef.current.value,
          quantity: quantityRef.current.value,
          detail: detailRef.current.value,
          categories: [categoryRef.current.value],
          image: await minifyImage(base64),
          owner: user,
        };
        console.log(formData);
        axiosClient
          .post("product", formData)
          .then((res) => {
            console.log(res);
            if (res) window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      };
      reader.readAsDataURL(imageRef.current.files[0]);
      axiosClient
        .patch(`user/${user}`, { role: "seller" })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <PageTitle>Add New Product</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <HomeIcon className="w-5 h-5" aria-hidden="true" />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Add new Product</p>
      </div>

      <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-3 ">
        <Card className="row-span-2 md:col-span-2">
          <CardBody>
            <FormTitle>Product Image</FormTitle>
            <input
              type="file"
              className="mb-4 text-gray-800 dark:text-gray-300"
              ref={imageRef}
            />

            <FormTitle>Product Name</FormTitle>
            <Label>
              <Input
                className="mb-4"
                placeholder="Type product name here"
                ref={nameRef}
              />
            </Label>

            <FormTitle>Product Price</FormTitle>
            <Label>
              <Input
                className="mb-4"
                placeholder="Enter product price here"
                ref={priceRef}
              />
            </Label>

            <FormTitle>Description</FormTitle>
            <Label>
              <Textarea
                className="mb-4"
                rows="3"
                placeholder="Enter product short description here"
                ref={descriptionRef}
              />
            </Label>

            <FormTitle>Stock Qunatity</FormTitle>
            <Label>
              <Input
                className="mb-4"
                placeholder="Enter product stock quantity"
                ref={quantityRef}
              />
            </Label>

            <FormTitle>Detail</FormTitle>
            <Label>
              <Textarea
                className="mb-4"
                rows="5"
                placeholder="Enter product full description here"
                ref={detailRef}
              />
            </Label>
          </CardBody>
        </Card>

        <Card className="h-48">
          <CardBody>
            <div className="flex mb-8">
              <Button
                layout="primary"
                className="mr-3"
                iconLeft={BarsArrowUpIcon}
                onClick={handleSubmit}
              >
                Publish
              </Button>
              <Button layout="link" iconLeft={ArchiveBoxIcon}>
                Save as Draft
              </Button>
            </div>
            <Label className="mt-4">
              <FormTitle>Select Product Category</FormTitle>
              <Select className="mt-1" ref={categoryRef}>
                {categories?.map((category, i) => {
                  return (
                    <option key={i} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </Select>
            </Label>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;
