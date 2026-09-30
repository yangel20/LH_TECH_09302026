import { useEffect, useMemo, useRef, useState } from 'react';
import {
  demoCopy, formDefaults, formCopy, competitorsCopy, knownCompetitors, defaultCompetitorNames,
  makeCompetitor, models, testDataCopy, consultCopy, nextWeekdays,
} from '../lib/demoData.js';
import { parseCsv } from '../lib/csv.js';
import DemoStepper from './demo/DemoStepper.jsx';
import DemoNav from './demo/DemoNav.jsx';
import StartForm from './demo/StartForm.jsx';
import Competitors from './demo/Competitors.jsx';
import TestData from './demo/TestData.jsx';
import Dashboard from './demo/Dashboard.jsx';
import Consultation from './demo/Consultation.jsx';
import './Demo.css';

// Owner: Claude (task #5). A simulated Nexo audit for the fictional brand Niek. Nothing is sent anywhere.
const initialCompetitors = () =>
  defaultCompetitorNames.map((name) => knownCompetitors.find((c) => c.name === name));
const allModelIds = () => models.map((m) => m.id);

function validateForm(form, file) {
  const errors = {};
  if (!form.company.trim()) errors.company = 'Enter a company name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Enter a valid email, like name@company.com.';
  try {
    const url = new URL(form.website.trim());
    if (!/^https?:$/.test(url.protocol)) throw new Error();
  } catch {
    errors.website = 'Enter a full website address, like https://niek.example.';
  }
  if (!form.location.trim()) errors.location = 'Enter a location.';
  if (!form.industry) errors.industry = 'Choose an industry.';
  if (!file?.rows?.length) errors.file = 'Add a CSV file with at least one product.';
  return errors;
}

export default function Demo() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(formDefaults);
  const [errors, setErrors] = useState({});
  const [sample, setSample] = useState(null);
  const [file, setFile] = useState(null);
  const [competitors, setCompetitors] = useState(initialCompetitors);
  const [generated, setGenerated] = useState(false);
  const [chosenIds, setChosenIds] = useState(allModelIds);
  const [slots, setSlots] = useState([]);
  const [format, setFormat] = useState(consultCopy.formats[0]);
  const [notes, setNotes] = useState('');
  const [sent, setSent] = useState(false);
  const days = useMemo(() => nextWeekdays(), []);
  const headingRef = useRef(null);
  const topRef = useRef(null);
  const firstRender = useRef(true);

  // Load the sample CSV once and attach it as the default file.
  useEffect(() => {
    fetch(formCopy.sampleFile.url)
      .then((res) => res.text())
      .then((text) => {
        const parsed = { name: formCopy.sampleFile.name, isSample: true, ...parseCsv(text) };
        setSample(parsed);
        setFile((current) => current ?? parsed);
      })
      .catch(() => setErrors((e) => ({ ...e, file: 'Could not load the sample file.' })));
  }, []);

  // Move focus to the new step's heading so keyboard and screen-reader users follow along.
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    topRef.current?.scrollIntoView({ block: 'start' });
    headingRef.current?.focus({ preventScroll: true });
  }, [step, sent]);

  const chosen = useMemo(() => models.filter((m) => chosenIds.includes(m.id)), [chosenIds]);
  const current = demoCopy.steps[step];
  const key = current.key;

  function reset() {
    setStep(0); setForm(formDefaults); setFile(sample); setErrors({});
    setCompetitors(initialCompetitors()); setGenerated(false); setChosenIds(allModelIds());
    setSlots([]); setFormat(consultCopy.formats[0]); setNotes(''); setSent(false);
  }

  function next() {
    if (key === 'start') {
      const found = validateForm(form, file);
      setErrors(found);
      if (Object.keys(found).length) return;
    }
    if (key === 'testdata') {
      const msg = !generated ? testDataCopy.generateError : !chosenIds.length ? testDataCopy.modelsError : '';
      setErrors((e) => ({ ...e, testdata: msg || undefined }));
      if (msg) return;
    }
    if (key === 'consult') {
      if (sent) return reset();
      if (!slots.length) return setErrors((e) => ({ ...e, consult: consultCopy.pickError }));
      return setSent(true);
    }
    setStep((s) => s + 1);
  }

  const nextDisabled = key === 'competitors' && competitors.length < competitorsCopy.min;
  const nextLabel = key === 'consult' && sent ? consultCopy.startOver : current.next;

  return (
    <div className="demo">
      <section className="demo__header">
        <div className="container">
          <span className="badge badge--warning">{demoCopy.badge}</span>
          <h1 className="demo__title">{demoCopy.title}</h1>
          <p className="demo__intro">{demoCopy.intro}</p>
          <p className="demo__disclaimer">{demoCopy.disclaimer}</p>
        </div>
      </section>

      <section className="demo__body section" ref={topRef}>
        <div className="container">
          <DemoStepper steps={demoCopy.steps} current={step} />
          <div className="demo__panel card">
            <h2 className="demo__step-title" ref={headingRef} tabIndex={-1}>{current.title}</h2>

            {key === 'start' && (
              <StartForm
                form={form}
                errors={errors}
                file={file}
                sample={sample}
                onChange={(field, value) => setForm((f) => ({ ...f, [field]: value }))}
                onFile={(f) => { setFile(f); setErrors((e) => ({ ...e, file: undefined })); }}
                onFileError={(msg) => setErrors((e) => ({ ...e, file: msg }))}
              />
            )}
            {key === 'competitors' && (
              <Competitors
                competitors={competitors}
                onAdd={(name, website) => setCompetitors((list) => [...list, makeCompetitor(name, website)])}
                onRemove={(name) => setCompetitors((list) => list.filter((c) => c.name !== name))}
              />
            )}
            {key === 'testdata' && (
              <TestData
                productCount={sample?.rows.length ?? 0}
                competitors={competitors}
                generated={generated}
                onGenerated={() => { setGenerated(true); setErrors((e) => ({ ...e, testdata: undefined })); }}
                chosenIds={chosenIds}
                onToggleModel={(id) => {
                  setChosenIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : models.filter((m) => m.id === id || ids.includes(m.id)).map((m) => m.id)));
                  setErrors((e) => ({ ...e, testdata: undefined }));
                }}
                error={errors.testdata}
              />
            )}
            {key === 'dashboard' && <Dashboard competitors={competitors} chosen={chosen} />}
            {key === 'consult' && (
              <Consultation
                days={days}
                slots={slots}
                onToggle={(id) => {
                  setSlots((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
                  setErrors((e) => ({ ...e, consult: undefined }));
                }}
                format={format}
                onFormat={setFormat}
                notes={notes}
                onNotes={setNotes}
                sent={sent}
                email={form.email}
                error={errors.consult}
              />
            )}

            <DemoNav
              showBack={step > 0 && !sent}
              backLabel={demoCopy.back}
              nextLabel={nextLabel}
              onBack={() => setStep((s) => s - 1)}
              onNext={next}
              nextDisabled={nextDisabled}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
