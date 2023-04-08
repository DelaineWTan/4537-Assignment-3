import React, { useState, useEffect, useCallback } from "react";
import "./css/dashboard.css";

const API_URL = process.env.REACT_APP_SERVER_URL;

const Dashboard = ({ accessToken }) => {
  const [uniqueApiUsers, setUniqueApiUsers] = useState([]);
  const [topApiUsers, setTopApiUsers] = useState([]);
  const [topUsersByEndpoint, setTopUsersByEndpoint] = useState([]);
  const [errors4xxByEndpoint, setErrors4xxByEndpoint] = useState([]);
  const [recentErrors4xx5xx, setRecentErrors4xx5xx] = useState([]);

  const fetchUniqueApiUsers = useCallback(() => {
    fetch(API_URL + "/uniqueApiUsers", {
      headers: {
        Authorization: accessToken, // Replace accessToken with your actual accessToken
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUniqueApiUsers(data);
        }
      })
      .catch((error) =>
        console.error("Error fetching unique API users:", error)
      );
  }, [accessToken]);

  const fetchTopApiUsers = useCallback(() => {
    fetch(API_URL + "/topApiUsers", {
      headers: {
        Authorization: accessToken, // Replace accessToken with your actual accessToken
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTopApiUsers(data);
        }
      })
      .catch((error) => console.error("Error fetching top API users:", error));
  }, [accessToken]);

  const fetchTopUsersByEndpoint = useCallback(() => {
    fetch(API_URL + "/topUsersByEndpoint", {
      headers: {
        Authorization: accessToken, // Replace accessToken with your actual accessToken
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTopUsersByEndpoint(data);
        }
      })
      .catch((error) =>
        console.error("Error fetching top users by endpoint:", error)
      );
  }, [accessToken]);

  const fetchErrors4xxByEndpoint = useCallback(() => {
    fetch(API_URL + "/errors4xxByEndpoint", {
      headers: {
        Authorization: accessToken, // Replace accessToken with your actual accessToken
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setErrors4xxByEndpoint(data);
        }
      })
      .catch((error) =>
        console.error("Error fetching 4xx errors by endpoint:", error)
      );
  }, [accessToken]);
  
  const fetchRecentErrors4xx5xx = useCallback(() => {
    fetch(API_URL + "/recentErrors4xx5xx", {
      headers: {
        Authorization: accessToken, // Replace accessToken with your actual accessToken
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRecentErrors4xx5xx(data);
        }
      })
      .catch((error) =>
        console.error("Error fetching recent 4xx/5xx errors:", error)
      );
  }, [accessToken]);

  useEffect(() => {
    fetchUniqueApiUsers();
    fetchTopApiUsers();
    fetchTopUsersByEndpoint();
    fetchErrors4xxByEndpoint();
    fetchRecentErrors4xx5xx();
  }, [
    accessToken,
    fetchUniqueApiUsers,
    fetchTopApiUsers,
    fetchTopUsersByEndpoint,
    fetchErrors4xxByEndpoint,
    fetchRecentErrors4xx5xx,
  ]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Unique API Users</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {uniqueApiUsers.map((user, index) => (
            <tr key={index}>
              <td>{user}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Top API Users</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {topApiUsers.map((item, index) => (
            <tr key={index}>
              <td>{item.userId}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Top Users by Endpoint</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>User</th>
            <th>User Count</th>
          </tr>
        </thead>
        <tbody>
          {topUsersByEndpoint.map((item, index) => (
            <tr key={index}>
              <td>{item.endpoint}</td>
              <td>{item.topUser}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Errors (4xx) by Endpoint</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Error Count</th>
          </tr>
        </thead>
        <tbody>
          {errors4xxByEndpoint.map((error, index) => (
            <tr key={index}>
              <td>{error.endpoint}</td>
              <td>{error.count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Recent Errors (4xx/5xx)</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Error Code</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {recentErrors4xx5xx.map((error, index) => (
            <tr key={index}>
              <td>{error.endpoint}</td>
              <td>{error.status}</td>
              <td>{error.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
