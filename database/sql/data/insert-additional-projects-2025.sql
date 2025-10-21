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
ORDER BY order_index;