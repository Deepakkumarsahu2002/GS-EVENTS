import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { Lock, Mail, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLogin() {
  const { signIn, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signIn(email, password);
    if (error) {
      setError(error);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-primary-950 to-neutral-900 relative overflow-hidden px-4">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-600/15 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <img src="/logo%20(2).png" alt="GS Events and Catering" className="mx-auto mb-4 h-32 w-64 object-contain" />
            <h1 className="font-serif text-2xl font-bold text-white">Admin Login</h1>
            <p className="text-sm text-white/50 mt-2">Sign in to manage your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 pl-12 pr-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  placeholder="admin@gsevents.in"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 pl-12 pr-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-error-500/10 border border-error-500/20 px-4 py-3 text-sm text-error-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60"
            >
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
