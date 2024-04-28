const url = "https://6624eb0804457d4aaf9d50b2.mockapi.io/items";

const readAllData = async () => {
  const response = await fetch(url);

  const data = await response.json();

  throw new Error("Internal Server Error");
  return data;
};

const readSingleProduct = async (prodId) => {
  const response = await fetch(`${url}/${prodId}`);

  const data = await response.json();

  return data;
};

const editProd = async (id, data) => {
  const response = await fetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  const resData = await response.json();

  return resData;
};

const createProd = async (prodData) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(prodData),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  const data = await response.json();

  return data;
};

const deleteProduct = async (prodId) => {
  const response = await fetch(`${url}/${prodId}`, {
    method: "DELETE",
  });

  const data = await response.json();

  return data;
};

export { readAllData, deleteProduct, createProd, readSingleProduct, editProd };
