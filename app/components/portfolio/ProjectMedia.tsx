'use client';

import { Project } from '../../../types/project';
import PerformanceOptimizedImage from '../PerformanceOptimizedImage';
import AutoVideo from '../AutoVideo';
import { isValidImageUrl } from '../../../lib/utils/imageValidation';

export default function ProjectMedia({ project, isMobile }: { project: Project; isMobile: boolean }) {
  if (!isValidImageUrl(project.imageUrl) || !project.imageUrl) {
    return null;
  }

  return (
    <div className={`${isMobile ? 'mb-6' : 'mb-6 lg:mb-8'} flex justify-center`}>
      {project.imageUrl.includes('RCT_tara') ||
      project.imageUrl.includes('Rating System') ||
      project.imageUrl.includes('quizards') ? (
        isMobile ? (
          <div className="w-[320px] max-w-full">
            <PerformanceOptimizedImage
              src={project.imageUrl}
              alt={project.title}
              width={320}
              height={520}
              sizes="(max-width: 768px) 320px, 320px"
              quality={60}
            />
          </div>
        ) : (
          <div className="max-w-[450px] mx-auto">
            <PerformanceOptimizedImage
              src={project.imageUrl}
              alt={project.title}
              width={450}
              height={750}
              sizes="(max-width: 768px) 400px, (max-width: 1024px) 450px, 500px"
              quality={60}
              priority={true}
            />
          </div>
        )
      ) : project.imageUrl.includes('.webm') || project.imageUrl.includes('.mp4') ? (
        isMobile ? (
          <div className="w-full mx-auto max-w-[200px] sm:max-w-[260px]">
            <AutoVideo
              src={project.imageUrl}
              alt={project.title}
              width={260}
              height={160}
              sizes="(max-width: 640px) 80vw, 260px"
              priority={false}
              poster={project.videoPoster || '/images/projects/gamification-demo-poster.jpg'}
              fallbackImage={project.videoFallback || '/images/projects/gamification-financial-literacy.gif'}
            />
          </div>
        ) : (
          <div className="w-full mx-auto max-w-[360px] sm:max-w-[390px]">
            <AutoVideo
              src={project.imageUrl}
              alt={project.title}
              width={390}
              height={640}
              sizes="(max-width: 640px) 90vw, 390px"
              priority={true}
              poster={project.videoPoster || '/images/projects/gamification-demo-poster.jpg'}
              fallbackImage={project.videoFallback || '/images/projects/gamification-financial-literacy.gif'}
            />
          </div>
        )
      ) : (
        isMobile ? (
          <PerformanceOptimizedImage
            src={project.imageUrl}
            alt={project.title}
            width={450}
            height={280}
            sizes="(max-width: 768px) 90vw, 450px"
            quality={60}
          />
        ) : (
          <div className="max-w-2xl mx-auto">
            <PerformanceOptimizedImage
              src={project.imageUrl}
              alt={project.title}
              width={800}
              height={500}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={60}
            />
          </div>
        )
      )}
    </div>
  );
}
