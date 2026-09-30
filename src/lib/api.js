// Tiny fetch wrapper for our /api routes. Use this from components; don't call fetch directly.
// Today there's only /api/health. When the CRM is added later, add its calls here.
async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(`/api/${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed: ${res.status}`);
  return data;
}

export const api = {
  health: () => request('health'),
};
