const fs = require('fs');
let content = fs.readFileSync('src/pages/admin/AdminLeaderboard.tsx', 'utf8');
content = content.replace(
  "import { useState } from 'react';",
  "import React, { useState } from 'react';"
);
fs.writeFileSync('src/pages/admin/AdminLeaderboard.tsx', content);
