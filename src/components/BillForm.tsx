/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, Fragment, useState } from "react";
import ShortUniqueId from "short-unique-id";

interface IBillForm {
  close: () => void;
}

const BillForm = (props: IBillForm) => {
  const invoiceInfoList: any = window.localStorage.getItem("invoice")
    ? JSON.parse(window.localStorage.getItem("invoice") as string | any)
    : [];

  const [details, setDetails] = useState({
    streetAddressFrom: "",
    cityFrom: "",
    countryFrom: "",
    clientName: "",
    clientEmail: "",
    streetAddressTo: "",
    cityTo: "",
    countryTo: "",
    invoiceDate: "",
    status: "Pending",
  });

  const statusOptions = [
    { id: 1, name: "Pending" },
    { id: 2, name: "Success" },
    { id: 3, name: "Failed" },
  ];

  const uid = new ShortUniqueId({ length: 10 });

  const userFormHandler = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = evt.target;

    setDetails((prev) => ({ ...prev, [name]: value }));
  };
  const [productInput, showProductInput] = useState(false);
  const [data, setData] = useState<any>([
    { productName: "", price: "", quantity: "" },
  ]);

  const addProduct = () => {
    if (productInput) {
      const concateURL = [
        ...data,
        { productName: "", price: "", quantity: "" },
      ];
      setData(concateURL);
    } else {
      showProductInput(true);
    }
  };

  const delProduct = (evt: any, index: number) => {
    evt.preventDefault();
    const del = [...data];
    del.splice(index, 1);
    setData(del);
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = evt.target;
    const item = [...data];
    item[index][name] = value;
    setData(item);
  };

  const totalPrice = data.reduce(
    (acc: any, product: any) =>
      Number(acc) + Number(product.price) * Number(product.quantity),
    0
  );

  const submitHandler = (evt: any) => {
    evt.preventDefault();
    const formData = {
      id: uid.rnd(),
      totalPrice,
      invoiceInfo: { details, productList: data },
    };

    invoiceInfoList.unshift(formData);
    props.close();

    window.localStorage.setItem("invoice", JSON.stringify(invoiceInfoList));
  };

  return (
    <>
      <div className="font-GeneralSans fixed top-0 left-0 h-screen w-full bg-[#000000cc] z-50">
        <form
          onSubmit={submitHandler}
          className="lg:w-[40%] w-[90%] lg:h-[80%] h-[85%] fixed lg:top-[55%] top-[52%] lg:left-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] overflow-y-auto mx-auto lg:p-5 p-4 bg-white rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fillRule="evenodd"
            className="bi bi-x-lg absolute top-3 right-4"
            viewBox="0 0 16 16"
            onClick={props.close}
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>

          <h1 className="mt-6 mb-4 lg:text-2xl text-base font-bold">
            Bill From
          </h1>

          <label htmlFor="StreetAddressFrom" className="text-sm font-semibold">
            Street Address
          </label>
          <input
            type="text"
            id="StreetAddressFrom"
            name="streetAddressFrom"
            value={details.streetAddressFrom}
            onChange={userFormHandler}
            className="block w-full mt-1 mb-4 outline-none border-[1px] border-gray-300 focus:border-[#34CAA5] px-4 py-[0.4rem] rounded-lg placeholder:text-[#C4C4C4] placeholder:font-normal placeholder:text-sm lg:text-base text-sm"
            placeholder="TX993 William"
          />
          <div className="grid grid-cols-4 gap-4">
            <div className="lg:col-span-2 col-span-4">
              <label htmlFor="CityFrom" className="text-sm font-semibold">
                City
              </label>
              <input
                type="text"
                id="CityFrom"
                name="cityFrom"
                value={details.cityFrom}
                onChange={userFormHandler}
                className="block w-full mt-1 outline-none border-[1px] border-gray-300 focus:border-[#34CAA5] px-4 py-[0.4rem] rounded-lg placeholder:text-[#C4C4C4] placeholder:font-normal placeholder:text-sm lg:text-base text-sm"
                placeholder="London"
              />
            </div>
            <div className="lg:col-span-2 col-span-4">
              <label htmlFor="CountryFrom" className="text-sm font-semibold">
                Country
              </label>
              <input
                type="text"
                id="CountryFrom"
                name="countryFrom"
                value={details.countryFrom}
                onChange={userFormHandler}
                className="block w-full mt-1 outline-none border-[1px] border-gray-300 focus:border-[#34CAA5] px-4 py-[0.4rem] rounded-lg placeholder:text-[#C4C4C4] placeholder:font-normal placeholder:text-sm lg:text-base text-sm"
                placeholder="United Kingdom"
              />
            </div>
          </div>

          <h1 className="mt-10 mb-4 lg:text-2xl text-base font-bold">
            Bill To
          </h1>
          <label htmlFor="ClientName" className="text-sm font-semibold">
            Client's Name
          </label>
          <input
            type="text"
            id="ClientName"
            name="clientName"
            value={details.clientName}
            onChange={userFormHandler}
            className="block w-full mt-1 mb-4 outline-none border-[1px] border-gray-300 focus:border-[#34CAA5] px-4 py-[0.4rem] rounded-lg placeholder:text-[#C4C4C4] placeholder:font-normal placeholder:text-sm lg:text-base text-sm"
            placeholder="TX993 William"
          />

          <label htmlFor="ClientEmail" className="text-sm font-semibold">
            Client's Email
          </label>
          <input
            type="text"
            id="ClientEmail"
            name="clientEmail"
            value={details.clientEmail}
            onChange={userFormHandler}
            className="block w-full mt-1 mb-4 outline-none border-[1px] border-gray-300 focus:border-[#34CAA5] px-4 py-[0.4rem] rounded-lg placeholder:text-[#C4C4C4] placeholder:font-normal placeholder:text-sm lg:text-base text-sm"
            placeholder="client@gmail.com"
          />

          <label htmlFor="StreetAddressTo" className="text-sm font-semibold">
            Street Address
          </label>
          <input
            type="text"
            id="StreetAddressTo"
            name="streetAddressTo"
            value={details.streetAddressTo}
            onChange={userFormHandler}
            className="block w-full mt-1 mb-4 outline-none border-[1px] border-gray-300 focus:border-[#34CAA5] px-4 py-[0.4rem] rounded-lg placeholder:text-[#C4C4C4] placeholder:font-normal placeholder:text-sm lg:text-base text-sm"
            placeholder="TX993 William"
          />
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="lg:col-span-2 col-span-4">
              <label htmlFor="CityTo" className="text-sm font-semibold">
                City
              </label>
              <input
                type="text"
                id="CityTo"
                name="cityTo"
                value={details.cityTo}
                onChange={userFormHandler}
                className="block w-full mt-1 outline-none border-[1px] border-gray-300 focus:border-[#34CAA5] px-4 py-[0.4rem] rounded-lg placeholder:text-[#C4C4C4] placeholder:font-normal placeholder:text-sm lg:text-base text-sm"
                placeholder="London"
              />
            </div>
            <div className="lg:col-span-2 col-span-4">
              <label htmlFor="CountryTo" className="text-sm font-semibold">
                Country
              </label>
              <input
                type="text"
                id="CountryTo"
                name="countryTo"
                value={details.countryTo}
                onChange={userFormHandler}
                className="block w-full mt-1 outline-none border-[1px] border-gray-300 focus:border-[#34CAA5] px-4 py-[0.4rem] rounded-lg placeholder:text-[#C4C4C4] placeholder:font-normal placeholder:text-sm lg:text-base text-sm"
                placeholder="United Kingdom"
              />
            </div>
          </div>
          <label htmlFor="InvoiceDate" className="text-sm font-semibold">
            Invoice Date
          </label>
          <input
            type="date"
            id="InvoiceDate"
            name="invoiceDate"
            value={details.invoiceDate}
            onChange={userFormHandler}
            className="block w-full mt-1 mb-4 outline-none border-[1px] border-gray-300 focus:border-[#34CAA5] px-4 py-[0.4rem] rounded-lg placeholder:text-[#C4C4C4] placeholder:font-normal placeholder:text-sm lg:text-base text-sm"
          />
          <label htmlFor="Status" className="text-sm font-semibold">
            Status
          </label>
          <select
            id="Status"
            className="block w-full mt-1 mb-4 outline-none border-[1px] border-gray-300 focus:border-[#34CAA5] px-4 py-[0.4rem] rounded-lg lg:text-base text-sm"
            name="status"
            value={details.status}
            onChange={userFormHandler}
          >
            {statusOptions.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>

          {productInput && (
            <>
              <h1 className="mt-10 mb-4 lg:text-2xl text-base font-bold">
                Purchase Info
              </h1>
              {data.map((item: any, index: number) => (
                <Fragment key={index}>
                  <div className="grid lg:grid-cols-5 grid-cols-6 gap-4">
                    <div className="lg:col-span-2 col-span-6">
                      <label
                        htmlFor="ProductName"
                        className="text-sm font-semibold"
                      >
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="productName"
                        id="ProductName"
                        value={item.productName}
                        onChange={(evt) => handleChange(evt, index)}
                        className="block w-full mt-1 lg:mb-4 mb-0 outline-none border-[1px] border-gray-300 focus:border-[#34CAA5] px-4 py-[0.4rem] rounded-lg placeholder:text-[#C4C4C4] placeholder:font-normal placeholder:text-sm lg:text-base text-sm"
                      />
                    </div>
                    <div className="lg:col-span-2 col-span-3">
                      <label htmlFor="Price" className="text-sm font-semibold">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="Price"
                        value={item.price}
                        onChange={(evt) => handleChange(evt, index)}
                        className="block w-full mt-1 mb-4 outline-none border-[1px] border-gray-300 focus:border-[#34CAA5] px-4 py-[0.4rem] rounded-lg placeholder:text-[#C4C4C4] placeholder:font-normal placeholder:text-sm lg:text-base text-sm"
                      />
                    </div>
                    <div className="lg:col-span-1 col-span-3">
                      <label
                        htmlFor="Quantity"
                        className="text-sm font-semibold"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        id="Quantity"
                        value={item.quantity}
                        onChange={(evt) => handleChange(evt, index)}
                        className="block w-full mt-1 mb-4 outline-none border-[1px] border-gray-300 focus:border-[#34CAA5] px-4 py-[0.4rem] rounded-lg placeholder:text-[#C4C4C4] placeholder:font-normal placeholder:text-sm lg:text-base text-sm"
                      />
                    </div>
                  </div>
                  <button
                    className="py-2 px-6 rounded-md text-sm bg-black text-white mb-6"
                    onClick={(evt) => delProduct(evt, index)}
                  >
                    Remove
                  </button>
                </Fragment>
              ))}
            </>
          )}

          <div className="w-4/5 mx-auto mt-8 lg:mb-0 mb-6">
            {" "}
            <div
              onClick={addProduct}
              className="w-full text-center bg-white py-3 outline-none text-black text-sm font-medium rounded-lg border-[1px] border-black cursor-pointer"
            >
              Add Product Description
            </div>
          </div>
          <button className="w-full text-center bg-[#1b6956] py-3 outline-none text-white text-sm font-medium mt-6 lg:mb-0 mb-6 rounded-lg cursor-pointer">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default BillForm;
