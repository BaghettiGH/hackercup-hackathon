import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rwvolmzofuuclxyriigg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3dm9sbXpvZnV1Y2x4eXJpaWdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNDE5OTksImV4cCI6MjA3MDgxNzk5OX0.TTmw3sYToBv7WrlgvWidb0clpxTKEoY0wDoNnnMvMOI'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase

// from supabase documentation