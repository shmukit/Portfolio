'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../lib/utils/animations';

interface Tool {
  name: string;
  icon: string;
  category: string;
}

const tools: Tool[] = [
  { name: 'Figma', icon: '🎨', category: 'Design' },
  { name: 'Sketch', icon: '✏️', category: 'Design' },
  { name: 'Adobe XD', icon: '🖼️', category: 'Design' },
  { name: 'React', icon: '⚛️', category: 'Frontend' },
  { name: 'Next.js', icon: '▲', category: 'Frontend' },
  { name: 'TypeScript', icon: '📘', category: 'Frontend' },
  { name: 'Tailwind CSS', icon: '🎨', category: 'Styling' },
  { name: 'Node.js', icon: '🟢', category: 'Backend' },
  { name: 'Python', icon: '🐍', category: 'Backend' },
  { name: 'PostgreSQL', icon: '🐘', category: 'Database' },
  { name: 'Supabase', icon: '🚀', category: 'Database' },
  { name: 'Git', icon: '📦', category: 'Version Control' },
  { name: 'Framer Motion', icon: '🎭', category: 'Animation' },
  { name: 'Vercel', icon: '▲', category: 'Deployment' },
];

export const Tools = () => {
  const categories = Array.from(new Set(tools.map(tool => tool.category)));

  return (
    <motion.section
      className="bg-gray-50 py-32"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tools & Technologies
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The tools and technologies I use to bring ideas to life and create exceptional digital experiences.
          </p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category) => (
            <motion.div
              key={category}
              variants={fadeInUp}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                {category}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tools
                  .filter((tool) => tool.category === category)
                  .map((tool, index) => (
                    <motion.div
                      key={tool.name}
                      className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-200"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: index * 0.1,
                            duration: 0.5
                          }
                        }
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-3xl mb-2">{tool.icon}</div>
                      <div className="text-sm font-medium text-gray-900 text-center">
                        {tool.name}
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
