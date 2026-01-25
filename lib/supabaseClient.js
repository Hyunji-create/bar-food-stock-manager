import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uwzaopjkldyquyuxyvbf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3emFvcGprbGR5cXV5dXh5dmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4MDk1MzYsImV4cCI6MjA4NDM4NTUzNn0.vEtCHCliKv8ClL6nMheXV2b_5mL9t67-0TEvmy2kSPo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
