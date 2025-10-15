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
