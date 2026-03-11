#!/bin/sh

# Replace the placeholder with the actual environment variable in the built JS files
if [ -n "$GEMINI_API_KEY" ]; then
  echo "Injecting GEMINI_API_KEY into static files..."
  find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|__GEMINI_API_KEY_PLACEHOLDER__|${GEMINI_API_KEY}|g" {} +
else
  echo "Warning: GEMINI_API_KEY environment variable is not set."
fi

