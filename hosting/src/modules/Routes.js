import { Navigate } from 'react-router-dom';
import SatisfactoryRecipeList from 'pages/SatisfactoryRecipeList';
import SatisfactoryBuildableList from 'pages/SatisfactoryBuildableList';
import DashboardLayout from 'components/DashboardLayout';
import MainLayout from 'components/MainLayout';
import Account from 'pages/Account';
import CustomerList from 'pages/CustomerList';
import Dashboard from 'pages/Dashboard';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import ProductList from 'pages/ProductList';
import Register from 'pages/Register';
import SatisfactoryProductList from 'pages/SatisfactoryProductList';
import Settings from 'pages/Settings';
import TermsAndConditions from 'pages/TermsAndConditions';
import TestPage from 'pages/TestPage';
import PrivacyPolicy from 'pages/PrivacyPolicy';

const routes = (isLoggedIn) => [
  {
    path: 'demo',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }, {
    path: 'app',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'games', element: <></> },
      { path: 'factories', element: <></> },
      { path: 'testpage', element: <TestPage /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }, {
    path: 'open',
    element: <DashboardLayout />,
    children: [
      { path: 'home', element: <></> },
      { path: 'recipes', element: <SatisfactoryRecipeList /> },
      { path: 'products', element: <SatisfactoryProductList /> },
      { path: 'buildables', element: <SatisfactoryBuildableList /> },
      { path: 'testpage', element: <TestPage /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: 'terms', element: <TermsAndConditions /> },
      { path: 'privacy', element: <PrivacyPolicy /> },
      { path: '/', element: <Navigate to="/open/home" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
