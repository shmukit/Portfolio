-- Seed data for Portfolio
-- Includes projects, collaborators, and sample failures

-- World Bank IFC Survey (id: aa5f8b0c-a5bb-4a7e-a634-c915f75c521d)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('aa5f8b0c-a5bb-4a7e-a634-c915f75c521d', 'Galib', 'https://www.linkedin.com/in/galib-mubashir-4326531b7/', 'Researcher', 2);

-- Gamification System (id: 1c04c3aa-d61b-4bc9-9984-74eac1cd0e99)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('1c04c3aa-d61b-4bc9-9984-74eac1cd0e99', 'Galib', 'https://www.linkedin.com/in/galib-mubashir-4326531b7/', 'Product Manager', 3),
('1c04c3aa-d61b-4bc9-9984-74eac1cd0e99', 'Farhan', 'https://www.linkedin.com/in/farhanur-rahaman-56b605195/', 'Product Manager', 4);

-- Quizards (id: d31b5b0b-7055-45d6-ba2a-e857cc7fe859)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('d31b5b0b-7055-45d6-ba2a-e857cc7fe859', 'Shatil', 'https://www.linkedin.com/in/aaqibmdshatil/', 'Project Manager', 3);

-- CareerKi (id: 9091cbf7-5089-47dd-b5e9-831aa5da4c5c)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('9091cbf7-5089-47dd-b5e9-831aa5da4c5c', 'Rakib', 'https://www.linkedin.com/in/rakibulhaq/', 'Backend Engineer', 3),
('9091cbf7-5089-47dd-b5e9-831aa5da4c5c', 'Anupam', 'https://www.linkedin.com/in/anupam-samodder/', 'UX/UI Designer', 4);

-- Teaching at the Right Level (TaRL) - Tara app (id: 31339193-fc68-4fa7-a4d8-db496ccf97a8)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('31339193-fc68-4fa7-a4d8-db496ccf97a8', 'Mahbub', 'https://www.linkedin.com/in/md-mahbubur-rahman07/', 'Lead App Developer', 5);
-- Additional Projects for Portfolio Database
-- 3 new projects to be inserted with order_index 22-24

INSERT INTO projects (
  title,
  year,
  company,
  role,
  description,
  lessons,
  image_url,
  order_index,
  category,
  is_unlocked,
  published,
  phase,
  project_type,
  situation,
  task,
  result,
  contributions,
  key_results,
  tags,
  metrics
) VALUES 

-- 1️⃣ Certificate Sharing Journey Optimization
(
  'Certificate Sharing Journey Optimization',
  2023,
  '10 Minute School',
  'Lead Product Manager',
  'Optimized certificate sharing functionality to increase organic traffic and user engagement through improved public pages, profile sections, and tracking capabilities.',
  'Certificate sharing is crucial for organic growth and peer-to-peer marketing. Technical improvements combined with user experience enhancements can significantly impact engagement metrics.',
  '/images/projects/certificate_sharing_optimization.jpg',
  22,
  'Product Optimization',
  true,
  true,
  'Completed',
  'Product Enhancement',
  'Certificate was the key way to signal positive learning outcome among peers and becoming a major way to increase organic traffic. However, the sharing experience had technical issues and lacked proper tracking.',
  'Certificate Public Page UI Fix and PDP Redirection, Certificate (Profile) section sharing issue fix, UTM parameter added to Certificate public URLs for data tracking, Paid certificate template change.',
  'Within 6 months, increased Avg Certificates downloads by 66.11% and increased Avg visitors by 91.62%.',
  '[
    {
      "contribution": "Certificate Public Page UI Fix and PDP Redirection",
      "value_chain_position": "downstream",
      "type": "UX Design"
    },
    {
      "contribution": "Certificate (Profile) section sharing issue fix",
      "value_chain_position": "downstream",
      "type": "Technical Implementation"
    },
    {
      "contribution": "UTM parameter added to Certificate public URLs for data tracking",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Paid certificate template change",
      "value_chain_position": "downstream",
      "type": "Product Strategy"
    }
  ]'::jsonb,
  '[
    {
      "value": "66.11%",
      "label": "Certificate Downloads Increase",
      "description": "Average certificates downloads improvement",
      "category": "Growth"
    },
    {
      "value": "91.62%",
      "label": "Visitor Increase",
      "description": "Average visitors improvement",
      "category": "Growth"
    },
    {
      "value": "6 Months",
      "label": "Timeline",
      "description": "Project duration and results timeframe",
      "category": "Timeline"
    },
    {
      "value": "UTM Tracking",
      "label": "Data Infrastructure",
      "description": "Added comprehensive tracking for sharing analytics",
      "category": "Technical"
    }
  ]'::jsonb,
  ARRAY['certificates', 'sharing', 'organic-growth', 'tracking', 'optimization', 'product-enhancement'],
  '{"downloads_increase": "66.11_percent", "visitors_increase": "91.62_percent", "timeline": "6_months", "utm_tracking": "implemented"}'::jsonb
),

-- 2️⃣ Course Validity Date Implementation
(
  'Course Validity Date Implementation',
  2023,
  '10 Minute School',
  'Lead Product Manager',
  'Implemented course validity dates to drive user progress and course completion by creating urgency and clear deadlines for learners.',
  'Adding time constraints to courses can significantly improve user engagement and completion rates. Clear deadlines create psychological urgency that drives action.',
  '/images/projects/course_validity_implementation.jpg',
  23,
  'Product Strategy',
  true,
  true,
  'Completed',
  'Product Enhancement',
  'After purchasing courses, users were not progressing or finishing courses, leading to poor completion rates and reduced learning outcomes.',
  'Implemented Course validation date system to create urgency and drive user engagement with clear deadlines for course completion.',
  'In 6 months, increased user course progress (for first 7 days) from 48% to 77%.',
  '[
    {
      "contribution": "Designed course validity date system",
      "value_chain_position": "upstream",
      "type": "Product Strategy"
    },
    {
      "contribution": "Implemented course validation date functionality",
      "value_chain_position": "midstream",
      "type": "Technical Implementation"
    },
    {
      "contribution": "Monitored and optimized user progress metrics",
      "value_chain_position": "downstream",
      "type": "Data Analysis"
    }
  ]'::jsonb,
  '[
    {
      "value": "48% → 77%",
      "label": "Progress Improvement",
      "description": "User course progress increase in first 7 days",
      "category": "Engagement"
    },
    {
      "value": "6 Months",
      "label": "Timeline",
      "description": "Project duration and results timeframe",
      "category": "Timeline"
    },
    {
      "value": "Validity Date",
      "label": "Feature Implementation",
      "description": "Course expiration system for urgency",
      "category": "Technical"
    }
  ]'::jsonb,
  ARRAY['course-validity', 'user-progress', 'engagement', 'deadlines', 'completion-rates', 'product-strategy'],
  '{"progress_improvement": "48_to_77_percent", "timeline": "6_months", "validity_system": "implemented"}'::jsonb
),

-- 3️⃣ Page Loading Time Optimization
(
  'Page Loading Time Optimization',
  2024,
  '10 Minute School',
  'Lead Product Manager',
  'Comprehensive page performance optimization initiative that reduced loading times by 242% and improved Page Score by 1.45x through cross-team collaboration and systematic monitoring.',
  'Page performance directly impacts user experience and business metrics. Cross-functional collaboration is essential for successful performance optimization. Measurement and monitoring are critical for sustained improvements.',
  '/images/projects/page_loading_optimization.jpg',
  24,
  'Performance Optimization',
  true,
  true,
  'Completed',
  'Technical Optimization',
  'Page loading time across platform was not measured initially. When measured, it showed page loading time avg = 8.11 sec and Page Score Avg = 44.3 (web), leading to poor user experience and revenue loss.',
  'Established Page loading time dashboard for all customer-facing major pages, conducted analysis, and executed page loading time optimization drive in collaboration with design team, frontend team and content team.',
  'In 4 months, page loading time improved by 242% and page score got 1.45x better, helping to reduce dropout from pages and increase revenue.',
  '[
    {
      "contribution": "Established Page loading time dashboard",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Analyzed performance bottlenecks across platform",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Led cross-team optimization drive",
      "value_chain_position": "midstream",
      "type": "Project Management"
    },
    {
      "contribution": "Collaborated with design, frontend, and content teams",
      "value_chain_position": "midstream",
      "type": "Stakeholder Management"
    }
  ]'::jsonb,
  '[
    {
      "value": "242%",
      "label": "Loading Time Improvement",
      "description": "Page loading time optimization",
      "category": "Performance"
    },
    {
      "value": "1.45x",
      "label": "Page Score Improvement",
      "description": "Overall page performance score increase",
      "category": "Performance"
    },
    {
      "value": "4 Months",
      "label": "Timeline",
      "description": "Project duration and results timeframe",
      "category": "Timeline"
    },
    {
      "value": "8.11s → Optimized",
      "label": "Initial Performance",
      "description": "Starting point before optimization",
      "category": "Baseline"
    },
    {
      "value": "Cross-Team",
      "label": "Collaboration",
      "description": "Design, frontend, and content team involvement",
      "category": "Process"
    }
  ]'::jsonb,
  ARRAY['performance', 'optimization', 'loading-time', 'page-score', 'cross-team', 'monitoring', 'dashboard'],
  '{"loading_improvement": "242_percent", "page_score_improvement": "1.45x", "timeline": "4_months", "cross_team_collaboration": true}'::jsonb
);

-- Verification query to check the inserted projects
SELECT 
  title, 
  year, 
  company, 
  role, 
  order_index,
  published
FROM projects 
WHERE order_index BETWEEN 22 AND 24
ORDER BY order_index;-- Insert collaborators for all projects
-- This script adds collaborators with their LinkedIn profiles to the projects

-- 1. Quizards (id: d31b5b0b-7055-45d6-ba2a-e857cc7fe859)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('d31b5b0b-7055-45d6-ba2a-e857cc7fe859', 'Bishwa', 'https://www.linkedin.com/in/bishwamc/', 'Co-founder', 1),
('d31b5b0b-7055-45d6-ba2a-e857cc7fe859', 'Dipesh', 'https://www.linkedin.com/in/dipeshdewan/', 'Co-founder', 2);

-- 2. CareerKi (id: 9091cbf7-5089-47dd-b5e9-831aa5da4c5c)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('9091cbf7-5089-47dd-b5e9-831aa5da4c5c', 'Bishwa', 'https://www.linkedin.com/in/bishwamc/', 'Co-founder', 1),
('9091cbf7-5089-47dd-b5e9-831aa5da4c5c', 'Dipesh', 'https://www.linkedin.com/in/dipeshdewan/', 'Co-founder', 2);

-- 3. Unibiome (id: 34f858ee-96a4-4e9e-a30d-f20fb79bff8f)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('34f858ee-96a4-4e9e-a30d-f20fb79bff8f', 'Sophie', 'https://www.linkedin.com/in/sophie-gontier-9b9b53109/', 'Co-founder', 1),
('34f858ee-96a4-4e9e-a30d-f20fb79bff8f', 'Ihab', 'https://www.linkedin.com/in/ihabboulas/', 'Co-founder', 2),
('34f858ee-96a4-4e9e-a30d-f20fb79bff8f', 'Prateek', 'https://www.linkedin.com/in/prateek-garg-4b416583/', 'Co-founder', 3),
('34f858ee-96a4-4e9e-a30d-f20fb79bff8f', 'Juanma', 'https://www.linkedin.com/in/juanmagar/', 'Co-founder', 4);

-- 4. DAEF (id: f6adecd5-1c59-4a03-9927-09867573c57b)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('f6adecd5-1c59-4a03-9927-09867573c57b', 'Rubaiyat', 'https://www.linkedin.com/in/md-rubaiyath-sarwar-6b795123/', 'Research Lead', 1),
('f6adecd5-1c59-4a03-9927-09867573c57b', 'Tania', 'https://www.linkedin.com/in/tania-tabassum/', 'Research Analyst', 2),
('f6adecd5-1c59-4a03-9927-09867573c57b', 'Nabila', 'https://www.linkedin.com/in/nabila-nishat-raisa-0639b1164/', 'Research Analyst', 3);

-- 5. EdTech Market Thesis & $2Mn from Sequoia (id: a5603511-a9c0-48c5-a14f-8f17e0823890)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('a5603511-a9c0-48c5-a14f-8f17e0823890', 'Ayman', 'https://www.linkedin.com/in/aymansadiq/', 'Strategy Partner', 1);

-- 6. Co-authored book on SMEs digital adoption (id: b495ab11-29f3-43be-a253-ac9ade03f66d)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('b495ab11-29f3-43be-a253-ac9ade03f66d', 'Prof. Shafiq', 'https://www.linkedin.com/in/shafiul-alam-khan/', 'Co-author', 1),
('b495ab11-29f3-43be-a253-ac9ade03f66d', 'Nabila', 'https://www.linkedin.com/in/nabila-nishat-raisa-0639b1164/', 'Co-author', 2);

-- 7. World Bank IFC Survey (id: aa5f8b0c-a5bb-4a7e-a634-c915f75c521d)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('aa5f8b0c-a5bb-4a7e-a634-c915f75c521d', 'Salman', 'https://www.linkedin.com/in/salmanhossain/', 'Research Partner', 1);

-- 8. Course Validity Date Implementation (id: d7aaaaa5-6892-4586-9d18-2731a9009b3d)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('d7aaaaa5-6892-4586-9d18-2731a9009b3d', 'Raied', 'https://www.linkedin.com/in/abyadraied94/', 'Tech Lead', 1),
('d7aaaaa5-6892-4586-9d18-2731a9009b3d', 'Avipsu', 'https://www.linkedin.com/in/avipsuarko/', 'Developer', 2);

-- 9. Certificate Sharing Journey Optimization (id: be82af94-bbe2-42e7-8d00-3fca701dad03)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('be82af94-bbe2-42e7-8d00-3fca701dad03', 'Raied', 'https://www.linkedin.com/in/abyadraied94/', 'Tech Lead', 1),
('be82af94-bbe2-42e7-8d00-3fca701dad03', 'Avipsu', 'https://www.linkedin.com/in/avipsuarko/', 'Developer', 2),
('be82af94-bbe2-42e7-8d00-3fca701dad03', 'Dip', 'https://www.linkedin.com/in/diponkar10/', 'Developer', 3);

-- 10. Course Rating System (id: e1f70ba7-585b-4895-b5c4-5ca35136fb77)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('e1f70ba7-585b-4895-b5c4-5ca35136fb77', 'Raied', 'https://www.linkedin.com/in/abyadraied94/', 'Tech Lead', 1),
('e1f70ba7-585b-4895-b5c4-5ca35136fb77', 'Dip', 'https://www.linkedin.com/in/diponkar10/', 'Developer', 2);

-- 11. Gamification System (id: 1c04c3aa-d61b-4bc9-9984-74eac1cd0e99)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('1c04c3aa-d61b-4bc9-9984-74eac1cd0e99', 'Mohammad', 'https://www.linkedin.com/in/mohammadsultankhaja/', 'Design Lead', 1),
('1c04c3aa-d61b-4bc9-9984-74eac1cd0e99', 'Shad', 'https://www.linkedin.com/in/shad-iqbal/', 'Developer', 2);

-- 12. Page Loading Time Optimization (id: 719045d8-21f8-461f-83c9-f2ac91a271b9)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('719045d8-21f8-461f-83c9-f2ac91a271b9', 'Saiful', 'https://www.linkedin.com/in/saiful-bashar/', 'Performance Lead', 1);

-- 13. HSEP Florida State University (id: b33013ab-ce46-4757-8653-049c3a892412)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('b33013ab-ce46-4757-8653-049c3a892412', 'Raied', 'https://www.linkedin.com/in/abyadraied94/', 'Tech Lead', 1),
('b33013ab-ce46-4757-8653-049c3a892412', 'Shad', 'https://www.linkedin.com/in/shad-iqbal/', 'Developer', 2),
('b33013ab-ce46-4757-8653-049c3a892412', 'Shihab', 'https://www.linkedin.com/in/shihabus-siddiqin/', 'Developer', 3),
('b33013ab-ce46-4757-8653-049c3a892412', 'Shipu', 'https://www.linkedin.com/in/toshipu/', 'Developer', 4);

-- 14. Teaching at the Right Level (TaRL) (id: 31339193-fc68-4fa7-a4d8-db496ccf97a8)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('31339193-fc68-4fa7-a4d8-db496ccf97a8', 'Risan', 'https://www.linkedin.com/in/mohammad-risan/', 'Research Lead', 1),
('31339193-fc68-4fa7-a4d8-db496ccf97a8', 'Shihab', 'https://www.linkedin.com/in/shihabus-siddiqin/', 'Developer', 2),
('31339193-fc68-4fa7-a4d8-db496ccf97a8', 'Tara', 'https://www.linkedin.com/in/tarannum-azim-baigh/', 'UX Lead', 3),
('31339193-fc68-4fa7-a4d8-db496ccf97a8', 'Dr. Asad', 'https://www.linkedin.com/in/asad-islam-74a6bb80/', 'Research Partner', 4);

-- 15. Gamification: Financial Literacy Course (id: 6665081a-dd35-4fe7-ac0a-ec2886cce3b5)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('6665081a-dd35-4fe7-ac0a-ec2886cce3b5', 'Shad', 'https://www.linkedin.com/in/shad-iqbal/', 'Tech Lead', 1),
('6665081a-dd35-4fe7-ac0a-ec2886cce3b5', 'Dip', 'https://www.linkedin.com/in/diponkar10/', 'Developer', 2),
('6665081a-dd35-4fe7-ac0a-ec2886cce3b5', 'Raihana', 'https://www.linkedin.com/in/raihana-rahim/', 'UX Lead', 3);

-- 16. IDRC: EdTech Policy Platform for SEA (id: 4d1d38e4-5fe8-4b8f-9b05-46049011ea76)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('4d1d38e4-5fe8-4b8f-9b05-46049011ea76', 'Jawad', 'https://www.linkedin.com/in/jawad-ahmed-5a01b7367/', 'Research Lead', 1),
('4d1d38e4-5fe8-4b8f-9b05-46049011ea76', 'Mridul', 'https://www.linkedin.com/in/mridulch/', 'Tech Lead', 2);

-- 17. GenAI English Speaking Feature (id: 4d1d38e4-5fe8-4b8f-9b05-46049011ea76)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('4d1d38e4-5fe8-4b8f-9b05-46049011ea76', 'Uttam', 'https://www.linkedin.com/in/uttam-deb/', 'AI Lead', 1),
('4d1d38e4-5fe8-4b8f-9b05-46049011ea76', 'Shipu', 'https://www.linkedin.com/in/toshipu/', 'Developer', 2),
('4d1d38e4-5fe8-4b8f-9b05-46049011ea76', 'Moshiur', 'https://www.linkedin.com/in/moshiurhridoy/', 'Developer', 3),
('4d1d38e4-5fe8-4b8f-9b05-46049011ea76', 'Raied', 'https://www.linkedin.com/in/abyadraied94/', 'Tech Lead', 4);

-- 18. Group Guidance/Roadmaps (id: d20b1578-b515-4e29-88e7-0ec866504399)
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) VALUES
('d20b1578-b515-4e29-88e7-0ec866504399', 'Raihana', 'https://www.linkedin.com/in/raihana-rahim/', 'UX Lead', 1);
-- Insert sample failures data
-- This script adds failed projects to the failures table

-- 1. 10MS Notification System (2023)
INSERT INTO failures (
  title, 
  year, 
  company, 
  role, 
  description, 
  lessons, 
  order_index, 
  category, 
  is_unlocked, 
  published, 
  phase, 
  project_type, 
  situation, 
  task, 
  result
) VALUES (
  '10MS Notification System',
  2023,
  '10 Minute School',
  'Lead Product Manager',
  'Failed due to moving priorities and tech debt of webengage',
  'Notification systems require careful prioritization and technical debt management. Moving priorities can derail even well-planned features.',
  1,
  'Product Development',
  true,
  true,
  'Discontinued',
  'Notification System',
  'Need for improved user engagement through better notification system, but existing WebEngage integration had significant technical debt.',
  'Design and implement comprehensive notification system to improve user engagement and retention.',
  'Project discontinued due to shifting priorities and technical constraints from existing WebEngage platform.'
);

-- 2. Jobs recommendation by BDJobs (2023)
INSERT INTO failures (
  title, 
  year, 
  company, 
  role, 
  description, 
  lessons, 
  order_index, 
  category, 
  is_unlocked, 
  published, 
  phase, 
  project_type, 
  situation, 
  task, 
  result
) VALUES (
  'Jobs recommendation by BDJobs',
  2023,
  '10 Minute School',
  'Lead Product Manager',
  'Due to lack of quality traffic and meaningful CVR',
  'Partnership success depends on traffic quality, not just volume. Meaningful conversion rates require aligned user intent and value proposition.',
  2,
  'Partnership',
  true,
  true,
  'Discontinued',
  'Job Recommendation',
  'Partnership with BDJobs to provide job recommendations to users, but struggled with traffic quality and conversion rates.',
  'Establish partnership with BDJobs to integrate job recommendations into the platform for user value.',
  'Partnership discontinued due to insufficient traffic quality and low conversion rates that didn''t justify continued investment.'
);
-- =====================================================
-- INSERT NEW PROJECTS - 2025 UPDATES
-- Based on the provided project information table
-- =====================================================

-- Insert 6 new projects with proper schema structure
INSERT INTO public.projects 
(title, year, company, role, description, lessons, image_url, order_index, category, is_unlocked, published, phase, project_type, situation, task, result, contributions, key_results, tags, metrics)
VALUES

-- 1️⃣ IDRC Research on EdTech Policy
(
  'IDRC Research on EdTech Policy',
  2024,
  'mPower / IDRC',
  'Product Consultant & Research Strategist',
  'Multi-country research to strengthen policymakers capacities for appropriate EdTech integration.',
  'Policy research requires understanding both technical feasibility and political implementation challenges.',
  '/images/projects/idrc_edtech_policy.jpg',
  16,
  'Research & Policy',
  true,
  true,
  'Research Phase',
  'Policy Research',
  'Policymakers lacked frameworks for assessing EdTech maturity and making evidence-based integration decisions.',
  'Designed frameworks for EdTech maturity assessment, decision-making capability evaluation, and data interpretation for policymakers.',
  'Deliverables submitted for Bangladesh; synthesis phase ongoing across multiple countries.',
  '[
    {
      "contribution": "Designed EdTech maturity assessment frameworks",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Created decision-making capability assessment tools",
      "value_chain_position": "upstream",
      "type": "UX Design"
    },
    {
      "contribution": "Developed data interpretation guidelines for policymakers",
      "value_chain_position": "downstream",
      "type": "Decision Strategy"
    }
  ]'::jsonb,
  '[
    {
      "value": "Multi-country",
      "label": "Research Scope",
      "description": "International policy research initiative",
      "category": "Scale"
    },
    {
      "value": "Bangladesh",
      "label": "Deliverables Submitted",
      "description": "Country-specific policy frameworks completed",
      "category": "Output"
    },
    {
      "value": "Synthesis Phase",
      "label": "Current Status",
      "description": "Cross-country analysis ongoing",
      "category": "Development"
    }
  ]'::jsonb,
  ARRAY['research', 'policy', 'edtech', 'idrc', 'mpower', 'international', 'frameworks'],
  '{"countries": "multiple", "status": "synthesis", "deliverables": "bangladesh_complete"}'::jsonb
),

-- 2️⃣ Financial Literacy Gamification (bKash x 10MS)
(
  'Financial Literacy Gamification (bKash x 10MS)',
  2024,
  'bKash / 10 Minute School',
  'Forward-Deployed Engineer',
  'Developed gamified learning modules for financial literacy with leaderboards, badges, and progress tracking.',
  'Financial literacy gamification works best when tied to real-world financial behaviors and decisions.',
  '/images/projects/bkash_financial_literacy.jpg',
  17,
  'FinTech & Education',
  true,
  true,
  'Launched',
  'Gamified Learning Platform',
  'Users lacked engaging ways to learn financial literacy concepts and build money management skills.',
  'Led product design and gamification logic integration across user journeys with leaderboards, badges, and progress tracking.',
  'Just launched — awaiting learner engagement data to measure impact and retention.',
  '[
    {
      "contribution": "Led product design for gamified learning modules",
      "value_chain_position": "upstream",
      "type": "UX Design"
    },
    {
      "contribution": "Integrated gamification logic across user journeys",
      "value_chain_position": "upstream",
      "type": "UX Design"
    },
    {
      "contribution": "Designed leaderboards, badges, and progress tracking systems",
      "value_chain_position": "downstream",
      "type": "Data Analysis"
    }
  ]'::jsonb,
  '[
    {
      "value": "Just Launched",
      "label": "Current Status",
      "description": "Platform live and operational",
      "category": "Development"
    },
    {
      "value": "Gamified Modules",
      "label": "Features Delivered",
      "description": "Leaderboards, badges, progress tracking",
      "category": "Features"
    },
    {
      "value": "Awaiting Data",
      "label": "Impact Measurement",
      "description": "Learner engagement metrics pending",
      "category": "Analytics"
    }
  ]'::jsonb,
  ARRAY['fintech', 'gamification', 'financial-literacy', 'bkash', '10ms', 'learning', 'mobile'],
  '{"status": "launched", "features": "gamification_complete", "metrics": "pending"}'::jsonb
),

-- 3️⃣ LC Booking Management System
(
  'LC Booking Management System',
  2024,
  '10 Minute School',
  'Forward-Deployed Engineer',
  'A comprehensive system for booking speaking tests, free classes, CBT mock tests, and managing slots. Stakeholders: students, teachers, branch admins, super-admins.',
  'Complex multi-stakeholder systems require clear role-based permissions and intuitive admin interfaces.',
  '/images/projects/lc_booking_system.jpg',
  18,
  'EdTech Platform',
  true,
  true,
  'Prototype',
  'Booking Management System',
  'Students needed streamlined booking system for speaking tests, free classes, and CBT mock tests across multiple locations.',
  'Designed UX flow, slot management logic, and admin-side controls for 4-sided marketplace complexity.',
  'Prototyped and demo-ready in 3 weeks (part-time) despite 4-sided complexity of students, teachers, branch admins, and super-admins.',
  '[
    {
      "contribution": "Designed UX flow for multi-stakeholder booking system",
      "value_chain_position": "upstream",
      "type": "UX Design"
    },
    {
      "contribution": "Built slot management logic for complex scheduling",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Created admin-side controls for 4-sided marketplace",
      "value_chain_position": "downstream",
      "type": "Decision Strategy"
    }
  ]'::jsonb,
  '[
    {
      "value": "3 Weeks",
      "label": "Development Time",
      "description": "Part-time development to prototype",
      "category": "Efficiency"
    },
    {
      "value": "4-sided",
      "label": "Marketplace Complexity",
      "description": "Students, teachers, branch admins, super-admins",
      "category": "Architecture"
    },
    {
      "value": "Demo Ready",
      "label": "Current Status",
      "description": "Prototype completed and functional",
      "category": "Development"
    }
  ]'::jsonb,
  ARRAY['booking-system', 'edtech', 'multi-stakeholder', 'scheduling', 'admin-dashboard', 'prototype'],
  '{"timeline": "3_weeks", "complexity": "4_sided", "status": "demo_ready"}'::jsonb
),

-- 4️⃣ EdMate Platform (A/O Levels - B2C)
(
  'EdMate Platform (A/O Levels - B2C)',
  2024,
  'EdMate',
  'Product Strategist & Forward-Deployed Engineer',
  'Personalized exam prep and progress tracking for A/O level students with integrated assessment analytics. Developed digital distribution channels and growth strategies for scalable user acquisition.',
  'Student-focused design requires balancing personalization with simplicity. Digital distribution channels must align with student behavior and parent decision-making patterns.',
  '/images/projects/edmate_b2c.jpg',
  19,
  'B2C EdTech',
  true,
  true,
  'Design Complete',
  'Personalized Learning Platform',
  'A/O level students needed personalized exam preparation and progress tracking tools. Existing distribution channels were inefficient for reaching target student demographics.',
  'Conducted 8+ student interviews and competitor analysis; designed student experience and MVP for personalized learning. Developed digital distribution channel strategy including social media, educational influencers, and parent referral systems.',
  'Handed off design for development in 3 weeks — reduced MVP delivery timeline from 1 year to 1 month. Established scalable digital distribution framework for user acquisition.',
  '[
    {
      "contribution": "Conducted 8+ student interviews for user research",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Performed competitor analysis for market positioning",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Designed student experience and MVP specifications",
      "value_chain_position": "upstream",
      "type": "UX Design"
    },
    {
      "contribution": "Developed digital distribution channel strategy",
      "value_chain_position": "downstream",
      "type": "Decision Strategy"
    },
    {
      "contribution": "Designed growth framework for user acquisition",
      "value_chain_position": "downstream",
      "type": "Decision Strategy"
    }
  ]'::jsonb,
  '[
    {
      "value": "3 Weeks",
      "label": "Design Timeline",
      "description": "Complete UX design and research",
      "category": "Efficiency"
    },
    {
      "value": "1 Year → 1 Month",
      "label": "Timeline Reduction",
      "description": "MVP delivery acceleration",
      "category": "Impact"
    },
    {
      "value": "8+ Interviews",
      "label": "User Research",
      "description": "Student interviews conducted",
      "category": "Research"
    },
    {
      "value": "Multi-Channel",
      "label": "Distribution Strategy",
      "description": "Social media, influencers, referrals",
      "category": "Growth"
    },
    {
      "value": "Scalable Framework",
      "label": "User Acquisition",
      "description": "Digital distribution channel system",
      "category": "Growth"
    },
    {
      "value": "Design Complete",
      "label": "Current Status",
      "description": "Ready for development handoff",
      "category": "Development"
    }
  ]'::jsonb,
  ARRAY['b2c', 'edtech', 'personalized-learning', 'a-levels', 'o-levels', 'exam-prep', 'analytics', 'growth', 'distribution', 'user-acquisition'],
  '{"design_time": "3_weeks", "timeline_reduction": "12_to_1_month", "interviews": 8, "distribution_channels": "multi_channel", "growth_framework": "scalable"}'::jsonb
),

-- 5️⃣ Course Recommendation System
(
  'Course Recommendation System',
  2023,
  '10 Minute School',
  'Product Strategist',
  'Personalized recommendation engine for paid and free users based on user behavior and conversion probability.',
  'Recommendation algorithms must balance user value with business objectives to drive sustainable growth.',
  '/images/projects/course_recommendation.jpg',
  20,
  'Personalization & ML',
  true,
  true,
  'Live',
  'Recommendation Engine',
  'Users received generic course recommendations that didn''t match their learning goals or conversion likelihood.',
  'Designed logic for differential recommendation between free vs. paid users based on behavior and conversion probability.',
  'Improved conversion predictability and retention through adaptive recommendations tailored to user segments.',
  '[
    {
      "contribution": "Designed differential recommendation logic for free vs. paid users",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Built conversion probability models",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Implemented adaptive recommendation algorithms",
      "value_chain_position": "downstream",
      "type": "Decision Strategy"
    }
  ]'::jsonb,
  '[
    {
      "value": "Improved",
      "label": "Conversion Predictability",
      "description": "Better targeting of high-conversion users",
      "category": "Business Impact"
    },
    {
      "value": "Enhanced",
      "label": "Retention",
      "description": "Adaptive recommendations drive engagement",
      "category": "User Impact"
    },
    {
      "value": "Differential",
      "label": "Recommendation Logic",
      "description": "Free vs. paid user segmentation",
      "category": "Features"
    }
  ]'::jsonb,
  ARRAY['recommendation-engine', 'personalization', 'ml', 'conversion-optimization', 'user-segmentation', 'retention'],
  '{"conversion_predictability": "improved", "retention": "enhanced", "segmentation": "differential"}'::jsonb
),

-- 6️⃣ Course Rating System
(
  'Course Rating System',
  2023,
  '10 Minute School',
  'Product Strategist',
  'Introduced a new trust-based course rating metric — % of users rating 5/5.',
  'Trust-based metrics often provide more meaningful signals than traditional average ratings for educational content.',
  '/images/projects/course_rating_system.jpg',
  21,
  'Trust & Credibility',
  true,
  true,
  'Live',
  'Rating System Innovation',
  'Traditional rating systems didn''t effectively communicate course quality and credibility to learners.',
  'Conceptualized and implemented rating logic for credibility benchmarking using percentage of 5-star ratings.',
  'First-of-its-kind course rating approach in Bangladesh (and globally, as known) - established new industry standard.',
  '[
    {
      "contribution": "Conceptualized trust-based rating metric (% of 5-star ratings)",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Implemented rating logic for credibility benchmarking",
      "value_chain_position": "upstream",
      "type": "UX Design"
    },
    {
      "contribution": "Established new industry standard for course ratings",
      "value_chain_position": "downstream",
      "type": "Decision Strategy"
    }
  ]'::jsonb,
  '[
    {
      "value": "First-of-its-kind",
      "label": "Innovation",
      "description": "New rating approach in Bangladesh",
      "category": "Innovation"
    },
    {
      "value": "Globally Unique",
      "label": "Market Position",
      "description": "Trust-based rating system (as known)",
      "category": "Market Position"
    },
    {
      "value": "Industry Standard",
      "label": "Impact",
      "description": "Established new benchmark for course credibility",
      "category": "Industry Impact"
    },
    {
      "value": "5/5 Percentage",
      "label": "Rating Metric",
      "description": "Trust-based credibility measure",
      "category": "Features"
    }
  ]'::jsonb,
  ARRAY['rating-system', 'trust', 'credibility', 'innovation', 'industry-standard', 'course-quality'],
  '{"innovation": "first_of_kind", "scope": "bangladesh_global", "metric": "5_star_percentage"}'::jsonb
);

-- =====================================================
-- VERIFICATION QUERY
-- =====================================================

-- Run this query to verify all 6 new projects were inserted correctly:
-- SELECT title, year, company, category, phase, project_type FROM public.projects WHERE order_index >= 16 ORDER BY order_index;

-- =====================================================
-- SUMMARY
-- =====================================================
-- Added 6 new projects with order_index 16-21
-- All projects follow the established schema structure
-- Projects span 2023-2025 timeframe
-- Categories include: Research & Policy, FinTech & Education, EdTech Platform, B2C EdTech, Personalization & ML, Trust & Credibility
-- =====================================================
-- UPDATE EXISTING PROJECTS DATA - CORRECTED VERSION
-- This script handles existing data by clearing and re-inserting
-- =====================================================

-- STEP 1: Clear existing project data to avoid conflicts
DELETE FROM public.projects;

-- STEP 2: Reset the sequence (if using auto-increment)
-- Note: This is not needed for UUID primary keys, but included for completeness

-- STEP 3: Insert all 15 projects with corrected information
INSERT INTO public.projects 
(title, year, company, role, description, lessons, image_url, order_index, category, is_unlocked, published, phase, project_type, situation, task, result, contributions, key_results, tags, metrics)
VALUES

-- 1️⃣ World Bank IFC Impact Assessment
(
  'World Bank IFC Survey on 10MS Impact',
  2024,
  '10 Minute School',
  'Research Lead',
  'Led World Bank IFC Survey on 4.7K students to measure the impact of 10MS on delivering quality education.',
  'Research collaboration with international institutions validates product impact and builds credibility.',
  '/images/projects/worldbank_ifc.jpg',
  1,
  'Research',
  true,
  true,
  '0 to 1',
  'Impact Assessment',
  'World Bank IFC wanted to understand the impact of 10MS on K-12 students across Bangladesh in different locations both for paid and free courses.',
  'I was the research lead for the project.',
  'At 10MS we did not have concrete data about our impact on access to quality education across Bangladesh. Data shows 10MS is more popular in rural and suburban areas than metropolitan cities as students at these places lack access to quality teachers and educational contents.',
  '[
    {
      "contribution": "Research design & planning",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Data cleaning & result analysis using tableau",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Report preparation",
      "value_chain_position": "downstream",
      "type": "Decision Strategy"
    }
  ]'::jsonb,
  '[
    {
      "value": "4,781",
      "label": "Students Surveyed",
      "description": "Sample size (n=4781)",
      "category": "Research"
    },
    {
      "value": "66%",
      "label": "Rural & Semi-Urban Users",
      "description": "From villages and district cities",
      "category": "Demographics"
    },
    {
      "value": "50%",
      "label": "High Performers",
      "description": "Scored 80-100 in last academic year",
      "category": "Academic Impact"
    },
    {
      "value": "78%",
      "label": "Positive Impact",
      "description": "Agreed 10MS has positive impact (45% Strongly, 33% Agree)",
      "category": "Satisfaction"
    },
    {
      "value": "39",
      "label": "NPS Score",
      "description": "Net Promoter Score",
      "category": "Satisfaction"
    }
  ]'::jsonb,
  ARRAY['research', 'impact-assessment', 'world-bank', 'ifc', 'education', 'data-analysis'],
  '{"survey_size": 4781, "rural_users": "66%", "gender_split": "32.5% female, 66% male", "nps": 39}'::jsonb
),

-- 2️⃣ New Leads Collection Management
(
  'New Leads Collection Management',
  2023,
  '10 Minute School',
  'Product Manager',
  'Collected 262K new leads with 5% CVR & brought visibility of which sources of leads works best to convert a visitor into enrolled learner for the CX team.',
  'Lead source tracking is critical for conversion optimization. What gets measured gets managed.',
  '/images/projects/leads_collection.jpg',
  2,
  'Growth',
  true,
  true,
  '1 to n',
  'Conversion Optimization',
  'Visitors without enrollment or providing any data could watch free videos. And we had no idea, which sources of leads works best for the CX team to convert a visitor into enrolled learner.',
  'With the help of Business Intelligence team analyzed data how users see free video on course pages and analyzed if we know which channel/sources of leads works best for CVR.',
  'Implemented force log-in to watch free videos in any course page and break down the conversion flow for different channels. Collected 262K new leads with 5% CVR & brought visibility of which sources of leads works best to convert a visitor into enrolled learner for the CX team.',
  '[
    {
      "contribution": "Discovery: Identified the flaw in the dashboard",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Delivery: Co-authored PRD documentation",
      "value_chain_position": "upstream",
      "type": "UX Design"
    },
    {
      "contribution": "Helped Business Intelligence team to reset the dashboard- defined what is required, why and how we want to visualize it",
      "value_chain_position": "downstream",
      "type": "Decision Strategy"
    }
  ]'::jsonb,
  '[
    {
      "value": "262K",
      "label": "New Leads Collected",
      "description": "Total new leads generated",
      "category": "Growth"
    },
    {
      "value": "5%",
      "label": "Conversion Rate",
      "description": "Lead to enrolled learner CVR",
      "category": "Conversion"
    },
    {
      "value": "Full",
      "label": "Channel Visibility",
      "description": "Complete breakdown by source",
      "category": "Analytics"
    }
  ]'::jsonb,
  ARRAY['growth', 'conversion', 'lead-generation', 'analytics', 'dashboard', 'cx'],
  '{"leads_collected": 262000, "cvr": "5%", "channels_tracked": "multiple"}'::jsonb
),

-- 3️⃣ Free to Paid Conversion Audit
(
  'Free to Paid Conversion Audit',
  2023,
  '10 Minute School',
  'Product Manager',
  'As PM at 10MS first task- Conducted audits on 50+ dashboards for non-academic product vertical. Found that Free courses & Paid courses CVR significantly different on the platform and none noticed. Hence our project of free to paid users conversion initiated.',
  'Dashboard audits reveal hidden insights. Clear metric definitions prevent strategic blind spots.',
  '/images/projects/free_to_paid_audit.jpg',
  3,
  'Analytics',
  true,
  true,
  '1 to n',
  'Conversion Optimization',
  '10MS is at growth stage, most of the PMs are building things but rarely they used to measure the impact of their features/releases. Plus they barely could audit the existing 50+ dashboards/metrics to analyse & discover business issues or learners issues. When I took over, I wanted to deeply understand these metrics we track and dashboards we maintain.',
  'Conducted audits leading to insights and adjustments for enhanced user engagement, LX User journey, Leads management, CVR, and Platform Search.',
  'Found that Free courses CVR is 30%+ and Paid course CVR is way low. Hence our strategy for free to paid conversion initiated.',
  '[
    {
      "contribution": "Analysis/dashboard audit",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Initiated the Free to paid conversion drive",
      "value_chain_position": "downstream",
      "type": "Decision Strategy"
    }
  ]'::jsonb,
  '[
    {
      "value": "50+",
      "label": "Dashboards Audited",
      "description": "Product metrics dashboards",
      "category": "Analysis"
    },
    {
      "value": "30%+",
      "label": "Free Course CVR",
      "description": "Conversion rate for free courses",
      "category": "Discovery"
    },
    {
      "value": "Low",
      "label": "Paid Course CVR",
      "description": "Significantly lower than free",
      "category": "Discovery"
    },
    {
      "value": "New",
      "label": "Conversion Strategy",
      "description": "Free to paid conversion initiative",
      "category": "Impact"
    }
  ]'::jsonb,
  ARRAY['analytics', 'dashboard-audit', 'conversion', 'growth', 'data-analysis', 'strategy'],
  '{"dashboards_audited": 50, "free_cvr": "30%+", "paid_cvr": "low", "discovery": "CVR gap"}'::jsonb
),

-- 4️⃣ SheSTEM Initiative
(
  'SheSTEM Industry-Academia Initiative',
  2024,
  '10 Minute School',
  'General Manager, Product & Partnerships',
  'Co-led Bangladesh''s largest edtech collaboration for female STEM graduates with 12 industry partners and 6 universities.',
  'Real change comes when academia, industry, and learners share one feedback loop.',
  '/images/projects/shestem.jpg',
  4,
  'Initiative',
  true,
  true,
  'Partnership & Scale',
  'Public-Private Collaboration',
  'STEM graduates lacked employability-focused upskilling pathways.',
  'Formed partnerships with 6 universities and 12 industries to co-design micro-certifications.',
  'Trained 1,000+ female learners; 300+ job placements.',
  '[
    {
      "contribution": "Formed partnerships with 6 universities",
      "value_chain_position": "upstream",
      "type": "Decision Strategy"
    },
    {
      "contribution": "Co-designed micro-certification programs",
      "value_chain_position": "upstream",
      "type": "UX Design"
    },
    {
      "contribution": "Led industry collaboration with 12 partners",
      "value_chain_position": "downstream",
      "type": "Decision Strategy"
    }
  ]'::jsonb,
  '[
    {
      "value": "1,000+",
      "label": "Female Learners Trained",
      "description": "STEM upskilling program participants",
      "category": "Impact"
    },
    {
      "value": "300+",
      "label": "Job Placements",
      "description": "Successful career transitions",
      "category": "Outcomes"
    },
    {
      "value": "18",
      "label": "Total Partners",
      "description": "6 universities + 12 industry partners",
      "category": "Ecosystem"
    }
  ]'::jsonb,
  ARRAY['partnership', 'women-in-tech', 'upskilling', 'edtech', 'social-impact', 'shestem'],
  '{"program_duration": "12 months", "partnerships": 18, "success_rate": "30%"}'::jsonb
),

-- 5️⃣ EdTech Market Thesis for Sequoia
(
  'Bangladesh EdTech Market Thesis',
  2021,
  '10 Minute School',
  'Strategy Consultant',
  'My "Bangladesh Edtech Market Thesis" facilitated a 2Mn investment from Sequoia Capital India in 10MS.',
  'Vision must be backed by credible narrative and data — that''s how ecosystems get funded.',
  '/images/projects/edtech_thesis.jpg',
  5,
  'Strategy',
  true,
  true,
  'Investment Readiness',
  'Market Research & Strategic Narrative',
  'Edtech funding ecosystem lacked credible data on market size and user adoption.',
  'Authored comprehensive market landscape and TAM/CAGR analysis of Bangladesh''s EdTech sector.',
  'Enabled Sequoia''s $2M seed investment into 10MS.',
  '[
    {
      "contribution": "Conducted comprehensive market research",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Authored TAM/CAGR analysis",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Presented to Sequoia Capital India",
      "value_chain_position": "downstream",
      "type": "Decision Strategy"
    }
  ]'::jsonb,
  '[
    {
      "value": "$2M",
      "label": "Investment Secured",
      "description": "Seed funding from Sequoia Capital India",
      "category": "Financial"
    },
    {
      "value": "$11.11 Bn",
      "label": "Total Market Size",
      "description": "Education Market in 2022 (B2B-B2C)",
      "category": "Market"
    },
    {
      "value": "$6.1 Bn",
      "label": "K-12 After School",
      "description": "Largest market segment",
      "category": "Market"
    },
    {
      "value": "$1.98 Bn",
      "label": "Upskilling + Hiring",
      "description": "Professional development",
      "category": "Market"
    }
  ]'::jsonb,
  ARRAY['strategy', 'investment', 'market-research', 'edtech', 'fundraising', 'sequoia'],
  '{"tam": "$11.11B", "investment_round": "Seed", "investor": "Sequoia Capital India"}'::jsonb
),

-- 6️⃣ CareerKi Platform
(
  'CareerKi – Workforce EdTech Platform',
  2017,
  'CareerKi',
  'Co-founder & Product Lead',
  'CareerKi (2017) is a workforce edtech focused on career opportunities in Bangladesh.',
  'Building for Bangladesh means designing for accessibility before aesthetics.',
  '/images/projects/careerki.jpg',
  6,
  'Entrepreneurship',
  true,
  true,
  'Startup',
  'Platform Development & Growth',
  'Bangladesh has the 7th largest labor market in the world, but students & parents had no way to take evidence based decisions to pursue careers.',
  'To help students take evidence based career decisions, we researched and profiled 300+ white collar, blue collar and entrepreneurial job roles from labor market with data on salary, technical skills, academic qualification, career challenges, etc. Along with career related evidence based 200 contents, we launched CareerKi in 2018. Later USAID Bangladesh gave us 100K+ USD grant.',
  'Current MAU range: 30K-45K, Till date we have served over 1.5 million users. Top 15 startups from Bangladesh at Tiger Challenge 2019 by MIT SOLVE.',
  '[
    {
      "contribution": "Ideation, Founding the team, Raised grants from USAID Bangladesh and Govt of Bangladesh",
      "value_chain_position": "upstream",
      "type": "Decision Strategy"
    },
    {
      "contribution": "Product lead, Content development",
      "value_chain_position": "upstream",
      "type": "UX Design"
    }
  ]'::jsonb,
  '[
    {
      "value": "1.5M",
      "label": "Total Users",
      "description": "Served till date",
      "category": "Scale"
    },
    {
      "value": "30K-45K",
      "label": "Monthly Active Users",
      "description": "Current MAU range",
      "category": "Engagement"
    },
    {
      "value": "$100K+",
      "label": "USAID Funding",
      "description": "Grant received",
      "category": "Financial"
    },
    {
      "value": "300+",
      "label": "Job Roles Profiled",
      "description": "Career pathways documented",
      "category": "Content"
    },
    {
      "value": "Top 15",
      "label": "Tiger Challenge 2019",
      "description": "MIT SOLVE Bangladesh startups",
      "category": "Recognition"
    }
  ]'::jsonb,
  ARRAY['entrepreneurship', 'edtech', 'career', 'workforce', 'usaid', 'startup'],
  '{"users": 1500000, "mau": "30K-45K", "funding": "$100K+", "status": "autopilot"}'::jsonb
),

-- 7️⃣ Quizards Platform
(
  'Quizards – Bangla Edutainment Platform',
  2014,
  'Quizards',
  'Co-founder & Product Lead',
  'Quizards (2014), a Bangla edutainment web platform.',
  'Learned to ship fast and iterate with early community feedback.',
  '/images/projects/quizards.jpg',
  7,
  'Entrepreneurship',
  true,
  true,
  'Startup',
  'Platform Development & Growth',
  'In Bangladesh there was no platform in Bangla language to practice general knowledge trivia in interactive form.',
  'To promote inquisitiveness among youngs in Bangla language, I co-founded Quizards in 2014.',
  'Served over 0.25 million users. MAU range: 1.2K-1.5K. Currently we do not work for quizards, it is in autopilot mode.',
  '[
    {
      "contribution": "Co-founded Quizards platform",
      "value_chain_position": "upstream",
      "type": "Decision Strategy"
    },
    {
      "contribution": "Designed gamified quiz mechanics",
      "value_chain_position": "upstream",
      "type": "UX Design"
    }
  ]'::jsonb,
  '[
    {
      "value": "250K",
      "label": "Total Users",
      "description": "Served till date",
      "category": "Scale"
    },
    {
      "value": "1.2K-1.5K",
      "label": "Monthly Active Users",
      "description": "MAU range",
      "category": "Engagement"
    },
    {
      "value": "Top 10",
      "label": "Online Start-ups Bangladesh 2016",
      "description": "Award by G&R",
      "category": "Recognition"
    },
    {
      "value": "Special Mention",
      "label": "BRAC Manthan Digital Innovation Award 2016",
      "description": "Journalism and entertainment",
      "category": "Recognition"
    }
  ]'::jsonb,
  ARRAY['entrepreneurship', 'edutainment', 'gamification', 'bangla', 'quiz', 'startup'],
  '{"users": 250000, "mau": "1.2K-1.5K", "language": "Bangla", "status": "autopilot"}'::jsonb
),

-- 8️⃣ Unibiome Biotech
(
  'Unibiome SAS (France)',
  2016,
  'Unibiome SAS',
  'Co-founder & COO',
  'Unibiome (previously known as Peer to Peer Probiotics): Engineered fermentative microbes using synthetic and molecular biology to fortify foods with micronutrients. Later discontinued.',
  'Learned how science and venture capital intersect through experimentation.',
  '/images/projects/unibiome.jpg',
  8,
  'Biotech',
  true,
  true,
  'Startup',
  'Biotech Innovation',
  'We won gold medal for our iGEM 2015 project as part of Paris Bettencourt team. The key idea was to engineer fermentative microbes to fortify foods with micronutrients like vitamins and iron.',
  'I was one of the cofounders and COO.',
  'Got 100K USD fund, participated in Rebelbio startup accelerator, Ireland in 2016. Special Prize for "International Potential", Genopole Young Biotech Prize 2016, France. Won 30K Euro Grant. Kirchner Food Fellowship in Thought for Food (TFF) Global Summit 2016, Zurich, Switzerland. Top 500 Deep Tech Start-ups in the world by Hello Tomorrow Summit 2016, Paris, France.',
  '[
    {
      "contribution": "Business Development & application for funding, competitions, grants",
      "value_chain_position": "upstream",
      "type": "Decision Strategy"
    }
  ]'::jsonb,
  '[
    {
      "value": "$100K",
      "label": "Funding Raised",
      "description": "From RebelBio accelerator",
      "category": "Financial"
    },
    {
      "value": "€30K",
      "label": "Grant Won",
      "description": "Genopole Young Biotech Prize",
      "category": "Financial"
    },
    {
      "value": "Top 500",
      "label": "Deep Tech Start-ups",
      "description": "Hello Tomorrow Summit 2016",
      "category": "Recognition"
    },
    {
      "value": "Gold Medal",
      "label": "iGEM 2015",
      "description": "Paris Bettencourt team",
      "category": "Recognition"
    }
  ]'::jsonb,
  ARRAY['biotech', 'entrepreneurship', 'probiotics', 'synthetic-biology', 'health', 'france'],
  '{"funding": "$100K", "location": "France", "status": "discontinued", "sector": "Biotech"}'::jsonb
),

-- 9️⃣ TARA App (Monash University) - CORRECTED
(
  'TARA App (Teaching at the Right Level with Monash University)',
  2024,
  '10 Minute School x Monash University',
  'Lead Product Manager',
  'Developed the TARA app using Teaching at the Right Level (TaRL) methodology for adaptive learning system for class 3-5 kids learning Math and English.',
  'Adaptive learning systems are most effective when grounded in proven pedagogy like TaRL, especially for foundational subjects.',
  '/images/projects/tara_monash.jpg',
  9,
  'Learning Science & Pedagogy',
  true,
  true,
  'Experimentation',
  'EdTech R&D',
  'Class 3-5 students lacked adaptive learning support aligned with their actual learning levels in Math and English.',
  'Build and pilot TARA app using TaRL methodology in collaboration with Monash researchers.',
  'RCT pilot validated TaRL approach effectiveness for foundational learning; 5K+ students onboarded.',
  '[
    {
      "contribution": "Co-led RCT design for TaRL methodology",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Built adaptive learning app prototype for class 3-5",
      "value_chain_position": "upstream",
      "type": "UX Design"
    },
    {
      "contribution": "Managed Monash collaboration and research coordination",
      "value_chain_position": "downstream",
      "type": "Decision Strategy"
    }
  ]'::jsonb,
  '[
    {
      "value": "5,000+",
      "label": "Students Onboarded",
      "description": "Class 3-5 students in RCT pilot",
      "category": "Scale"
    },
    {
      "value": "RCT",
      "label": "Pilot Type",
      "description": "Randomized Controlled Trial",
      "category": "Research"
    },
    {
      "value": "TaRL",
      "label": "Methodology",
      "description": "Teaching at the Right Level",
      "category": "Innovation"
    },
    {
      "value": "Math & English",
      "label": "Subjects",
      "description": "Core subjects for class 3-5",
      "category": "Curriculum"
    }
  ]'::jsonb,
  ARRAY['adaptive-learning', 'education', 'taRL', 'monash', 'research', 'math', 'english', 'primary-education'],
  '{"pilot_outcome": "positive", "methodology": "TaRL", "collaboration": "Monash University", "target_grade": "3-5", "subjects": "Math & English"}'::jsonb
),

-- 🔟 HSEP (USAID) CLMS - CORRECTED
(
  'HSEP Project (Comprehensive Learning Management System with Florida State University)',
  2024,
  '10 Minute School x USAID x FSU',
  'Lead Product Manager / B2B Project Lead',
  'Co-led USAID-funded HSEP initiative to roll out comprehensive LMS for 3,000 colleges and train 60,000 teachers.',
  'National-scale learning projects require institutional buy-in and teacher-first UX.',
  '/images/projects/hsep_fsu.jpg',
  10,
  'Public Sector EdTech',
  true,
  true,
  'Implementation',
  'Comprehensive Learning Management System',
  'Bangladesh lacked digital teaching infrastructure at college level.',
  'Design comprehensive LMS for learning rollout, coordinate with FSU & Ministry.',
  'Secured $3M grant; trained 60K teachers and digitized 3K institutions.',
  '[
    {
      "contribution": "Secured USAID grant",
      "value_chain_position": "upstream",
      "type": "Decision Strategy"
    },
    {
      "contribution": "Designed comprehensive LMS",
      "value_chain_position": "upstream",
      "type": "UX Design"
    },
    {
      "contribution": "Led teacher training at scale",
      "value_chain_position": "downstream",
      "type": "Decision Strategy"
    }
  ]'::jsonb,
  '[
    {
      "value": "60,000",
      "label": "Teachers Trained",
      "description": "Nationwide teacher training program",
      "category": "Impact"
    },
    {
      "value": "3,000",
      "label": "Institutions",
      "description": "Colleges digitized",
      "category": "Scale"
    },
    {
      "value": "$3M",
      "label": "Budget Secured",
      "description": "USAID grant funding",
      "category": "Financial"
    }
  ]'::jsonb,
  ARRAY['lms', 'usaid', 'teacher-training', 'public-sector', 'fsu', 'comprehensive-learning'],
  '{"reach": "nationwide", "budget": "$3M", "teachers": 60000, "institutions": 3000}'::jsonb
),

-- 1️⃣1️⃣ ElTen (GenAI English Speaking)
(
  'ElTen (GenAI English Speaking App)',
  2025,
  '10 Minute School',
  'Lead Product Manager',
  'Developed an English-speaking GenAI tutor for Bangla learners, focusing on feedback, fluency, and confidence.',
  'GenAI speaking tools must balance linguistic accuracy with emotional confidence building.',
  '/images/projects/elten_genai.jpg',
  11,
  'AI & Language Learning',
  true,
  true,
  'Prototype & Testing',
  'Conversational AI',
  'Students lacked affordable, interactive English-speaking practice.',
  'Design, train, and pilot GenAI conversational tutor in English learning app.',
  'High engagement and repeat usage; pilot expanded for further R&D.',
  '[
    {
      "contribution": "Defined AI product spec",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Led data labeling",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Managed pilot user feedback loop",
      "value_chain_position": "downstream",
      "type": "Decision Strategy"
    }
  ]'::jsonb,
  '[
    {
      "value": "3,000",
      "label": "Pilot Users",
      "description": "Initial user base",
      "category": "Scale"
    },
    {
      "value": "12",
      "label": "Avg Session Time (min)",
      "description": "Average session duration",
      "category": "Engagement"
    },
    {
      "value": "45%",
      "label": "Retention Rate",
      "description": "User retention percentage",
      "category": "Engagement"
    }
  ]'::jsonb,
  ARRAY['genai', 'language-learning', 'ai', 'speaking', 'english', 'conversational-ai'],
  '{"retention_rate_percent": 45, "avg_session_time_min": 12, "pilot_users": 3000}'::jsonb
),

-- 1️⃣2️⃣ Gamification Planning
(
  'Gamification Framework & Behavioral Design System',
  2023,
  '10 Minute School',
  'Lead Product Manager',
  'Designed gamification framework and behavioral design system for motivating learning streaks and engagement.',
  'Gamification works when tied to intrinsic learning motivation, not vanity points.',
  '/images/projects/gamification_10ms.jpg',
  12,
  'Learning Experience',
  true,
  true,
  'Design System',
  'Behavioral Design',
  'Learners lacked structured motivation in app journeys.',
  'Design gamified streaks, badges, and leaderboard logic tied to learning milestones.',
  'Engagement rose by 22% post-deployment across daily learners.',
  '[
    {
      "contribution": "Created gamification playbook",
      "value_chain_position": "upstream",
      "type": "UX Design"
    },
    {
      "contribution": "Mapped behavioral triggers",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Collaborated with design & data teams",
      "value_chain_position": "downstream",
      "type": "Decision Strategy"
    }
  ]'::jsonb,
  '[
    {
      "value": "22%",
      "label": "Engagement Increase",
      "description": "Post-deployment engagement rise",
      "category": "Impact"
    },
    {
      "value": "12",
      "label": "Features Shipped",
      "description": "Gamification features delivered",
      "category": "Delivery"
    }
  ]'::jsonb,
  ARRAY['gamification', 'behavioral-design', 'ux', 'learning-engagement', 'motivation'],
  '{"engagement_increase_percent": 22, "feature_count": 12}'::jsonb
),

-- 1️⃣3️⃣ USAID YES Project
(
  'YES Program Research (Youth Entrepreneurship & Employment Support)',
  2021,
  'USAID Bangladesh (mPower)',
  'Research Analyst',
  'Led baseline research on youth labor market and vocational training in Cox''s Bazar for the YES program.',
  'Youth livelihood design starts with honest skill vs aspiration mapping.',
  '/images/projects/yes_usaid.jpg',
  13,
  'Development Research',
  true,
  true,
  'Baseline Study',
  'Labor Market Research',
  'Lack of youth employment and entrepreneurship insights in post-crisis region.',
  'Conduct baseline survey, FGDs, and report writing.',
  'Delivered 3 analytical reports that informed USAID program design.',
  '[
    {
      "contribution": "Led field research",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Authored 3 reports",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Built labor market models",
      "value_chain_position": "downstream",
      "type": "Decision Strategy"
    }
  ]'::jsonb,
  '[
    {
      "value": "3",
      "label": "Reports Authored",
      "description": "Analytical reports delivered",
      "category": "Output"
    },
    {
      "value": "Cox''s Bazar",
      "label": "Research Region",
      "description": "Primary research location",
      "category": "Scope"
    }
  ]'::jsonb,
  ARRAY['research', 'usaid', 'labor-market', 'youth', 'employment', 'cox-bazar'],
  '{"reports": 3, "region": "Cox Bazar", "sample_size": "national"}'::jsonb
),

-- 1️⃣4️⃣ DAEF Research Portfolio
(
  'DAEF Research Portfolio – Digital Economy & Sectoral Analysis',
  2021,
  'Innovision Consulting',
  'Portfolio Manager',
  'Co-founded DAEF team to study digital economy, consumer behavior, and startup ecosystems across Bangladesh.',
  'Sectoral insights scale when frameworks are replicable and localized.',
  '/images/projects/daef_innovision.jpg',
  14,
  'Consulting & Research',
  true,
  true,
  'Team Building',
  'Research Portfolio',
  'Growing need for private sector-aligned research in development context.',
  'Establish data frameworks, manage 20+ clients, publish 15+ reports.',
  'Delivered 4 industry white papers and 20 consulting outputs.',
  '[
    {
      "contribution": "Formed DAEF team",
      "value_chain_position": "upstream",
      "type": "Decision Strategy"
    },
    {
      "contribution": "Delivered white papers",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Managed 20+ clients",
      "value_chain_position": "downstream",
      "type": "Decision Strategy"
    }
  ]'::jsonb,
  '[
    {
      "value": "15",
      "label": "Reports Delivered",
      "description": "Research and consulting outputs",
      "category": "Output"
    },
    {
      "value": "20+",
      "label": "Clients Managed",
      "description": "B2B consulting clients",
      "category": "Scale"
    },
    {
      "value": "4",
      "label": "White Papers",
      "description": "Industry white papers published",
      "category": "Thought Leadership"
    }
  ]'::jsonb,
  ARRAY['research', 'consulting', 'digital-economy', 'startup-ecosystem', 'b2b'],
  '{"reports": 15, "clients": 20, "surveys": 10}'::jsonb
),

-- 1️⃣5️⃣ ICT Adoption by SMEs
(
  'ICT Adoption of SMEs in Bangladesh',
  2022,
  'Friedrich-Ebert-Stiftung (FES)',
  'Co-Author & Researcher',
  'Co-authored book and journal exploring ICT adoption pace and challenges among Bangladeshi SMEs.',
  'SME digitization depends on managerial attitude more than technology cost.',
  '/images/projects/ict_smes.jpg',
  15,
  'Research Publication',
  true,
  true,
  'Research & Writing',
  'Academic Research',
  'SMEs lagged in adopting ICT for productivity and competitiveness.',
  'Conduct nationwide SME survey and co-author publication.',
  'Published book and peer-reviewed journal; informed SME policy dialogues.',
  '[
    {
      "contribution": "Co-authored book",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Conducted SME survey",
      "value_chain_position": "upstream",
      "type": "Data Analysis"
    },
    {
      "contribution": "Published journal article",
      "value_chain_position": "downstream",
      "type": "Decision Strategy"
    }
  ]'::jsonb,
  '[
    {
      "value": "500",
      "label": "SME Respondents",
      "description": "Survey sample size",
      "category": "Research"
    },
    {
      "value": "2021-2022",
      "label": "Publication Years",
      "description": "Book and journal publication timeline",
      "category": "Output"
    }
  ]'::jsonb,
  ARRAY['research', 'sme', 'ict', 'publication', 'academic', 'policy'],
  '{"book_year": 2021, "journal_year": 2022, "respondents": 500}'::jsonb
);

-- =====================================================
-- VERIFICATION QUERY
-- =====================================================

-- Run this query to verify all 15 projects were inserted correctly:
-- SELECT title, year, company, category, phase, project_type FROM public.projects ORDER BY order_index;
