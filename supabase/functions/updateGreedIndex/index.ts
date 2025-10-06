// Follow this setup guide to run the function:
// https://docs.supabase.com/guides/functions/quickstart

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// This is the main function that will be executed.
serve(async (req) => {
  // Create a Supabase client to interact with your database.
  // The URL and private key are automatically provided by Supabase.
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )
  
  try {
    await req.json()
  } catch (e) {
    console.log('Received an empty request body. Proceeding with the index update.')
  }

  // 1. Fetch the Greed Index weightings from the database.
  const { data: weightsData, error: weightsError } = await supabaseClient
    .from('greed_weighting')
    .select('value')

  if (weightsError || !weightsData || weightsData.length === 0) {
    console.error('Error fetching weights:', weightsError)
    return new Response(JSON.stringify({ error: 'Failed to fetch weights' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
  
  const weights = weightsData[0].value;

  // 2. Fetch the list of all companies (targets) from the database.
  const { data: targets, error: targetsError } = await supabaseClient
    .from('greed_targets')
    .select('id, name, sector')
    .eq('is_active', true)

  if (targetsError) {
    console.error('Error fetching targets:', targetsError)
    return new Response(JSON.stringify({ error: 'Failed to fetch targets' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }

  const newScores = []

  // 3. Loop through each company and calculate a score.
  for (const target of targets) {
    // Generate random scores for each factor
    const environmental_harm = Math.floor(Math.random() * 30);
    const profit_from_necessity = Math.floor(Math.random() * 25);
    const greenwashing = Math.floor(Math.random() * 15);
    const worker_exploitation = Math.floor(Math.random() * 15);
    const pay_inequality = Math.floor(Math.random() * 10);
    const resistance_to_accountability = Math.floor(Math.random() * 5);

    // Calculate the total greed score using the weights
    const greed_score =
      (environmental_harm * weights.environmental_harm) +
      (profit_from_necessity * weights.profit_from_harm) +
      (greenwashing * weights.greenwashing) +
      (worker_exploitation * weights.worker_exploitation) +
      (pay_inequality * weights.pay_inequality) +
      (resistance_to_accountability * weights.resistance_to_accountability);

    newScores.push({
      target_id: target.id,
      date: new Date().toISOString().split('T')[0],
      greed_score: Math.round(greed_score),
      profit_from_necessity: profit_from_necessity,
      exploit_ratio: worker_exploitation,
      community_harm: environmental_harm,
      responsiveness: resistance_to_accountability,
      obscurity: greenwashing,
    })
  }
  
  // 4. Save all the new scores to the greed_daily_scores table.
  const { error: upsertError } = await supabaseClient
    .from('greed_daily_scores')
    .upsert(newScores)

  if (upsertError) {
    console.error('Error saving scores:', upsertError)
    return new Response(JSON.stringify({ error: 'Failed to save scores' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }

  return new Response(JSON.stringify({ message: 'Greed Index updated successfully!' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
})