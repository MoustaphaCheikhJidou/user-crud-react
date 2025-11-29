import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./UserForm";

const API = "http://localhost:8080/api/users";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    await axios.delete(`${API}/${id}`);
    load();
  };

  const handleEdit = (user) => setEditing(user);

  const handleSave = async (user) => {
    if (user.id) {
      await axios.put(`${API}/${user.id}`, user);
    } else {
      await axios.post(API, user);
    }
    setEditing(null);
    load();
  };

  return (
    <div>
      <UserForm onSave={handleSave} editing={editing} onCancel={() => setEditing(null)} />
      <table
        border="1"
        cellPadding="8"
        style={{ marginTop: 20, width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nom}</td>
              <td>{u.email}</td>
              <td>{u.age ?? ""}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Modifier</button>
                <button onClick={() => handleDelete(u.id)} style={{ marginLeft: 8 }}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
