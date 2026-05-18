import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const styles = {
  heroBox: {
    backgroundColor: "#ffffff",
    borderRadius: 3,
    p: { xs: 3, sm: 5 },
    mt: { xs: 4, sm: 6 },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: 3,
    maxWidth: "1200px",
    mx: "auto",
    width: "90%",
    flexDirection: "column",
  },
  title: {
    color: "#5C4E40",
    fontWeight: 600,
    mb: { xs: 2, sm: 3 },
    fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
  },
  subtitle: {
    color: "#487886",
    mb: { xs: 3, sm: 4 },
    fontSize: { xs: "0.95rem", sm: "1.1rem" },
  },
  registerButton: {
    backgroundColor: "#487886",
    textTransform: "none",
    borderRadius: "25px",
    px: { xs: 4, sm: 5 },
    py: { xs: 1, sm: 1.5 },
    fontSize: { xs: "0.9rem", sm: "1rem" },
    minWidth: { xs: "200px", sm: "250px" },
    "&:hover": {
      backgroundColor: "#3b646f",
    },
  },
  loginText: {
    mt: 2,
    color: "#5C4E40",
    fontSize: "0.95rem",
  },
  loginButton: {
    ml: 1,
    fontWeight: 600,
    color: "#487886",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box sx={styles.heroBox}>
      <Container maxWidth="md">
        <Typography variant="h3" sx={styles.title}>
          Ваш гардероб — <br /> под контролем.
        </Typography>

        <Typography variant="body1" sx={styles.subtitle}>
          Храните, планируйте и комбинируйте одежду легко и удобно.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            variant="contained"
            sx={styles.registerButton}
            onClick={() => navigate("/register")}
          >
            Регистрация
          </Button>

          <Typography sx={styles.loginText}>
            У вас уже есть аккаунт?
            <Button
              sx={styles.loginButton}
              onClick={() => navigate("/login")}
            >
              Войти
            </Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};


export default HeroSection;
