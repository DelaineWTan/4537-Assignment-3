import React, { useEffect } from "react";
import axios from "axios";

const Authenticated = ({ children, setIsLoggedIn, accessToken }) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    // Function to check if the user is authenticated on the server
    const checkAuthentication = async () => {
      try {
        console.log(accessToken)
        // Send a request to your API to check for the JWT token
        const response = await axios.get(`${serverUrl}/`, {
          headers: {
            Authorization: accessToken, // Attach the JWT token to the request headers
          },
        });
        if (response.status !== 200) {
          setIsLoggedIn(false);
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      } catch (error) {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.error("Error checking authentication:", error);
      }
    };

    checkAuthentication();
  }, [accessToken, serverUrl, setIsLoggedIn]);

  return (
    <div>
      {children}
    </div>
  );
};

export default Authenticated;
