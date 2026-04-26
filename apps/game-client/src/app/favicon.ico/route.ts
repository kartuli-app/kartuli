export function GET() {
  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="16" fill="#0f172a" />
      <text
        x="50%"
        y="54%"
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="34"
        font-family="Arial, sans-serif"
        fill="#f8fafc"
      >
        კ
      </text>
    </svg>`,
    {
      status: 200,
      headers: {
        'cache-control': 'public, max-age=86400',
        'content-type': 'image/svg+xml',
      },
    },
  );
}
