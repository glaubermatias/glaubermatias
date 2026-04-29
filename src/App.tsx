import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";

// Lazy-load secondary routes to keep the initial bundle small
const CaseStudiesPage = lazy(() => import("./pages/CaseStudiesPage"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const WorkPage = lazy(() => import("./pages/WorkPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen w-full bg-background" aria-hidden="true" />
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
              <Route path="/about-me" element={<AboutPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
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
