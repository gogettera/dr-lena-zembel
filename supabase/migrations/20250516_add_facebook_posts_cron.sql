
-- Enable the pgcron and pg_net extensions if they're not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a cron job to fetch Facebook posts daily at 4 AM UTC
SELECT cron.schedule(
  'fetch-facebook-posts-daily',
  '0 4 * * *', -- Run at 4:00 AM every day
  $$
  SELECT net.http_post(
    url:='https://uhsswtixtrurxpsrduus.supabase.co/functions/v1/fetch-facebook-posts',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoc3N3dGl4dHJ1cnhwc3JkdXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5ODk1NzYsImV4cCI6MjA2MDU2NTU3Nn0.apQbIt-eN9U6yJeL7zPVyodecxbDFUymFtFVkQzOmsI"}'::jsonb,
    body:='{}'::jsonb
  ) AS request_id;
  $$
);
