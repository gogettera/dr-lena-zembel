
import { supabase } from '@/integrations/supabase/client';
import { AuditIssue, AuditCategory } from './types';

export async function auditAPIEndpoints(): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];

  // Check Facebook Posts API
  try {
    const { data, error } = await supabase
      .from('facebook_posts')
      .select('count')
      .limit(1);
    
    if (error || !data) {
      issues.push({
        id: 'api-facebook-posts',
        category: 'api',
        severity: 'high',
        title: 'Facebook Posts API Issue',
        description: 'Unable to fetch Facebook posts from database',
        fixSuggestion: 'Check Supabase connection and facebook_posts table'
      });
    }
  } catch (error) {
    issues.push({
      id: 'api-facebook-connection',
      category: 'api',
      severity: 'critical',
      title: 'Facebook API Connection Failed',
      description: 'Complete failure to connect to Facebook posts endpoint',
      fixSuggestion: 'Verify Supabase configuration and network connectivity'
    });
  }

  // Check Google Reviews API
  try {
    const { data, error } = await supabase
      .from('google_reviews')
      .select('count')
      .limit(1);
    
    if (error || !data) {
      issues.push({
        id: 'api-google-reviews',
        category: 'api',
        severity: 'high',
        title: 'Google Reviews API Issue',
        description: 'Unable to fetch Google reviews from database',
        fixSuggestion: 'Check Google Places API configuration and review fetch function'
      });
    }
  } catch (error) {
    issues.push({
      id: 'api-google-connection',
      category: 'api',
      severity: 'critical',
      title: 'Google Reviews API Connection Failed',
      description: 'Complete failure to connect to Google reviews endpoint',
      fixSuggestion: 'Verify Google Places API key and edge function configuration'
    });
  }

  // Check Supabase edge functions
  const edgeFunctions = ['fetch-facebook-posts', 'fetch-google-reviews'];
  
  for (const functionName of edgeFunctions) {
    try {
      // Test edge function connectivity (without actually calling them)
      const response = await fetch(`https://uhsswtixtrurxpsrduus.supabase.co/functions/v1/${functionName}`, {
        method: 'HEAD' // Use HEAD to avoid triggering the function
      });
      
      if (!response.ok && response.status !== 405) { // 405 Method Not Allowed is expected for HEAD
        issues.push({
          id: `api-edge-${functionName}`,
          category: 'api',
          severity: 'medium',
          title: `Edge Function ${functionName} Not Accessible`,
          description: `Edge function ${functionName} returned status ${response.status}`,
          fixSuggestion: 'Check edge function deployment and configuration'
        });
      }
    } catch (error) {
      issues.push({
        id: `api-edge-${functionName}-error`,
        category: 'api',
        severity: 'high',
        title: `Edge Function ${functionName} Error`,
        description: `Failed to reach edge function: ${error.message}`,
        fixSuggestion: 'Verify edge function is deployed and network is accessible'
      });
    }
  }

  return issues;
}

export async function auditDatabaseHealth(): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];

  // Check core tables
  const coreTables = [
    'clinic_info',
    'doctor_info', 
    'site_meta',
    'site_social',
    'videos'
  ];

  for (const table of coreTables) {
    try {
      const { error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        issues.push({
          id: `db-table-${table}`,
          category: 'api',
          severity: 'critical',
          title: `Database Table ${table} Error`,
          description: `Cannot access table ${table}: ${error.message}`,
          fixSuggestion: 'Check table permissions and RLS policies'
        });
      }
    } catch (error) {
      issues.push({
        id: `db-connection-${table}`,
        category: 'api',
        severity: 'critical',
        title: `Database Connection Error for ${table}`,
        description: `Failed to connect to table ${table}`,
        fixSuggestion: 'Verify Supabase connection and table existence'
      });
    }
  }

  return issues;
}
