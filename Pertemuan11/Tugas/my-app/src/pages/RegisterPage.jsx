import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function RegisterPage() {
  const [form, setForm] = useState({ username: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8088/register", form);
      Swal.fire("Berhasil", "Registrasi berhasil! Silakan login.", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Gagal", err.response?.data?.message || "Registrasi gagal", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-6 text-center">Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <select
          name="role"
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value.toLowerCase() })}
          className="w-full p-2 mb-6 border rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="mt-4 text-center">
          <span>Sudah punya akun? </span>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => navigate("/")}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}