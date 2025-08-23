#!/bin/bash

# Start Supabase MCP server for venue project
echo "Starting Venue Supabase MCP Server..."
echo "Supabase URL: https://lsftkxxilsetuqozzbyo.supabase.co"
echo "All tables use venue_ prefix"
echo ""

# Run the MCP server locally
npx @supabase/mcp-server-supabase \
  --url "https://lsftkxxilsetuqozzbyo.supabase.co" \
  --anon-key "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzZnRreHhpbHNldHVxb3p6YnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxNDg0OTUsImV4cCI6MjA2OTcyNDQ5NX0.uRBNsOZF-C1c_7Xgx5zfB0ZxARz0fWAcYZ2xP6s0XX0"