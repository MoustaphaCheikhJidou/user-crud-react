import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:8080/api/users";

function App() {
  const [users, setUsers] = useState([]);
  const [current, setCurrent] = useState({ id: "", nom: "", email: "", age: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setError("");
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (e) {
      console.error(e);
      setError("Erreur réseau : impossible de charger les utilisateurs.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setError("");
      if (!current.nom || !current.email || !current.age) {
        setError("Veuillez remplir tous les champs.");
        return;
      }

      if (editingId) {
        await axios.post(`${API_URL}/${editingId}/update`, {
          nom: current.nom,
          email: current.email,
          age: Number(current.age),
        });
      } else {
        await axios.post(API_URL, {
          nom: current.nom,
          email: current.email,
          age: Number(current.age),
        });
      }

      setCurrent({ id: "", nom: "", email: "", age: "" });
      setEditingId(null);
      await loadUsers();
    } catch (e) {
      console.error(e);
      if (e.response) {
        setError("Erreur serveur lors de l'enregistrement. Code " + e.response.status);
      } else {
        setError("Erreur réseau lors de l'enregistrement.");
      }
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setCurrent({
      id: user.id,
      nom: user.nom,
      email: user.email,
      age: user.age,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setCurrent({ id: "", nom: "", email: "", age: "" });
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      await axios.post(`${API_URL}/${id}/delete`);
      await loadUsers();
    } catch (e) {
      console.error(e);
      if (e.response) {
        setError("Erreur serveur lors de la suppression. Code " + e.response.status);
      } else {
        setError("Erreur réseau lors de la suppression.");
      }
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Gestion des utilisateurs</div>
            <div className="card-subtitle">
              CRUD Spring Boot + React (MySQL)
            </div>
          </div>
        </div>

        <div className="form-row">
          <input
            name="nom"
            placeholder="Nom"
            value={current.nom}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            value={current.email}
            onChange={handleChange}
          />
          <input
            name="age"
            placeholder="Âge"
            type="number"
            value={current.age}
            onChange={handleChange}
          />
          <button className="btn btn-primary" onClick={handleSave}>
            {editingId ? "Enregistrer" : "Ajouter"}
          </button>
          {editingId && (
            <button className="btn btn-secondary" onClick={handleCancel}>
              Annuler
            </button>
          )}
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Âge</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nom}</td>
                  <td>{u.email}</td>
                  <td>{u.age}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleEdit(u)}
                    >
                      Modifier
                    </button>{" "}
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(u.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5">Aucun utilisateur pour le moment.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {error && <div className="error-banner">{error}</div>}
      </div>
    </div>
  );
}

export default App;
