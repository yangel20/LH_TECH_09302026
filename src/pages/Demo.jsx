import { useEffect, useMemo, useRef, useState } from 'react';
import {
  demoCopy, formDefaults, formCopy, competitorsCopy, knownCompetitors, defaultCompetitorNames,
  makeCompetitor, buildAnswers, monitorCopy, retestCopy, models, testDataCopy, analyzeRows,
} from '../lib/demoData.js';
import { parseCsv } from '../lib/csv.js';
import DemoStepper from './demo/DemoStepper.jsx';
import DemoNav from './demo/DemoNav.jsx';
import StartForm from './demo/StartForm.jsx';
import Competitors from './demo/Competitors.jsx';
import TestData from './demo/TestData.jsx';
import AiAnswers from './demo/AiAnswers.jsx';
import Analyze from './demo/Analyze.jsx';
import Investigate from './demo/Investigate.jsx';
import Optimize from './demo/Optimize.jsx';
import './Demo.css';

// Owner: Claude (task #5). A simulated Nexo audit for the fictional brand Niek. Nothing is sent anywhere.
const initialCompetitors = () =>
  defaultCompetitorNames.map((name) => knownCompetitors.find((c) => c.name === name));

function validateForm(form, file) {
  const errors = {};
  if (!form.company.trim()) errors.company = 'Enter a company name.';
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
  const [approved, setApproved] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [chosenIds, setChosenIds] = useState(() => models.map((m) => m.id));
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
  }, [step]);

  const chosen = useMemo(() => models.filter((m) => chosenIds.includes(m.id)), [chosenIds]);
  const before = useMemo(() => buildAnswers(competitors, chosen), [competitors, chosen]);
  const after = useMemo(() => buildAnswers(competitors, chosen, { after: true }), [competitors, chosen]);
  const current = demoCopy.steps[step];
  const key = current.key;
  const isLast = step === demoCopy.steps.length - 1;

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
    if (isLast) {
      setStep(0); setForm(formDefaults); setFile(sample); setErrors({});
      setCompetitors(initialCompetitors()); setApproved(false);
      setGenerated(false); setChosenIds(models.map((m) => m.id));
      return;
    }
    setStep((s) => s + 1);
  }

  const nextDisabled =
    (key === 'competitors' && competitors.length < competitorsCopy.min) || (key === 'optimize' && !approved);

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
                onAdd={(name, website) => setCompetitors((list) => [...list, makeCompetitor(name, website, list.length)])}
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
            {key === 'monitor' && (
              <AiAnswers answers={before} competitors={competitors} result={monitorCopy.resultBefore(chosen.length)} />
            )}
            {key === 'analyze' && <Analyze rows={analyzeRows(chosen)} />}
            {key === 'investigate' && <Investigate sample={sample} usingSample={file?.isSample} />}
            {key === 'optimize' && <Optimize approved={approved} onApprove={() => setApproved(true)} />}
            {key === 'retest' && (
              <AiAnswers answers={after} competitors={competitors} result={retestCopy.result(chosen.length)} after />
            )}

            <DemoNav
              showBack={step > 0}
              backLabel={demoCopy.back}
              nextLabel={current.next}
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
