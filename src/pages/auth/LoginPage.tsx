import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type LocationState = {
    from: {
        pathname: string;
    };
};

export function LoginPage() {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">LOGIN PAGE</div>;
}
