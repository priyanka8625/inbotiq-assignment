'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, User, Shield, Mail } from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <nav className="bg-white dark:bg-slate-800 shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  Dashboard
                </h1>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Welcome, {user?.name}
              <Badge
                variant={user?.role === 'admin' ? 'default' : 'secondary'}
                className="ml-3 text-sm"
              >
                {user?.role === 'admin' ? 'Admin' : 'User'}
              </Badge>
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              You are logged in as a {user?.role}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Profile Information</CardTitle>
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {user?.email}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Role & Permissions</CardTitle>
                  <Shield className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Role</p>
                    <Badge
                      variant={user?.role === 'admin' ? 'default' : 'secondary'}
                      className="mt-1"
                    >
                      {user?.role?.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Access Level</p>
                    <div className="space-y-1">
                      <p className="text-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Dashboard Access
                      </p>
                      {user?.role === 'admin' && (
                        <>
                          <p className="text-sm flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Admin Panel
                          </p>
                          <p className="text-sm flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            User Management
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="outline" className="mt-1 bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Account ID</p>
                    <p className="font-mono text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded mt-1">
                      {user?.id}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {user?.role === 'admin' && (
            <Card className="mt-6 border-2 border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Admin Dashboard
                </CardTitle>
                <CardDescription>
                  Special features available for administrators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <h4 className="font-semibold mb-2">User Management</h4>
                    <p className="text-sm text-muted-foreground">
                      View and manage all users in the system
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <h4 className="font-semibold mb-2">System Settings</h4>
                    <p className="text-sm text-muted-foreground">
                      Configure application settings and preferences
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <h4 className="font-semibold mb-2">Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      View detailed analytics and reports
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <h4 className="font-semibold mb-2">Security Logs</h4>
                    <p className="text-sm text-muted-foreground">
                      Monitor security events and access logs
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
