// Vercel Function: GET /api/health. Also runs locally via scripts/local-api.js.
// Add more backend routes as api/<name>.js with the same (req, res) shape.
export default function handler(req, res) {
  res.status(200).json({
    app: 'nexo',
    status: 'ok',
    version: '0.1.0',
    time: new Date().toISOString(),
  });
}
