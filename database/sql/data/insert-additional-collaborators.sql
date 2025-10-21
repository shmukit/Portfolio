-- Insert additional collaborators for specific projects
-- Run this after fixing the existing collaborator issues

-- First, let's find the project IDs for these projects:
-- SELECT id, title FROM projects WHERE title ILIKE '%World Bank%' OR title ILIKE '%Gamification%' OR title ILIKE '%Quizards%' OR title ILIKE '%Careerki%' OR title ILIKE '%Tara%';

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
