import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AppLayout from "./components/layout/AppLayout";

// Auth pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// Public
import LandingPage from "./pages/public/LandingPage";

// Dashboard
import DashOverview from "./pages/dashboard/DashOverview";

// Studios
import MovieStudio from "./pages/studio/MovieStudio";
import CartoonStudio from "./pages/studio/CartoonStudio";
import ExplainerStudio from "./pages/studio/ExplainerStudio";
import NewsStudio from "./pages/studio/NewsStudio";
import ImageToVideoStudio from "./pages/studio/ImageToVideoStudio";
import AdStudio from "./pages/studio/AdStudio";

// Library
import CharacterLibrary from "./pages/library/CharacterLibrary";
import VoiceLibrary from "./pages/library/VoiceLibrary";
import MediaLibrary from "./pages/library/MediaLibrary";

// Production
import RenderQueue from "./pages/render/RenderQueue";

// Social
import SocialPublisher from "./pages/social/SocialPublisher";
import ConnectedAccounts from "./pages/social/ConnectedAccounts";

// Admin
import AdminSettings from "./pages/admin/AdminSettings";

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: "hsl(220,25%,4%)" }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #fbbf24, #d97706)" }}>
          <div className="w-8 h-8 border-2 border-black/30 border-t-black rounded-full animate-spin" />
        </div>
        <div className="text-white/40 text-sm font-medium tracking-wider">IYKE CONTENT STUDIO</div>
      </div>
    </div>
  );
}

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingFallback />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

function LayoutWrapper({ pageTitle, breadcrumb }: { pageTitle: string; breadcrumb?: string[] }) {
  return (
    <AppLayout pageTitle={pageTitle} breadcrumb={breadcrumb}>
      <Outlet />
    </AppLayout>
  );
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            {/* Dashboard */}
            <Route element={<LayoutWrapper pageTitle="Dashboard" />}>
              <Route path="/dashboard" element={<DashOverview />} />
            </Route>

            {/* Studios */}
            <Route element={<LayoutWrapper pageTitle="Movie Studio" breadcrumb={["Studios", "Movie Studio"]} />}>
              <Route path="/studio/movie" element={<MovieStudio />} />
            </Route>
            <Route element={<LayoutWrapper pageTitle="Cartoon Studio" breadcrumb={["Studios", "Cartoon Studio"]} />}>
              <Route path="/studio/cartoon" element={<CartoonStudio />} />
            </Route>
            <Route element={<LayoutWrapper pageTitle="Explainer Studio" breadcrumb={["Studios", "Explainer Studio"]} />}>
              <Route path="/studio/explainer" element={<ExplainerStudio />} />
            </Route>
            <Route element={<LayoutWrapper pageTitle="News Studio" breadcrumb={["Studios", "News Studio"]} />}>
              <Route path="/studio/news" element={<NewsStudio />} />
            </Route>
            <Route element={<LayoutWrapper pageTitle="Image to Video" breadcrumb={["Studios", "Image to Video"]} />}>
              <Route path="/studio/image-to-video" element={<ImageToVideoStudio />} />
            </Route>
            <Route element={<LayoutWrapper pageTitle="Ad Studio" breadcrumb={["Studios", "Ad Studio"]} />}>
              <Route path="/studio/ads" element={<AdStudio />} />
            </Route>

            {/* Library */}
            <Route element={<LayoutWrapper pageTitle="Character Library" breadcrumb={["Library", "Characters"]} />}>
              <Route path="/library/characters" element={<CharacterLibrary />} />
            </Route>
            <Route element={<LayoutWrapper pageTitle="Voice Library" breadcrumb={["Library", "Voices"]} />}>
              <Route path="/library/voices" element={<VoiceLibrary />} />
            </Route>
            <Route element={<LayoutWrapper pageTitle="Media Library" breadcrumb={["Library", "Media"]} />}>
              <Route path="/library/media" element={<MediaLibrary />} />
            </Route>

            {/* Production */}
            <Route element={<LayoutWrapper pageTitle="Render Queue" breadcrumb={["Production", "Render Queue"]} />}>
              <Route path="/render/queue" element={<RenderQueue />} />
            </Route>
            <Route element={<LayoutWrapper pageTitle="Video Editor" breadcrumb={["Production", "Video Editor"]} />}>
              <Route path="/editor" element={<div className="flex items-center justify-center min-h-96 text-white/40"><div className="text-center"><div className="text-4xl mb-4">🎬</div><h2 className="text-xl font-bold text-white mb-2">Video Editor</h2><p>The timeline editor is coming soon. Completed renders will appear here for trimming and post-production.</p></div></div>} />
            </Route>

            {/* Social */}
            <Route element={<LayoutWrapper pageTitle="Social Publisher" breadcrumb={["Publish", "Social Publisher"]} />}>
              <Route path="/social/publish" element={<SocialPublisher />} />
            </Route>
            <Route element={<LayoutWrapper pageTitle="Connected Accounts" breadcrumb={["Publish", "Connected Accounts"]} />}>
              <Route path="/social/accounts" element={<ConnectedAccounts />} />
            </Route>

            {/* Admin */}
            <Route element={<LayoutWrapper pageTitle="Admin Settings" breadcrumb={["Admin", "Settings"]} />}>
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
