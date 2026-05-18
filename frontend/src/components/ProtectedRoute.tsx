import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks/redux';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token, user, loading } = useAppSelector((state) => state.auth);

  // Есть токен в localStorage, но пользователь ещё загружается — ждём
  if (localStorage.getItem('token') && (loading || !user)) {
    return <div>Загрузка...</div>;
  }

  // Нет токена — редирект
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;