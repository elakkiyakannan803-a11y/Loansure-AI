import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/lib/toast';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';

export default function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = 'Please enter your email.';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Please enter a valid email address.';
    if (!password) e.password = 'Please enter your password.';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        showToast('Welcome back to LoanSure AI!', 'success');
        navigate('/dashboard');
      } else {
        showToast(result.error || 'Login failed.', 'error');
      }
      setLoading(false);
    }, 600);
  };

  const fillDemo = () => {
    setEmail('demo@loansure.ai');
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent-600/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>

        <div className="rounded-2xl bg-navy-800/80 border border-navy-600/40 backdrop-blur-sm p-6 sm:p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-1">Sign In</h2>
          <p className="text-sm text-navy-300 mb-6">Enter your credentials to access your dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-100 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full rounded-lg bg-navy-800/60 border ${errors.email ? 'border-orange-500' : 'border-navy-500/40'} pl-10 pr-3.5 py-2.5 text-sm text-white placeholder:text-navy-300/60 focus:outline-none focus:border-accent-400 focus:ring-1 focus:ring-accent-400/30`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-orange-400">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-100 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full rounded-lg bg-navy-800/60 border ${errors.password ? 'border-orange-500' : 'border-navy-500/40'} pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-navy-300/60 focus:outline-none focus:border-accent-400 focus:ring-1 focus:ring-accent-400/30`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-300 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-orange-400">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-navy-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-navy-500 bg-navy-800 text-accent-500 focus:ring-accent-400"
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-sm text-accent-400 hover:text-accent-300">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>
                  <LogIn className="h-4.5 w-4.5" width={18} height={18} />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <button
            onClick={fillDemo}
            className="mt-3 w-full text-xs text-navy-300 hover:text-accent-400 transition-colors text-center"
          >
            Use demo credentials (demo@loansure.ai / demo123)
          </button>

          <p className="mt-6 text-center text-sm text-navy-300">
            Don't have an account?{' '}
            <Link to="/signup" className="text-accent-400 hover:text-accent-300 font-medium">
              Sign up
            </Link>
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-navy-400">
          LoanSure AI provides informational estimates only. Not a bank or lender.
        </p>
      </div>
    </div>
  );
}
