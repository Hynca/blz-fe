import { postAuthLogin } from 'store/actions/auth.actions';
import { dispatch } from 'store/index';

export function LoginPage() {
    const handleLogin = () => {
        dispatch(postAuthLogin({ email: 'test@example.com', password: '123456' }));
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" onClick={() => handleLogin()}>
            LOGIN PAGE
        </div>
    );
}
