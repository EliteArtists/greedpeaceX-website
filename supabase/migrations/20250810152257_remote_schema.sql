

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


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."greed_daily_scores" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "target_id" "uuid" DEFAULT "gen_random_uuid"(),
    "date" "date",
    "profit_from_necessity" numeric,
    "exploit_ratio" numeric,
    "community_harm" numeric,
    "responsiveness" numeric,
    "obscurity" numeric,
    "greed_score" numeric
);


ALTER TABLE "public"."greed_daily_scores" OWNER TO "postgres";


COMMENT ON TABLE "public"."greed_daily_scores" IS 'Daily aggregate scores for the Greed Index.';



CREATE TABLE IF NOT EXISTS "public"."greed_datapoints" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "target_id" "uuid" DEFAULT "gen_random_uuid"(),
    "source" "text",
    "datapoint" "jsonb",
    "captured_at" time with time zone DEFAULT "now"()
);


ALTER TABLE "public"."greed_datapoints" OWNER TO "postgres";


COMMENT ON TABLE "public"."greed_datapoints" IS 'Raw datapoints scraped or manually entered.';



CREATE TABLE IF NOT EXISTS "public"."greed_targets" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text",
    "sector" "text",
    "headquarters" "text",
    "ticker" "text",
    "is_active" boolean DEFAULT true
);


ALTER TABLE "public"."greed_targets" OWNER TO "postgres";


COMMENT ON TABLE "public"."greed_targets" IS 'Master list of companies and organisations to be ranked on the Greed Index.';



CREATE TABLE IF NOT EXISTS "public"."greed_weighting" (
    "key" "text" NOT NULL,
    "value" "jsonb"
);


ALTER TABLE "public"."greed_weighting" OWNER TO "postgres";


COMMENT ON TABLE "public"."greed_weighting" IS 'Configuration for the Greed Index algorithm''s scoring weights.';



ALTER TABLE ONLY "public"."greed_daily_scores"
    ADD CONSTRAINT "greed_daily_scores_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."greed_datapoints"
    ADD CONSTRAINT "greed_datapoints_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."greed_targets"
    ADD CONSTRAINT "greed_targets_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."greed_weighting"
    ADD CONSTRAINT "greed_weighting_pkey" PRIMARY KEY ("key");



ALTER TABLE ONLY "public"."greed_daily_scores"
    ADD CONSTRAINT "greed_daily_scores_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "public"."greed_targets"("id");



ALTER TABLE ONLY "public"."greed_datapoints"
    ADD CONSTRAINT "greed_datapoints_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "public"."greed_targets"("id");



ALTER TABLE "public"."greed_daily_scores" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."greed_datapoints" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."greed_targets" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."greed_weighting" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";








































































































































































GRANT ALL ON TABLE "public"."greed_daily_scores" TO "anon";
GRANT ALL ON TABLE "public"."greed_daily_scores" TO "authenticated";
GRANT ALL ON TABLE "public"."greed_daily_scores" TO "service_role";



GRANT ALL ON TABLE "public"."greed_datapoints" TO "anon";
GRANT ALL ON TABLE "public"."greed_datapoints" TO "authenticated";
GRANT ALL ON TABLE "public"."greed_datapoints" TO "service_role";



GRANT ALL ON TABLE "public"."greed_targets" TO "anon";
GRANT ALL ON TABLE "public"."greed_targets" TO "authenticated";
GRANT ALL ON TABLE "public"."greed_targets" TO "service_role";



GRANT ALL ON TABLE "public"."greed_weighting" TO "anon";
GRANT ALL ON TABLE "public"."greed_weighting" TO "authenticated";
GRANT ALL ON TABLE "public"."greed_weighting" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






























RESET ALL;
