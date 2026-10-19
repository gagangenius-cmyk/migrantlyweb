'use client';

import { useState } from 'react';
import PointsCalculator from './PointsCalculator';
import { getTool } from '@/lib/tools/registry';

const countries = [
  { key: 'canada', name: 'Canada', code: 'CA', programs: [{ slug: 'canada-pr-calculator', label: 'Federal Skilled Worker Program', note: 'Do you meet the minimum to enter Express Entry?' }, { slug: 'canada-express-entry-crs', label: 'Comprehensive Ranking System (CRS)', note: 'Your ranking in the Express Entry pool.' }, { slug: 'sinp', label: 'Saskatchewan SINP', note: 'Provincial nominee points assessment, 60 of 110 to qualify.' }, { slug: 'qswp', label: 'Quebec QSWP', note: 'Quebec skilled worker grid, where French is the highest-impact factor.' }] },
  { key: 'australia', name: 'Australia', code: 'AU', programs: [{ slug: 'australia-points-test', label: 'Skilled Migration (189/190/491)', note: 'Points test: minimum 65 to qualify.' }] },
  { key: 'uk', name: 'United Kingdom', code: 'GB', programs: [{ slug: 'uk-skilled-worker-points', label: 'Skilled Worker Visa', note: '70 points required: sponsor, skill level (RQF 6+), English and salary.' }] },
  { key: 'germany', name: 'Germany', code: 'DE', programs: [{ slug: 'germany-opportunity-card-points', label: 'Opportunity Card (Chancenkarte)', note: '6 points minimum, or full qualification recognition.' }] },
] as const;

export default function AssessmentTool() {
  const [country, setCountry] = useState<(typeof countries)[number]['key'] | null>(null);
  const [program, setProgram] = useState<string | null>(null);

  const selected = countries.find((c) => c.key === country) ?? null;
  const activeProgram = selected ? (program !== null && selected.programs.some((p) => p.slug === program) ? program : selected.programs[0]?.slug ?? null) : null;

  return (
    <div className="assess">
      <div className="assess__step">
        <p className="assess__label"><span>1</span> Select a country</p>
        <div className="assess__countries" role="group" aria-label="Select a country">
          {countries.map((item) => (
            <button
              key={item.key}
              type="button"
              data-country={item.key} className={`assess__country${item.key === country ? ' is-active' : ''}`}
              aria-pressed={item.key === country}
              onClick={() => { setCountry(item.key); setProgram(null); }}
            >
              <b>{item.code}</b>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {selected && selected.programs.length > 0 && (
        <div className="assess__step">
          <p className="assess__label"><span>2</span> Select a pathway</p>
          <div className="assess__programs" data-country={selected.key} role="group" aria-label="Choose a program">
            {selected.programs.map((item) => (
              <button key={item.slug} type="button" className={item.slug === activeProgram ? 'is-active' : undefined} aria-pressed={item.slug === activeProgram} onClick={() => setProgram(item.slug)}>
                <strong>{item.label}</strong>
                <span>{item.note}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {selected && activeProgram && getTool(activeProgram) && (
        <div className="assess__step">
          <p className="assess__label"><span>3</span> Answer a few questions and see your estimate</p>
          <PointsCalculator key={activeProgram} slug={activeProgram} />
          <p className="assess__after">
            Want an expert to check the result and your options? <a href="#consultation">Request a free consultation</a>.
          </p>
        </div>
      )}

      {selected && activeProgram && !getTool(activeProgram) && (
        <div className="assess__expert">
          <h3>{selected.programs.find((p) => p.slug === activeProgram)?.label}</h3>
          <p>We don&apos;t have an online score for this pathway yet. Its rules are specific to the province, so our team checks your profile against the current grid and tells you honestly where you stand.</p>
          <div className="assess__expert-actions">
            <a className="btn btn-dark" href="#consultation">Request a free assessment</a>
          </div>
        </div>
      )}

    </div>
  );
}
