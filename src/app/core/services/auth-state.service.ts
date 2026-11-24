import { Injectable, computed, signal } from '@angular/core';

const SESSION_KEY = 'emp.session';

export interface Session {
  username: string;
  name: string;
  role: string;
  email: string;
  /** URL avatar; kosong = pakai inisial. */
  avatar: string;
}

interface Account extends Session {
  password: string;
}

/** Akun demo (tanpa backend). Role dipakai untuk label di menu profil. */
const ACCOUNTS: Account[] = [
  {
    username: 'admin',
    password: 'admin123',
    name: 'Admin HRD',
    role: 'HR Administrator',
    email: 'admin.hrd@company.co.id',
    avatar: '',
  },
  {
    username: 'hrd',
    password: 'hrd123',
    name: 'Staff HRD',
    role: 'HR Staff',
    email: 'staff.hrd@company.co.id',
    avatar: '',
  },
];

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private readonly _session = signal<Session | null>(this.read());
  readonly session = this._session.asReadonly();
  readonly isLoggedIn = computed(() => this._session() !== null);

  /** Inisial untuk fallback avatar, mis. "Admin HRD" -> "AH". */
  readonly initials = computed(() => {
    const name = this._session()?.name ?? '';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  });

  private read(): Session | null {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as Session) : null;
    } catch {
      return null;
    }
  }

  login(username: string, password: string): boolean {
    const found = ACCOUNTS.find(
      (a) => a.username === username.trim().toLowerCase() && a.password === password,
    );
    if (!found) return false;
    const { password: _pw, ...session } = found;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    this._session.set(session);
    return true;
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    this._session.set(null);
  }
}
