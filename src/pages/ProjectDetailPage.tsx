import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageLayout from '@/components/PageLayout';
import Footer from '@/components/Footer';
import { getProjectById, getRelatedProjects, ProjectData } from '@/data/projects';

const RelatedProjectCard = ({ project }: { project: ProjectData }) => {
  const { t } = useLanguage();

  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, string> = {
      'executive-decks': t.work.categories.executiveDecks,
      'templates': t.work.categories.templates,
      'tech-events': t.work.categories.techEvents,
      'hr-initiatives': t.work.categories.hrInitiatives,
      'side-projects': t.work.categories.sideProjects,
    };
    return categoryMap[category] || category;
  };

  return (
    <Link to={`/${project.id}`} className="group block">
      <div className="bg-muted rounded-2xl overflow-hidden transition-all duration-300">
        <div className="p-4 pb-0">
          <div className="aspect-[4/3] overflow-hidden rounded-xl">
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        <div className="p-4 space-y-2">
          <h4 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h4>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-accent text-accent-foreground text-xs">
            {getCategoryLabel(project.category)}
          </span>
        </div>
      </div>
    </Link>
  );
};

const ProjectDetailPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { t } = useLanguage();
  const project = projectId ? getProjectById(projectId) : null;
  const relatedProjects = projectId ? getRelatedProjects(projectId, 3) : [];

  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, string> = {
      'executive-decks': t.work.categories.executiveDecks,
      'templates': t.work.categories.templates,
      'tech-events': t.work.categories.techEvents,
      'hr-initiatives': t.work.categories.hrInitiatives,
      'side-projects': t.work.categories.sideProjects,
    };
    return categoryMap[category] || category;
  };

  if (!project) {
    return (
      <PageLayout>
        <main className="pt-28 pb-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-display text-4xl mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist.
            </p>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Work
            </Link>
          </div>
        </main>
      </PageLayout>
    );
  }

  return (
    <PageLayout>

      <main className="pt-24 pb-16">
        {/* Back Button */}
        <div className="container mx-auto px-6 mb-8">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Work
          </Link>
        </div>

        {/* Hero */}
        <motion.div
          className="container mx-auto px-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span>{project.client}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span>{project.year}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs">
              {getCategoryLabel(project.category)}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {project.description}
          </p>
        </motion.div>

        {/* Main Image */}
        <motion.div
          className="container mx-auto px-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="aspect-video rounded-3xl overflow-hidden bg-secondary">
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* Overview */}
            {project.overview && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="font-display text-xl font-semibold mb-4 text-primary">
                  Overview
                </h3>
                <p className="text-muted-foreground">{project.overview}</p>
              </motion.div>
            )}

            {/* Challenge */}
            {project.challenge && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="font-display text-xl font-semibold mb-4 text-primary">
                  The Challenge
                </h3>
                <p className="text-muted-foreground">{project.challenge}</p>
              </motion.div>
            )}

            {/* Solution */}
            {project.solution && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="font-display text-xl font-semibold mb-4 text-primary">
                  The Solution
                </h3>
                <p className="text-muted-foreground">{project.solution}</p>
              </motion.div>
            )}
          </div>

          {/* Results */}
          {project.results && project.results.length > 0 && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="font-display text-xl font-semibold mb-6 text-primary">
                Results
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {project.results.map((result, index) => (
                  <div
                    key={index}
                    className="bg-muted rounded-2xl p-6 flex items-start gap-3"
                  >
                    <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                    <p className="text-foreground">{result}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Image Gallery */}
          {project.images.length > 1 && (
            <motion.div
              className="grid md:grid-cols-2 gap-6 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {project.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="aspect-video rounded-2xl overflow-hidden bg-secondary"
                >
                  <img
                    src={image}
                    alt={`${project.title} - Image ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          )}

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-2xl font-semibold">
                  Related Projects
                </h3>
                <Link
                  to="/work"
                  className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
                >
                  View all
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProjects.map((relatedProject) => (
                  <RelatedProjectCard
                    key={relatedProject.id}
                    project={relatedProject}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </PageLayout>
  );
};

export default ProjectDetailPage;
