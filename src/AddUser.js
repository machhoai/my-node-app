import { useState } from "react";

const AddUser = ({ onUserAdded }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !id) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: Number(id), name }),
      });

      if (!response.ok) {
        throw new Error("Không thể thêm người dùng");
      }

      const data = await response.json();
      const newUser = data.user;
      alert("Thêm người dùng thành công! id: " + newUser.id + ", name: " + newUser.name);
      onUserAdded(newUser);
      
      setName("");
      setId("");
    } catch (error) {
      alert("Lỗi: " + error.message);
    }
  };

  return (
    <div>
      <h2>Thêm người dùng</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Nhập ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nhập tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Thêm người dùng</button>
      </form>
    </div>
  );
};

export default AddUser;
