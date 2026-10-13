'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { ExpressEntryDraw } from '@/lib/express-entry-draws';

const fmtDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

export default function DrawTable({ draws }: { draws: ExpressEntryDraw[] }) {
  const [score, setScore] = useState('');
  const mine = Number(score);
  const hasScore = score !== '' && Number.isFinite(mine) && mine > 0;

  return (
    <div className="draws">
      <div className="draws__check">
        <label htmlFor="draw-score">Your CRS score</label>
        <input id="draw-score" type="number" inputMode="numeric" min={0} max={1200} value={score} onChange={(event) => setScore(event.target.value)} placeholder="e.g. 495" />
        <small>
          Enter your score to see which recent rounds you would have met. Not sure of it? Use the <Link href="/tools/canada-express-entry-crs">CRS calculator</Link>.
        </small>
      </div>
      <div className="draws__scroll">
        <table>
          <thead>
            <tr><th>#</th><th>Date</th><th>Program</th><th>Invitations</th><th>Lowest CRS</th>{hasScore && <th>Your score</th>}</tr>
          </thead>
          <tbody>
            {draws.map((draw) => {
              const met = hasScore && mine >= draw.crs;
              return (
                <tr key={draw.number}>
                  <td>{draw.number}</td>
                  <td>{fmtDate(draw.date)}</td>
                  <td>{draw.program}</td>
                  <td>{draw.invitations.toLocaleString('en-CA')}</td>
                  <td><strong>{draw.crs}</strong></td>
                  {hasScore && <td className={met ? 'is-met' : 'is-short'}>{met ? 'Met' : `${draw.crs - mine} short`}</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
