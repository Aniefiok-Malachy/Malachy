import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_CATEGORIES } from '../constants';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [{ id: 'all', name: 'All Stack' }, ...SKILL_CATEGORIES];

  const displayedSkills = selectedCategory === 'all'
    ? SKILL_CATEGORIES.flatMap((cat) => cat.skills.map((s) => ({ ...s, category: cat.name })))
    : SKILL_CATEGORIES.find((cat) => cat.id === selectedCategory)?.skills.map((s) => ({ ...s, category: selectedCategory })) || [];

  return (
    <section id="skills" className="py-24 px-6 md:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="mb-16 text-center md:text-left">
        <h2 className="font-display font-bold text-3xl md:text-5xl text-gray-900 dark:text-white mb-4">
          Core Proficiencies
        </h2>
        <div className="h-1.5 w-20 bg-blue-500 rounded-full mx-auto md:mx-0 mb-6" />
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl text-lg leading-relaxed">
          A granular view of my technical competencies and engineering specializations, 
          built over 15 years of industry experience.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-12">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer border ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 dark:bg-white dark:text-gray-950 dark:border-white shadow-md'
                  : 'bg-white/50 dark:bg-black/40 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900/60'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {displayedSkills.map((skill) => (
            <motion.div
              layout
              key={skill.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl glass hover:shadow-md transition-shadow group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="font-semibold text-gray-900 dark:text-white text-base tracking-tight">
                    {skill.name}
                  </span>
                  <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20 px-2 py-0.5 rounded-md">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress bar background */}
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mb-4">
                  {/* Progress bar fill */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300"
                  />
                </div>
              </div>

              {/* Tag/Indicator */}
              {'category' in skill && selectedCategory === 'all' && (
                <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-gray-600">
                  {String(skill.category)}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
