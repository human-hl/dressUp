import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const styles = {
  appBar: {
    backgroundColor: "#ffffff",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    px: { xs: 1, sm: 0 },
  },
  logo: {
    fontWeight: 900,
    color: "#5C4E40",
    letterSpacing: "1px",
    fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
  },
  buttonBox: {
    display: "flex",
    gap: { xs: 1, sm: 2 },
    flexWrap: "nowrap",
  },
  loginButton: {
    color: "#5C4E40",
    fontWeight: 500,
    textTransform: "none",
    fontSize: { xs: "0.8rem", sm: "0.9rem" },
    minWidth: { xs: 60, sm: 80 },
  },
  registerButton: {
    backgroundColor: "#487886",
    textTransform: "none",
    borderRadius: "20px",
    px: { xs: 2, sm: 3 },
    fontSize: { xs: "0.8rem", sm: "0.9rem" },
    "&:hover": {
      backgroundColor: "#3b646f",
    },
    minWidth: { xs: 80, sm: 100 },
  },
};

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" elevation={0} sx={styles.appBar}>
      <Container maxWidth="lg">
        <Toolbar sx={styles.toolbar}>
          <Typography variant="h6" sx={styles.logo}>
            ДрессАп
          </Typography>

          <Box sx={styles.buttonBox}>
            <Button
              sx={styles.loginButton}
              onClick={() => navigate("/login")}
            >
              Войти
            </Button>

            <Button
              variant="contained"
              sx={styles.registerButton}
              onClick={() => navigate("/register")}
            >
              Регистрация
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
