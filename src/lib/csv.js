// Tiny CSV reader (no dependency). Handles quoted fields, escaped quotes ("") and CRLF.
// Returns { columns: string[], rows: object[] } where each row maps column name -> value.
export function parseCsv(text) {
  const records = [];
  let field = '';
  let record = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i += 1; }
      else if (ch === '"') inQuotes = false;
      else field += ch;
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      record.push(field); field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i += 1;
      record.push(field); field = '';
      if (record.some((v) => v.trim() !== '')) records.push(record);
      record = [];
    } else {
      field += ch;
    }
  }
  record.push(field);
  if (record.some((v) => v.trim() !== '')) records.push(record);

  const [header = [], ...body] = records;
  const columns = header.map((c) => c.trim());
  const rows = body.map((values) =>
    Object.fromEntries(columns.map((col, idx) => [col, (values[idx] ?? '').trim()]))
  );
  return { columns, rows };
}
