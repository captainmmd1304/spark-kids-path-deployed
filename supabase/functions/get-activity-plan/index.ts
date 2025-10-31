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

    console.log('Fetching activity plan for user:', user.id);

    // Get user's screening results to personalize recommendations
    const { data: screenings } = await supabase
      .from('screening_results')
      .select('*')
      .eq('child_id', user.id)
      .order('date', { ascending: false });

    // Get user's progress to avoid completed activities
    const { data: progress } = await supabase
      .from('progress')
      .select('activity_id, status')
      .eq('child_id', user.id)
      .eq('status', 'completed');

    const completedIds = progress?.map(p => p.activity_id) || [];

    // Get all activities
    const { data: activities, error } = await supabase
      .from('activities')
      .select('*');

    if (error) throw error;

    // Simple personalization logic based on screening results
    let recommendedActivities = activities;

    if (screenings && screenings.length > 0) {
      const latestScreening = screenings[0];
      
      // Prioritize activities based on screening type
      const categoryMap: Record<string, string> = {
        'dyslexia': 'reading',
        'adhd': 'attention',
        'anxiety': 'emotion',
      };

      const priorityCategory = categoryMap[latestScreening.type];
      
      if (priorityCategory) {
        recommendedActivities = [
          ...activities.filter(a => a.category === priorityCategory && !completedIds.includes(a.id)),
          ...activities.filter(a => a.category !== priorityCategory && !completedIds.includes(a.id)),
        ];
      }
    }

    return new Response(
      JSON.stringify({ 
        activities: recommendedActivities.slice(0, 6),
        screening_based: screenings && screenings.length > 0,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching activity plan:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});