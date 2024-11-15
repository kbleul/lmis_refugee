export const getBase64 = (file: any) => {
  return new Promise((resolve) => {
    //   let fileInfo;
    let baseURL = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader?.result?.split(",")[1];
      resolve(baseURL);
    };
  });
};
