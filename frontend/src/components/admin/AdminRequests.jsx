// AdminRequests.jsx
import React, { useEffect, useState } from "react";
import { getAdminRequests } from "../../api/index";

const AdminRequests = () => {
  const [adminRequests, setAdminRequests] = useState([]);

  useEffect(() => {
    // Load admin's approved requests when the component mounts
    fetchAdminRequests();
  }, []);

  const fetchAdminRequests = async () => {
    try {
      const data = await getAdminRequests();
      console.log("approved rent requests ", data.data);
      setAdminRequests(data.data);
    } catch (error) {
      // Handle error
      console.log("Error fetching admin's approved requests:", error.message);
    }
  };

  return (
    <div>
      <h1>Approved Requests</h1>
      <ul>
        {adminRequests.map((request) => (
          <li key={request.request_id}>
            {/* Display details of each approved request */}
            Request ID: {request.request_id}, Bicycle ID: {request.bicycle_id}, User ID: {request.user_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminRequests;
