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
import { AiOutlineDelete, AiOutlineUpload } from "react-icons/ai";
import { useSelect } from "@refinedev/core";
import Loader from "../../components/loader";

export const SELECT_QUERY = ["id", "name"];

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
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [selectedServiceDocument, setSelectedServiceDocument] =
    useState<any>(null);

  const [selectedEducationDocument, setSelectedEducationDocument] =
    useState<any>(null);
  const [selectedCurriculumDocument, setSelectedCurriculumDocument] =
    useState<any>(null);
  const [profileImage, setProfileImage] = useState(
    "https://pics.craiyon.com/2023-11-26/oMNPpACzTtO5OVERUZwh3Q.webp"
  );

  const { query: queryNationality } = useSelect<{ id: string; name: string }>({
    resource: "base_nationalities",
    meta: {
      fields: SELECT_QUERY,
    },
  });

  const { query: queryGender } = useSelect<{ id: string; name: string }>({
    resource: "base_genders",
    meta: {
      fields: SELECT_QUERY,
    },
  });

  const { query: queryMaritailStatus } = useSelect<{
    id: string;
    name: string;
  }>({
    resource: "base_marital_statuses",
    meta: {
      fields: SELECT_QUERY,
    },
  });

  // Handle the file upload and update the profile image
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file, "filefile");
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Preview the selected image
      setProfileImage(imageUrl); // Set the new profile image
    }
  };

  const handleCurriculumFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedCurriculumDocument(file); // Set selected document name
    }
  };

  // Handle remove document
  const handleRemoveCurriculumDocument = () => {
    setSelectedCurriculumDocument(null); // Remove selected document
  };

  const handleEducationFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedEducationDocument(file); // Set selected document name
    }
  };

  // Handle remove document
  const handleRemoveEducationDocument = () => {
    setSelectedEducationDocument(null); // Remove selected document
  };
  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedDocument(file); // Set selected document name
    }
  };

  // Handle remove document
  const handleRemoveServiceDocument = () => {
    setSelectedServiceDocument(null); // Remove selected document
  };
  const handleServiceFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedServiceDocument(file); // Set selected document name
    }
  };

  // Handle remove document
  const handleRemoveDocument = () => {
    setSelectedDocument(null); // Remove selected document
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  const handleButtonClick = (buttonId: any) => {
    setSelected(selected === buttonId ? null : buttonId);
  };
  const onSubmit = async (data: FormInputs) => {
    // addRefugeeRequest({ ...data });
    console.log(data, "yy");
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
            <div className="relative w-36 h-36 ml-10">
              {/* Profile Image */}
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />

              {/* Hidden file input for uploading */}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="imageUpload"
                onChange={handleImageChange} // Call function on file selection
              />

              {/* Upload Icon - only visible on hover */}
              <label
                htmlFor="imageUpload"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300"
              >
                <AiOutlineUpload className="text-white text-2xl" />
              </label>
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
                    {...register("first_name", { required: true })}
                    id="first_name"
                    className="bg-gray-50 ml-10 border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  {/* <input
                    type="text"
                    {...register("middle_name", { required: true })}
                    id="middle_name"
                    className="bg-gray-50 ml-10 border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Middle Name"
                  /> */}
                </div>
                <div>
                  <input
                    type="text"
                    {...register("last_name", { required: true })}
                    id="last_name"
                    className="bg-gray-50 ml-10 border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Last Name"
                  />
                </div>
              </div>
            </div>
            <hr className="my-4 border-gray-300 mt-10" />
            <div className="flex ">
              <div className="bg-white   rounded-lg">
                <h2 className="text-2xl font-semibold mb-2 text-[#2C7DD6]">
                  Refugee Registration
                </h2>
                <p className="text-gray-300 text-[12px]">
                  Organization must fulfill the expatriates personal information
                  in order to <br />
                  create the work permit process.
                </p>

                {/* Gender Selection Section */}
                <div className="flex flex-row mt-10 space-x-14">
                  <div className="flex flex-row items-center">
                    <div>
                      <BsPersonStanding className="text-[#2C7FE0] mt-1" />
                    </div>
                    <div>
                      <BsPersonStandingDress className="text-[#2C7FE0] mt-1" />
                    </div>
                    <div className="ml-3">Gender *</div>
                  </div>

                  <select
                    {...register("gender_id", {
                      required: "This field is required",
                    })}
                    className="ml-8 w-46 px-16 border-2  border-gray-300 rounded-lg "
                  >
                    {queryGender?.data?.data?.map(
                      (option: { name: string; id: string }) => (
                        <option
                          value={option.id}
                          key={option.id}
                          className="px-4"
                        >
                          {option.name}
                        </option>
                      )
                    )}
                  </select>

                  {/* Date of Birth Section */}
                  <div className="flex flex-row items-center ml-16">
                    <div>
                      <IoCalendarOutline className="text-[#2C7FE0] mt-1" />
                    </div>
                    <div className="flex flex-col ml-2">
                      <div className="text-[15px] font-bold text-gray-500">
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
                      {...register("date_of_birth", {
                        required: "Date of Birth is required",
                      })}
                      className=" w-46 px-6   bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                    />
                  </div>
                </div>
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

              <select
                {...register("nationality_id", {
                  required: "This field is required",
                })}
                className="ml-10  px-9 border-2  border-gray-300 rounded-lg "
              >
                {queryNationality?.data?.data?.map(
                  (option: { name: string; id: string }) => (
                    <option value={option.id} key={option.id} className="px-4">
                      {option.name}
                    </option>
                  )
                )}
              </select>

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
              <select
                {...register("marital_status_id", {
                  required: "This field is required",
                })}
                className="ml-20  px-9 border-2  border-gray-300 rounded-lg "
              >
                {queryMaritailStatus?.data?.data?.map(
                  (option: { name: string; id: string }) => (
                    <option value={option.id} key={option.id} className="px-4">
                      {option.name}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="flex flex-row mt-10 space-x-14">
              {/* Document Selection */}
              <div className="flex flex-row">
                <MdDashboard className="text-[#2C7FE0] mt-1" />
                <div className="ml-3">
                  <div>
                    Proof of Ethiopian <br />
                    Spouse / Child
                  </div>
                  <div className="text-gray-300 text-[12px] mt-3">
                    Accepted File types
                  </div>
                  <div className="flex flex-row ml-2">
                    <MdPushPin className="text-gray-300 text-[12px] mt-1" />
                    <span className="text-gray-300 text-[12px]">pdf | doc</span>
                  </div>
                  <div className="flex flex-row ml-2">
                    <MdPushPin className="text-gray-300 text-[12px] mt-1" />
                    <span className="text-gray-300 text-[12px]">
                      jpeg | jpg | png
                    </span>
                  </div>
                </div>
                <div className="flex flex-row  space-x-4 ml-3">
                  <div className="flex flex-col items-center ">
                    <div className="flex items-center justify-center w-full">
                      {!selectedDocument?.name ? (
                        <label className="flex flex-col items-center justify-center w-full rounded-lg cursor-pointer bg-[#E5EDF5] hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
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
                            name="preferred_job_title" // This will be used to map the file to a form field
                            className="hidden"
                            onChange={handleFileChange} // Handle file selection
                          />
                        </label>
                      ) : (
                        // Display selected document card with remove icon
                        <div className="flex flex-row items-center bg-gray-200 p-3 rounded-lg w-full">
                          <div className="flex flex-row items-center">
                            <svg
                              className="w-6 h-6 text-gray-500 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <span className="text-sm text-gray-700">
                              {selectedDocument?.name}
                            </span>
                          </div>
                          <AiOutlineDelete
                            className="text-red-500 ml-auto cursor-pointer"
                            size={20}
                            onClick={handleRemoveDocument} // Remove selected document
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Issued ID */}

              <div className="flex flex-row items-center mb-2">
                <div className="flex flex-row items-center">
                  <MdDashboard className="text-[#2C7FE0] mt-1" />
                  <div className="ml-3">
                    <div>Service Issued ID</div>
                    <div className="text-gray-300 text-[12px] mt-3">
                      Accepted File types
                    </div>
                    <div className="flex flex-row ml-2">
                      <MdPushPin className="text-gray-300 text-[12px] mt-1" />
                      <span className="text-gray-300 text-[12px]">
                        pdf | doc
                      </span>
                    </div>
                    <div className="flex flex-row ml-2">
                      <MdPushPin className="text-gray-300 text-[12px] mt-1" />
                      <span className="text-gray-300 text-[12px]">
                        jpeg | jpg | png
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row  space-x-4 ml-3">
                  {!selectedServiceDocument?.name ? (
                    <label className="flex flex-col items-center justify-center w-full rounded-lg cursor-pointer bg-[#E5EDF5] hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
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
                        name="preferred_job_title" // This will be used to map the file to a form field
                        className="hidden"
                        onChange={handleServiceFileChange} // Handle file selection
                      />
                    </label>
                  ) : (
                    // Display selected document card with remove icon
                    <div className="flex flex-row items-center bg-gray-200 p-3 rounded-lg w-full">
                      <div className="flex flex-row items-center">
                        <svg
                          className="w-6 h-6 text-gray-500 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <span className="text-sm text-gray-700">
                          {selectedServiceDocument?.name}
                        </span>
                      </div>
                      <AiOutlineDelete
                        className="text-red-500 ml-auto cursor-pointer"
                        size={20}
                        onClick={handleRemoveServiceDocument} // Remove selected document
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <hr className="my-4 border-t border-gray-300 mt-10" />
            <div className="mt-10">
              <h2 className="text-md font-semibold mb-2 text-[#2C7DD6]">
                Educational Information
              </h2>
            </div>

            <div className="flex flex-row mt-10">
              <div className="flex flex-row">
                <MdDashboard className="text-[#2C7FE0] mt-1" />
                <div className="flex flex-col ml-2">
                  <div className="ml-3">Institute Name</div>
                </div>
              </div>
              <div className="flex flex-col items-center ml-32">
                <input
                  type="text"
                  // {...register("institute_name", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Institute"
                />
                {/* {errors.institute_name && (
                  <span className="text-red-500">
                    Institute name is required
                  </span>
                )} */}
              </div>

              <div className="flex flex-row ml-14">
                <MdDashboard className="text-[#2C7FE0] mt-1" />
                <div className="flex flex-col">
                  <div className="text-[15px] font-bold text-gray-500 ml-2">
                    Field of Study
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center ml-10">
                <input
                  type="text"
                  // {...register("field_of_study", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Field"
                />
                {/* {errors.field_of_study && (
                  <span className="text-red-500">
                    Field of study is required
                  </span>
                )} */}
              </div>
            </div>

            <div className="flex flex-row mt-10">
              <div className="flex flex-row">
                <MdDashboard className="text-[#2C7FE0] mt-1" />
                <div className="flex flex-col ml-2">
                  <div className="ml-3">Highest Education Level</div>
                </div>
              </div>
              <div className="flex flex-col items-center ml-14">
                <input
                  type="text"
                  {...register("highest_level_of_education", {
                    required: true,
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Education"
                />
                {errors.highest_level_of_education && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="flex flex-row ml-14">
                <MdDashboard className="text-[#2C7FE0] mt-1" />
                <div className="flex flex-col">
                  <div className="text-[15px] font-bold text-gray-500 ml-2">
                    Year Completed
                  </div>
                  <div className="font-[12px] text-gray-300">
                    Enter Applicant’s
                    <br /> Year comp.
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center ml-9">
                <input
                  type="date"
                  {...register("year_completed", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Year"
                />
                {errors.year_completed && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            <div className="flex flex-row mt-10 space-x-14">
              <div className="flex flex-row">
                <MdDashboard className="text-[#2C7FE0] mt-1" />
                <div className="ml-3 flex flex-col">
                  <div>Education Documents</div>
                  <div className="text-gray-300 text-[12px] mt-3">
                    Accepted File types
                  </div>
                  <div className="flex flex-row ml-2">
                    <MdPushPin className="text-gray-300 text-[12px] mt-1" />
                    <div className="text-gray-300 text-[12px]">pdf | doc</div>
                  </div>
                  <div className="flex flex-row ml-2">
                    <MdPushPin className="text-gray-300 text-[12px] mt-1" />
                    <div className="text-gray-300 text-[12px]">
                      jpeg | jpg | png
                    </div>
                  </div>
                </div>
              </div>
              {!selectedEducationDocument?.name ? (
                <label className="flex flex-col items-center justify-center w-full rounded-lg cursor-pointer bg-[#E5EDF5] hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
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
                    name="preferred_job_title" // This will be used to map the file to a form field
                    className="hidden"
                    onChange={handleEducationFileChange} // Handle file selection
                  />
                </label>
              ) : (
                // Display selected document card with remove icon
                <div className="flex flex-row items-center bg-gray-200 p-3 rounded-lg w-full">
                  <div className="flex flex-row items-center">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">
                      {selectedEducationDocument?.name}
                    </span>
                  </div>
                  <AiOutlineDelete
                    className="text-red-500 ml-auto cursor-pointer"
                    size={20}
                    onClick={handleRemoveEducationDocument} // Remove selected document
                  />
                </div>
              )}
            </div>

            <hr className="my-4 border-t border-gray-300 mt-10" />
            <div className="mt-10">
              <h2 className="text-md font-semibold mb-2 text-[#2C7DD6]">
                Work Experience
              </h2>
            </div>
            <div className="flex flex-row mt-10 ">
              <div className="flex flex-row">
                <div className="flex flex-row">
                  <MdDashboard className="text-[#2C7FE0] mt-1" />
                  <div className="flex flex-col ml-2">
                    <div className="ml-3">Organization</div>
                  </div>
                </div>
                <div className="flex flex-col items-center ml-20">
                  <input
                    // {...register("organization", { required: true })}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Organization"
                  />
                  {/* {errors.organization && (
                    <span className="text-red-500">
                      Organization is required
                    </span>
                  )} */}
                </div>
              </div>
              <div className="flex flex-row ml-10">
                <div>
                  <MdDashboard className="text-[#2C7FE0] mt-1" />
                </div>
                <div className="flex flex-col">
                  <div className="text-[15px] font-bold text-gray-500 ml-2">
                    Industry Sector
                  </div>
                </div>
                <div className="flex flex-col items-center ml-14">
                  <input
                    // {...register("industry_sector", { required: true })}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Skill"
                  />
                  {/* {errors.industry_sector && (
                    <span className="text-red-500">
                      Industry Sector is required
                    </span>
                  )} */}
                </div>
              </div>
            </div>

            <div className="flex flex-row mt-10 ">
              <div className="flex flex-row">
                <div className="flex flex-row">
                  <MdDashboard className="text-[#2C7FE0] mt-1" />
                  <div className="flex flex-col ml-1">
                    <div className="ml-3">Professional Skill</div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <input
                    {...register("professional_skill", {
                      required: "Professional skill is required",
                    })}
                    type="text"
                    className="bg-gray-50 border ml-[54%] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Skill"
                  />
                  {errors.professional_skill && (
                    <span className="text-red-500">
                      {errors.professional_skill.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-row ml-24">
                <div>
                  <MdDashboard className="text-[#2C7FE0] mt-1" />
                </div>
                <div className="flex flex-col">
                  <div className="text-[15px] font-bold text-gray-500 ml-1">
                    Preferred Job Title
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <input
                    {...register("preferred_job_title", {
                      required: "Preferred job title is required",
                    })}
                    type="text"
                    className="bg-gray-50 border ml-11 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Job Title"
                  />
                  {errors.preferred_job_title && (
                    <span className="text-red-500">
                      {errors.preferred_job_title.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-row mt-10">
              <div className="flex flex-row">
                <MdDashboard className="text-[#2C7FE0] mt-1" />
                <div className="flex flex-col ml-2">
                  <div className="ml-3">Gross Salary</div>
                </div>
              </div>
              <div className=" items-center ml-20">
                <input
                  // {...register("gross_salary", {
                  //   required: "Gross salary is required",
                  // })}
                  type="text"
                  className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Amount in ETB"
                />
                {/* {errors.gross_salary && (
                  <span className="text-red-500">
                    {errors.gross_salary.message}
                  </span>
                )} */}
              </div>{" "}
              <div className="flex flex-row ml-10">
                <div>
                  <MdDashboard className="text-[#2C7FE0] mt-1" />
                </div>
                <div>
                  <div className="flex flex-col">
                    <div>Curriculum Vitae</div>
                    <div className="text-gray-300 text-[12px] mt-3">
                      Accepted File types
                    </div>
                    <div className="flex flex-row ml-2">
                      <MdPushPin className="text-gray-300 text-[12px] mt-1" />
                      <div className="text-gray-300 text-[12px]">pdf | doc</div>
                    </div>
                    <div className="flex flex-row ml-2">
                      <MdPushPin className="text-gray-300 text-[12px] mt-1" />
                      <div className="text-gray-300 text-[12px]">
                        jpeg | jpg | png
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row space-x-4 ml-14">
                  <div className="flex flex-col items-center">
                    {!selectedCurriculumDocument?.name ? (
                      <label className="flex flex-col items-center justify-center w-full rounded-lg cursor-pointer bg-[#E5EDF5] hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
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
                          name="preferred_job_title" // This will be used to map the file to a form field
                          className="hidden"
                          onChange={handleCurriculumFileChange} // Handle file selection
                        />
                      </label>
                    ) : (
                      // Display selected document card with remove icon
                      <div className="flex flex-row items-center bg-gray-200 p-3 rounded-lg w-full">
                        <div className="flex flex-row items-center">
                          <svg
                            className="w-6 h-6 text-gray-500 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <span className="text-sm text-gray-700">
                            {selectedCurriculumDocument?.name}
                          </span>
                        </div>
                        <AiOutlineDelete
                          className="text-red-500 ml-auto cursor-pointer"
                          size={20}
                          onClick={handleRemoveCurriculumDocument} // Remove selected document
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Curriculum Vitae Field */}

            {/* File Upload */}
          </div>
          <div className="flex flex-row gap-4 mt-10 w-96 justify-end">
            <button className="flex-1 bg-white border border-[#2C7DD6] text-[#2C7DD6] py-2 px-4 rounded-md">
              Cancel
            </button>
            <button className="flex-1 bg-[#3170B5] text-black py-2 px-4 rounded-md">
              Continue
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Home;
