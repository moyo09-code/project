import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authcontext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validate = () => {
    let valid = true;
    const newErrors = { fullName: "", email: "", password: "" };

    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 4 || password.length > 8) {
      newErrors.password = "Password must be 4-8 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    login({ fullName, email, password });
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      <form
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Login
        </h1>

        <label className="block mb-2 text-blue-900">Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={`w-full p-2 mb-1 border rounded-xl focus:outline-blue-900 ${
            errors.fullName ? "border-red-500" : "border-slate-300"
          }`}
        />
        {errors.fullName && <p className="text-red-500 text-xs mb-2">{errors.fullName}</p>}

        <label className="block mb-2 text-blue-900">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-2 mb-1 border rounded-xl focus:outline-blue-900 ${
            errors.email ? "border-red-500" : "border-slate-300"
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs mb-2">{errors.email}</p>}

        <label className="block mb-2 text-blue-900">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full p-2 mb-3 border rounded-xl focus:outline-blue-900 ${
            errors.password ? "border-red-500" : "border-slate-300"
          }`}
        />
        {errors.password && <p className="text-red-500 text-xs mb-4">{errors.password}</p>}

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-3 rounded-xl hover:bg-blue-800 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
