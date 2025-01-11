-- Create Database
CREATE DATABASE music ENCODING = 'UTF8';

-- Create User dragibus
CREATE USER music WITH ENCRYPTED PASSWORD 'music';

GRANT CONNECT ON DATABASE music TO music;
GRANT USAGE ON SCHEMA public TO music;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO music;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO music;

\connect music

--Creation
CREATE SCHEMA IF NOT EXISTS "music";

GRANT ALL PRIVILEGES ON SCHEMA "music" TO music;
GRANT USAGE ON SCHEMA "music" TO music;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA "music" TO music;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA "music" TO music;

--set default schema
ALTER USER music SET search_path = "music";

SET search_path TO "music";

CREATE OR REPLACE LANGUAGE plpgsql;