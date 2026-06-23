import { Box, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux"
import { loginUser, registerUser } from "../../../redux/slices/authSlice"

interface AuthFormProps {
  mode: "login" | "register";
}

const styles = {
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 3,
    p: { xs: 3, sm: 5 },
    mt: { xs: 4, sm: 6 },
    boxShadow: 3,
    maxWidth: "800px",
    mx: "auto",
  },
  switchBox: {
    display: "flex",
    gap: 2,
    mb: 3,
    borderBottom: "1px solid #ccc",
  },
  switchText: (active: boolean) => ({
    fontWeight: active ? 600 : 400,
    cursor: "pointer",
    borderBottom: active ? "2px solid #487886" : "none",
    pb: 0.5,
  }),
  field: { mb: 2 },
  button: {
    backgroundColor: "#487886",
    color: "#ffffff",
    textTransform: "none",
    borderRadius: "25px",
    py: 1.5,
    fontSize: "1rem",
    "&:hover": { backgroundColor: "#3b646f" },
    width: "100%",
    mt: 1,
  },
  loginText: {
    mt: 2,
    fontSize: "0.9rem",
    color: "#5C4E40",
    textAlign: "center",
  },
  loginLink: {
    ml: 1,
    fontWeight: 600,
    color: "#487886",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [activeMode, setActiveMode] = useState<"login" | "register">(mode);
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [birthday, setBirthday] = useState("")
  const { token, error: authError, loading } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (token) navigate('/panel');
  }, [token, navigate]);
  const isLogin = activeMode === "login";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isLogin) {
      dispatch(
        loginUser({
          email,
          password,
        })
      )
    } else {
      if (password !== confirmPassword) {
        alert("Пароли не совпадают")
        return
      }

      dispatch(
        registerUser({
          username: email.split("@")[0],
          display_name: displayName,
          email,
          password,
          birthday,
        })
      )
    }
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.switchBox}>
        <Typography
          sx={styles.switchText(isLogin)}
          onClick={() => setActiveMode("login")}
        >
          Вход
        </Typography>
        <Typography
          sx={styles.switchText(!isLogin)}
          onClick={() => setActiveMode("register")}
        >
          Регистрация
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Введите почту"
          variant="outlined"
          sx={styles.field}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Введите пароль"
          type="password"
          variant="outlined"
          sx={styles.field}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isLogin && (
          <>
            <TextField
              fullWidth
              label="Повторите пароль"
              type="password"
              variant="outlined"
              sx={styles.field}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <TextField
              fullWidth
              label="Как вас зовут?"
              variant="outlined"
              sx={styles.field}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Введите дату рождения *"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              sx={styles.field}
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </>
        )}
        {authError && (
          <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
            {authError}
          </Typography>
        )}
        <Button type="submit" sx={styles.button}>
          {isLogin ? "Вход" : "Регистрация"}
        </Button>
      </form>

      <Typography sx={styles.loginText}>
        {isLogin
          ? "Еще нет аккаунта?"
          : "Уже есть аккаунт?"}
        <Box
          component="span"
          sx={styles.loginLink}
          onClick={() =>
            setActiveMode(isLogin ? "register" : "login")
          }
        >
          {isLogin ? "Регистрация" : "Войти"}
        </Box>
      </Typography>
    </Box>
  );
};

export default AuthForm;