import { motion } from 'motion/react';
import { Award, Calendar, ArrowUpRight, GraduationCap, MapPin } from 'lucide-react';
import { CERTIFICATIONS, EDUCATION } from '../constants';

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 md:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="mb-16 text-center md:text-left">
        <h2 className="font-display font-bold text-3xl md:text-5xl text-gray-900 dark:text-white mb-4">
          Education & Training
        </h2>
        <div className="h-1.5 w-20 bg-blue-500 rounded-full mx-auto md:mx-0 mb-6" />
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl text-lg leading-relaxed">
          Academic foundation and structured blockchain tracks that empower my software development journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Education Section */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white flex items-center gap-2.5 mb-6">
            <GraduationCap className="w-6 h-6 text-blue-500" />
            Academic Education
          </h3>
          {EDUCATION.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 md:p-8 rounded-2xl glass hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    {edu.institution}
                  </span>
                  <h4 className="font-display font-bold text-xl text-gray-900 dark:text-white mt-1">
                    {edu.degree}
                  </h4>
                </div>
                <div className="text-right sm:text-right flex flex-col items-start sm:items-end gap-1">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    {edu.date}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400" /> {edu.location}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-900/50 pt-4 mt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-3">
                  Key Achievements & Coursework
                </span>
                <ul className="space-y-2">
                  {edu.details.map((detail, dIdx) => (
                    <li key={dIdx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                      <span className="text-blue-500 font-semibold shrink-0">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Section */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white flex items-center gap-2.5 mb-6">
            <Award className="w-6 h-6 text-indigo-500" />
            Specialized Training
          </h3>
          <div className="space-y-6">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-6 rounded-2xl glass hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/15 shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block">
                        {cert.institution}
                      </span>
                      <h4 className="font-display font-bold text-base md:text-lg text-gray-900 dark:text-white leading-tight mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {cert.certificate}
                      </h4>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t border-gray-100 dark:border-gray-900/50 pt-3 mt-3">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {cert.date}
                      </span>
                      <a
                        id={`cert-credential-btn-${cert.id}`}
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer group/link"
                      >
                        Visit Link
                        <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
