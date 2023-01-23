--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.items (
    id integer NOT NULL,
    "itemName" character varying(50) NOT NULL
);


--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- Name: lists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lists (
    id integer NOT NULL,
    "listName" character varying(50) NOT NULL,
    "userId" integer NOT NULL
);


--
-- Name: listsItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."listsItems" (
    id integer NOT NULL,
    "listId" integer NOT NULL,
    "itemId" integer NOT NULL
);


--
-- Name: listsItems_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."listsItems_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: listsItems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."listsItems_id_seq" OWNED BY public."listsItems".id;


--
-- Name: lists_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.lists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.lists_id_seq OWNED BY public.lists.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password text NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- Name: lists id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lists ALTER COLUMN id SET DEFAULT nextval('public.lists_id_seq'::regclass);


--
-- Name: listsItems id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."listsItems" ALTER COLUMN id SET DEFAULT nextval('public."listsItems_id_seq"'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.items VALUES (1, 'maçã');
INSERT INTO public.items VALUES (2, 'pêra');
INSERT INTO public.items VALUES (3, 'little t-shirt o.o');
INSERT INTO public.items VALUES (4, 'calda de caramelo');
INSERT INTO public.items VALUES (5, 'calcinha o.o');
INSERT INTO public.items VALUES (6, 'fuck');


--
-- Data for Name: lists; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.lists VALUES (1, 'feira do sábado', 16);
INSERT INTO public.lists VALUES (2, 'feira do sábado', 16);
INSERT INTO public.lists VALUES (3, 'lista do seu bento', 1);
INSERT INTO public.lists VALUES (4, 'we are heroes', 1);
INSERT INTO public.lists VALUES (5, 'la vai mais uma lista kk', 1);


--
-- Data for Name: listsItems; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."listsItems" VALUES (1, 1, 1);
INSERT INTO public."listsItems" VALUES (2, 1, 1);
INSERT INTO public."listsItems" VALUES (3, 1, 1);
INSERT INTO public."listsItems" VALUES (4, 1, 2);
INSERT INTO public."listsItems" VALUES (5, 3, 3);
INSERT INTO public."listsItems" VALUES (6, 3, 4);
INSERT INTO public."listsItems" VALUES (7, 3, 5);
INSERT INTO public."listsItems" VALUES (8, 4, 1);
INSERT INTO public."listsItems" VALUES (9, 4, 2);
INSERT INTO public."listsItems" VALUES (10, 4, 6);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (5, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3NDQ5NTI2MCwiZXhwIjoxNjc0NTEzMjYwfQ.Yytbc2Cl81BaVsL5uqAAzkOGS5KPz2SFvUNpBdYkHn4');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'iboselai da silva', 'iboselai@gmail.com', '$2b$10$SgJy5QieKpoWPlj1CeYyJ.gSMID8YksbW6IFw/W2p1tXsimLblmSG');
INSERT INTO public.users VALUES (9, 'porra', 'add@gmail.com', '$2b$10$I5/Ydjx2v/p.HdRfPH4JguLRsaAe4UTVxKvDD4QSOOGqY/IdrLIJW');
INSERT INTO public.users VALUES (15, 'test', 'test@gmail.com', '$2b$10$8ODG3TJqlBH2/K1sFEfZ7O3nukcI//aTfii0adfksyg90w56XEpe2');
INSERT INTO public.users VALUES (16, 'wtff', 'wtf@gmail.com', '$2b$10$qMpHI6H92p6mIWA5NRzOqeM2T5KP1EZ71aABzE/SmNEjXPfkEMAbC');


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.items_id_seq', 6, true);


--
-- Name: listsItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."listsItems_id_seq"', 10, true);


--
-- Name: lists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.lists_id_seq', 5, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 16, true);


--
-- Name: items items_itemName_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT "items_itemName_key" UNIQUE ("itemName");


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: listsItems listsItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."listsItems"
    ADD CONSTRAINT "listsItems_pkey" PRIMARY KEY (id);


--
-- Name: lists lists_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lists
    ADD CONSTRAINT lists_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: listsItems listsItems_itemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."listsItems"
    ADD CONSTRAINT "listsItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public.items(id);


--
-- Name: listsItems listsItems_listId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."listsItems"
    ADD CONSTRAINT "listsItems_listId_fkey" FOREIGN KEY ("listId") REFERENCES public.lists(id);


--
-- Name: lists lists_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lists
    ADD CONSTRAINT "lists_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

