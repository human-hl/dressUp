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
    }
};

const Register = () => {
    return (
        <Box sx={styles.container}>
            <AuthHeader />
            <AuthForm mode="register" />
        </Box>
    );
};

export default Register;