
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_PLACES_API_KEY')
const PLACE_ID = '12553354395075677724' // User-provided Place ID

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Fetching Google Reviews for Place ID:', PLACE_ID)
    
    // Fetch place details including reviews with expanded fields
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${GOOGLE_API_KEY}`
    )

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    if (!data.result?.reviews || data.result.reviews.length === 0) {
      console.log('No reviews found in the response')
      return new Response(
        JSON.stringify({ message: 'No reviews available' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404 
        }
      )
    }

    const { supabaseClient } = await import('https://esm.sh/@supabase/supabase-js@2.39.7')
    
    const supabase = supabaseClient(
      'https://uhsswtixtrurxpsrduus.supabase.co',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log(`Found ${data.result.reviews.length} reviews`)

    // Process and store each review with improved error handling
    for (const review of data.result.reviews) {
      try {
        const { error } = await supabase
          .from('google_reviews')
          .upsert({
            id: review.time.toString(), // Using review time as unique ID
            author_name: review.author_name,
            rating: review.rating,
            text: review.text || null,
            profile_photo_url: review.profile_photo_url || null,
            relative_time_description: review.relative_time_description || null,
            review_link: review.author_url || null,
            created_at: new Date(review.time * 1000).toISOString()
          }, {
            onConflict: 'id'
          })

        if (error) {
          console.error('Error storing review:', error)
        }
      } catch (insertError) {
        console.error('Individual review insert error:', insertError)
      }
    }

    return new Response(
      JSON.stringify({ 
        message: `Successfully processed ${data.result.reviews.length} reviews`
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in fetch-google-reviews function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
