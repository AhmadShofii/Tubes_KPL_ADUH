import { motion } from "framer-motion";

function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f2",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "40px",
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            marginBottom: "25px",
            color: "#0f5f1b",
            textAlign: "center",
          }}
        >
          Login
        </h1>

        <form>
          <input
            type="email"
            placeholder="Email"
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#0f5f1b",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default LoginPage;