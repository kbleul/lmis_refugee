"use client";

import Image from "next/image";
import { useEffect } from "react";
import { BsCameraVideo } from "react-icons/bs";
import { FaFile, FaLink } from "react-icons/fa";
import {
  IoIosCloseCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
import { truncateString } from "../utils";

interface ImageUploadProps {
  onChange: (e: any) => void;
  onRemove: (e: any) => void;
  value: any;
  maxFile: number;
  type: string;
}

interface FileType {
  key: any;
  fileUrl: string;
  base64: string;
  type: any;
}

export default function FileUpload({
  onChange,
  onRemove,
  value,
  maxFile,
  type,
}: ImageUploadProps) {
  const onDeleteFile = (key: string) => {
    const files = value;
    let filteredFiles = files.filter((item: any) => item.key !== key);
    onRemove(filteredFiles);
  };
  const onUpdateFile = (newFiles: any[]) => {
    onChange([...value, ...newFiles]);
  };
  const handleFileUpload = (event: any) => {
    const files = event.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      const path = reader.result as string;
      const base64Data = path.split(",")[1];
      const newFiles = Array.from(files).map((file: any) => ({
        key: file.name,
        fileUrl: URL.createObjectURL(file),
        base64: base64Data,
        type: file.type.split("/")[1],
      })) as FileType[];
      onUpdateFile(newFiles);
    };
    Array.from(files).forEach((file: any) => reader.readAsDataURL(file));
  };

  return (
    <div>
      <div className="space-y-3 mb-3">
        {value?.length !== 0 && type === "file" && (
          <div className="border border-[#DFE4EA] border-dashed rounded-lg flex justify-between items-center p-3">
            <div className="flex gap-2 items-center ">
              <FaFile className=" mx-auto text-[#D9B8B8] text-xl" />

              <p className="text-sm text-[#99A5B2]">
                {truncateString(value[0]?.key, 50)}
              </p>
            </div>
            <IoIosCloseCircleOutline
              onClick={() => onDeleteFile(value[0]?.key)}
              className="text-red-500 text-xl cursor-pointer"
            />
          </div>
        )}
        {value?.length !== 0 &&
          type !== "file" &&
          value?.map((item: any, _i: any) => (
            <div
              key={_i}
              className="border border-[#DFE4EA] border-dashed rounded-lg flex justify-between items-center p-3"
            >
              <div className="flex gap-2 items-center ">
                {type === "image" && (
                  <IoImageOutline className=" mx-auto text-[#D9B8B8] text-xl" />
                )}
                {type === "video" && (
                  <BsCameraVideo className=" mx-auto text-[#D9B8B8] text-xl" />
                )}

                <p className="text-sm text-[#99A5B2]">
                  {truncateString(item.key, 50)}
                </p>
              </div>
              <IoIosCloseCircleOutline
                onClick={() => onDeleteFile(item.key)}
                className="text-red-500 text-xl cursor-pointer"
              />
            </div>
          ))}
      </div>
      <div>
        {value?.length < maxFile &&
          (type === "file" ? (
            <label
              htmlFor="dropzone-file"
              className={` flex  items-center justify-between w-full px-3.5 py-3  border border-[#DFE4EA] border-dashed rounded-lg cursor-pointer `}
            >
              <div className="text-[#DFE4EA]">Choose file</div>
              <FaLink className="text-primary" />
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept={"application/pdf"}
                multiple={false}
                onChange={(e) => {
                  handleFileUpload(e);
                }}
              />
            </label>
          ) : (
            <label
              htmlFor="dropzone-file"
              className={` flex flex-col items-center justify-center w-full h-44 border border-[#DFE4EA] border-dashed rounded-lg cursor-pointer `}
            >
              <div>
                {type === "image" && (
                  <IoImageOutline className="mb-4 text-4xl mx-auto text-[#D9B8B8]" />
                )}
                {type === "video" && (
                  <BsCameraVideo className="mb-4 text-4xl mx-auto text-[#D9B8B8]" />
                )}

                <p className="mb-2 text-sm text-[#99A5B2] text-center font-light">
                  Drop your{" "}
                  {type === "image"
                    ? "images"
                    : type === "video"
                    ? "video"
                    : null}{" "}
                  here or
                  <span className="font-semibold"> Browse</span>
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept={
                  type === "image"
                    ? "image/png, image/jpeg, image/jpg"
                    : type === "video"
                    ? "video/mp4, video/x-m4v, video/*"
                    : type === "file"
                    ? "application/pdf"
                    : undefined
                }
                multiple={false}
                onChange={(e) => {
                  handleFileUpload(e);
                }}
              />
            </label>
          ))}
      </div>
    </div>
  );
}
