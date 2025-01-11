--
-- PostgreSQL database dump
--

-- Dumped from database version 13.16 (Debian 13.16-1.pgdg120+1)
-- Dumped by pg_dump version 14.15 (Ubuntu 14.15-0ubuntu0.22.04.1)

-- Started on 2025-01-11 02:33:44 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: music
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO music;

--
-- TOC entry 3142 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: music
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 213 (class 1259 OID 24760)
-- Name: ArtistProfils; Type: TABLE; Schema: public; Owner: music
--

CREATE TABLE public."ArtistProfils" (
    id uuid NOT NULL,
    denomination character varying(255) NOT NULL,
    phone_number character varying(255),
    url_media character varying(255),
    picture text,
    "SIRET_number" integer,
    "userId" uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ArtistProfils" OWNER TO music;

--
-- TOC entry 202 (class 1259 OID 24600)
-- Name: cities; Type: TABLE; Schema: public; Owner: music
--

CREATE TABLE public.cities (
    id uuid NOT NULL,
    user_id uuid,
    city_name character varying(255),
    text character varying(255),
    address character varying(255),
    zip_code integer,
    label character varying(255),
    longitude double precision,
    latitude double precision,
    date timestamp with time zone,
    style character varying(255),
    color character varying(255),
    departement_number integer,
    region_name character varying(255),
    url_point character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.cities OWNER TO music;

--
-- TOC entry 203 (class 1259 OID 24613)
-- Name: commentaries; Type: TABLE; Schema: public; Owner: music
--

CREATE TABLE public.commentaries (
    id uuid NOT NULL,
    content character varying(255) NOT NULL,
    "postId" uuid NOT NULL,
    "userId" uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.commentaries OWNER TO music;

--
-- TOC entry 204 (class 1259 OID 24628)
-- Name: events; Type: TABLE; Schema: public; Owner: music
--

CREATE TABLE public.events (
    id uuid NOT NULL,
    name character varying(255),
    city_id uuid,
    user_id uuid,
    description character varying(255),
    url character varying(255),
    "mapId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" uuid
);


ALTER TABLE public.events OWNER TO music;

--
-- TOC entry 206 (class 1259 OID 24658)
-- Name: goodieTypes; Type: TABLE; Schema: public; Owner: music
--

CREATE TABLE public."goodieTypes" (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."goodieTypes" OWNER TO music;

--
-- TOC entry 208 (class 1259 OID 24680)
-- Name: goodies; Type: TABLE; Schema: public; Owner: music
--

CREATE TABLE public.goodies (
    id uuid NOT NULL,
    "groupId" uuid NOT NULL,
    "userId" uuid NOT NULL,
    "goodieTypeId" uuid NOT NULL,
    name character varying(255) NOT NULL,
    path text,
    quantity character varying(255) NOT NULL,
    price double precision NOT NULL,
    available boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.goodies OWNER TO music;

--
-- TOC entry 207 (class 1259 OID 24665)
-- Name: groupUsers; Type: TABLE; Schema: public; Owner: music
--

CREATE TABLE public."groupUsers" (
    id uuid NOT NULL,
    "groupId" uuid NOT NULL,
    "userId" uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."groupUsers" OWNER TO music;

--
-- TOC entry 205 (class 1259 OID 24651)
-- Name: groups; Type: TABLE; Schema: public; Owner: music
--

CREATE TABLE public.groups (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.groups OWNER TO music;

--
-- TOC entry 209 (class 1259 OID 24705)
-- Name: orderdetails; Type: TABLE; Schema: public; Owner: music
--

CREATE TABLE public.orderdetails (
    id uuid NOT NULL,
    "goodieId" uuid NOT NULL,
    quantity integer NOT NULL,
    price double precision NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.orderdetails OWNER TO music;

--
-- TOC entry 210 (class 1259 OID 24710)
-- Name: orders; Type: TABLE; Schema: public; Owner: music
--

CREATE TABLE public.orders (
    id uuid NOT NULL,
    "userId" uuid NOT NULL,
    "orderDetailId" uuid NOT NULL,
    "totalPrice" double precision NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.orders OWNER TO music;

--
-- TOC entry 212 (class 1259 OID 24745)
-- Name: organizerProfils; Type: TABLE; Schema: public; Owner: music
--

CREATE TABLE public."organizerProfils" (
    id uuid NOT NULL,
    denomination character varying(255) NOT NULL,
    phone_number character varying(255),
    full_adress character varying(255),
    "SIRET_number" integer,
    more_info character varying(255) NOT NULL,
    "userId" uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."organizerProfils" OWNER TO music;

--
-- TOC entry 211 (class 1259 OID 24725)
-- Name: payments; Type: TABLE; Schema: public; Owner: music
--

CREATE TABLE public.payments (
    id uuid NOT NULL,
    token character varying(255) NOT NULL,
    payment boolean NOT NULL,
    "userId" uuid NOT NULL,
    "eventId" uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    event_id uuid
);


ALTER TABLE public.payments OWNER TO music;

--
-- TOC entry 201 (class 1259 OID 24587)
-- Name: posts; Type: TABLE; Schema: public; Owner: music
--

CREATE TABLE public.posts (
    id uuid NOT NULL,
    title character varying(255) NOT NULL,
    subtitle character varying(255) NOT NULL,
    content character varying(1000) NOT NULL,
    "userId" uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.posts OWNER TO music;

--
-- TOC entry 200 (class 1259 OID 24576)
-- Name: users; Type: TABLE; Schema: public; Owner: music
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    lastname character varying(255) NOT NULL,
    firstname character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'user'::character varying,
    pseudo character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO music;

--
-- TOC entry 3136 (class 0 OID 24760)
-- Dependencies: 213
-- Data for Name: ArtistProfils; Type: TABLE DATA; Schema: public; Owner: music
--

COPY public."ArtistProfils" (id, denomination, phone_number, url_media, picture, "SIRET_number", "userId", "createdAt", "updatedAt") FROM stdin;
fbcba461-1808-4b5d-b8a8-8e82e03ef016	Rebecca Schowalter	(692) 810-7286 x1240	https://questionable-gym.name	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIzNTU2IiBoZWlnaHQ9IjEwMzciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2JiNGEiLz48dGV4dCB4PSIxNzc4IiB5PSI1MTguNSIgZm9udC1zaXplPSIyMCIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj4zNTU2eDEwMzc8L3RleHQ+PC9zdmc+	12596	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:03.036+00	2025-01-11 01:01:03.036+00
fbcba461-1808-4b5d-b8a8-8e82e03ef016	Miss Michelle Walker	530-525-2748 x430	https://brown-scratch.name/	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIzMDgwIiBoZWlnaHQ9Ijg4OSI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzZmMzlkMiIvPjx0ZXh0IHg9IjE1NDAiIHk9IjQ0NC41IiBmb250LXNpemU9IjIwIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPjMwODB4ODg5PC90ZXh0Pjwvc3ZnPg==	86095	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:03.036+00	2025-01-11 01:01:03.036+00
fbcba461-1808-4b5d-b8a8-8e82e03ef016	Mattie Metz II	923-298-3105 x044	https://unfinished-fold.info	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIzMDY0IiBoZWlnaHQ9IjMzNDUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM1YzJkZGYiLz48dGV4dCB4PSIxNTMyIiB5PSIxNjcyLjUiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+MzA2NHgzMzQ1PC90ZXh0Pjwvc3ZnPg==	59895	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:03.036+00	2025-01-11 01:01:03.036+00
fbcba461-1808-4b5d-b8a8-8e82e03ef016	Kelvin Murphy	(448) 209-5609	https://idolized-adaptation.net/	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIxMTIyIiBoZWlnaHQ9IjM2MTUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNiOWVlYmUiLz48dGV4dCB4PSI1NjEiIHk9IjE4MDcuNSIgZm9udC1zaXplPSIyMCIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj4xMTIyeDM2MTU8L3RleHQ+PC9zdmc+	26501	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:03.036+00	2025-01-11 01:01:03.036+00
fbcba461-1808-4b5d-b8a8-8e82e03ef016	Albert Corkery	778.746.9118 x10675	https://orange-compromise.com	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIyNTE4IiBoZWlnaHQ9IjMwMzEiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxZWZiZWYiLz48dGV4dCB4PSIxMjU5IiB5PSIxNTE1LjUiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+MjUxOHgzMDMxPC90ZXh0Pjwvc3ZnPg==	65993	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:03.036+00	2025-01-11 01:01:03.036+00
\.


--
-- TOC entry 3125 (class 0 OID 24600)
-- Dependencies: 202
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: music
--

COPY public.cities (id, user_id, city_name, text, address, zip_code, label, longitude, latitude, date, style, color, departement_number, region_name, url_point, "createdAt", "updatedAt") FROM stdin;
fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Destiniton	Toties illum chirographum terror tunc vere dignissimos altus.	40414 George Place	81270	Fantastic	-174.1942	-6.6514	2024-06-05 01:17:55.621+00	tan	#585b2d	50	West Virginia	https://square-publication.name	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
a3a2125a-faa8-4aff-abd5-a6145c6ed337	fbcba461-1808-4b5d-b8a8-8e82e03ef016	South Stephan	Colo trucido coepi acervus nam talis absque deprimo porro.	969 Brennon Course	28057	Bespoke	-61.8529	-24.2696	2024-05-03 20:20:21.219+00	lavender	#28c2b3	77	Wyoming	https://limp-heartache.net	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
6f2bf0e1-d446-40f4-91a9-128c4b45ef3c	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Turnerstad	Charisma thesis cogito inflammatio quaerat comparo utor clamo congregatio spargo.	8438 Gwen Forges	89438	Rustic	118.9453	89.974	2024-06-16 04:27:26.77+00	lime	#a7a294	52	Vermont	https://old-fashioned-management.info	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
52c43c22-d875-41f6-836f-3e53babbf4c0	fbcba461-1808-4b5d-b8a8-8e82e03ef016	New Fleta	Pecus territo antiquus expedita tutis aperio cupressus teres defleo collum.	952 Thompson Parks	5166	Ergonomic	-77.462	43.4121	2024-09-20 22:09:39.306+00	azure	#c1ed6a	16	Idaho	https://wretched-morning.name	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
0114c0ec-0989-4c53-9e23-e809510f68c2	fbcba461-1808-4b5d-b8a8-8e82e03ef016	East Jared	Voluptate debilito bos nostrum.	3130 S Broadway	31066	Generic	-43.45	10.7748	2024-04-18 15:21:20.493+00	salmon	#53bb26	27	Wisconsin	https://rapid-goat.name	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
51efc2b9-3fee-4146-a9f5-f6acb97f75e7	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Port Luigi	Tui commodi quia sordeo caute cogo congregatio.	3133 The Glebe	32700	Gorgeous	-147.4729	-50.2323	2024-10-22 14:06:02.947+00	tan	#b9fefd	48	North Dakota	https://blushing-minor.name/	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
21a1ebde-5d3a-4a44-a9bc-5d7ca0610573	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Everetteton	Cultura adopto tollo aequus in.	1586 Martin Luther King Drive	71710	Practical	-126.9276	-83.6772	2024-09-22 08:12:09.113+00	violet	#f54af5	79	Oregon	https://other-cod.com/	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
b22b2247-99fa-4da0-9d87-04c2af8a78ba	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Alexaville	Arma talis territo verto bibo considero fuga tamquam abscido.	3853 Koepp Knolls	85368	Modern	-84.0703	0.3461	2024-05-31 15:13:27.535+00	fuchsia	#cfeaa1	57	Indiana	https://brown-desk.net/	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
b109f7c5-0418-43fb-9a0a-ed9b4ca34c0f	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Fort Hobartbury	Libero voluptatum demo.	12899 White Ranch	25045	Incredible	90.3716	-81.5659	2024-12-05 07:23:48.141+00	salmon	#90ab12	87	South Carolina	https://standard-allegation.net	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
0ab215f9-06d2-4407-9f16-059ee1523658	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Albuquerque	Atque quos canto magni adulatio delibero corpus cubicularis paulatim.	82708 Kaitlin Vista	15072	Incredible	172.2394	53.9235	2024-10-04 23:01:31.844+00	fuchsia	#c2e1d3	91	Maryland	https://gray-dividend.com	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
da31898e-f822-4ec7-8c16-2af6738b615e	fbcba461-1808-4b5d-b8a8-8e82e03ef016	East Alysa	Asperiores abstergo textor cresco tenus appono.	881 Witting Parkways	65909	Awesome	-63.136	82.3689	2024-07-16 04:24:47.254+00	silver	#b2a9fb	1	Florida	https://everlasting-mainstream.net/	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
cac013e5-c479-4144-8720-cabcce176a5d	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Fort Eliseo	Attero voluptatem acer circumvenio adulescens sed victoria comedo capto.	784 Hyman Mountains	60488	Oriental	-65.6847	67.3068	2024-06-21 04:31:02.839+00	yellow	#ae74cf	34	North Dakota	https://major-plugin.name	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
ac4eb828-27dd-4d02-9d94-29cd2ad14f0c	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Nickborough	Spiritus substantia color urbanus.	3282 Runolfsson Motorway	22727	Rustic	-14.8276	66.4182	2024-01-16 21:46:42.481+00	turquoise	#60fca6	85	Michigan	https://mediocre-word.org	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
3c8d60d2-aa95-4137-aa2f-0a8fd094e5a1	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Quitzoncester	Autus quod excepturi paulatim cibus caute cibo adipiscor.	112 Joannie Creek	11136	Modern	86.6046	-16.4957	2024-11-06 23:24:24.578+00	maroon	#9aae77	24	Ohio	https://wee-utilization.name	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
f9b338ce-a723-4a3c-8c51-4c0316bb8f68	fbcba461-1808-4b5d-b8a8-8e82e03ef016	North Ashlynn	Tendo ago veritatis basium animus antea creo.	67008 River Street	45438	Licensed	-121.5496	12.7193	2024-10-24 01:18:41.215+00	pink	#46e0cb	80	Indiana	https://unaware-mallard.biz/	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
537986bb-bd10-47ee-981d-a8bdc401b3cb	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Burbank	Solus vulticulus utrimque amet.	834 Clemmie Canyon	7697	Small	-6.1779	-65.8857	2024-12-02 13:33:42.397+00	indigo	#6fed13	30	Alaska	https://whole-dream.name/	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
b683dfa9-8733-42c3-9b68-6ddfe26d7307	fbcba461-1808-4b5d-b8a8-8e82e03ef016	South Jofurt	Contego capto vulnus veritas vita aliqua curiositas caute cibus tricesimus.	257 Virginia Orchard	93620	Ergonomic	176.7758	70.6441	2024-02-18 23:33:27.38+00	violet	#fdeca5	24	Minnesota	https://careless-duffel.info	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
c49f4591-ebcb-4aca-b4f8-c500067d6966	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Hillsboro	Cibo natus capitulus clementia angelus vel.	606 Immanuel Station	60104	Gorgeous	-59.2954	50.0318	2024-09-21 23:10:05.777+00	teal	#ae2fae	29	Utah	https://hospitable-wedding.biz	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
5966c5ca-e2b1-4115-9312-a67517d6608e	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Perth Amboy	Tendo cubo minus quaerat.	97558 Ora Rue	63094	Tasty	143.4124	-75.0739	2024-09-25 16:17:50.557+00	green	#fdad1d	55	Michigan	https://strong-dwell.info/	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
9377eaef-c9b7-40d8-b52f-d5ada98b8e43	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Koeppborough	Succedo sum subseco conitor solutio creator.	861 E North Street	35079	Licensed	-161.6989	-55.8398	2024-01-16 11:01:37.194+00	magenta	#e5bbbe	33	Oklahoma	https://shabby-ribbon.name	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
05f0ecdb-c8a3-4a03-984e-d3c16fb343cc	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Lake Germainefurt	Suffoco theologus contra sursum.	555 Abshire Streets	60849	Sleek	-4.4876	47.8039	2024-12-09 08:02:43.923+00	purple	#cad0dd	87	Mississippi	https://deserted-hose.info/	2025-01-11 01:01:02.942+00	2025-01-11 01:01:02.942+00
\.


--
-- TOC entry 3126 (class 0 OID 24613)
-- Dependencies: 203
-- Data for Name: commentaries; Type: TABLE DATA; Schema: public; Owner: music
--

COPY public.commentaries (id, content, "postId", "userId", "createdAt", "updatedAt") FROM stdin;
fbcba461-1808-4b5d-b8a8-8e82e03ef016	Quis commodi venustas pecus decumbo.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.958+00	2025-01-11 01:01:02.958+00
\.


--
-- TOC entry 3127 (class 0 OID 24628)
-- Dependencies: 204
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: music
--

COPY public.events (id, name, city_id, user_id, description, url, "mapId", "createdAt", "updatedAt", "userId") FROM stdin;
fbcba461-1808-4b5d-b8a8-8e82e03ef016	Earline	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Admiratio cuppedia triduana blanditiis.	https://dutiful-cemetery.biz	43	2025-01-11 01:01:02.966+00	2025-01-11 01:01:02.966+00	\N
\.


--
-- TOC entry 3129 (class 0 OID 24658)
-- Dependencies: 206
-- Data for Name: goodieTypes; Type: TABLE DATA; Schema: public; Owner: music
--

COPY public."goodieTypes" (id, name, "createdAt", "updatedAt") FROM stdin;
fbcba461-1808-4b5d-b8a8-8e82e03ef016	Unbranded	2025-01-11 01:01:02.985+00	2025-01-11 01:01:02.985+00
\.


--
-- TOC entry 3131 (class 0 OID 24680)
-- Dependencies: 208
-- Data for Name: goodies; Type: TABLE DATA; Schema: public; Owner: music
--

COPY public.goodies (id, "groupId", "userId", "goodieTypeId", name, path, quantity, price, available, "createdAt", "updatedAt") FROM stdin;
fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Recycled Plastic Tuna	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIxNDk4IiBoZWlnaHQ9IjM2NzEiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjYzJkYjMiLz48dGV4dCB4PSI3NDkiIHk9IjE4MzUuNSIgZm9udC1zaXplPSIyMCIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj4xNDk4eDM2NzE8L3RleHQ+PC9zdmc+	28	95.68	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
bc3ebb8e-5db3-4f23-8c81-3585c8be74dd	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Incredible Metal Soap	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIyNjM2IiBoZWlnaHQ9IjE1NzciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM3ZGE1ZWQiLz48dGV4dCB4PSIxMzE4IiB5PSI3ODguNSIgZm9udC1zaXplPSIyMCIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj4yNjM2eDE1Nzc8L3RleHQ+PC9zdmc+	45	33.32	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
9713270e-18a5-492f-9c10-4d7dd692ab4d	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Rustic Plastic Mouse	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIxOTkwIiBoZWlnaHQ9IjI5MjgiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNkNjYwYzAiLz48dGV4dCB4PSI5OTUiIHk9IjE0NjQiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+MTk5MHgyOTI4PC90ZXh0Pjwvc3ZnPg==	22	81.76	t	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
18b7a7b4-385b-4bb1-ade2-485063190e93	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Handcrafted Frozen Bacon	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIyODkiIGhlaWdodD0iMzM1MiI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YxYjUzOSIvPjx0ZXh0IHg9IjE0NC41IiB5PSIxNjc2IiBmb250LXNpemU9IjIwIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPjI4OXgzMzUyPC90ZXh0Pjwvc3ZnPg==	76	95.64	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
7b7ef731-0e26-4813-bdf9-6ab1aabd01fb	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Intelligent Wooden Car	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSI1NiIgaGVpZ2h0PSI4MyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzU2NWZjZiIvPjx0ZXh0IHg9IjI4IiB5PSI0MS41IiBmb250LXNpemU9IjIwIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPjU2eDgzPC90ZXh0Pjwvc3ZnPg==	17	89.92	t	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
b2d8d208-3886-46eb-b0b2-baf8098b5f4d	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Tasty Bronze Soap	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIyNjI0IiBoZWlnaHQ9IjI1NjgiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM0MGJhZGYiLz48dGV4dCB4PSIxMzEyIiB5PSIxMjg0IiBmb250LXNpemU9IjIwIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPjI2MjR4MjU2ODwvdGV4dD48L3N2Zz4=	11	25.42	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
bd254e54-a1dc-4ab0-8f1b-a7974c4ab534	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Modern Plastic Gloves	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIxMzMwIiBoZWlnaHQ9IjgwMyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2QyYWZjMyIvPjx0ZXh0IHg9IjY2NSIgeT0iNDAxLjUiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+MTMzMHg4MDM8L3RleHQ+PC9zdmc+	82	38.98	t	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
626cb2b3-7cf1-4952-820d-4bd7837b4ba4	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Rustic Rubber Gloves	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIxMTAzIiBoZWlnaHQ9IjM4MjEiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjZGZhYzIiLz48dGV4dCB4PSI1NTEuNSIgeT0iMTkxMC41IiBmb250LXNpemU9IjIwIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPjExMDN4MzgyMTwvdGV4dD48L3N2Zz4=	41	23.02	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
cc693001-7f2a-4820-ad57-7a44299f3857	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Intelligent Granite Chicken	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIxNTMxIiBoZWlnaHQ9IjkzMiI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzQwZjljZiIvPjx0ZXh0IHg9Ijc2NS41IiB5PSI0NjYiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+MTUzMXg5MzI8L3RleHQ+PC9zdmc+	77	77.04	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
da2ce9af-83d8-43a5-9058-3ad8b9f5faf2	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Electronic Frozen Cheese	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIyOTQiIGhlaWdodD0iNjgwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjYjQzYWJiIi8+PHRleHQgeD0iMTQ3IiB5PSIzNDAiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+Mjk0eDY4MDwvdGV4dD48L3N2Zz4=	77	62.86	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
790e3783-f79d-4463-b0cb-9371b90a2540	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Luxurious Fresh Soap	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIxMzk4IiBoZWlnaHQ9IjM2NjQiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNkZTU1ZjQiLz48dGV4dCB4PSI2OTkiIHk9IjE4MzIiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+MTM5OHgzNjY0PC90ZXh0Pjwvc3ZnPg==	51	71.1	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
15f3b32a-84fa-4636-bfd5-af43b6ed75a3	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Elegant Cotton Shoes	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSI1MCIgaGVpZ2h0PSIyNTA1Ij48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDRlYzQwIi8+PHRleHQgeD0iMjUiIHk9IjEyNTIuNSIgZm9udC1zaXplPSIyMCIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj41MHgyNTA1PC90ZXh0Pjwvc3ZnPg==	81	47.66	t	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
19725976-1ec3-41d1-bcc9-ae9cb6c836fd	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Elegant Rubber Ball	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIxMTAyIiBoZWlnaHQ9IjM0OTEiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM3N2M5Y2EiLz48dGV4dCB4PSI1NTEiIHk9IjE3NDUuNSIgZm9udC1zaXplPSIyMCIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj4xMTAyeDM0OTE8L3RleHQ+PC9zdmc+	73	57.12	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
261a36f1-6c18-40b7-b825-38cbd63490e1	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Elegant Fresh Fish	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIyMDI5IiBoZWlnaHQ9IjI4NDAiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNkYmRlYmUiLz48dGV4dCB4PSIxMDE0LjUiIHk9IjE0MjAiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+MjAyOXgyODQwPC90ZXh0Pjwvc3ZnPg==	92	62.62	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
817a026a-764a-47ae-ae01-0d3f1d0a750a	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Rustic Bronze Bike	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSI1NyIgaGVpZ2h0PSIyODI0Ij48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjYWFjOWQwIi8+PHRleHQgeD0iMjguNSIgeT0iMTQxMiIgZm9udC1zaXplPSIyMCIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj41N3gyODI0PC90ZXh0Pjwvc3ZnPg==	47	26.9	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
3aef8137-2195-4ace-bafc-c942e9aa399d	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Electronic Granite Ball	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIxNjA4IiBoZWlnaHQ9IjEwMDQiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlYjY1ZjUiLz48dGV4dCB4PSI4MDQiIHk9IjUwMiIgZm9udC1zaXplPSIyMCIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj4xNjA4eDEwMDQ8L3RleHQ+PC9zdmc+	50	91.24	t	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
9e275b53-3413-47cc-b330-948369864f10	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Luxurious Soft Keyboard	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIzOTczIiBoZWlnaHQ9IjI0NDQiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM4OTFiNmQiLz48dGV4dCB4PSIxOTg2LjUiIHk9IjEyMjIiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+Mzk3M3gyNDQ0PC90ZXh0Pjwvc3ZnPg==	96	93.12	t	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
2be99202-5223-44e8-81b8-ee35bbcdede2	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Bespoke Cotton Bike	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIzMTUyIiBoZWlnaHQ9IjI4NzUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM0NDljZjciLz48dGV4dCB4PSIxNTc2IiB5PSIxNDM3LjUiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+MzE1MngyODc1PC90ZXh0Pjwvc3ZnPg==	50	12.88	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
e4d6382f-8515-4a8d-9f3d-1d9a21e27a9d	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Licensed Wooden Fish	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIzNTE4IiBoZWlnaHQ9IjEyMzAiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjNGM5MzgiLz48dGV4dCB4PSIxNzU5IiB5PSI2MTUiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+MzUxOHgxMjMwPC90ZXh0Pjwvc3ZnPg==	22	79.12	t	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
eb7b7d91-590d-4472-ba38-a7e74eb0feeb	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Elegant Granite Computer	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIxNzk5IiBoZWlnaHQ9IjIxNTkiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM5YTg1MGQiLz48dGV4dCB4PSI4OTkuNSIgeT0iMTA3OS41IiBmb250LXNpemU9IjIwIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPjE3OTl4MjE1OTwvdGV4dD48L3N2Zz4=	32	11.58	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
60a00049-a086-4f86-8610-850e237f6cc1	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Gorgeous Bronze Chair	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIxNTIzIiBoZWlnaHQ9IjE3MjQiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmYmRhMmUiLz48dGV4dCB4PSI3NjEuNSIgeT0iODYyIiBmb250LXNpemU9IjIwIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPjE1MjN4MTcyNDwvdGV4dD48L3N2Zz4=	23	64.28	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
d4acd7b0-f05b-4e2c-a343-9729cd42f583	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Luxurious Rubber Sausages	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIzNjEzIiBoZWlnaHQ9Ijc1MSI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2NiMDNkZiIvPjx0ZXh0IHg9IjE4MDYuNSIgeT0iMzc1LjUiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+MzYxM3g3NTE8L3RleHQ+PC9zdmc+	67	71.94	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
c1542a71-d70d-45d3-ad14-3aa0d7e4ba32	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Handmade Bronze Hat	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIyNzUzIiBoZWlnaHQ9IjQ5MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzI4YWJkMSIvPjx0ZXh0IHg9IjEzNzYuNSIgeT0iMjQ1IiBmb250LXNpemU9IjIwIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPjI3NTN4NDkwPC90ZXh0Pjwvc3ZnPg==	99	32.82	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
f51ca03b-a929-4f4a-8896-eb22ebf07889	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Tasty Granite Keyboard	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIyNzkxIiBoZWlnaHQ9IjIxNTIiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM1Yjk1MDkiLz48dGV4dCB4PSIxMzk1LjUiIHk9IjEwNzYiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+Mjc5MXgyMTUyPC90ZXh0Pjwvc3ZnPg==	75	27.58	t	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
493af4fc-4e05-4329-84a2-ad71ed04256f	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Recycled Fresh Mouse	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIxNzE5IiBoZWlnaHQ9IjEzMDkiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwNjAyMmQiLz48dGV4dCB4PSI4NTkuNSIgeT0iNjU0LjUiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+MTcxOXgxMzA5PC90ZXh0Pjwvc3ZnPg==	79	41.32	t	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
60e89dac-f4d7-4719-aa60-00467552a573	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Electronic Soft Salad	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIzMjQ1IiBoZWlnaHQ9Ijk5OSI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2E4ZTVmZCIvPjx0ZXh0IHg9IjE2MjIuNSIgeT0iNDk5LjUiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+MzI0NXg5OTk8L3RleHQ+PC9zdmc+	56	53.98	t	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
be0880fc-f59a-481d-a9c2-f472e52c4ee8	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Handcrafted Frozen Soap	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIyOTkwIiBoZWlnaHQ9Ijc3OCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzNmZWNlMyIvPjx0ZXh0IHg9IjE0OTUiIHk9IjM4OSIgZm9udC1zaXplPSIyMCIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj4yOTkweDc3ODwvdGV4dD48L3N2Zz4=	90	88.16	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
638148ba-f2c2-48d1-a55d-e056e958c3b9	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Recycled Granite Towels	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSI5ODYiIGhlaWdodD0iOTUyIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjYWJhZTBiIi8+PHRleHQgeD0iNDkzIiB5PSI0NzYiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+OTg2eDk1MjwvdGV4dD48L3N2Zz4=	74	31.78	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
2757647f-2b6a-4bc9-a872-1b45115ed221	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Licensed Concrete Shoes	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSI5ODUiIGhlaWdodD0iMjcxNSI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Q5MWNkZiIvPjx0ZXh0IHg9IjQ5Mi41IiB5PSIxMzU3LjUiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+OTg1eDI3MTU8L3RleHQ+PC9zdmc+	52	50.8	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
7fc6f978-db41-4343-a0cb-02c8508d50ed	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Rustic Steel Shoes	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSI3MiIgaGVpZ2h0PSIxNjc0Ij48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjN2E5NTQ3Ii8+PHRleHQgeD0iMzYiIHk9IjgzNyIgZm9udC1zaXplPSIyMCIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj43MngxNjc0PC90ZXh0Pjwvc3ZnPg==	10	16.92	t	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
61190136-eec8-487c-9f56-bf0d4cd26d73	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Modern Granite Towels	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIzOTg1IiBoZWlnaHQ9IjIzOTYiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNiY2EwY2MiLz48dGV4dCB4PSIxOTkyLjUiIHk9IjExOTgiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+Mzk4NXgyMzk2PC90ZXh0Pjwvc3ZnPg==	3	61.28	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
a99cb10d-ca62-466d-b0f9-1c5b8b0a6d09	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Awesome Bronze Table	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSI0NjgiIGhlaWdodD0iODIzIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOGIxZWQ1Ii8+PHRleHQgeD0iMjM0IiB5PSI0MTEuNSIgZm9udC1zaXplPSIyMCIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj40Njh4ODIzPC90ZXh0Pjwvc3ZnPg==	73	17.24	t	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
bb62f18e-6a40-40e4-956f-d31979dbab19	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Recycled Cotton Ball	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIyMDkyIiBoZWlnaHQ9Ijg3NiI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzgyZGI2ZCIvPjx0ZXh0IHg9IjEwNDYiIHk9IjQzOCIgZm9udC1zaXplPSIyMCIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj4yMDkyeDg3NjwvdGV4dD48L3N2Zz4=	15	44.08	t	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
446a5e69-147e-4351-ba4c-d57176cbaea9	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Awesome Frozen Shirt	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIxMTIxIiBoZWlnaHQ9IjE4NCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2JlZmQ4YiIvPjx0ZXh0IHg9IjU2MC41IiB5PSI5MiIgZm9udC1zaXplPSIyMCIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj4xMTIxeDE4NDwvdGV4dD48L3N2Zz4=	6	12.02	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
b52e63d8-d4c0-44b9-8dd6-0968acd51f6e	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Fantastic Granite Tuna	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIzNjc4IiBoZWlnaHQ9IjMwOSI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ZmOTBmNiIvPjx0ZXh0IHg9IjE4MzkiIHk9IjE1NC41IiBmb250LXNpemU9IjIwIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPjM2Nzh4MzA5PC90ZXh0Pjwvc3ZnPg==	92	88.84	t	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
3d197b8b-f775-4dc3-83e4-46ee1c063db6	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Handcrafted Soft Pants	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIxODcxIiBoZWlnaHQ9IjE2MTMiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjYWFlMGQiLz48dGV4dCB4PSI5MzUuNSIgeT0iODA2LjUiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+MTg3MXgxNjEzPC90ZXh0Pjwvc3ZnPg==	80	23.4	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
c606ef34-6fdb-4e27-9026-c7d25fc6470d	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Rustic Soft Sausages	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIzNDMxIiBoZWlnaHQ9IjMxODAiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNiZTNmMWUiLz48dGV4dCB4PSIxNzE1LjUiIHk9IjE1OTAiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+MzQzMXgzMTgwPC90ZXh0Pjwvc3ZnPg==	81	89.08	t	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
b178f430-4780-4720-b2e4-7e90c260b78a	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Rustic Plastic Bike	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIxODE4IiBoZWlnaHQ9IjMyODgiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM3ODNjZWYiLz48dGV4dCB4PSI5MDkiIHk9IjE2NDQiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+MTgxOHgzMjg4PC90ZXh0Pjwvc3ZnPg==	50	13.98	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
5c6498d1-19d6-4a95-99af-8265151be820	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Gorgeous Granite Fish	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIxMTYwIiBoZWlnaHQ9IjIxMjAiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM4YzdmMjgiLz48dGV4dCB4PSI1ODAiIHk9IjEwNjAiIGZvbnQtc2l6ZT0iMjAiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+MTE2MHgyMTIwPC90ZXh0Pjwvc3ZnPg==	47	59.04	t	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
9f98530c-70a8-4030-9a23-cf7ef8dea654	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Refined Granite Keyboard	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIxODY5IiBoZWlnaHQ9IjI3MjgiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNkYjc2OWQiLz48dGV4dCB4PSI5MzQuNSIgeT0iMTM2NCIgZm9udC1zaXplPSIyMCIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj4xODY5eDI3Mjg8L3RleHQ+PC9zdmc+	76	81.52	t	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
d37bcbea-0a70-4512-989a-9500a0e08aba	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	Unbranded Steel Pants	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgYmFzZVByb2ZpbGU9ImZ1bGwiIHdpZHRoPSIxNTAzIiBoZWlnaHQ9IjM0MjciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM5NjRmNTciLz48dGV4dCB4PSI3NTEuNSIgeT0iMTcxMy41IiBmb250LXNpemU9IjIwIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPjE1MDN4MzQyNzwvdGV4dD48L3N2Zz4=	42	92.94	f	2025-01-11 01:01:02.99+00	2025-01-11 01:01:02.99+00
\.


--
-- TOC entry 3130 (class 0 OID 24665)
-- Dependencies: 207
-- Data for Name: groupUsers; Type: TABLE DATA; Schema: public; Owner: music
--

COPY public."groupUsers" (id, "groupId", "userId", "createdAt", "updatedAt") FROM stdin;
fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.981+00	2025-01-11 01:01:02.981+00
\.


--
-- TOC entry 3128 (class 0 OID 24651)
-- Dependencies: 205
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: music
--

COPY public.groups (id, name, "createdAt", "updatedAt") FROM stdin;
fbcba461-1808-4b5d-b8a8-8e82e03ef016	Hollywood Undead	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
9d5c9ff0-ea7c-4bc0-b94c-23a3860d848f	Aya Nakamura	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
a2d3c9df-f46d-4fc4-a553-c10870992e07	Ben Selvin	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
7eb46e21-2fb3-40c3-b6de-f9d4d05c585f	Dadju	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
ef4fa48b-16b1-4a95-a4f1-32f816d98672	The Shangri-Las	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
83849d4f-92f5-4b75-80ca-e3a942c0aa47	Dexys Midnight Runners	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
360c6e7e-df5c-40a0-b848-099227319cf2	Demi Lovato	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
f77865ab-177c-44d7-94f1-5524c647c778	D-Block Europe	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
522c7027-791d-491c-a2e3-86829181828f	Soda Stereo	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
bbc4499b-e19a-42fc-85b7-501c22469221	Harry Styles	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
244e60de-e1ba-43af-a7b4-5c62e6e6c7a9	Bobby McFerrin	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
3a8fff5d-42e3-4354-baa4-6e11758053bd	Bradley Cooper	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
123002c4-d07f-47dd-9639-44ebfbb25bc3	Ke$ha	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
6d73a1cd-d1f3-488c-af1c-002913d775d6	Donovan	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
11df8e3b-fe37-4017-9cd5-2c9c4b2f09f7	Lionel Richie	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
5cf76117-77e6-4662-bfbc-4e3be1f60747	Daniel Powter	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
15072911-e10a-413d-a034-e3c559944926	The Isley Brothers	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
8557345c-0417-4d4c-8b05-af94e83d5603	Rick Ross	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
717826f4-aa6b-4b51-b39e-476ac9cc237a	Bad Bunny	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
3bc83e00-d4a6-40b5-b12a-c6a9c8a5f046	Billy Joel	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
713bfb00-6ea9-4ab6-ba7d-d54bca5cc546	Arcade Fire	2025-01-11 01:01:02.972+00	2025-01-11 01:01:02.972+00
\.


--
-- TOC entry 3132 (class 0 OID 24705)
-- Dependencies: 209
-- Data for Name: orderdetails; Type: TABLE DATA; Schema: public; Owner: music
--

COPY public.orderdetails (id, "goodieId", quantity, price, "createdAt", "updatedAt") FROM stdin;
fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	47	55.02	2025-01-11 01:01:03.006+00	2025-01-11 01:01:03.006+00
\.


--
-- TOC entry 3133 (class 0 OID 24710)
-- Dependencies: 210
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: music
--

COPY public.orders (id, "userId", "orderDetailId", "totalPrice", "createdAt", "updatedAt") FROM stdin;
fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	937.22	2025-01-11 01:01:03.011+00	2025-01-11 01:01:03.011+00
\.


--
-- TOC entry 3135 (class 0 OID 24745)
-- Dependencies: 212
-- Data for Name: organizerProfils; Type: TABLE DATA; Schema: public; Owner: music
--

COPY public."organizerProfils" (id, denomination, phone_number, full_adress, "SIRET_number", more_info, "userId", "createdAt", "updatedAt") FROM stdin;
fbcba461-1808-4b5d-b8a8-8e82e03ef016	A.A. Milne	1-525-420-1439 x3899	Suite 126	3791	Deprimo bestia ciminatio uter solutio vinitor tempus somniculosus.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:03.029+00	2025-01-11 01:01:03.029+00
fbcba461-1808-4b5d-b8a8-8e82e03ef016	E.M. Forster	(991) 729-0669 x14584	Apt. 226	4570	Timor sonitus crebro approbo statua civitas defessus synagoga alias.\nDeputo caste textus umerus volubilis vivo acervus vulnero.\nVir audax maxime vulticulus amet volup aufero amet.\nCrur crepusculum amet architecto.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:03.029+00	2025-01-11 01:01:03.029+00
fbcba461-1808-4b5d-b8a8-8e82e03ef016	Kurt Vonnegut	(999) 817-7935	Apt. 616	8626	Despecto sordeo atque atque pel earum auctus administratio utilis.\nAtque summisse adopto conicio.\nConfido sollers celebrer bis cum.\nHic voro vehemens aspernatur abscido denego.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:03.029+00	2025-01-11 01:01:03.029+00
fbcba461-1808-4b5d-b8a8-8e82e03ef016	Frank Herbert	(292) 216-0207	Apt. 844	5537	Aegrotatio apparatus quasi vomito succedo congregatio eum audeo.\nOdio argumentum cribro cogo curto ait adversus acidus.\nMollitia bellum torqueo ultra utroque.\nCohaero tum adipisci adinventitias demens nulla deprecator defluo tamen.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:03.029+00	2025-01-11 01:01:03.029+00
fbcba461-1808-4b5d-b8a8-8e82e03ef016	Dashiell Hammett	1-691-308-0890	Suite 662	1463	Tredecim atrox canis adipisci balbus abeo.\nTerrito concido beatae speculum arx vado confero cinis ars.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:03.029+00	2025-01-11 01:01:03.029+00
\.


--
-- TOC entry 3134 (class 0 OID 24725)
-- Dependencies: 211
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: music
--

COPY public.payments (id, token, payment, "userId", "eventId", "createdAt", "updatedAt", event_id) FROM stdin;
fbcba461-1808-4b5d-b8a8-8e82e03ef016	WaKxOoTPhoXdpYpmjFBo	t	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:03.018+00	2025-01-11 01:01:03.018+00	\N
4596eb14-57fb-452a-b973-81f2d08deab7	xxwlsMKqEcCXZDIkEtHe	f	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:03.018+00	2025-01-11 01:01:03.018+00	\N
6e742af3-b492-4be5-8796-0305aacc3622	jqRLdYGgxOOEnDJUaDWw	f	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:03.018+00	2025-01-11 01:01:03.018+00	\N
2ad9bce5-c0f8-4d19-905c-09ce961f46c3	WqrKQkPwfNCuYBAAMMAZ	t	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:03.018+00	2025-01-11 01:01:03.018+00	\N
bcf4f275-9399-4e93-b0fb-9ad3295e1ae5	SptGQTzlHvJhulJIWvro	f	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:03.018+00	2025-01-11 01:01:03.018+00	\N
1c450077-8711-4296-acd0-ccef8a0db781	IizYFvMZEDzRkZmrgWpH	t	fbcba461-1808-4b5d-b8a8-8e82e03ef016	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:03.018+00	2025-01-11 01:01:03.018+00	\N
\.


--
-- TOC entry 3124 (class 0 OID 24587)
-- Dependencies: 201
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: music
--

COPY public.posts (id, title, subtitle, content, "userId", "createdAt", "updatedAt") FROM stdin;
fbcba461-1808-4b5d-b8a8-8e82e03ef016	Lord Jim	Advoco nesciunt caecus tredecim cattus conatus coruscus dapifer recusandae conforto.	Cervus vacuus deserunt aufero ait ustilo aliqua.\nDelego vehemens balbus vetus attero vilis cunctatio celo.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
d6a61d3c-edde-4bbf-8b14-804e398fceba	A Passage to India	Vestrum aequitas careo versus amitto.	Cimentarius alius certus auxilium aequus desolo teneo.\nCorroboro crapula totus.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
92b86e1a-4203-4065-b695-c15dfbb130df	Dr. Zhivago	Esse totus defaeco crepusculum comminor sperno.	Animi cibus laborum taceo.\nEa vorax altus facere.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
dbfb7717-db30-4214-bfc9-b2f8c46aef91	Catch-22	Aiunt ceno celebrer carpo deorsum delibero.	Comedo textus tendo canis.\nAdsuesco praesentium bene amo creator causa acquiro defendo.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
f197ec91-9d01-4332-a331-932c2976b63e	The Picture of Dorian Gray	Debeo facere via agnosco enim asporto averto illo theatrum defendo.	Subito adulescens vigilo ventus.\nSynagoga somnus decerno neque vita tero somniculosus.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
60151385-7fd4-43c3-bdb0-7b053b7e1fa7	Go Tell It on the Mountain	Unde talio vigor temporibus ago supplanto curo talus.	Suffragium suscipit vapulus tardus vitae veritas tonsor constans.\nValens quis clibanus turpis turpis possimus.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
01b45498-3f4a-4ee6-8db5-0ca67fd0ca76	Peter Pan	Tepidus amita delinquo sum vitae tripudio damno adeo acsi.	Talio quo magni.\nAdulatio solus tepidus vitiosus triumphus suffragium fuga tolero voluptas tricesimus.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
c9d73b9e-7763-442d-ad72-a8cd287f6cbb	The Fountainhead	Vado antea cruciamentum.	Labore acquiro auxilium tremo charisma suggero conicio.\nClibanus utrimque vulnero altus umerus totidem conitor trucido caterva.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
c83db4e8-874f-462f-9682-4e515c302a47	The Hobbit	Viscus civitas corporis versus minima.	Paulatim victoria caries amoveo calcar summopere sono deficio pauper curtus.\nVinum callide tyrannus arcus.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
d1ec7e53-6fdb-43c0-ac8c-b80fb60e19cd	Of Mice and Men	Timidus statim admoneo audacia arca.	Cibo sum depulso.\nSurgo alii utor iusto traho ancilla.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
775a4802-ca33-499d-b980-0348ce83e861	The Naked and the Dead	Dedico apparatus adduco amplexus anser.	Sulum tenus turbo iure aequus auctus deserunt deleo laborum tenus.\nCaritas tertius tyrannus nihil vehemens occaecati carcer statim comprehendo dapifer.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
8638bfa5-11f6-4736-b371-5ecd1a6293c3	The War of the Worlds	Comitatus velit adfero adopto adsidue aperiam accedo vilis.	Carcer coadunatio amitto cura sub.\nAdministratio curatio adflicto.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
12f9c711-fdaa-45ee-9711-8d3d1a0c6759	In Cold Blood	Defungo usus tametsi volutabrum una ad coerceo.	Cogito tabesco vallum quasi approbo.\nCervus tamquam temperantia conspergo chirographum aveho aperio subito.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
27fa9fb3-18f7-4141-a14c-21037554098b	The Canterbury Tales	Doloribus arbitro arceo arbustum accommodo cultellus doloremque.	Somniculosus decimus amplus sub sustineo.\nCorroboro totidem admoneo.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
e4fd23af-1a81-4e50-a4b2-365cadb3975c	Paradise Lost	Accommodo carbo minima calcar arcus.	Currus atavus admoveo.\nFacere velociter agnitio quas deleniti spectaculum textor ocer ocer illo.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
f0d3e556-c0ab-4356-b06a-c7948b2c3354	If on a Winter's Night a Traveler	Aegre sed tot campana vulnero.	Bos vado ustulo alius deinde acervus thermae timor.\nComes sumo somnus.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
e5164b41-a84d-4471-a6cc-2a8037a4afcb	The Iliad	Incidunt paens demens calculus stabilis vel.	Amaritudo adeo tabella attonbitus ait.\nCaelestis complectus verus tumultus enim super officiis thermae.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
e30bdcdf-e8bb-4440-b81b-4bc3e8882eea	Tinker, Tailor, Soldier, Spy	Harum confugo commemoro voveo tantum.	Damno tabella ambulo degenero demens degenero.\nVoluptates casus urbs suasoria causa deprimo capio amissio debeo.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
a481efdf-2471-4c40-a0be-8b4176e31444	The Pillars of the Earth	Facere vomica verbum callide eum vel casus aranea totus.	Cognatus vallum statim crapula assumenda officia quasi.\nColligo ascisco porro.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
009f53d7-aaca-4338-94e6-6fe7085939da	Under the Volcano	Veniam utilis caveo vacuus paens.	Adiuvo culpa certe numquam derideo.\nVero quo deludo approbo bellum turbo canto patruus.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
d7b70e7b-a596-4e1f-a37e-4016f5029d56	Atonement	Utrimque adimpleo vomica necessitatibus animus.	Tam patrocinor vito torqueo labore exercitationem baiulus calculus canis.\nVerbera tertius peccatus.	fbcba461-1808-4b5d-b8a8-8e82e03ef016	2025-01-11 01:01:02.934+00	2025-01-11 01:01:02.934+00
\.


--
-- TOC entry 3123 (class 0 OID 24576)
-- Dependencies: 200
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: music
--

COPY public.users (id, lastname, firstname, password, email, role, pseudo, "createdAt", "updatedAt") FROM stdin;
fbcba461-1808-4b5d-b8a8-8e82e03ef016	Mills	Zechariah	fkOnhdRLA1j23EX	Drake.Gleichner30@gmail.com	user	Emily	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
5dcd7e8c-4a50-4743-849f-ef376ac5a72f	Brekke	Omer	LzZO4InWJngmOlE	Maverick_Hahn82@hotmail.com	artist	Mikel	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
e54c06e0-0a0a-4cd8-b674-f9c97c561859	Tremblay	Felicia	dUUoS0XtyT0IsTl	Richmond.Douglas-Watsica@gmail.com	artist	Queenie	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
11641578-0e92-44d9-b27e-f87826bdcffc	Kihn	Dean	sS3zHLzVnk1yLfT	Eleanora.Schiller@yahoo.com	admin	Leopoldo	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
6fefceb1-b6ee-4801-be3b-ba188023ce18	Rippin	Florine	bWN11csDl8m0fQe	Adela42@yahoo.com	user	Nico	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
d3815dac-ddbb-458a-9a86-28f4e96355f1	Terry	Elmer	djTod2zNOalUmuF	Chadd.Heathcote-Sipes@yahoo.com	user	Laron	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
d6fcf214-1798-4218-81aa-1743de43146d	Gorczany	Janessa	VOb07pUGxSpc0l2	Felipe_Reynolds57@hotmail.com	user	Berneice	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
70e1770c-fa82-48dd-b24e-b25f15dac7e9	Rippin	Edna	xJX_Y_r4ZVOhAd5	Francisca38@hotmail.com	organize	Monserrat	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
d4bf6812-d9e1-471a-a73e-bb4f92ce2e67	McDermott	Evangeline	RPYJ6SVG30TLxVd	Theodora.Stiedemann37@hotmail.com	artist	Sarai	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
a10195f2-f549-4759-aaf0-5ab4a303ff24	Treutel	Sydnee	hGzhItBX82jHT5B	Dusty.Lebsack46@yahoo.com	admin	Ignatius	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
cfda062f-3fe5-4788-8bae-b863730c7f5a	Schimmel	Isom	wP9J7Yef36uQ6Z8	Raul.Moore57@hotmail.com	user	Martine	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
1300a2fe-be52-4591-83fb-9b07c22056b9	Grimes	Ines	X8v7PQHt_tbzbrI	Cielo_Bauch85@hotmail.com	organize	Frederik	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
27e6f5bc-b185-4409-8489-0d9fd0dd89d8	Rosenbaum	Valerie	6pWUzbUmrVeec2q	Ruby.Ernser-Jones66@gmail.com	organize	Adriel	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
9264b5d2-f56b-4e90-a755-2413dced421c	Barrows	Candice	bYHZ8DCK5qnj0Zr	Berta.Goodwin57@hotmail.com	organize	Pietro	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
2aacb196-f36d-45e3-9be0-fde0c039896f	Towne	Heath	EEfKwXRBRvSo9M9	Modesto_Walker@gmail.com	admin	Amara	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
222729cc-c467-4d51-8c8e-2f24263041e8	Goyette	Fidel	MBbKoIlKhtzIXCW	Helga.Ledner3@gmail.com	organize	Lacey	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
4f52be7b-c2f9-4297-a893-67b299c269d7	Predovic	Alfredo	eaLMudCAd7B1pWc	Kavon_Jenkins@gmail.com	artist	Chance	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
81c2b606-5004-4377-be0c-aa1b1ea9b09a	Gusikowski	Reginald	2cMj7RQy05pjbrG	Yolanda32@hotmail.com	organize	Brando	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
3eb57d99-ff99-4ece-a248-0e2185a61cff	Anderson	Giovani	pmmWiv7Rhb00BRM	Brayan83@yahoo.com	user	D'angelo	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
2bbdd957-89df-48c0-ac96-a6deab861ee7	Schamberger	Gloria	dlJveR2ESWCtZU8	Sydni62@gmail.com	user	Evelyn	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
8500247a-76f5-432d-92e1-a6e52ed678b4	Tillman	Conrad	Up36ImWTAMxvvdC	Luther_Stokes@yahoo.com	artist	Vickie	2025-01-11 01:01:02.917+00	2025-01-11 01:01:02.917+00
\.


--
-- TOC entry 2971 (class 2606 OID 24769)
-- Name: ArtistProfils ArtistProfils_phone_number_key; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public."ArtistProfils"
    ADD CONSTRAINT "ArtistProfils_phone_number_key" UNIQUE (phone_number);


--
-- TOC entry 2973 (class 2606 OID 24767)
-- Name: ArtistProfils ArtistProfils_pkey; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public."ArtistProfils"
    ADD CONSTRAINT "ArtistProfils_pkey" PRIMARY KEY (id, denomination);


--
-- TOC entry 2941 (class 2606 OID 24607)
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);


--
-- TOC entry 2943 (class 2606 OID 24617)
-- Name: commentaries commentaries_pkey; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.commentaries
    ADD CONSTRAINT commentaries_pkey PRIMARY KEY (id);


--
-- TOC entry 2945 (class 2606 OID 24635)
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- TOC entry 2951 (class 2606 OID 24664)
-- Name: goodieTypes goodieTypes_name_key; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public."goodieTypes"
    ADD CONSTRAINT "goodieTypes_name_key" UNIQUE (name);


--
-- TOC entry 2953 (class 2606 OID 24662)
-- Name: goodieTypes goodieTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public."goodieTypes"
    ADD CONSTRAINT "goodieTypes_pkey" PRIMARY KEY (id);


--
-- TOC entry 2957 (class 2606 OID 24689)
-- Name: goodies goodies_name_key; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.goodies
    ADD CONSTRAINT goodies_name_key UNIQUE (name);


--
-- TOC entry 2959 (class 2606 OID 24687)
-- Name: goodies goodies_pkey; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.goodies
    ADD CONSTRAINT goodies_pkey PRIMARY KEY (id);


--
-- TOC entry 2955 (class 2606 OID 24669)
-- Name: groupUsers groupUsers_pkey; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public."groupUsers"
    ADD CONSTRAINT "groupUsers_pkey" PRIMARY KEY (id);


--
-- TOC entry 2947 (class 2606 OID 24657)
-- Name: groups groups_name_key; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_name_key UNIQUE (name);


--
-- TOC entry 2949 (class 2606 OID 24655)
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- TOC entry 2961 (class 2606 OID 24709)
-- Name: orderdetails orderdetails_pkey; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.orderdetails
    ADD CONSTRAINT orderdetails_pkey PRIMARY KEY (id);


--
-- TOC entry 2963 (class 2606 OID 24714)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 2967 (class 2606 OID 24754)
-- Name: organizerProfils organizerProfils_phone_number_key; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public."organizerProfils"
    ADD CONSTRAINT "organizerProfils_phone_number_key" UNIQUE (phone_number);


--
-- TOC entry 2969 (class 2606 OID 24752)
-- Name: organizerProfils organizerProfils_pkey; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public."organizerProfils"
    ADD CONSTRAINT "organizerProfils_pkey" PRIMARY KEY (id, denomination);


--
-- TOC entry 2965 (class 2606 OID 24729)
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- TOC entry 2939 (class 2606 OID 24594)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- TOC entry 2935 (class 2606 OID 24586)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2937 (class 2606 OID 24584)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2992 (class 2606 OID 24770)
-- Name: ArtistProfils ArtistProfils_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public."ArtistProfils"
    ADD CONSTRAINT "ArtistProfils_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2975 (class 2606 OID 24608)
-- Name: cities cities_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2976 (class 2606 OID 24618)
-- Name: commentaries commentaries_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.commentaries
    ADD CONSTRAINT "commentaries_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2977 (class 2606 OID 24623)
-- Name: commentaries commentaries_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.commentaries
    ADD CONSTRAINT "commentaries_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- TOC entry 2978 (class 2606 OID 24636)
-- Name: events events_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_city_id_fkey FOREIGN KEY (city_id) REFERENCES public.cities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2980 (class 2606 OID 24646)
-- Name: events events_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "events_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2979 (class 2606 OID 24641)
-- Name: events events_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2985 (class 2606 OID 24700)
-- Name: goodies goodies_goodieTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.goodies
    ADD CONSTRAINT "goodies_goodieTypeId_fkey" FOREIGN KEY ("goodieTypeId") REFERENCES public."goodieTypes"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2983 (class 2606 OID 24690)
-- Name: goodies goodies_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.goodies
    ADD CONSTRAINT "goodies_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2984 (class 2606 OID 24695)
-- Name: goodies goodies_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.goodies
    ADD CONSTRAINT "goodies_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2981 (class 2606 OID 24670)
-- Name: groupUsers groupUsers_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public."groupUsers"
    ADD CONSTRAINT "groupUsers_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public.groups(id);


--
-- TOC entry 2982 (class 2606 OID 24675)
-- Name: groupUsers groupUsers_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public."groupUsers"
    ADD CONSTRAINT "groupUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- TOC entry 2987 (class 2606 OID 24720)
-- Name: orders orders_orderDetailId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_orderDetailId_fkey" FOREIGN KEY ("orderDetailId") REFERENCES public.orderdetails(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2986 (class 2606 OID 24715)
-- Name: orders orders_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2991 (class 2606 OID 24755)
-- Name: organizerProfils organizerProfils_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public."organizerProfils"
    ADD CONSTRAINT "organizerProfils_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2989 (class 2606 OID 24735)
-- Name: payments payments_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT "payments_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public.events(id);


--
-- TOC entry 2990 (class 2606 OID 24740)
-- Name: payments payments_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2988 (class 2606 OID 24730)
-- Name: payments payments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- TOC entry 2974 (class 2606 OID 24595)
-- Name: posts posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: music
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2025-01-11 02:33:44 CET

--
-- PostgreSQL database dump complete
--

