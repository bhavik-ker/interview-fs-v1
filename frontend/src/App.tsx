import { useState } from 'react';
import { Button } from 'react-daisyui';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const authenticateUser = async (username: string, password: string) => {
    try {
      setLoading(true);
      setMessage('');
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      const data = await response.json();
      console.log('Login successful:', data);
      setFormData({ username: '', password: '' });
      setMessage('Login successful!');

      // Handle successful login (e.g., store token, redirect)
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.message || 'An error occurred during login');
      // Handle error (e.g., show notification)
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    authenticateUser(formData.username, formData.password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">Login</h2>

          {message && <div className="alert alert-info">{message}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="input input-bordered w-full"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6">
              <Button type="submit" className="btn btn-primary w-full">
                Login
              </Button>
            </div>
          </form>

          <div className="divider">OR</div>

          <div className="text-center">
            <span className="text-sm">Don't have an account? </span>
            <a href="#" className="link link-primary text-sm">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

