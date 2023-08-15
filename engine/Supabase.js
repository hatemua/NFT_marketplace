import { createClient } from "@supabase/supabase-js";
import {NEXT_PUBLIC_SUPABASE_URL ,NEXT_PUBLIC_SUPABASE_ANON_KEY } from "./configuration"
const supabaseUrl = NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);