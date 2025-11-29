import React, { useEffect, useState } from "react";

export default function UserForm({ onSave, editing, onCancel }) {
  const [form, setForm] = useState({ nom: "", email: "", age: "" });

  useEffect(() => {
    if (editing) {
      setForm({
        nom: editing.nom || "",
        email: editing.email || "",
        age: editing.age ?? "",
        id: editing.id,
      });
    } else {
      setForm({ nom: "", email: "", age: "" });
    }
  }, [editing]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSave({ ...form, age: form.age === "" ? null : Number(form.age) });
  };

  return (
    <form onSubmit={submit}>
      <input
        name="nom"
        placeholder="Nom"
        value={form.nom}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        style={{ marginLeft: 8 }}
      />
      <input
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
        style={{ width: 80, marginLeft: 8 }}
      />
      <button type="submit" style={{ marginLeft: 8 }}>
        {form.id ? "Enregistrer" : "Ajouter"}
      </button>
      {form.id && (
        <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>
          Annuler
        </button>
      )}
    </form>
  );
}
