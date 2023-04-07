import React, { useEffect } from "react";
import axios from "axios";

const Authenticated = ({
  children,
  setIsLoggedIn,
  accessToken,
  setAccessToken,
  refreshToken,
}) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    // Function to check if the user is authenticated on the server
    const checkAuthentication = async () => {
      try {
        console.log(accessToken);
        // Send a request to your API to check for the JWT token
        const response = await axios.get(`${serverUrl}/`, {
          headers: {
            Authorization: accessToken, // Attach the JWT token to the request headers
          },
        });
        if (response.status !== 200) {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // Refresh access token with refresh token
        try {
          const refreshResponse = await axios.post(
            `${serverUrl}/requestNewAccessToken`,
            {},
            {
              headers: {
                Authorization: refreshToken, // Pass the refresh token in the authorization header
              },
            }
          );
          if (refreshResponse.status !== 200) {
            throw new Error(refreshResponse.data.message);
          }
          const newAccessToken = refreshResponse.headers["auth-token-access"];
          setAccessToken(newAccessToken);
          localStorage.setItem("accessToken", newAccessToken);
        } catch (refreshError) {
          // Handle refresh token error
          console.error("Error refreshing access token:", refreshError);
          setIsLoggedIn(false);
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      }
    };

    checkAuthentication();
  }, [accessToken, setAccessToken,refreshToken, serverUrl, setIsLoggedIn]);

  return <div>{children}</div>;
};

export default Authenticated;
