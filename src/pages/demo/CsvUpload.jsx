import { useRef, useState } from 'react';
import { formCopy } from '../../lib/demoData.js';
import { parseCsv } from '../../lib/csv.js';
import './CsvUpload.css';

const MAX_BYTES = 1024 * 1024; // 1 MB is plenty for a demo

// Drag-and-drop or browse for a CSV. The file is read in the browser only; nothing is uploaded.
export default function CsvUpload({ file, sample, error, onFile, onError }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  function read(chosen) {
    if (!chosen) return;
    if (!/\.csv$/i.test(chosen.name)) return onError('Choose a .csv file.');
    if (chosen.size > MAX_BYTES) return onError('That file is over 1 MB. Try a smaller CSV.');
    const reader = new FileReader();
    reader.onload = () => {
      const parsed = parseCsv(String(reader.result));
      if (!parsed.rows.length) return onError('That CSV has no product rows.');
      onFile({ name: chosen.name, isSample: false, ...parsed });
    };
    reader.onerror = () => onError('Could not read that file.');
    reader.readAsText(chosen);
  }

  const preview = file?.rows?.slice(0, 3) ?? [];
  const cols = file?.columns?.slice(0, 4) ?? [];

  return (
    <div className="csv">
      <p className="csv__label" id="demo-file-label">{formCopy.labels.file}</p>
      <div
        className={`csv__drop${dragging ? ' csv__drop--active' : ''}${error ? ' csv__drop--error' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); read(e.dataTransfer.files[0]); }}
      >
        {file ? (
          <p className="csv__file">
            <span className="csv__icon" aria-hidden="true">▤</span>
            <strong>{file.name}</strong>
            <span className="csv__meta">{file.rows.length} products · {file.columns.length} columns</span>
          </p>
        ) : (
          <p className="csv__file">Loading sample file…</p>
        )}
        <div className="csv__actions">
          <button type="button" className="btn btn--ghost" onClick={() => inputRef.current?.click()}>
            {formCopy.replaceFile}
          </button>
          {file && !file.isSample && sample && (
            <button type="button" className="btn btn--ghost" onClick={() => onFile(sample)}>{formCopy.useSample}</button>
          )}
        </div>
        <input
          ref={inputRef}
          className="visually-hidden"
          type="file"
          accept=".csv,text/csv"
          aria-labelledby="demo-file-label"
          tabIndex={-1}
          onChange={(e) => { read(e.target.files[0]); e.target.value = ''; }}
        />
      </div>
      {error && <p className="csv__error" role="alert">{error}</p>}
      <p className="csv__helper">
        {formCopy.fileHelper}{' '}
        <a href={formCopy.sampleFile.url} download>{formCopy.downloadSample}</a>
      </p>

      {preview.length > 0 && (
        <div className="csv__table-wrap" tabIndex={0} role="region" aria-label={`Preview of ${file.name}`}>
          <table className="csv__table">
            <thead><tr>{cols.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
            <tbody>
              {preview.map((row, i) => (
                <tr key={i}>{cols.map((c) => <td key={c}>{row[c]}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
