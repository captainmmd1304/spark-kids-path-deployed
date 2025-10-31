import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { activity_id, status, score } = await req.json();

    console.log('Tracking progress:', { userId: user.id, activity_id, status, score });

    // Check if progress exists
    const { data: existing } = await supabase
      .from('progress')
      .select('*')
      .eq('child_id', user.id)
      .eq('activity_id', activity_id)
      .maybeSingle();

    let data, error;

    if (existing) {
      // Update existing progress
      ({ data, error } = await supabase
        .from('progress')
        .update({ status, score })
        .eq('id', existing.id)
        .select()
        .single());
    } else {
      // Create new progress
      ({ data, error } = await supabase
        .from('progress')
        .insert({
          child_id: user.id,
          activity_id,
          status,
          score,
        })
        .select()
        .single());
    }

    if (error) throw error;

    // Update rewards if activity completed
    if (status === 'completed' && score) {
      const { data: activity } = await supabase
        .from('activities')
        .select('reward_points')
        .eq('id', activity_id)
        .single();

      if (activity) {
        const { data: reward } = await supabase
          .from('rewards')
          .select('*')
          .eq('child_id', user.id)
          .maybeSingle();

        if (reward) {
          await supabase
            .from('rewards')
            .update({ total_points: reward.total_points + activity.reward_points })
            .eq('id', reward.id);
        } else {
          await supabase
            .from('rewards')
            .insert({
              child_id: user.id,
              total_points: activity.reward_points,
            });
        }
      }
    }

    return new Response(
      JSON.stringify({ data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error tracking progress:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});