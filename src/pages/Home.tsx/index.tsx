import { BsPersonCircle } from "react-icons/bs";
import { MdDashboard, MdMail, MdPushPin } from "react-icons/md";
import { BsPersonStanding } from "react-icons/bs";
import { BsPersonStandingDress } from "react-icons/bs";
import { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import FileUpload from "../../components/File";
import { addRefugeeRequest } from "../../util/service/refugee";
import { useForm } from "react-hook-form";

type FormInputs = {
  first_name: string;
  last_name: string;
  gender_id: string;
  date_of_birth: string; // You can use Date if the string will be converted to a Date object
  nationality_id: string;
  marital_status_id: string;
  service_issued_id_number: string;
  service_issued_id_date_of_issue: string;
  service_issued_id_date_of_expiry: string;
  start_date: string;
  duration_requested_years: number;
  highest_level_of_education: string;
  year_completed: string;
  professional_skill: string;
  is_spouse_or_child_citizen_et: boolean;
  preferred_job_title: string;
  created_by: string;
};
const Home = () => {
  const [selected, setSelected] = useState(null);

  const handleButtonClick = (buttonId: any) => {
    setSelected(selected === buttonId ? null : buttonId);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    addRefugeeRequest({ ...data });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex justify-center items-center"
    >
      <div className="flex  justify-center  bg-gray-100">
        <div className="bg-white p-4  shadow-lg shadow-gray-400/50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2 text-[#2C7DD6]">
            Refugee Registeration
          </h2>
          <p className="text-gray-300 text-[12px]">
            Organization must fulfill the expatriates personal information in
            order to <br />
            create the work permit process.
          </p>

          <div className="flex flex-row mt-14">
            <div className="flex flex-row mt-10">
              <div>
                <BsPersonCircle className=" text-[#2C7FE0] mt-1" />
              </div>
              <div className="flex flex-col ml-2">
                <div className="text-[15px] font-bold text-gray-500 ">
                  Refugee Picture
                </div>
                <div className="text-[12px] text-gray-300">
                  Enter applicants Profile Picture,
                  <br />
                  once you upload the file{" "}
                </div>
              </div>
            </div>
            <div className="ml-10">
              <img
                src="https://pics.craiyon.com/2023-11-26/oMNPpACzTtO5OVERUZwh3Q.webp"
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col  ">
            <hr className="my-4 border-t border-gray-300" />
            <div className="flex flex-row mt-10 space-x-0">
              <div className="flex flex-row ">
                <div>
                  <MdMail className=" text-[#2C7FE0] mt-1" />
                </div>
                <div className="flex flex-col ml-2">
                  <div className="text-[15px] font-bold text-gray-500 ">
                    Refugee Name <span className="text-red">*</span>
                  </div>
                  <div className="text-[12px] text-gray-300">
                    Enter Applicant’s Full Name
                  </div>
                </div>
              </div>
              <div className="flex flex-row ">
                <div>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50  ml-10 border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="Middle_Name"
                    className="bg-gray-50  ml-10 border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Middle Name"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="Last_Name"
                    className="bg-gray-50  ml-10 border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
            </div>
            <hr className="my-4 border-t border-gray-300 mt-10" />
            <div className="mt-10">
              <h2 className="text-md font-semibold mb-2 text-[#2C7DD6]">
                Basic Refugee Registration
              </h2>
            </div>

            <div className="flex flex-row mt-10space-x-14">
              <div className="flex flex-row">
                <div>
                  <BsPersonStanding className=" text-[#2C7FE0] mt-1" />
                </div>
                <div>
                  <BsPersonStandingDress className=" text-[#2C7FE0] mt-1" />
                </div>
                <div className="ml-3">Gender *</div>
              </div>
              <div className="flex flex-row  space-x-4 ml-28">
                <button
                  onClick={() => handleButtonClick("button1")}
                  className={`${
                    selected === "button1"
                      ? "text-blue-500 border-blue-500  "
                      : "border-gray-200 text-gray-800"
                  } p-3 rounded-lg  border-2 w-24 text-[12px] focus:outline-none`}
                >
                  Male
                </button>
                <button
                  onClick={() => handleButtonClick("button2")}
                  className={`${
                    selected === "button2"
                      ? "text-blue-500 border-blue-500"
                      : "border-gray-200 text-gray-800"
                  } p-3 rounded-lg  border-2 text-[12px]  w-24 focus:outline-none`}
                >
                  Female
                </button>
              </div>
              <div className="flex flex-row  ml-16 ">
                <div>
                  <IoCalendarOutline className=" text-[#2C7FE0] mt-1" />
                </div>
                <div className="flex flex-col ml-2">
                  <div className="text-[15px] font-bold text-gray-500 ">
                    Date of Birth *
                  </div>
                  <div className="text-[12px] text-gray-300">
                    Enter Applicant’s Birth Date
                  </div>
                </div>
              </div>
              <div className="relative max-w-sm ml-3">
                <input
                  id="datepicker-format"
                  datepicker-format="mm-dd-yyyy"
                  type="date"
                  className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date"
                />
              </div>
            </div>

            <div className="flex flex-row mt-10 ">
              <div className="flex flex-row">
                <FaPhone className=" text-[#2C7FE0] mt-1" />

                <div className="flex flex-col ml-2">
                  <div className="ml-3">Nationality*</div>
                  <div className="text-gray-300 text-[12px]">
                    Country of Birth
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center ml-[10%] ">
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Country"
                  required
                />
              </div>
              <div className="flex flex-row  ml-[7%] ">
                <div>
                  <BsPersonStanding className=" text-[#2C7FE0] mt-1" />
                </div>
                <div>
                  <BsPersonStandingDress className=" text-[#2C7FE0] mt-1" />
                </div>
                <div className="flex flex-col ">
                  <div className="text-[15px] font-bold text-gray-500 ">
                    Martial Status *
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center ml-14">
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Martial Status"
                  required
                />
              </div>
            </div>

            <div className="flex flex-row mt-10 space-x-14">
              <div className="flex flex-row">
                <div>
                  <MdDashboard className=" text-[#2C7FE0] mt-1" />
                </div>

                <div className="ml-3">
                  <div className="flex flex-col">
                    <div>
                      Proof of Ethiopian
                      <br /> Spouse / Child
                    </div>
                    <div className="text-gray-300 text-[12px] mt-3">
                      Accepted File types
                    </div>
                    <div className="flex flex-row ml-2">
                      <div>
                        <MdPushPin className="text-gray-300 text-[12px] mt-1" />
                      </div>
                      <div className="text-gray-300 text-[12px]">
                        pdf l doc{" "}
                      </div>
                    </div>
                    <div className="flex flex-row ml-2">
                      <div>
                        <MdPushPin className="text-gray-300 text-[12px] mt-1" />
                      </div>
                      <div className="text-gray-300 text-[12px]">
                        jpeg | jpg | png{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row  space-x-4">
                <div className="flex flex-col items-center ">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full  rounded-lg cursor-pointer  bg-[#E5EDF5] hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-300 font-[12px]">
                          Click to choose document type
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="ml-3">
                <div className="flex flex-col">
                  <div>Service Issued ID</div>
                  <div className="text-gray-300 text-[12px] mt-3">
                    Accepted File types
                  </div>
                  <div className="flex flex-row ml-2">
                    <div>
                      <MdPushPin className="text-gray-300 text-[12px] mt-1" />
                    </div>
                    <div className="text-gray-300 text-[12px]">pdf l doc </div>
                  </div>
                  <div className="flex flex-row ml-2">
                    <div>
                      <MdPushPin className="text-gray-300 text-[12px] mt-1" />
                    </div>
                    <div className="text-gray-300 text-[12px]">
                      jpeg | jpg | png{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative max-w-sm ">
                <label className="flex flex-col items-center justify-center w-full  rounded-lg cursor-pointer  bg-[#E5EDF5] hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-300 font-[12px]">
                      Click to choose document type
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>

            <hr className="my-4 border-t border-gray-300 mt-10" />
            <div className="mt-10">
              <h2 className="text-md font-semibold mb-2 text-[#2C7DD6]">
                Educational Information
              </h2>
            </div>

            <div className="flex flex-row mt-10 ">
              <div className="flex flex-row">
                <MdDashboard className=" text-[#2C7FE0] mt-1" />

                <div className="flex flex-col ml-2">
                  <div className="ml-3">Institute Name</div>
                </div>
              </div>
              <div className="flex flex-col items-center  ml-32">
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Institute"
                  required
                />
              </div>
              <div className="flex flex-row   ml-14">
                <div>
                  <MdDashboard className=" text-[#2C7FE0] mt-1" />
                </div>

                <div className="flex flex-col ">
                  <div className="text-[15px] font-bold text-gray-500 ml-2 ">
                    Field of Study
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center ml-10">
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Field"
                  required
                />
              </div>
            </div>
            <div className="flex flex-row mt-10 ">
              <div className="flex flex-row ">
                <MdDashboard className=" text-[#2C7FE0] mt-1" />

                <div className="flex flex-col ml-2">
                  <div className="ml-3">Highest Education Level</div>
                </div>
              </div>
              <div className="flex flex-col items-center  ml-14 ">
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Education"
                  required
                />
              </div>
              <div className="flex flex-row ml-14">
                <div>
                  <MdDashboard className=" text-[#2C7FE0] mt-1" />
                </div>

                <div className="flex flex-col ">
                  <div className="flex flex-col">
                    <div className="text-[15px] font-bold text-gray-500 ml-2 ">
                      Year Completed
                    </div>
                    <div className="font-[12px] text-gray-300">
                      Enter Applicant’s
                      <br /> Year comp.
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center ml-9">
                <input
                  type="date"
                  id="first_name"
                  className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Year"
                  required
                />
              </div>
            </div>
            <div className="flex flex-row mt-10 space-x-14">
              <div className="flex flex-row">
                <div>
                  <MdDashboard className=" text-[#2C7FE0] mt-1" />
                </div>

                <div className="ml-3">
                  <div className="flex flex-col">
                    <div>Education Documents</div>
                    <div className="text-gray-300 text-[12px] mt-3">
                      Accepted File types
                    </div>
                    <div className="flex flex-row ml-2">
                      <div>
                        <MdPushPin className="text-gray-300 text-[12px] mt-1" />
                      </div>
                      <div className="text-gray-300 text-[12px]">
                        pdf l doc{" "}
                      </div>
                    </div>
                    <div className="flex flex-row ml-2">
                      <div>
                        <MdPushPin className="text-gray-300 text-[12px] mt-1" />
                      </div>
                      <div className="text-gray-300 text-[12px]">
                        jpeg | jpg | png{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row  ml-50">
                <div className="flex flex-col items-center ">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full  rounded-lg cursor-pointer  bg-[#E5EDF5] hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-300 font-[12px]">
                          Click to choose document type
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-4 border-t border-gray-300 mt-10" />
            <div className="mt-10">
              <h2 className="text-md font-semibold mb-2 text-[#2C7DD6]">
                Work Experience
              </h2>
            </div>

            <div className="flex flex-row mt-10 ">
              <div className="flex flex-row">
                <MdDashboard className=" text-[#2C7FE0] mt-1" />

                <div className="flex flex-col ml-2">
                  <div className="ml-3">Organization</div>
                </div>
              </div>
              <div className="flex flex-col items-center ml-20 ">
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Organization"
                  required
                />
              </div>
              <div className="flex flex-row  ml-16">
                <div>
                  <MdDashboard className=" text-[#2C7FE0] mt-1" />
                </div>

                <div className="flex flex-col ">
                  <div className="text-[15px] font-bold text-gray-500 ml-2 ">
                    Industry Sector
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border ml-14  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Skill"
                  required
                />
              </div>
            </div>
            <div className="flex flex-row mt-10 ">
              <div className="flex flex-row">
                <MdDashboard className=" text-[#2C7FE0] mt-1" />

                <div className="flex flex-col ml-1">
                  <div className="ml-3">Professional Skill</div>
                </div>
              </div>
              <div className="flex flex-col items-center ">
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border ml-[54%] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Skill"
                  required
                />
              </div>
              <div className="flex flex-row ml-[13%]">
                <div>
                  <MdDashboard className=" text-[#2C7FE0] mt-1" />
                </div>

                <div className="flex flex-col ">
                  <div className="text-[15px] font-bold text-gray-500 ml-1 ">
                    Preferred Job Title
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border ml-11 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Job Title"
                  required
                />
              </div>
            </div>

            <div className="flex flex-row mt-10 ">
              <div className="flex flex-row">
                <MdDashboard className=" text-[#2C7FE0] mt-1" />

                <div className="flex flex-col ml-2">
                  <div className="ml-3">Gross Salary</div>
                </div>
              </div>
              <div className="flex flex-col items-center ">
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 ml-[75%] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Amount in ETB"
                  required
                />
              </div>
              <div className="flex flex-row ml-36">
                <div>
                  <MdDashboard className=" text-[#2C7FE0] mt-1" />
                </div>

                <div className="">
                  <div className="flex flex-col">
                    <div>Curriculum Vitae</div>
                    <div className="text-gray-300 text-[12px] mt-3">
                      Accepted File types
                    </div>
                    <div className="flex flex-row ml-2">
                      <div>
                        <MdPushPin className="text-gray-300 text-[12px] mt-1" />
                      </div>
                      <div className="text-gray-300 text-[12px]">
                        pdf l doc{" "}
                      </div>
                    </div>
                    <div className="flex flex-row ml-2">
                      <div>
                        <MdPushPin className="text-gray-300 text-[12px] mt-1" />
                      </div>
                      <div className="text-gray-300 text-[12px]">
                        jpeg | jpg | png{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row  space-x-4 ml-3">
                <div className="flex flex-col items-center ">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full  rounded-lg cursor-pointer  bg-[#E5EDF5] hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-300 font-[12px]">
                          Click to choose document type
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 mt-10 w-96 justify-end">
            <button className="flex-1 bg-white border border-[#2C7DD6] text-[#2C7DD6] py-2 px-4 rounded-md">
              Cancel
            </button>
            <button className="flex-1 bg-[#3170B5] text-white py-2 px-4 rounded-md">
              Continue
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Home;
