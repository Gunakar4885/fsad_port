-- Create enum types
CREATE TYPE user_role AS ENUM ('ADMIN', 'STUDENT');
CREATE TYPE academic_year AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH');
CREATE TYPE semester_type AS ENUM ('ODD', 'EVEN');

-- Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    role user_role NOT NULL,
    is_active BOOLEAN DEFAULT true,
    is_password_changed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Student details
CREATE TABLE student_details (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    roll_number VARCHAR(20) NOT NULL UNIQUE,
    course_code VARCHAR(10) NOT NULL,
    current_year academic_year NOT NULL,
    current_semester INTEGER NOT NULL,
    section VARCHAR(2) NOT NULL,
    admission_year INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Courses
CREATE TABLE courses (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    duration_years INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Subjects
CREATE TABLE subjects (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    credits INTEGER NOT NULL,
    semester INTEGER NOT NULL,
    course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(code, course_id)
);

-- Academic groups
CREATE TABLE academic_groups (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    year academic_year NOT NULL,
    semester INTEGER NOT NULL,
    subject_id BIGINT REFERENCES subjects(id) ON DELETE CASCADE,
    created_by BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(name, course_id, year, semester, subject_id)
);

-- Group members
CREATE TABLE group_members (
    group_id BIGINT NOT NULL REFERENCES academic_groups(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_admin BOOLEAN DEFAULT false,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (group_id, user_id)
);

-- Messages
CREATE TABLE messages (
    id BIGSERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    group_id BIGINT NOT NULL REFERENCES academic_groups(id) ON DELETE CASCADE,
    sender_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    parent_message_id BIGINT REFERENCES messages(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Message attachments
CREATE TABLE message_attachments (
    id BIGSERIAL PRIMARY KEY,
    message_id BIGINT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    file_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_student_roll_number ON student_details(roll_number);
CREATE INDEX idx_messages_group ON messages(group_id, created_at);
CREATE INDEX idx_group_members_user ON group_members(user_id);

-- Insert default admin user
INSERT INTO users (username, password, full_name, role, is_password_changed)
VALUES ('admin', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a', 'System Admin', 'ADMIN', true);

-- Insert sample course
INSERT INTO courses (code, name, description, duration_years)
VALUES ('B.Tech', 'Bachelor of Technology', '4-year undergraduate program', 4);

-- Insert sample subjects for first year
INSERT INTO subjects (code, name, credits, semester, course_id)
VALUES 
    ('M101', 'Mathematics I', 4, 1, 1),
    ('P101', 'Physics I', 4, 1, 1),
    ('C101', 'Chemistry', 3, 1, 1),
    ('CS101', 'Introduction to Programming', 4, 1, 1),
    ('M102', 'Mathematics II', 4, 2, 1),
    ('P102', 'Physics II', 4, 2, 1),
    ('EE101', 'Basic Electronics', 3, 2, 1),
    ('CS102', 'Data Structures', 4, 2, 1);
