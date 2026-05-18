import { Box } from "@mui/material";
import AuthHeader from "../components/AuthHeader";
import AuthForm from "../components/AuthForm";
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#DACCBE",
    },
};

const Login = () => {
    return (
        <Box sx={styles.container}>
            <AuthHeader />
            <AuthForm mode="login" />
        </Box>
    );
};

export default Login;