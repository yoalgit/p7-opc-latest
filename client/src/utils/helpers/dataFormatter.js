// FormData formatting
export const dataFormatter = (data, isMultipart) => {
  // If there is a file attached, we format the data as FormData
  if (isMultipart) {
    const formData = new FormData();

    // Fill formData with data values
    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    return formData;

    // If no file is attached, we send back the data as is
  } else {
    const { profilePic, image, ...filteredData } = data;
    return filteredData;
  }
};
