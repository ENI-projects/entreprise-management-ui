const GRAPHQL_URL = process.env.VUE_APP_HASURA_URL;

export const graphQLfetcher = (token, query, variables) => {
  return fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  });
};

export const userAPIfetcher = (token, action, params) => {
  let url = process.env.VUE_APP_USER_API_BASEURL;
  let method = "";
  let body = undefined;
  switch (action) {
    case "getUsers":
      url = url + "/users";
      method = "GET";
      break;
    case "getUserById":
      url = url + `/user/${params.id}`;
      method = "GET";
      break;
    case "updateUserById":
      url = url + `/user/${params.id}`;
      method = "PUT";
      body = {
        email: params.email,
        first_name: params.first_name,
        last_name: params.last_name,
        id_entreprise: params.id_entreprise,
        address: params.address,
        ville: params.ville,
        code_postal: params.code_postal,
        phone: params.phone
      };
      break;
    case "addUser":
      url = url + `/user`;
      method = "POST";
      body = {
        email: params.email,
        first_name: params.first_name,
        last_name: params.last_name,
        id_entreprise: params.id_entreprise,
        address: params.address,
        ville: params.ville,
        code_postal: params.code_postal,
        phone: params.phone
      };
      break;
    case "deleteUserById":
      url = url + `/user/${params.id}`;
      method = "DELETE";
      break;
  }
  return fetch(url, {
    method: method,
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
};

export const fetchAsync = async (token, fetcher, action, params) => {
  const response = await fetcher(token, action, params);
  if (!response.ok) {
    throw response;
  }
  try {
    //if we called the user api these actions, we can't parse the response because it is empty
    if (
      action !== "deleteUserById" &&
      action !== "addUser" &&
      action !== "updateUserById"
    ) {
      return await response.json();
    }
  } catch (err) {
    console.error("Error parsing JSON", err);
  }
};
