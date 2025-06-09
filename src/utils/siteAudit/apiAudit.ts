
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

  // Check each table individually to avoid type issues
  const tableChecks = [
    { name: 'clinic_info', table: 'clinic_info' as const },
    { name: 'doctor_info', table: 'doctor_info' as const },
    { name: 'site_meta', table: 'site_meta' as const },
    { name: 'site_social', table: 'site_social' as const },
    { name: 'videos', table: 'videos' as const }
  ];

  for (const { name, table } of tableChecks) {
    try {
      const { error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        issues.push({
          id: `db-table-${name}`,
          category: 'api',
          severity: 'critical',
          title: `Database Table ${name} Error`,
          description: `Cannot access table ${name}: ${error.message}`,
          fixSuggestion: 'Check table permissions and RLS policies'
        });
      }
    } catch (error) {
      issues.push({
        id: `db-connection-${name}`,
        category: 'api',
        severity: 'critical',
        title: `Database Connection Error for ${name}`,
        description: `Failed to connect to table ${name}`,
        fixSuggestion: 'Verify Supabase connection and table existence'
      });
    }
  }

  return issues;
}
