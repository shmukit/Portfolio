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
