// authService.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  token: string;
  user: User;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Parse response body safely. Returns parsed JSON or plain text or null.
 */
async function parseResponseBody(response: Response): Promise<any> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * Handle fetch Response: parse body, throw Error with helpful message on non-ok.
 */
async function handleResponse(response: Response): Promise<any> {
  const body = await parseResponseBody(response);

  if (!response.ok) {
    // Prefer { error: '...' } then { message: '...' } then text fallback
    const msg =
      (body && (body.error || body.message)) ||
      (typeof body === 'string' ? body : `Request failed (${response.status})`);
    throw new Error(msg);
  }

  return body;
}

/**
 * Normalize raw user object from backend into the User interface.
 */
function normalizeUser(raw: any): User {
  return {
    id: String(raw.id),
    name: raw.name,
    email: raw.email,
    role: String(raw.role ?? 'USER').toLowerCase() === 'admin' ? 'admin' : 'user'
  };
}

export const authService = {
  async signup(data: {
    name: string;
    email: string;
    password: string;
    role?: string; // accept any case/value from UI
  }): Promise<AuthResponse> {
    const payload = {
      name: String(data.name ?? '').trim(),
      email: String(data.email ?? '').trim(),
      password: String(data.password ?? ''),
      // normalize to uppercase because backend expects USER/ADMIN
      role: String(data.role ?? 'USER').trim().toUpperCase()
    };

    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const body = await handleResponse(response);

    // Ensure body has token and user
    if (!body || !body.token || !body.user) {
      throw new Error('Invalid server response');
    }

    return {
      token: String(body.token),
      user: normalizeUser(body.user)
    } as AuthResponse;
  },

  async login(data: { email: string; password: string; }): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: String(data.email ?? '').trim(),
        password: String(data.password ?? '')
      }),
    });

    const body = await handleResponse(response);

    if (!body || !body.token || !body.user) {
      throw new Error('Invalid server response');
    }

    return {
      token: String(body.token),
      user: normalizeUser(body.user)
    } as AuthResponse;
  },

  async getMe(token: string): Promise<{ user: User }> {
    const response = await fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // handleResponse will throw if not ok
    const body = await handleResponse(response);

    if (!body || !body.user) {
      throw new Error('Invalid server response');
    }

    return { user: normalizeUser(body.user) };
  },

  // Local storage helpers
  setToken(token: string) { localStorage.setItem('token', token); },
  getToken(): string | null { return localStorage.getItem('token'); },
  removeToken() { localStorage.removeItem('token'); },

  setUser(user: User) { localStorage.setItem('user', JSON.stringify(user)); },
  getUser(): User | null {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  },
  removeUser() { localStorage.removeItem('user'); },

  logout() {
    this.removeToken();
    this.removeUser();
  }
};
