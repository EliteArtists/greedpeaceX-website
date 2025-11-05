import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGIN = "https://greedpeacex.org"; // Your secure, live domain

// This function receives form data from the client, validates it, and saves it to the 'form_submissions' table.
serve(async (req) => {
  // ✅ Handle preflight requests (CORS)
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    // 1. Connect to Supabase using the service role key for full permissions (required for Edge Functions)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // 2. Parse the request body (the form data sent from the website)
    const formData = await req.json();

    // 3. Simple validation: Ensure the required 'type' and 'email' are present
    if (!formData.type || !formData.email) {
      return new Response(JSON.stringify({ error: "Missing required fields: type and email" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        },
      });
    }

    // 4. Prepare data structure for the database insertion
    const { type, email, phone, message, campaign_slug, affiliation } = formData;

    const { data, error } = await supabase
      .from("form_submissions")
      .insert([{ type, email, phone, message, campaign_slug, affiliation }])
      .select();

    if (error) {
      console.error("Supabase insert error:", error.message);
      return new Response(JSON.stringify({ error: "Database insert failed." }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        },
      });
    }

    // 5. Success response
    return new Response(JSON.stringify({ message: "Submission successful!", data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      },
    });
  } catch (error) {
    console.error("Function error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      },
    });
  }
});
