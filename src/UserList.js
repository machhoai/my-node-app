import { useState, useEffect } from "react";
import AddUser from "./AddUser";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
    }
  };

  const handleUserAdded = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Danh sách người dùng</h2>

      <ul style={styles.list}>
        {users.map((user) => (
          <li key={user.id} style={styles.listItem}>
            <span style={styles.name}>{user.name}</span> - <span>{user.id}</span>
          </li>
        ))}
      </ul>

      <div style={styles.addUserContainer}>
        <AddUser onUserAdded={handleUserAdded} />
      </div>
    </div>
  );
};

export default UserList;


const styles = {
    container: {
      maxWidth: "400px",
      margin: "40px auto",
      padding: "20px",
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    title: {
      fontSize: "24px",
      marginBottom: "16px",
      color: "#333",
    },
    list: {
      listStyle: "none",
      padding: "0",
    },
    listItem: {
      padding: "10px",
      margin: "6px 0",
      background: "#f4f4f4",
      borderRadius: "6px",
      fontSize: "16px",
      fontWeight: "500",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    name: {
      fontWeight: "bold",
    },
    addUserContainer: {
      marginTop: "20px",
    },
  };