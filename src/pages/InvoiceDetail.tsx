/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, Fragment, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getTheme } from "../utils/theme";
import EditBillForm from "../components/EditBillForm";

const InvoiceDetail = () => {
  const [globalTheme, setGlobalTheme] = useState("");
  const root = document.documentElement;

  const [billForm, showBillForm] = useState(false);

  useEffect(() => {
    const theme = getTheme();
    setGlobalTheme(theme);
    switch (theme) {
      case "dark":
        root.className = "dark";
        window.localStorage.setItem("theme", "dark");

        break;
      case "light":
        root.className = "light";
        window.localStorage.setItem("theme", "light");

        break;
      default:
        window.localStorage.removeItem("theme");
        break;
    }
  }, [globalTheme, root]);

  const [invoiceDetailInfo, setDetailInvoiceInfo] = useState<any>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(
      window.localStorage.getItem("invoice") as string | any
    );

    const invoice = data.filter((data: any) => data.id === id);
    setDetailInvoiceInfo(invoice[0]);
  }, [id]);

  const deleteInvoice = () => {
    const data = JSON.parse(
      window.localStorage.getItem("invoice") as string | any
    );

    const updatedInvoice = data.filter((data: any) => data.id !== id);
    window.localStorage.setItem("invoice", JSON.stringify(updatedInvoice));
    navigate("/", { replace: true });
  };

  const markAsPaid = () => {
    const updatedDetail = {
      streetAddressFrom:
        invoiceDetailInfo.invoiceInfo.details.streetAddressFrom,
      cityFrom: invoiceDetailInfo.invoiceInfo.details.cityFrom,
      countryFrom: invoiceDetailInfo.invoiceInfo.details.countryFrom,
      clientName: invoiceDetailInfo.invoiceInfo.details.clientName,
      clientEmail: invoiceDetailInfo.invoiceInfo.details.clientEmail,
      streetAddressTo: invoiceDetailInfo.invoiceInfo.details.streetAddressTo,
      cityTo: invoiceDetailInfo.invoiceInfo.details.cityTo,
      countryTo: invoiceDetailInfo.invoiceInfo.details.countryTo,
      invoiceDate: invoiceDetailInfo.invoiceInfo.details.invoiceDate,
      status: "Success",
    };
    const data = JSON.parse(
      window.localStorage.getItem("invoice") as string | any
    );

    const updatedInvoice = data.filter((data: any) => data.id !== id);

    const formData = {
      id,
      totalPrice: invoiceDetailInfo.totalPrice,
      invoiceInfo: {
        details: updatedDetail,
        productList: invoiceDetailInfo.invoiceInfo.productList,
      },
    };

    updatedInvoice.unshift(formData);

    window.localStorage.setItem("invoice", JSON.stringify(updatedInvoice));
    navigate("/", { replace: true });
  };

  const toggleEditBill = () => showBillForm(!billForm);

  const contentRef = useRef<HTMLDivElement | null>(null);

  // Function to handle printing
  const handlePrint = () => {
    if (contentRef.current) {
      const content = contentRef.current?.innerHTML;
      const originalDocument = document.body.innerHTML;
      document.body.innerHTML = content;
      window.print();
      document.body.innerHTML = originalDocument;
    }
  };

  return (
    <>
      {billForm && (
        <EditBillForm
          id={id}
          invoiceDetailInfo={invoiceDetailInfo}
          close={toggleEditBill}
        />
      )}
      {invoiceDetailInfo.length === 0 ? (
        <div className="grid place-content-center my-16">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {" "}
          <div className="font-GeneralSans lg:px-16 sm:px-8 px-2 lg:py-8 py-8 bg-white dark:bg-[#0e1111]">
            <div className="w-5/5 lg:w-[65%] mx-auto">
              <div className="flex flex-row items-center justify-between">
                <Link
                  to="/"
                  className="flex flex-row items-center gap-2 font-semibold"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="rotate-90 transition-all duration-150 ease-linear dark:[&>path]:fill-white"
                  >
                    <path
                      d="M3.19841 6.20675C3.43891 5.95614 3.81525 5.93336 4.08045 6.1384L4.15643 6.20675L10 12.2955L15.8436 6.20675C16.0841 5.95614 16.4604 5.93336 16.7256 6.1384L16.8016 6.20675C17.0421 6.45735 17.064 6.84951 16.8672 7.12585L16.8016 7.20502L10.479 13.7933C10.2385 14.0439 9.86217 14.0666 9.59697 13.8616L9.52099 13.7933L3.19841 7.20502C2.93386 6.92935 2.93386 6.48241 3.19841 6.20675Z"
                      fill="#0D062D"
                    />
                  </svg>
                  <div className="text-black dark:text-white">Go back</div>
                </Link>
                <div
                  onClick={handlePrint}
                  className="px-5 py-2 bg-gray-100 text-sm text-black font-semibold rounded-full cursor-pointer flex flex-row items-center gap-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-printer-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1" />
                    <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                  </svg>
                  <span>Print</span>
                </div>
              </div>
              <div className="mt-8 p-4 flex flex-row flex-wrap items-center justify-between gap-2 bg-white text-black dark:text-white dark:bg-slate-800/40 shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] rounded-lg">
                <div className="flex sm:flex-row flex-col sm:items-center items-start justify-between w-full gap-4">
                  <div className="flex flex-row items-center gap-4">
                    <div className="font-semibold">Status</div>
                    <div
                      className={`px-5 py-2 bg-green-100/40 dark:bg-gray-100 text-sm rounded-lg font-semibold ${
                        invoiceDetailInfo.invoiceInfo.details.status ===
                        "Success"
                          ? "text-[#34CAA5]"
                          : invoiceDetailInfo.invoiceInfo.details.status ===
                            "Failed"
                          ? "text-[#ED544E]"
                          : "text-yellow-400"
                      }`}
                    >
                      {invoiceDetailInfo.invoiceInfo.details.status}
                    </div>
                  </div>
                  <div className="lg:mt-0 mt-3 w-full flex flex-row items-center lg:justify-end sm:justify-end justify-start gap-4">
                    <div
                      onClick={toggleEditBill}
                      className="px-5 py-2 bg-gray-100 text-sm text-black font-semibold rounded-full cursor-pointer"
                    >
                      Edit
                    </div>
                    <div
                      onClick={deleteInvoice}
                      className="px-5 py-2 bg-red-500 text-sm text-white font-semibold rounded-full cursor-pointer"
                    >
                      Delete
                    </div>
                    {invoiceDetailInfo.invoiceInfo.details.status !==
                    "Success" ? (
                      <div
                        onClick={markAsPaid}
                        className="px-5 py-2 bg-green-100/40 dark:bg-green-500 text-sm font-semibold rounded-full cursor-pointer"
                      >
                        Mark as Paid
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div ref={contentRef}>
                <div className="mt-6 lg:p-8 p-4 flex flex-row flex-wrap items-center justify-between gap-2 bg-white dark:print:bg-black dark:bg-slate-800/40 dark:text-white shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] rounded-lg print:rounded-none print:shadow-none">
                  <div className="flex sm:flex-row flex-col sm:items-start items-start justify-between w-full gap-4">
                    <p className="lg:text-2xl text-2xl font-semibold">
                      #{invoiceDetailInfo.id}
                    </p>
                    <div className="lg:text-end text-start text-[0.95em] text-slate-600 dark:text-white">
                      <p>
                        {
                          invoiceDetailInfo.invoiceInfo.details
                            .streetAddressFrom
                        }
                      </p>
                      <p>{invoiceDetailInfo.invoiceInfo.details.cityFrom}</p>
                      <p>{invoiceDetailInfo.invoiceInfo.details.countryFrom}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-8 gap-4 w-full">
                    <div className="lg:col-span-2 sm:col-span-4 col-span-8">
                      <div className="mt-4 text-base font-semibold">
                        Invoice Date
                      </div>
                      <p className="text-slate-600 dark:text-white text-[0.95em]">
                        {new Date(
                          invoiceDetailInfo.invoiceInfo.details.invoiceDate
                        ).toDateString()}
                      </p>
                    </div>
                    <div className="lg:col-span-2 sm:col-span-4 col-span-8">
                      <div className="mt-4 text-base font-semibold">
                        Bill To
                      </div>
                      <p className="text-slate-600 dark:text-white text-[0.95em]">
                        {invoiceDetailInfo.invoiceInfo.details.clientName}
                      </p>
                    </div>
                    <div className="lg:col-span-2 sm:col-span-4 col-span-8">
                      <div className="mt-4 text-base font-semibold">
                        Sent To
                      </div>
                      <p className="text-slate-600 dark:text-white text-[0.95em]">
                        {invoiceDetailInfo.invoiceInfo.details.clientEmail}
                      </p>
                    </div>
                    <div className="lg:col-span-2 sm:col-span-4 col-span-8">
                      <div className="mt-4 text-base font-semibold lg:text-end text-start">
                        Address
                      </div>
                      <div className="lg:text-end text-start text-[0.95em] text-slate-600 dark:text-white">
                        <p>
                          {
                            invoiceDetailInfo.invoiceInfo.details
                              .streetAddressTo
                          }
                        </p>
                        <p>{invoiceDetailInfo.invoiceInfo.details.cityTo}</p>
                        <p>{invoiceDetailInfo.invoiceInfo.details.countryTo}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-slate-100/50 dark:bg-[#0e1111] w-full lg:p-6 p-4 rounded-xl">
                    <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] my-3">
                      <table className="table-auto overflow-x-auto w-full divide-y divide-gray-100 text-sm">
                        <thead>
                          <tr className="text-[#9CA4AB] flex flex-row items-center justify-between mb-3 gap-4">
                            <th className="w-44 text-start font-semibold">
                              Name
                            </th>
                            <th className="w-16 text-center font-semibold">
                              Quantity
                            </th>
                            <th className="w-28 text-end font-semibold">
                              Price
                            </th>
                            <th className="w-28 text-end font-semibold">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-base divide-y divide-gray-100">
                          {invoiceDetailInfo.invoiceInfo.productList.map(
                            (data: any, index: number) => {
                              return (
                                <Fragment key={index}>
                                  <tr className="flex flex-row items-center justify-between py-[0.73rem] gap-3">
                                    <td className="w-44 text-start">
                                      <p className="font-medium">
                                        {data.productName}
                                      </p>
                                    </td>
                                    <td className="w-16 text-center font-semibold">
                                      {data.quantity}
                                    </td>
                                    <td className="w-28 text-end font-semibold">
                                      ₦{" "}
                                      {new Intl.NumberFormat("en-US").format(
                                        data.price
                                      )}
                                    </td>
                                    <td className="w-28 text-end font-semibold">
                                      ₦{" "}
                                      {new Intl.NumberFormat("en-US").format(
                                        data.quantity * data.price
                                      )}
                                    </td>
                                  </tr>
                                </Fragment>
                              );
                            }
                          )}
                          <tr className="mt-6 bg-slate-700 dark:bg-slate-800/40 text-white sm:py-4 py-3 px-4 flex flex-row items-center justify-between gap-3 rounded-lg">
                            <td className="text-start">
                              <p className="font-medium dark:font-semibold text-lg">
                                Total Amount
                              </p>
                            </td>
                            <td className="lg:text-end text-start">
                              <p className="font-medium dark:font-semibold lg:text-3xl text-2xl">
                                ₦{" "}
                                {new Intl.NumberFormat("en-US").format(
                                  invoiceDetailInfo.totalPrice
                                )}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default InvoiceDetail;
