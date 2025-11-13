import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = '₹';
    const backendUrl = (import.meta.env.VITE_BACKEND_URL || (import.meta.env.DEV ? 'http://localhost:4000' : '')).replace(/\/$/, '');

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userData, setUserData] = useState(false);
    const [loading, setLoading] = useState(true);

    // --- Doctors API ---
    const getDoctosData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list');
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.log(error);
            // Don't show error toast for doctor list as it's not critical
        }
    };

    // --- User Profile API ---
    const loadUserProfileData = async () => {
        if (!token) {
            setUserData(false);
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.get(
                backendUrl + '/api/user/get-profile',
                { headers: { token } }
            );

            if (data.success) {
                setUserData(data.userData);
            } else {
                // Token might be invalid, clear it
                if (data.message.includes('Not Authorized') || data.message.includes('Invalid')) {
                    localStorage.removeItem('token');
                    setToken('');
                    setUserData(false);
                }
            }
        } catch (error) {
            console.log(error);
            // If unauthorized, clear token
            if (error.response?.status === 401 || error.response?.data?.message?.includes('Not Authorized')) {
                localStorage.removeItem('token');
                setToken('');
                setUserData(false);
            }
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUserData(false);
    };

    useEffect(() => {
        getDoctosData();
    }, []);

    useEffect(() => {
        loadUserProfileData();
    }, [token]);

    // Provide everything needed
    const value = {
        doctors,
        getDoctosData,
        currencySymbol,
        backendUrl,
        token,
        setToken,
        userData,
        setUserData,
        loadUserProfileData,
        logout,
        loading,
        isLoggedIn: !!token && !!userData
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
