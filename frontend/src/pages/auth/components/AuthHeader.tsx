import { AppBar, Toolbar, Typography, Container } from "@mui/material";

const styles = {
  appBar: {
    backgroundColor: "#ffffff",
  },

  toolbar: {
    display: "flex",
    justifyContent: "center",
  },

  logo: {
    fontWeight: 900,
    color: "#5C4E40",
    fontSize: "1.5rem",
  },
};

const AuthHeader = () => {
  return (
    <AppBar position="static" elevation={0} sx={styles.appBar}>
      <Container maxWidth="lg">
        <Toolbar sx={styles.toolbar}>
          <Typography sx={styles.logo}>
            ДрессАп
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AuthHeader;