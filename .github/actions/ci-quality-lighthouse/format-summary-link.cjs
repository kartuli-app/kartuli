'use strict';

const u = process.env.REPORT_URL || '';
if (!u) process.exit(0);
const esc = u.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
process.stdout.write(`<p><a href="${esc}">View Lighthouse report</a></p>\n`);
