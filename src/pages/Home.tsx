/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BillForm from "../components/BillForm";
import ThemeChanger from "../components/ThemeChanger";

const Home = () => {
  const [invoiceList, setInvoiceList] = useState<any>([]);
  const [filteredList, setFilteredList] = useState<any>([]);
  const [billForm, showBillForm] = useState(false);
  const addInvoice = () => showBillForm(true);
  const close = () => showBillForm(false);

  const filterBy = [
    { id: 1, name: "All" },
    { id: 2, name: "Pending" },
    { id: 3, name: "Success" },
    { id: 4, name: "Failed" },
  ];

  const selectFilter = (res: any) => {
    if (res.name === "All") {
      setFilteredList(invoiceList);
    } else {
      const filteredData = invoiceList.filter(
        (data: any) => data.invoiceInfo.details.status === res.name
      );
      setFilteredList(filteredData);
    }
  };

  useEffect(() => {
    const data = JSON.parse(
      window.localStorage.getItem("invoice") as string | any
    );
    data ? setInvoiceList(data) : setInvoiceList([]);
    setFilteredList(data);
  }, [billForm]);
  return (
    <>
      {billForm && <BillForm close={close} />}
      <div className="font-GeneralSans text-black dark:text-white lg:px-16 sm:px-8 px-4 lg:pt-2 lg:pb-24 pt-2 pb-20">
        <ThemeChanger />
        <div className="">
          <div className="w-5/5 lg:w-[65%] mt-6 mx-auto">
            <div className="flex lg:flex-row flex-col lg:items-center items-start lg:gap-0 gap-3 justify-between">
              <div className="flex flex-col items-start gap-1">
                <h1 className="lg:text-5xl text-xl font-semibold">Invoice</h1>
                <p className="text-base text-slate-400">
                  You have {invoiceList?.length ? invoiceList?.length : 0} total
                  invoices
                </p>
              </div>
              <div className="flex flex-row items-center lg:justify-end justify-between gap-6 lg:w-3/5 w-full">
                <div className="flex flex-row items-center justify-between gap-3 relative [&>ul]:hover:block [&>svg]:hover:rotate-180 cursor-pointer">
                  <p className="flex flex-row gap-1 text-base font-semibold">
                    Filter <span className="lg:block hidden">by status</span>
                  </p>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="me-2 dark:[&>path]:fill-white"
                  >
                    <path
                      d="M3.19841 6.20675C3.43891 5.95614 3.81525 5.93336 4.08045 6.1384L4.15643 6.20675L10 12.2955L15.8436 6.20675C16.0841 5.95614 16.4604 5.93336 16.7256 6.1384L16.8016 6.20675C17.0421 6.45735 17.064 6.84951 16.8672 7.12585L16.8016 7.20502L10.479 13.7933C10.2385 14.0439 9.86217 14.0666 9.59697 13.8616L9.52099 13.7933L3.19841 7.20502C2.93386 6.92935 2.93386 6.48241 3.19841 6.20675Z"
                      fill="#0D062D"
                    />
                  </svg>

                  <ul className="hidden absolute lg:top-6 lg:right-0 top-6 -right-[98%] bg-white dark:bg-[#0e1111] dark:border-[1px] dark:border-gray-50 shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] w-36 rounded-xl text-sm flex-col z-10">
                    {filterBy.map((data) => {
                      return (
                        <Fragment key={data.id}>
                          <li
                            onClick={() => selectFilter(data)}
                            className="my-2 px-5 py-1 hover:bg-gray-100 dark:hover:bg-[#34CAA5]"
                          >
                            {data.name}
                          </li>
                        </Fragment>
                      );
                    })}
                  </ul>
                </div>
                <div
                  onClick={addInvoice}
                  className="flex flex-row items-center justify-between gap-3 cursor-pointer bg-[#34CAA5] p-1 rounded-full"
                >
                  <div className="p-[0.4rem] bg-white rounded-full grid-place-content-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.99935 4.1665V15.8332M4.16602 9.99984H15.8327"
                        stroke="#667085"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <p className="flex flex-row gap-1 text-sm font-normal me-2 text-white">
                    New <span className="block">invoice</span>
                  </p>
                </div>
              </div>
            </div>
            {invoiceList.length === 0 ? null : (
              <>
                {filteredList.length === 0 && (
                  <h1 className="mt-8 text-2xl text-center font-semibold">
                    No invoice found
                  </h1>
                )}
              </>
            )}

            <div className="lg:mt-14 mt-8 space-y-6">
              {invoiceList.length === 0 ? (
                <h1 className="text-2xl text-center font-semibold">
                  No invoice added
                </h1>
              ) : (
                <>
                  {filteredList.map((data: any) => {
                    return (
                      <Fragment key={data.id}>
                        <Link
                          to={`/invoice/${data.id}`}
                          className="p-4 flex flex-row flex-wrap items-center justify-between gap-2 cursor-pointer bg-white dark:bg-slate-800/40 dark:text-white shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] rounded-lg [&>*>svg]:hover:translate-x-1"
                        >
                          <div className="lg:w-28 sm:w-32 w-[48%] font-semibold text-base">
                            #{data.id}
                          </div>
                          <div className="lg:w-32 sm:w-32 w-[48%] text-slate-400 text-[0.94em]">
                            {new Date(
                              data.invoiceInfo.details.invoiceDate
                            ).toDateString()}
                          </div>
                          <div className="lg:w-28 sm:w-[50%] w-full text-slate-400 text-base flex flex-row gap-2">
                            <span className="lg:block hidden">
                              {data.invoiceInfo.details.clientName.substring(
                                0,
                                9
                              )}
                              {data.invoiceInfo.details.clientName.length >=
                                8 && "..."}
                            </span>
                            <span className="lg:hidden block">
                              {data.invoiceInfo.details.clientName}
                            </span>
                          </div>
                          <div className="lg:w-[6.5rem] w-[48%] lg:text-end text-start font-semibold text-black dark:text-white text-xl">
                            ₦{" "}
                            {new Intl.NumberFormat("en-US").format(
                              data.totalPrice
                            )}
                          </div>
                          <div className="lg:w-36 w-[48%] flex flex-row items-center justify-end lg:gap-6 gap-3">
                            <div
                              className={`px-5 py-2 bg-green-100/40 dark:bg-gray-100 text-sm rounded-lg ${
                                data.invoiceInfo.details.status === "Success"
                                  ? "text-[#34CAA5]"
                                  : data.invoiceInfo.details.status === "Failed"
                                  ? "text-[#ED544E]"
                                  : "text-yellow-400"
                              }`}
                            >
                              {data.invoiceInfo.details.status}
                            </div>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="-rotate-90 transition-all duration-150 ease-linear dark:[&>path]:fill-white"
                            >
                              <path
                                d="M3.19841 6.20675C3.43891 5.95614 3.81525 5.93336 4.08045 6.1384L4.15643 6.20675L10 12.2955L15.8436 6.20675C16.0841 5.95614 16.4604 5.93336 16.7256 6.1384L16.8016 6.20675C17.0421 6.45735 17.064 6.84951 16.8672 7.12585L16.8016 7.20502L10.479 13.7933C10.2385 14.0439 9.86217 14.0666 9.59697 13.8616L9.52099 13.7933L3.19841 7.20502C2.93386 6.92935 2.93386 6.48241 3.19841 6.20675Z"
                                fill="#0D062D"
                              />
                            </svg>
                          </div>
                        </Link>
                      </Fragment>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
