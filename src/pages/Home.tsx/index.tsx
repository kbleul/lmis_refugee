import { BsPersonCircle } from "react-icons/bs";
import { MdDashboard, MdMail, MdPushPin } from "react-icons/md";
import { BsPersonStanding } from "react-icons/bs";
import { BsPersonStandingDress } from "react-icons/bs";
import { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { addRefugeeRequest, uploadFiles } from "../../util/service/refugee";
import { useForm } from "react-hook-form";
import {
  AiOutlineDelete,
  AiOutlineLoading3Quarters,
  AiOutlineUpload,
} from "react-icons/ai";
import { useSelect } from "@refinedev/core";
import { FormInputs } from "../../type/addrefugee";
import { toast, ToastContainer } from "react-toastify";
import { checkIsStringLetter, validateMinAge } from "../../util/methods/form";

export const SELECT_QUERY = ["id", "name"];

const Home = () => {
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [selectedServiceDocument, setSelectedServiceDocument] =
    useState<any>(null);
  const [profileimage, setprofileimage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedEducationDocument, setSelectedEducationDocument] =
    useState<any>(null);
  const [selectedCurriculumDocument, setSelectedCurriculumDocument] =
    useState<any>(null);
  const [profileImage, setProfileImage] = useState(
    "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
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
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      // Create a FileReader to read the file as base64
      const reader = new FileReader();

      const imageUrl = URL.createObjectURL(file); // Preview the selected image
      setProfileImage(imageUrl); // Set the new profile image

      // When the file is successfully read
      reader.onloadend = () => {
        const base64String = reader.result as string; // This will be the base64 string
        setprofileimage({
          file: file,
          base64: base64String, // Store the base64 string in state
        });
      };

      // Read the file as a Data URL (base64)
      reader.readAsDataURL(file);
    }
  };
  // Handle the file upload and update the profile image

  const handleCurriculumFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      // Create a FileReader to read the file as base64
      const reader = new FileReader();

      // When the file is successfully read
      reader.onloadend = () => {
        const base64String = reader.result as string; // This will be the base64 string
        setSelectedCurriculumDocument({
          file: file,
          base64: base64String, // Store the base64 string in state
        });
      };

      // Read the file as a Data URL (base64)
      reader.readAsDataURL(file);
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
      // Create a FileReader to read the file as base64
      const reader = new FileReader();

      // When the file is successfully read
      reader.onloadend = () => {
        const base64String = reader.result as string; // This will be the base64 string
        setSelectedEducationDocument({
          file: file,
          base64: base64String, // Store the base64 string in state
        });
      };

      // Read the file as a Data URL (base64)
      reader.readAsDataURL(file);
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
      // Create a FileReader to read the file as base64
      const reader = new FileReader();

      // When the file is successfully read
      reader.onloadend = () => {
        const base64String = reader.result as string; // This will be the base64 string
        setSelectedDocument({
          file: file,
          base64: base64String, // Store the base64 string in state
        });
      };

      // Read the file as a Data URL (base64)
      reader.readAsDataURL(file);
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
      // Create a FileReader to read the file as base64
      const reader = new FileReader();

      // When the file is successfully read
      reader.onloadend = () => {
        const base64String = reader.result as string; // This will be the base64 string
        setSelectedServiceDocument({
          file: file,
          base64: base64String, // Store the base64 string in state
        });
      };

      // Read the file as a Data URL (base64)
      reader.readAsDataURL(file);
    }
  };
  // Handle remove document
  const stringToBoolean = (str: any) => {
    if (str === "true") return true;
    if (str === "false") return false;
    return Boolean(str); // Convert other string values to boolean
  };
  const handleRemoveDocument = () => {
    setSelectedDocument(null); // Remove selected document
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
    watch,
  } = useForm<FormInputs>();
  const [child, setchild] = useState(true);
  const onSubmit = async (data: FormInputs) => {
    const project_image = [];
    setLoading(true);
    if (profileimage?.file?.name) {
      const uploadedFile: any = await uploadFiles({
        file: profileimage.base64,
        extension: profileimage.file.type,
        FolderId: "Profile Picture",
      });
      const projectImageObject = {
        document_type_id: "69937b8f-7c44-49ed-9d24-71ad523dc6c8",
        title: "Profile Picture",
        properties: JSON.stringify({
          name: profileimage?.file,
          path: uploadedFile?.responce?.uploadFile?.info?.Key,
          title: "Profile Picture",
          category: "d08e89f1-a368-4d02-931d-9f611dba9cd2",
        }),
        files: uploadedFile?.responce?.uploadFile?.info?.Key,
      };

      project_image.push(projectImageObject);
    }
    if (selectedDocument?.file?.name) {
      const uploadedFile: any = await uploadFiles({
        file: selectedDocument.base64,
        extension: selectedDocument.file.type,
        FolderId: "Proof of Ethiopian Spouse or Child",
      });
      const projectImageObject = {
        document_type_id: "65dc2ac2-a20c-4a9f-a1f9-a0da8fc4c771",
        title: "Proof of Ethiopian Spouse or Child",
        properties: JSON.stringify({
          name: selectedDocument?.file,
          path: uploadedFile?.responce?.uploadFile?.info?.Key,
          title: "Proof of Ethiopian Spouse or Child",
          category: "d08e89f1-a368-4d02-931d-9f611dba9cd2",
        }),
        files: uploadedFile?.responce?.uploadFile?.info?.Key,
      };

      project_image.push(projectImageObject);
    }
    if (selectedServiceDocument?.file?.name) {
      const uploadedFile: any = await uploadFiles({
        file: selectedServiceDocument.base64,
        extension: selectedServiceDocument.file.type,
        FolderId: "Service-Issued ID",
      });
      const projectImageObject = {
        document_type_id: "8e2f0892-9360-4c43-9816-e272854ec626",
        title: "Service-Issued ID",
        properties: JSON.stringify({
          name: selectedDocument?.file,
          path: uploadedFile?.responce?.uploadFile?.info?.Key,
          title: "Service-Issued ID",
          category: "d08e89f1-a368-4d02-931d-9f611dba9cd2",
        }),
        files: uploadedFile?.responce?.uploadFile?.info?.Key,
      };

      project_image.push(projectImageObject);
    }

    if (selectedEducationDocument?.file?.name) {
      const uploadedFile: any = await uploadFiles({
        file: selectedEducationDocument.base64,
        extension: selectedEducationDocument.file.type,
        FolderId: "Educational certificate and Work experience of refugee",
      });
      const projectImageObject = {
        document_type_id: "e302dd40-8fd9-423d-a24f-096f5916729b",
        title: "Educational certificate and Work experience of refugee",
        properties: JSON.stringify({
          name: selectedDocument?.file,
          path: uploadedFile?.responce?.uploadFile?.info?.Key,
          title: "Educational certificate and Work experience of refugee",
          category: "d08e89f1-a368-4d02-931d-9f611dba9cd2",
        }),
        files: uploadedFile?.responce?.uploadFile?.info?.Key,
      };

      project_image.push(projectImageObject);
    }

    if (selectedCurriculumDocument?.file?.name) {
      const uploadedFile: any = await uploadFiles({
        file: selectedCurriculumDocument.base64,
        extension: selectedCurriculumDocument.file.type,
        FolderId: "CV",
      });
      const projectImageObject = {
        document_type_id: "228d72d1-b34b-4a99-94a9-464fe009f881",
        title: "CV",
        properties: JSON.stringify({
          name: selectedDocument?.file,
          path: uploadedFile?.responce?.uploadFile?.info?.Key,
          title: "CV",
          category: "d08e89f1-a368-4d02-931d-9f611dba9cd2",
        }),
        files: uploadedFile?.responce?.uploadFile?.info?.Key,
      };

      project_image.push(projectImageObject);
    }

    const fieldData = {
      first_name: data?.first_name,
      last_name: data?.last_name,
      gender_id: data?.gender_id,
      date_of_birth: data?.date_of_birth,
      nationality_id: data?.nationality_id,
      marital_status_id: data?.marital_status_id,
      service_issued_id_number: data?.service_issued_id_number,
      service_issued_id_date_of_issue: data?.service_issued_id_date_of_issue,
      service_issued_id_date_of_expiry: data?.service_issued_id_date_of_expiry,
      start_date: data?.start_date,
      duration_requested_years: data?.duration_requested_years,
      highest_level_of_education: data?.highest_level_of_education,
      year_completed: data?.year_completed,
      professional_skill: data?.professional_skill,
      is_spouse_or_child_citizen_et: stringToBoolean(
        data?.is_spouse_or_child_citizen_et
      ),
      preferred_job_title: data?.preferred_job_title,
      middle_name: data?.middle_name,
      educations: [
        {
          date_received: data?.date_received,
          field_of_study: data?.field_of_study,
          institute_name: data?.institute_name,
          level_of_education: data?.highest_level_of_education,
        },
      ],
      documents: project_image,
      skills: {
        skills: [data?.professional_skill],
      },
      spouse_child_citizenships: [
        {
          is_child_citizen: !stringToBoolean(data?.is_spouse) ? true : false,
          is_spouse: stringToBoolean(data?.is_spouse) ? true : false,
          spouse_or_child_name: data?.spouse_or_child_name,
        },
      ],
    };

    try {
      await addRefugeeRequest(fieldData);
      toast.success("Form submitted successfully!");
      setLoading(false);
      reset();
      setSelectedServiceDocument(null);
      setSelectedDocument(null);
      setSelectedCurriculumDocument(null);
      setSelectedEducationDocument(null);
      setProfileImage(
        "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
      );
      setprofileimage(null);
    } catch (error) {
      toast.error("Failed to submit the form.");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setSelectedServiceDocument(null);
    setSelectedDocument(null);
    setSelectedCurriculumDocument(null);
    setSelectedEducationDocument(null);
    setProfileImage(
      "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
    );
    setprofileimage(null);
  };

  const issueDate = watch("service_issued_id_date_of_issue");
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex justify-center items-center mt-8"
      >
        <div className="flex w-full justify-center  bg-gray-100">
          <div className="bg-white py-6 px-8  shadow-lg shadow-gray-400/50 rounded-xl w-full max-w-[1200px]">
            <h2 className="text-xl font-bold mb-1 text-[#2C7DD6]">
              Refugee Registeration
            </h2>
            <p className="text-gray-500 ">
              Organization must fulfill the expatriates personal information in
              order to <br />
              create the work permit process.
            </p>

            <div className="flex flex-row mt-6 mb-2">
              <div className="flex flex-row mt-10">
                <div>
                  <BsPersonCircle className=" text-[#2C7FE0] mt-2" />
                </div>
                <div className="flex flex-col ml-4">
                  <div className="text-[18px] font-bold text-gray-500 ">
                    Refugee Picture
                  </div>
                  <div className=" text-gray-500 text-[12px]">
                    Enter applicants Profile Picture,
                    <br />
                    once you upload the file{" "}
                  </div>
                </div>
              </div>
              <div className="relative w-36 h-36 ml-10">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="imageUpload"
                  required={getValues().first_name ? true : false}
                  onChange={handleImageChange} // Call function on file selection
                />
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
              <div className="flex flex-row mt-6 space-x-0">
                <div className="flex flex-row ">
                  <div>
                    <MdMail className=" text-[#2C7FE0] mt-2 w-5 h-5" />
                  </div>
                  <div className="flex flex-col ml-4">
                    <div className="text-[18px] font-bold text-gray-500 ">
                      Refugee Name <span className="text-red">*</span>
                    </div>
                    <div className=" text-gray-500 text-[12px]">
                      Enter Applicant’s Full Name *
                    </div>
                  </div>
                </div>
                <div className="flex flex-row ">
                  <div>
                    <input
                      type="text"
                      {...register("first_name", { required: true })}
                      id="first_name"
                      className="bg-gray-50 ml-12 border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="First Name"
                      onKeyDown={(e) => checkIsStringLetter(e)}
                    />
                    {errors.first_name && (
                      <span className="text-red-500 text-xs ml-12">
                        * First name is required
                      </span>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      {...register("middle_name", { required: true })}
                      id="middle_name"
                      className="bg-gray-50 ml-10 border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Middle Name"
                      onKeyDown={(e) => checkIsStringLetter(e)}
                    />
                    {errors.middle_name && (
                      <span className="text-red-500 text-xs ml-12">
                        * Middle name is required
                      </span>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      {...register("last_name", { required: true })}
                      id="last_name"
                      className="bg-gray-50 ml-10 border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Last Name"
                      onKeyDown={(e) => checkIsStringLetter(e)}
                    />
                    {errors.last_name && (
                      <span className="text-red-500 text-xs ml-12">
                        * Last name is required
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-300 mt-10" />
            <div className="flex w-full">
              <div className="bg-white w-full  rounded-lg">
                <h2 className="text-xl font-bold mb-1 text-[#2C7DD6]">
                  Basic Refugee Registration
                </h2>

                <div className="flex flex-row mt-10 space-x-14 w-full ">
                  <section className="w-1/2 flex  flex-row space-x-14">
                    <div className="flex flex-row items-center self-start">
                      <div>
                        <BsPersonStanding className="text-[#2C7FE0]" />
                      </div>
                      <div>
                        <BsPersonStandingDress className="text-[#2C7FE0]" />
                      </div>
                      <div className="ml-3">Gender *</div>
                    </div>

                    <div className=" w-1/2 flex items-start justify-center">
                      <select
                        {...register("gender_id", {
                          required: true,
                        })}
                        className="ml-8  px-4 pt-2 pb-3 w-[12rem] bg-gray-100 justify-self-center rounded-lg "
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
                    </div>
                  </section>

                  <section className="flex justify-between w-1/2">
                  <div className="flex flex-row items-start ">
                    <div>
                      <IoCalendarOutline className="text-[#2C7FE0] mt-1 w-5 h-5" />
                    </div>
                    <div className="flex flex-col ml-2">
                      <div className="text-[15px] font-bold text-gray-500">
                        Date of Birth *
                      </div>
                    </div>
                  </div>
                  <div className="relative w-1/2 ml-3 flex justify-center">
                    <input
                      id="datepicker-format"
                      datepicker-format="mm-dd-yyyy"
                      type="date"
                      {...register("date_of_birth", {
                        required: "DOB is required",
                        validate: validateMinAge,
                      })}
                      className=" w-[14rem] px-6   bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                      onChange={() =>
                        console.log({ dob: errors.date_of_birth })
                      }
                    />
                    {errors.date_of_birth && (
                      <span className="text-red-500 text-xs">
                        * {errors.date_of_birth.message}
                      </span>
                    )}
                  </div>
</section>
                  
                </div>
              </div>
            </div>

            <div className="flex flex-row mt-10 space-x-14 w-full">
              <section className="w-1/2 flex  flex-row space-x-14">
                <div className="flex flex-row">
                  <FaPhone className=" text-[#2C7FE0] mt-1" />

                  <div className="flex flex-col ml-2">
                    <div className="ml-3">Nationality*</div>
                    <div className="text-gray-300 text-[12px] pl-2">
                      Country of Birth *
                    </div>
                  </div>
                </div>
                <div className=" w-1/2 flex items-start justify-center">
                  <select
                    {...register("nationality_id", {
                      required: true,
                    })}
                    className="w-[12rem] px-4 pt-2 pb-3 bg-gray-100 justify-self-center rounded-lg "
                  >
                    {queryNationality?.data?.data?.map(
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
                </div>
              </section>

              <section className="flex justify-start">
                <div className="flex flex-row ">
                  <div>
                    <BsPersonStanding className=" text-[#2C7FE0] mt-1" />
                  </div>
                  <div>
                    <BsPersonStandingDress className=" text-[#2C7FE0] mt-1" />
                  </div>
                  <div className="flex flex-col ">
                    <div className="text-[15px] font-bold text-gray-500 ">
                      Martial Status *
                      <div className="text-gray-500 opacity-0">
                        Enter Applicant’s Birth Date *
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-center border w-1/2">
                  <select
                    {...register("marital_status_id", {
                      required: true,
                    })}
                    className="w-[14rem] px-4 pt-2 pb-3 bg-gray-100 justify-self-center rounded-lg "
                  >
                    {queryMaritailStatus?.data?.data?.map(
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
                </div>
              </section>
            </div>

            <div className="flex flex-row mt-10 space-x-14 w-full">
              <div className="w-1/2 flex justify-start items-start flex-row ">
                <MdDashboard className="text-[#2C7FE0] mt-1" />
                <div className="ml-3">
                  <div>Start date *</div>
                </div>
                <div className="ml-28 flex flex-col items-start  justify-center ">
                  <input
                    type="date"
                    {...register("start_date", {
                      required: true,
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-[14rem]  focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
                    placeholder="Year"
                  />
                  {errors.date_of_birth && (
                    <span className="text-red-500 text-xs mt-2">
                      * DOB is required
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-row items-center mb-2">
                <div className="flex flex-row items-center">
                  <MdDashboard className="text-[#2C7FE0] mt-1" />
                  <div className="ml-3">
                    <div>service issued number *</div>
                  </div>
                </div>
                <div className="flex flex-col   ml-3">
                  <input
                    type="text"
                    {...register("service_issued_id_number", {
                      required: true,
                    })}
                    id="service_issued_id_number"
                    className="bg-gray-50 ml-10 border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Service issue number"
                  />
                  {errors.service_issued_id_number && (
                    <span className="text-red-500 text-xs mt-2 ml-10">
                      * Number is required
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-row mt-10 space-x-14">
              <div className="flex flex-row w-1/2 ">
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

                <div className="flex flex-row w-1/2  justify-center space-x-4 ml-6">
                  <div className="flex flex-col items-center ">
                    <div className="flex items-center justify-center w-full">
                      {!selectedDocument?.file?.name ? (
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
                            required={getValues().first_name ? true : false}
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
                              {selectedDocument?.file?.name}
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

              <div className="flex flex-row items-center mb-2 w-1/2 pl-8">
                <div className="flex flex-row items-center w-2/5">
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
                <div className="flex flex-row  w-1/2   space-x-4">
                  {!selectedServiceDocument?.file?.name ? (
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
                        required={getValues().first_name ? true : false}
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
                          {selectedServiceDocument?.file.name}
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

            <div className="flex flex-row items-center mt-10 space-x-14">
              <section className="w-1/2 flex">
                <div className="flex flex-row ">
                  <MdDashboard className="text-[#2C7FE0] mt-1" />
                  <div className="ml-3">
                    <div>service issued *</div>
                  </div>
                </div>
                <div className="flex flex-row  space-x-4 ml-10 justify-center w-1/2">
                  <div className="flex flex-col items-start">
                    <input
                      type="date"
                      {...register("service_issued_id_date_of_issue", {
                        required: true,
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-[14rem] focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                      placeholder="Year"
                    />

                    {errors.service_issued_id_date_of_issue && (
                      <span className="text-red-500 text-xs mt-2">
                        * Date is required
                      </span>
                    )}
                  </div>
                </div>
              </section>

              <div className="flex flex-row items-center">
                <MdDashboard className="text-[#2C7FE0] mt-1" />
                <div className="ml-3">
                  <div>
                    service issued id * <br />
                    date of expiry
                  </div>
                </div>
              </div>
              <div className="flex flex-row  space-x-4 ml-">
                <div className="flex flex-col items-start ml-9">
                  <input
                    type="date"
                    {...register("service_issued_id_date_of_expiry", {
                      required: "Date of expiry is required",
                      validate: (value) => {
                        if (issueDate && value) {
                          return (
                            new Date(issueDate) < new Date(value) ||
                            "Expiry date must be after the issue date"
                          );
                        }
                        return true;
                      },
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-[14rem] focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    placeholder="Year"
                  />
                  {errors.service_issued_id_date_of_expiry && (
                    <span className="text-red-500 text-xs mt-2">
                      {errors.service_issued_id_date_of_expiry.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-start mt-10">
              <section className="w-1/2 flex">
                <div className="flex flex-row items-center">
                  <MdDashboard className="text-[#2C7FE0] mt-1" />
                  <div className="ml-3">
                    <div>duration requested years *</div>
                  </div>
                </div>
                <div className="flex flex-col  space-x-4 ml-3">
                  <input
                    type="number"
                    {...register("duration_requested_years", {
                      required: true,
                    })}
                    id="duration_requested_years"
                    className="bg-gray-50 ml-10 border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="duration years"
                  />
                  {errors.duration_requested_years && (
                    <span className="text-red-500 text-xs mt-2 pl-7">
                      * Duration is required
                    </span>
                  )}
                </div>
              </section>

              <section className="flex flex-row items-start mt-10">
                <div className="flex flex-row items-center ml-14">
                  <MdDashboard className="text-[#2C7FE0] mt-1" />
                  <div className="ml-3">
                    <div>is spouse/child citizen *</div>
                  </div>
                </div>
                <select
                  {...register("is_spouse_or_child_citizen_et", {
                    required: "This field is required",
                  })}
                  className="ml-14  w-[12rem] px-4 pt-2 pb-3  bg-gray-100  rounded-lg "
                  onChange={() => setchild((prev) => !prev)}
                >
                  <option value="true" className="px-4">
                    True
                  </option>
                  <option value="false" className="px-4">
                    False
                  </option>
                </select>
              </section>
            </div>
            {child && (
              <div className="flex flex-row items-start  mt-10">
                <section className="w-1/2 flex">
                  <div className="flex flex-row items-center ">
                    <MdDashboard className="text-[#2C7FE0] mt-1" />
                    <div className="ml-3">
                      <div>is child/spouse citizen *</div>
                    </div>
                  </div>
                  <div className="flex flex-row   ml-3">
                    <select
                      {...register("is_spouse", {
                        required: "This field is required",
                      })}
                      className="ml-8 w-46 w-[12rem] px-4 pt-2 pb-3 bg-gray-100 justify-self-center rounded-lg "
                    >
                      <option value="false" className="px-4">
                        child citizen
                      </option>
                      <option value="true" className="px-4">
                        is spouse
                      </option>
                    </select>
                  </div>
                </section>

                <div className="flex flex-row items-center   w-1/2 ">
                  <div className="flex flex-row items-center ml-14">
                    <MdDashboard className="text-[#2C7FE0] mt-1" />
                    <div className="ml-3">
                      <div>spouse/child_name *</div>
                    </div>
                  </div>
                  <div className="flex flex-col  space-x-4 ml-3">
                    <input
                      type="text"
                      {...register("spouse_or_child_name", {
                        required: true,
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Year"
                      onKeyDown={(e) => checkIsStringLetter(e)}
                    />
                    {errors.spouse_or_child_name && (
                      <span className="text-red-500 text-xs mt-2">
                        * Name is required
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            <hr className="my-4 border-t border-gray-300 mt-10" />
            <div className="mt-10">
              <h2 className="text-md font-semibold mb-2 text-[#2C7DD6]">
                Educational Information
              </h2>
            </div>

            <div className="flex flex-row mt-10">
              <section className="w-1/2 flex">
                <div className="flex flex-row">
                  <MdDashboard className="text-[#2C7FE0] mt-1" />
                  <div className="flex flex-col ml-2">
                    <div className="ml-3">Institute Name *</div>
                  </div>
                </div>
                <div className="flex flex-col items-start ml-32">
                  <input
                    type="text"
                    {...register("institute_name", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Institute"
                    onKeyDown={(e) => checkIsStringLetter(e)}
                  />

                  {errors.institute_name && (
                    <span className="text-red-500 text-xs mt-2">
                      * Institute name is required
                    </span>
                  )}
                </div>
              </section>
              <section className="w-1/2 flex">
                <div className="flex flex-row ml-14">
                  <MdDashboard className="text-[#2C7FE0] mt-1" />
                  <div className="flex flex-col">
                    <div className="text-[15px] font-bold text-gray-500 ml-2">
                      Field of Study *
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start ml-10">
                  <input
                    type="text"
                    {...register("field_of_study", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Field"
                    onKeyDown={(e) => checkIsStringLetter(e)}
                  />
                  {errors.field_of_study && (
                    <span className="text-red-500 text-xs mt-2">
                      * Field of study is required
                    </span>
                  )}
                </div>
              </section>
            </div>

            <div className="flex flex-row mt-10">
              <section className="w-1/2 flex">
                <div className="flex flex-row">
                  <MdDashboard className="text-[#2C7FE0] mt-1" />
                  <div className="flex flex-col ml-2">
                    <div className="ml-3">Highest Education Level *</div>
                  </div>
                </div>
                <div className="flex flex-col items-start ml-14">
                  <input
                    type="text"
                    {...register("highest_level_of_education", {
                      required: true,
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Education"
                  />
                  {errors.highest_level_of_education && (
                    <span className="text-red-500 text-xs mt-2">
                      * Level is required
                    </span>
                  )}
                </div>
              </section>

              <section className="w-1/2 flex">
                <div className="flex flex-row ml-14">
                  <MdDashboard className="text-[#2C7FE0] mt-1" />
                  <div className="flex flex-col">
                    <div className="text-[15px] font-bold text-gray-500 ml-2">
                      Year Completed
                    </div>
                    <div className="font-[12px] text-gray-300">
                      Enter Applicant’s *
                      <br /> Year comp.
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start ml-9">
                  <input
                    type="date"
                    {...register("year_completed", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[14rem] p-2.5"
                    placeholder="Year"
                  />
                  {errors.year_completed && (
                    <span className="text-red-500 text-xs mt-2">
                      * Date is required
                    </span>
                  )}
                </div>
              </section>
            </div>

            <div className="flex flex-row mt-10 space-x-14">
              <section className="w-1/2 flex">
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

                <section className="w-1/2 ml-16">
                  {!selectedEducationDocument?.file?.name ? (
                    <label className="flex flex-col items-center justify-center  rounded-lg cursor-pointer bg-[#E5EDF5] hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                        required={getValues().first_name ? true : false}
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
                          {selectedEducationDocument?.file?.name}
                        </span>
                      </div>
                      <AiOutlineDelete
                        className="text-red-500 ml-auto cursor-pointer"
                        size={20}
                        onClick={handleRemoveEducationDocument} // Remove selected document
                      />
                    </div>
                  )}
                </section>
              </section>

              <section className="w-1/2 flex pl-6">
                <div className="flex flex-row">
                  <MdDashboard className="text-[#2C7FE0] mt-1" />
                  <div className="ml-3 flex flex-col">
                    <div>Date Received *</div>
                  </div>
                </div>
                <div className="relative max-w-sm ml-3">
                  <input
                    id="datepicker-format"
                    datepicker-format="mm-dd-yyyy"
                    type="date"
                    {...register("date_received", {
                      required: true,
                    })}
                    className=" w-46 px-6   bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[14rem] ml-16 p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date"
                  />
                  {errors.date_received && (
                    <span className="text-red-500 text-xs mt-2 ml-16">
                      * Date is required
                    </span>
                  )}
                </div>
              </section>
            </div>

            <hr className="my-4 border-t border-gray-300 mt-10" />
            <div className="mt-10">
              <h2 className="text-md font-semibold mb-2 text-[#2C7DD6]">
                Work Experience
              </h2>
            </div>

            <div className="flex flex-row mt-10">
              <section className="w-1/2 flex">
                <div className="flex flex-row">
                  <div className="flex flex-row">
                    <MdDashboard className="text-[#2C7FE0] mt-1" />
                    <div className="flex flex-col ml-1">
                      <div className="ml-3">Professional Skill</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <input
                      {...register("professional_skill")}
                      type="text"
                      className="bg-gray-50 border ml-[54%] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Skill"
                      onKeyDown={(e) => checkIsStringLetter(e)}
                    />
                    {errors.professional_skill && (
                      <span className="text-red-500 text-xs mt-2 ml-16">
                        * Skill is required
                      </span>
                    )}
                  </div>
                </div>
              </section>

              <div className="flex flex-row ml-12">
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
                    {...register("preferred_job_title")}
                    type="text"
                    className="bg-gray-50 border ml-11 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Job Title"
                    onKeyDown={(e) => checkIsStringLetter(e)}
                  />
                  {errors.preferred_job_title && (
                    <span className="text-red-500 text-xs mt-2 ml-16">
                      * Job title is required
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-row mt-10">
              <div className="flex flex-row">
                <div>
                  <MdDashboard className="text-[#2C7FE0] mt-1" />
                </div>
                <div>
                  <div className="flex flex-col ml-3">
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
                <div className="flex flex-row space-x-4 ml-16">
                  <div className="flex flex-col items-center">
                    {!selectedCurriculumDocument?.file?.name ? (
                      <label className="flex flex-col items-center justify-center  rounded-lg cursor-pointer w-[350px] bg-[#E5EDF5] hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                            {selectedCurriculumDocument?.file?.name}
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

            <div className="flex flex-row gap-4 mt-10 w-full justify-end ">
              <div
                onClick={() => handleCancel()}
                className="flex justify-center items-center bg-white border w-56 cursor-pointer border-[#2C7DD6] text-[#2C7DD6] py-2 px-4 rounded-md"
              >
                Cancel
              </div>
              <button className="flex items-center justify-center w-56  bg-[#2C7DD6] text-white py-2 px-4 rounded-md">
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin mr-2 text-white" />
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Home;
