import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";

// Recover from stale chunks after a deploy: if a dynamic import fails
// (old hashed file removed), force a one-time reload to fetch the new index.html.
const lazyWithReload = <T extends { default: React.ComponentType<any> }>(
  importer: () => Promise<T>,
) =>
  lazy(async () => {
    try {
      return await importer();
    } catch (err) {
      const KEY = "lov:chunk-reload";
      if (typeof window !== "undefined" && !sessionStorage.getItem(KEY)) {
        sessionStorage.setItem(KEY, "1");
        window.location.reload();
        // Return a never-resolving promise while the reload happens
        return new Promise<T>(() => {});
      }
      throw err;
    }
  });

// Lazy-load secondary routes to keep the initial bundle small
const WorkPage = lazyWithReload(() => import("./pages/WorkPage"));
const ProjectDetailPage = lazyWithReload(() => import("./pages/ProjectDetailPage"));
const AboutPage = lazyWithReload(() => import("./pages/AboutPage"));
const ExperiencePage = lazyWithReload(() => import("./pages/ExperiencePage"));
const NotFound = lazyWithReload(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div
    className="min-h-screen w-full bg-background"
    role="status"
    aria-live="polite"
  >
    <span className="sr-only">Loading page…</span>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/cv" element={<ExperiencePage />} />
              {/* Legacy redirects */}
              <Route path="/about-me" element={<Navigate to="/about" replace />} />
              <Route path="/experience" element={<Navigate to="/cv" replace />} />
              <Route path="/:projectId" element={<ProjectDetailPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
