import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks/redux';
import { fetchCurrentUser } from './redux/slices/authSlice';
import MainPage from "./pages/main/MainPage";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import PanelPage from './pages/panel/PanelPage';
import ItemsPage from './pages/panel/items/ItemsPage';
import ProtectedRoute from './components/ProtectedRoute';
import CombinationsPage from "./pages/panel/combinations/CombinationsPage";
import RecPage from "./pages/panel/recommendations/RecPage";
import ProfilePage from './pages/panel/profile/ProfilePage';
import AddItemPage from './pages/panel/items/AddItemPage';
import ItemDetailPage from './pages/panel/items/ItemDetailPage';
import OutfitDetailPage from './pages/panel/combinations/OutfitDetailPage';
import TipDetailPage from './pages/panel/recommendations/TipDetailPage';
import AddCombinationPage from './pages/panel/combinations/AddCombinationPage';



function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/panel"
        element={
          <ProtectedRoute>
            <PanelPage></PanelPage>
          </ProtectedRoute>
        }
      />
      <Route
        path="/panel/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/panel/items"
        element={
          <ProtectedRoute>
            <ItemsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/panel/items/:id"
        element={
          <ProtectedRoute>
            <ItemDetailPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/panel/items/add"
        element={
          <ProtectedRoute>
            <AddItemPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/panel/combinations"
        element={
          <ProtectedRoute>
            <CombinationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/panel/combinations/:id"
        element={
          <ProtectedRoute>
            <OutfitDetailPage />
          </ProtectedRoute>
        }
      />


      <Route
        path="/panel/combinations/add"
        element={
          <ProtectedRoute>
            <AddCombinationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/panel/recommendations"
        element={
          <ProtectedRoute>
            <RecPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/panel/recommendations/:id"
        element={
          <ProtectedRoute>
            <TipDetailPage />
          </ProtectedRoute>
        }
      />
    </Routes>

  );
}

export default App;