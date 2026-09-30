import { formCopy, industries } from '../../lib/demoData.js';
import CsvUpload from './CsvUpload.jsx';
import './StartForm.css';

// Step 1: the brand intake form, pre-filled with the fictional brand Niek.
export default function StartForm({ form, errors, file, sample, onChange, onFile, onFileError }) {
  const field = (name, type = 'text', extra = {}) => (
    <div className="start-form__field">
      <label htmlFor={`demo-${name}`}>{formCopy.labels[name]}</label>
      <input
        id={`demo-${name}`}
        type={type}
        value={form[name]}
        onChange={(e) => onChange(name, e.target.value)}
        aria-invalid={errors[name] ? 'true' : undefined}
        aria-describedby={errors[name] ? `demo-${name}-error` : undefined}
        required
        {...extra}
      />
      {errors[name] && <p className="start-form__error" id={`demo-${name}-error`}>{errors[name]}</p>}
    </div>
  );

  return (
    <form className="start-form" noValidate onSubmit={(e) => e.preventDefault()}>
      <div className="start-form__grid">
        {field('company', 'text', { autoComplete: 'organization' })}
        {field('email', 'email', { autoComplete: 'email', inputMode: 'email' })}
        {field('website', 'url', { autoComplete: 'url', inputMode: 'url' })}
        {field('location', 'text', { autoComplete: 'address-level2' })}
        <div className="start-form__field">
          <label htmlFor="demo-industry">{formCopy.labels.industry}</label>
          <select
            id="demo-industry"
            value={form.industry}
            onChange={(e) => onChange('industry', e.target.value)}
            aria-invalid={errors.industry ? 'true' : undefined}
            required
          >
            {industries.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
          {errors.industry && <p className="start-form__error">{errors.industry}</p>}
        </div>
      </div>
      <CsvUpload file={file} sample={sample} error={errors.file} onFile={onFile} onError={onFileError} />
    </form>
  );
}
