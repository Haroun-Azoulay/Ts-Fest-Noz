-- data.sql

-- Insert default types of goodies
INSERT INTO goodietypes VALUES (gen_random_uuid(), 'T-Shirt', NOW(), NOW());
INSERT INTO goodietypes VALUES (gen_random_uuid(), 'Album', NOW(), NOW());
INSERT INTO goodietypes VALUES (gen_random_uuid(), 'Mug', NOW(), NOW());

INSERT INTO users
VALUES (gen_random_uuid(), 'admin', 'admin', '$2b$10$Fr.cX0CfiA3wt1xI9.aPOeT7.LdbdLFpxFoXcIUsuZCJ.97CtaDVy', 'admin@gmail.com', 'admin', 'admin', NOW(), NOW()),
(gen_random_uuid(), 'artist', 'artist', '$2b$10$P363xqmpALT17xJ9t9WZ1eKDylCHZ07178mzqfCYxq0imlgvakFKa', 'artist@gmail.com', 'artist', 'artist', NOW(), NOW()),
(gen_random_uuid(), 'user', 'user', '$2b$10$sO8lStcEkLjQeBogv/m/DOjIhLLwBuRm7S7a4I9vpzcSOgYZcBPzS', 'user@gmail.com', 'user', 'user', NOW(), NOW()),
(gen_random_uuid(), 'organizer', 'organizer', '$2b$10$dnw2hX3Zv0PHd383MSS5He.WhXZbebL6Md6Glj19vhQKIZFT0.fUq', 'organizer@gmail.com', 'organizer', 'organizer', NOW(), NOW());
