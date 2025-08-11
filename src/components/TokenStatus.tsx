import { userAuth } from '../contexts/AuthContext';

const TokenStatus = () => {
  const { token, user } = userAuth();

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg text-xs opacity-75 hover:opacity-100 transition-opacity">
      <div className="mb-2">
        <strong>Token Status:</strong> {token ? '✅ Active' : '❌ None'}
      </div>
      {token && (
        <div className="mb-2">
          <strong>User:</strong> {user?.username || 'Unknown'}
        </div>
      )}
      {token && (
        <div className="text-xs break-all max-w-xs">
          <strong>Token:</strong> {token.substring(0, 20)}...
        </div>
      )}
    </div>
  );
};

export default TokenStatus;
