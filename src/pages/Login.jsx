import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../app/features/auth/authSlice";
import { useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button type="submit">
        {loading ? "Loading..." : "Login"}
      </button>

      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </form>
  );
};

export default Login;