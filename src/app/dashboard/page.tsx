"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { getUser, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import SummaryCards from "@/components/SummaryCards";
import RecordTable from "@/components/RecordTable";
import AddRecordModal from "@/components/AddRecordModal";

export default function Dashboard() {
  const [summary, setSummary] = useState({});
  const [records, setRecords] = useState([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const s = await API.get("/dashboard/summary");
      setSummary(s.data);

      if (user?.role !== "viewer") {
        const r = await API.get("/records");
        setRecords(r.data);
      }
    } catch (error : string | any) {
      console.error("Error fetching data:", error);
      // If unauthorized, redirect to login
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout(); // Clear token from localStorage
    router.push("/login");
  };

  useEffect(() => {
    const u = getUser();
    if (!u) {
      // No user found, redirect to login
      router.push("/login");
      return;
    }
    setUser(u);
  }, [router]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  if (!user || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-slate-800 font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Role-based welcome message
  const getWelcomeMessage = () => {
    switch (user.role) {
      case "admin":
        return "Welcome back, Admin! You have full control over the dashboard.";
      case "analyst":
        return "Welcome back, Analyst! You can view and manage records.";
      default:
        return "Welcome back! You have read-only access to the dashboard.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar role={user.role} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                  Dashboard
                </h1>
                <p className="text-slate-800 font-semibold">
                  {getWelcomeMessage()}
                </p>
              </div>
              <div className="hidden sm:block">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards Section */}
        <div className="mb-8">
          <SummaryCards data={summary} />
        </div>

        {/* Records Table Section */}
        {(user.role === "analyst" || user.role === "admin") && (
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Financial Records</h2>
                    <p className="text-slate-800 font-semibold text-sm mt-1">
                      View and manage all financial transactions
                    </p>
                  </div>
                  {user.role === "admin" && (
                    <div className="flex items-center space-x-3">
                      <div className="px-3 py-1 bg-blue-100 rounded-full">
                        <span className="text-blue-700 font-bold text-sm">Admin Access</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="overflow-x-auto">
                <RecordTable records={records} />
              </div>
            </div>
          </div>
        )}

        {/* Admin Actions Section */}
        {user.role === "admin" && (
          <div className="mt-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-lg font-bold text-slate-900">Admin Actions</h3>
                  <p className="text-slate-800 font-semibold text-sm mt-1">
                    Add new financial records to the system
                  </p>
                </div>
                <AddRecordModal refresh={fetchData} />
              </div>
            </div>
          </div>
        )}

        {/* Viewer Message */}
        {user.role === "viewer" && (
          <div className="mt-8">
            <div className="bg-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900">Viewer Access</h3>
                  <p className="text-blue-800 font-semibold text-sm mt-1">
                    You have read-only access to the dashboard. Contact an administrator if you need to modify records.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}