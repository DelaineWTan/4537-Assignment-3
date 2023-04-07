import React, { useEffect } from "react";
import axios from "axios";

const Authenticated = ({ children, setIsLoggedIn, accessToken }) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    // Function to check if the user is authenticated on the server
    const checkAuthentication = async () => {
      try {
        // Send a request to your API to check for the JWT token
        const response = await axios.get(`${serverUrl}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Attach the JWT token to the request headers
          },
        });
        console.log(response.body);
        if (response.ok) {
          setIsLoggedIn(true); // Set isLoggedIn to true if the token is valid
        } else {
          setIsLoggedIn(false); // Set isLoggedIn to false if the token is invalid or not present
        }
      } catch (error) {
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
