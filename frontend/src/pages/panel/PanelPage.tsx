import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { logout, selectCurrentUser } from '../../redux/slices/authSlice';
import { useEffect } from "react";
import { fetchDashboardData } from "../../redux/slices/dashboardSlice";
import { Box, CircularProgress, Typography } from "@mui/material";
import TipsSection from "./components/TipsSection";
import OutfitsPreview from "./components/OutfitsPreview";
import ItemsPreview from "./components/ItemsPreview";
import Sidebar from "./components/Sidebar";

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#DACCBE',
  },
  content: {
    flex: 1,
    p: { xs: 2, sm: 4 },
    overflowY: 'auto',
  },
  whiteBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    p: { xs: 3, sm: 4 },
    boxShadow: '0px 2px 12px rgba(0,0,0,0.06)',
    minHeight: '100%',
  },

};

const PanelPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectCurrentUser);
    const { tips, outfits, items, loading } = useAppSelector(
        (state) => state.dashboard
    );

    useEffect(() => {
        dispatch(fetchDashboardData());
    }, [dispatch]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

  return (
    <Box sx={styles.layout}>
      <Sidebar/>

      <Box sx={styles.content}>
        <Box sx={styles.whiteBox}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TipsSection tips={tips} />
              <OutfitsPreview outfits={outfits} />
              <ItemsPreview items={items} />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PanelPage;