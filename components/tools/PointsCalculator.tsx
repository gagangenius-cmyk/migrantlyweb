'use client';

import { useMemo, useState } from 'react';
import { getTool } from '@/lib/tools/registry';
import { defaultAnswers, type Answers, type Field } from '@/lib/tools/types';

export default function PointsCalculator({ slug }: { slug: string }) {
  const tool = getTool(slug);
  const calculator = tool?.calculator;
  const [answers, setAnswers] = useState<Answers>(() => (calculator ? defaultAnswers(calculator.fields) : {}));

  const visibleFields = useMemo(() => (calculator ? calculator.fields.filter((field) => !field.showIf || field.showIf(answers)) : []), [calculator, answers]);
  const sections = useMemo(() => {
    const grouped = new Map<string, Field[]>();
    visibleFields.forEach((field) => grouped.set(field.section, [...(grouped.get(field.section) ?? []), field]));
    return Array.from(grouped.entries());
  }, [visibleFields]);
  const result = useMemo(() => (calculator ? calculator.compute(answers) : null), [calculator, answers]);

  if (!calculator || !result) return null;
  const pct = Math.min(100, (result.total / result.max) * 100);
  const thresholdPct = result.threshold ? Math.min(100, (result.threshold.value / result.max) * 100) : null;
  const reached = result.threshold ? result.total >= result.threshold.value : null;
  const groups = Array.from(new Set(result.rows.map((row) => row.group ?? '')));

  return (
    <div className="calc">
      <form className="calc__form" onSubmit={(event) => event.preventDefault()} aria-label={`${tool?.name} inputs`}>
        {sections.map(([section, fields]) => (
          <fieldset key={section} className="calc__section">
            <legend>{section}</legend>
            {fields.map((field) => (
              <div className="calc__field" key={field.id}>
                <label htmlFor={`${slug}-${field.id}`}>{field.label}</label>
                <select id={`${slug}-${field.id}`} value={answers[field.id]} onChange={(event) => setAnswers((current) => ({ ...current, [field.id]: event.target.value }))}>
                  {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                {field.help && <small>{field.help}</small>}
              </div>
            ))}
          </fieldset>
        ))}
        <button type="button" className="calc__reset" onClick={() => setAnswers(defaultAnswers(calculator.fields))}>Reset answers</button>
      </form>

      <aside className="calc__result" aria-live="polite">
        <p className="calc__label">Your estimated result</p>
        <p className="calc__total"><span>{result.total}</span> <small>{result.unit}</small></p>
        <div className="calc__bar" role="img" aria-label={`${result.total} out of ${result.max}`}>
          <i style={{ width: `${pct}%` }} />
          {thresholdPct !== null && <b style={{ left: `${thresholdPct}%` }} title={result.threshold?.label} />}
        </div>
        <p className="calc__scale"><span>0</span><span>{result.max}</span></p>
        {result.threshold && (
          <p className={`calc__verdict ${reached ? 'is-pass' : 'is-short'}`}>
            {reached ? `Meets the ${result.threshold.value}-point requirement.` : `${result.threshold.value - result.total} more point${result.threshold.value - result.total === 1 ? '' : 's'} needed to reach ${result.threshold.value}.`}
          </p>
        )}
        <div className="calc__rows">
          {groups.map((group) => (
            <div key={group}>
              {group && <h3>{group}</h3>}
              {result.rows.filter((row) => (row.group ?? '') === group).map((row) => (
                <div className="calc__row" key={`${group}-${row.label}`}>
                  <span>{row.label}</span><strong>{row.value}</strong>
                  {row.max ? <i style={{ width: `${Math.min(100, ((row.points ?? 0) / row.max) * 100)}%` }} /> : null}
                </div>
              ))}
            </div>
          ))}
        </div>
        {result.notes?.map((note) => <p className="calc__note" key={note}>{note}</p>)}
      </aside>
    </div>
  );
}
