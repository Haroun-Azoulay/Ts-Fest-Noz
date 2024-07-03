-- Create Database
CREATE DATABASE music_app ENCODING = 'UTF8';

-- Create User dragibus
CREATE USER music WITH ENCRYPTED PASSWORD 'root';

GRANT CONNECT ON DATABASE music_app TO music;
GRANT USAGE ON SCHEMA public TO music;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO music;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO music;

\connect music_app

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


-- utf8-4 pour les emoji 