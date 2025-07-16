import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUser } from '../apis/apiHooks';
import { enqueueSnackbar } from 'notistack';
import { useUser } from '../context/userContext';


const Register: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

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
        setIsAuthenticated(true);
        enqueueSnackbar("OTP sent successfully", { variant: "success" });
        navigate('/verify-otp')
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
    <div className="py-16">
      <div className="container-custom max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-center">Create an Account</h1>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="Enter your mobile number (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="Create a password"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 6 characters long
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="Confirm your password"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the{' '}
                    <Link to="/t&c" className="text-primary hover:text-primary-600">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-full py-3 flex items-center justify-center"
                  >
                    {isLoading ? 'Creating Account...' : 'Register'}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:text-primary-600 font-medium">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const OtpVerification: React.FC = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const navigate = useNavigate();
    const { setUser } = useUser();
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const userEmail = useUser()?.user?.email || '';

    console.log('first', userEmail);

    const {
        mutateAsync: verifyOtp,
        isSuccess: isRegisterSuccess,
        error: verifyOtpError,
        data: res,
    } = useVerifyOtp();

    console.log('res', res)

    // useEffect(() => {


    // }, [res, setUser, navigate]);

    const handleChange = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }

        if (newOtp.every((digit) => digit !== '')) {
            handleOtpSubmit(newOtp.join(''));
            //  onSubmit(newOtp.join('')); // No need to call onSubmit, we handle verification here

        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData('text').slice(0, 4).split('');
        if (pasted.every((char) => /^[0-9]$/.test(char))) {
            const newOtp = ['', '', '', ''].map((_, i) => pasted[i] || '');
            setOtp(newOtp);
            newOtp.forEach((val, i) => {
                if (val && inputRefs.current[i]) {
                    inputRefs.current[i]!.value = val;
                }

            });
            if (newOtp.every((digit) => digit !== '')) (newOtp.join(''));
        }
    };

    const handleOtpSubmit = async (otp: string) => {
        await verifyOtp({ otp, email: userEmail });
        if(res) {
            setUser({
                name: res?.user?.name,
                email: res?.user?.email,
                mobile: res?.user?.mobile,
                id: res?.user?.id,
                isAuthenticated: true
            });
            localStorage.setItem('authToken', res?.token);
            localStorage.setItem('furniture-auth-storage', JSON.stringify({
                user: {
                    name: res?.user?.name,
                    email: res?.user?.email,
                    mobile: res?.user?.mobile,
                    id: res?.user?.id,
                },
                token: res?.token
            }));
            enqueueSnackbar("OTP verified successfully", { variant: "success" });
            navigate('/profile');
        }
    };

    if (verifyOtpError) {
        enqueueSnackbar(verifyOtpError?.response?.data?.message || verifyOtpError.message, { variant: "error" });
    }

    return (
        <div className="py-16">
            <div className="container-custom max-w-md mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="w-full max-w-sm mx-auto mt-10 mb-10 text-center">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Enter the 4-digit OTP</h2>
                        <div className="flex justify-center gap-3">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    className="w-12 h-12 text-center border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onPaste={handlePaste}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                />
                            ))}
                        </div>
                    </div>
                </div >
            </div >
        </div >
    );
};
export default Register;