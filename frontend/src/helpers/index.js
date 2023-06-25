export const onLogout = () => {
  localStorage.removeItem("accessToken");
  window.location.reload();
};

// export const BASE_API_URL = "http://localhost:3010/api/v1";
export const BASE_API_URL = "https://api-nutech.project101.site/api/v1";
