import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUser } from '../apis/apiHooks';
import { enqueueSnackbar } from 'notistack';
import { useUser } from '../context/userContext';
import { CreateAccountForm } from './CreateAccountForm';
import OtpVerification from './OtpVerification';



const Signup: React.FC = () => {

  const navigate = useNavigate();
  const { setUser } = useUser();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [mainComponent, setMainComponent] = useState(false);

  const {
    mutateAsync: registerUser,
    // isSuccess: isRegisterSuccess
  } = useRegisterUser();


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const success = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        mobile: formData.mobile
      });

      setUser({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile
      });

      if (success) {
        // localStorage.setItem('authToken', response.data.token)
        // setIsAuthenticated(true);
        setMainComponent(true);
        enqueueSnackbar("OTP sent successfully", { variant: "success" });
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError('Please try again.');
      enqueueSnackbar((error.response?.data?.message || error.message), { variant: "error" });

    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    navigate('/profile');
    return null;
  }

  return (
    <div>
      {mainComponent ? <OtpVerification /> : <CreateAccountForm
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        error={error}
        setError={setError}
        isLoading={isLoading}
        isAuthenticated={isAuthenticated}
      />
      }
    </div>);
};

export default Signup;