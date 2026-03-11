#!/bin/sh

echo "Generating env-config.js..."
cat <<EOF > /usr/share/nginx/html/env-config.js
window.ENV = {
  GEMINI_API_KEY: "${GEMINI_API_KEY}"
};
EOF

echo "env-config.js generated successfully."

