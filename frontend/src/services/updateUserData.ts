const updateUserData = async (user: any) => {
  const response = await fetch(process.env.URL + "/api/my", {
    method: "PUT",
    headers: {},
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (!data.name) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
};

export default updateUserData;
