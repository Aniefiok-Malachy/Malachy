import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Star, GitFork, ExternalLink, Github, ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { Project } from '../types';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/github/repos');
      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }
      const data = await response.json();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while loading projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter and search logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLanguage =
      selectedLanguage === 'all' ||
      (project.language && project.language.toLowerCase() === selectedLanguage.toLowerCase());

    return matchesSearch && matchesLanguage;
  });

  // Extract unique languages for filter dropdown
  const languages = ['all', ...Array.from(new Set(projects.map((p) => p.language).filter(Boolean)))];

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLanguage]);

  return (
    <section id="projects" className="py-24 px-6 md:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-gray-900 dark:text-white mb-4">
            Open Source Projects
          </h2>
          <div className="h-1.5 w-20 bg-blue-500 rounded-full mx-auto md:mx-0 mb-6" />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg leading-relaxed">
            A real-time synchronization with my public GitHub repositories. Filtered, paginated, and direct from source.
          </p>
        </div>

        {/* Refresh Button */}
        <button
          id="refresh-repos-btn"
          onClick={fetchProjects}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/40 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900/60 font-semibold text-sm cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Sync Repos
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
          <input
            id="repo-search-input"
            type="text"
            placeholder="Search projects by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/40 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Language Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 hidden sm:inline">
            Language:
          </span>
          <select
            id="repo-lang-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/40 text-gray-800 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang} className="bg-white dark:bg-[#0c0c0e]">
                {lang === 'all' ? 'All Languages' : lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Results Area */}
      {loading ? (
        /* Loading Skeleton Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="p-6 rounded-2xl border border-gray-100 dark:border-gray-900/50 bg-white/40 dark:bg-black/20 animate-pulse flex flex-col justify-between h-[230px]">
              <div>
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2.5" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2.5" />
              </div>
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : error && projects.length === 0 ? (
        /* Error Alert */
        <div className="p-6 rounded-2xl border border-red-500/10 bg-red-500/5 text-center max-w-xl mx-auto">
          <p className="text-red-600 dark:text-red-400 font-semibold mb-2">Error Syncing GitHub</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        /* Empty Search State */
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            No projects matched your search criteria.
          </p>
        </div>
      ) : (
        /* Actual Grid */
        <div>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {paginatedProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group p-6 rounded-2xl glass hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-[240px] relative overflow-hidden"
                >
                  <div>
                    {/* Header: Name & Language */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white tracking-tight truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.name}
                      </h3>
                      {project.language && (
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20 px-2 py-0.5 rounded-md">
                          {project.language}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 mb-5">
                      {project.description || 'No description provided for this repository.'}
                    </p>
                  </div>

                  {/* Footer: Stats & Links */}
                  <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-900/50 pt-4 mt-auto">
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        {project.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5" />
                        {project.forks_count}
                      </span>
                    </div>

                    {/* Link buttons */}
                    <div className="flex items-center gap-2">
                      <a
                        id={`repo-github-link-${project.id}`}
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black/20 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      {project.homepage && (
                        <a
                          id={`repo-demo-link-${project.id}`}
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-blue-600 dark:bg-white text-white dark:text-gray-950 hover:bg-blue-700 dark:hover:bg-gray-100 transition-colors"
                          title="View Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                id="pagination-prev-btn"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/40 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900/60 disabled:opacity-40 cursor-pointer"
              >
                <ArrowLeft className="w-4.5 h-4.5" />
              </button>
              <span className="font-mono text-sm font-semibold text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <button
                id="pagination-next-btn"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/40 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900/60 disabled:opacity-40 cursor-pointer"
              >
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
