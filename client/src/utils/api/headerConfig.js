const setHeader = (isMultipart) => {
  const token = localStorage.getItem("token") && localStorage.getItem("token");
  const header = isMultipart
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "multipart/form-data",
        },
      }
    : { headers: { Authorization: `Bearer ${token}` } };
  return header;
};

export default setHeader;
