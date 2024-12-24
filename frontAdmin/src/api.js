//standard way to fetch requests now that we're logged in
//feed in the jwt in the header, and then fetch and response
export const authRequest = async (url, method = "GET", body = null) => {
  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  // response is unauthorized
  if (response.status === 403) {
    localStorage.removeItem("token");
    //force back to login
    location.href = "/";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }

  return response.json();
};
