import React, { useState, useRef, useEffect } from 'react';
import { useVerifyOtp } from '../apis/apiHooks';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import { enqueueSnackbar } from 'notistack';

const OtpVerification: React.FC = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const navigate = useNavigate();
    const { setUser } = useUser();
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const userEmail = useUser()?.user?.email || '';

    console.log('first', userEmail);

    const {
        mutateAsync: verifyOtp,
        // isSuccess: isRegisterSuccess,
        error: verifyOtpError,
        data: res,
    } = useVerifyOtp();

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

export default OtpVerification;
