import { motion } from 'motion/react';
import { Briefcase, Layers, Cpu, Feather, ChevronRight } from 'lucide-react';
import { EXPERIENCE_TIMELINE } from '../constants';

const ICON_MAP: Record<string, any> = {
  Briefcase: Briefcase,
  Layers: Layers,
  Cpu: Cpu,
  Feather: Feather,
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-8 max-w-5xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="mb-20 text-center">
        <h2 className="font-display font-bold text-3xl md:text-5xl text-gray-900 dark:text-white mb-4">
          Professional Trajectory
        </h2>
        <div className="h-1.5 w-20 bg-blue-500 rounded-full mx-auto mb-6" />
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          A chronicled breakdown of my corporate contributions, tech leadership tenures, and key milestones.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-4 md:ml-12 pl-8 md:pl-16 space-y-16">
        {EXPERIENCE_TIMELINE.map((item, idx) => {
          const IconComponent = ICON_MAP[item.icon] || Briefcase;
          return (
            <motion.div
              key={item.company + item.position}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Icon Marker */}
              <div className="absolute -left-[49px] md:-left-[81px] top-1.5 flex items-center justify-center p-2.5 rounded-2xl bg-white dark:bg-[#030305] border-2 border-blue-500 text-blue-600 dark:text-blue-400 z-10 shadow-sm shadow-blue-500/10">
                <IconComponent className="w-5 h-5" />
              </div>

              {/* Box wrapper */}
              <div className="p-6 md:p-8 rounded-2xl glass hover:shadow-md transition-shadow relative">
                {/* Duration Tag */}
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 mb-4">
                  {item.duration}
                </div>

                {/* Company and Position */}
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-4">
                  <h3 className="font-display font-bold text-xl md:text-2xl text-gray-900 dark:text-white">
                    {item.position}
                  </h3>
                  <span className="font-display font-semibold text-base text-gray-500 dark:text-gray-400">
                    {item.company}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Achievements list */}
                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 dark:text-gray-600">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2.5">
                    {item.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                        <ChevronRight className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
