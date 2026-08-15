import { useState } from 'react';
import {
    AuthenticatedTemplate,
    UnauthenticatedTemplate,
    useMsal,
} from '@azure/msal-react'; // Import the hook to access MSAL instance
import { InteractionRequiredAuthError } from '@azure/msal-browser';

function UserName() {
    const [loading, setLoading] = useState(false); // Add a loading state
    const { instance, accounts } = useMsal(); // Access MSAL instance and accounts from the context

    const [user, setUser] = useState(accounts[0] || null); // Set initial user from the MSAL context

    const login = async () => {
        setLoading(true); // Set loading to true when login starts
        try {
            const loginResponse = await instance.loginPopup({
                scopes: ['User.Read'], // Define the scopes you need
            });
            setUser(loginResponse.account); // Set user to the logged-in account
        } catch (error) {
            if (error instanceof InteractionRequiredAuthError) {
                // If interaction is required, fall back to loginRedirect
                instance.loginRedirect({
                    scopes: ['User.Read'],
                });
            } else {
                console.error(error); // Handle other errors
            }
        } finally {
            setLoading(false); // Set loading to false once the process is complete
        }
    };

    const logout = () => {
        instance.logout();
        setUser(null); // Clear the user state on logout
    };

    return (
        <div>
            <AuthenticatedTemplate>
                <p>Welcome, {user?.name || user?.username || 'User'}</p>{' '}
                {/* Use user.name or user.username */}
                <button onClick={logout}>Logout</button>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <button onClick={login} disabled={loading}>
                    {loading ? 'Logging in...' : 'Login with Microsoft'}
                </button>
            </UnauthenticatedTemplate>
        </div>
    );
}

export default UserName;
