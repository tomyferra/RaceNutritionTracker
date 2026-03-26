import React, { useState, useEffect, useMemo } from 'react';
import { Activity, Apple, List, Plus, Minus, X, Edit3, Settings, Clock, Target, Rocket, ArrowRight, Save, Trash2, Dumbbell, CalendarDays, PieChart, ShoppingCart, TrendingUp, FolderOpen, CheckCircle, Download, Upload } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DEFAULTS = [
  { id: 1, name: 'Kiro 100', type: 'solid', sz: 32, su: 'g', cho: 22, prot: 0, sod: 70, caf: 100, kcal: 88, notes: 'Con cafeína' },
  { id: 2, name: 'Kiro Sin Cafe', type: 'solid', sz: 32, su: 'g', cho: 22, prot: 0, sod: 70, caf: 0, kcal: 88, notes: 'Sin cafeína' },
  { id: 3, name: 'Fuel Sport', type: 'liquid', sz: 500, su: 'ml', cho: 80, prot: 0, sod: 188, caf: 0, kcal: 320, notes: '' },
  { id: 4, name: 'Agua', type: 'liquid', sz: 500, su: 'ml', cho: 0, prot: 0, sod: 0, caf: 0, kcal: 0, notes: '' },
  { id: 5, name: 'Nutremax Caramelo', type: 'solid', sz: 33, su: 'g', cho: 24, prot: 0, sod: 110, caf: 50, kcal: 88, notes: '' },
  { id: 6, name: 'Nutremax Triberry', type: 'solid', sz: 33, su: 'g', cho: 24, prot: 0, sod: 70, caf: 50, kcal: 88, notes: '' },
  { id: 7, name: 'Membrillo', type: 'solid', sz: 33, su: 'g', cho: 20.4, prot: 0, sod: 6, caf: 0, kcal: 75, notes: '' },
  { id: 8, name: 'Pastilla Cafeina', type: 'solid', sz: 1, su: 'ud', cho: 0, prot: 0, sod: 0, caf: 200, kcal: 0, notes: '' },
  { id: 9, name: 'Pastilla Sal', type: 'solid', sz: 1, su: 'ud', cho: 0, prot: 0, sod: 200, caf: 0, kcal: 0, notes: '' },
  { id: 10, name: 'Barrita Pont', type: 'solid', sz: 55, su: 'g', cho: 21, prot: 18, sod: 142, caf: 0, kcal: 188, notes: '' },
  { id: 11, name: 'Barrita Cliff', type: 'solid', sz: 68, su: 'g', cho: 43, prot: 10, sod: 180, caf: 0, kcal: 250, notes: '' },
];

const uid = () => Date.now() + Math.floor(Math.random() * 99999);
const fmt = (mins) => { const h = Math.floor(mins / 60), m = mins % 60; return h > 0 ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m` };
const round1 = v => Math.round(v * 10) / 10;

function IngForm({ ing, onSave, onClose }) {
  const [f, setF] = useState(ing || { name: '', type: 'solid', sz: 100, su: 'g', cho: 0, prot: 0, sod: 0, caf: 0, kcal: 0, notes: '' });
  const s = (k, v) => setF(p => ({ ...p, [k]: v }));
  const save = () => { if (!f.name.trim()) return; onSave({ ...f, id: f.id || uid() }); };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-card border border-border2 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 shadow-2xl">
        <div className="card-title flex items-center gap-2 text-amber">
          <Apple size={16} />
          {ing ? 'Editar alimento' : 'Nuevo alimento'}
        </div>

        <div className="fg mb-4">
          <label className="fl">Nombre del alimento</label>
          <input className="fi focus:ring-1 focus:ring-amber-d" value={f.name} onChange={e => s('name', e.target.value)} placeholder="Ej: Gel Maurten 100" autoFocus />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="fg">
            <label className="fl">Tipo</label>
            <select className="fs" value={f.type} onChange={e => s('type', e.target.value)}>
              <option value="solid">Sólido</option>
              <option value="liquid">Líquido</option>
            </select>
          </div>
          <div className="fg">
            <label className="fl">Tamaño de porción</label>
            <div className="flex gap-2">
              <input className="fi flex-1" type="number" min="1" value={f.sz} onChange={e => s('sz', +e.target.value)} />
              <select className="fs w-20" value={f.su} onChange={e => s('su', e.target.value)}>
                <option value="g">g</option>
                <option value="ml">ml</option>
                <option value="ud">ud</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card-title mt-2 opacity-80">Macronutrientes por porción</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {[
            { k: 'cho', l: 'Hidratos (g)' },
            { k: 'prot', l: 'Proteína (g)' },
            { k: 'sod', l: 'Sodio (mg)' },
            { k: 'caf', l: 'Cafeína (mg)' }
          ].map(({ k, l }) => (
            <div className="fg" key={k}>
              <label className="fl">{l}</label>
              <input className="fi" type="number" min="0" step="0.1" value={f[k]} onChange={e => s(k, +e.target.value)} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="fg">
            <label className="fl">Calorías (kcal)</label>
            <input className="fi" type="number" min="0" value={f.kcal} onChange={e => s('kcal', +e.target.value)} />
          </div>
          <div className="fg">
            <label className="fl">Notas</label>
            <input className="fi" value={f.notes} onChange={e => s('notes', e.target.value)} placeholder="Opcional..." />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-border">
          <button className="btn btn-o hover:bg-surface" onClick={onClose}>Cancelar</button>
          <button className="btn btn-p flex items-center gap-2" onClick={save}>
            <Save size={16} /> Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

function SetupTab({ race, setRace }) {
  const totalMins = race.hours * 60 + race.minutes;
  const totalHrs = totalMins / 60;
  const pace = totalMins > 0 && race.dist > 0 ? (totalMins / race.dist).toFixed(1) : '–';
  const totalCho = Math.round(totalHrs * race.target);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="card shadow-lg">
        <div className="card-title flex items-center gap-2 text-amber">
          <Target size={16} /> Configuración de carrera
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div className="fg">
            <label className="fl">Nombre de la carrera</label>
            <input className="fi" value={race.name} onChange={e => setRace(r => ({ ...r, name: e.target.value }))} placeholder="Patagonia Run 70K" />
          </div>
          <div className="fg">
            <label className="fl">Distancia</label>
            <div className="flex gap-2">
              <input className="fi flex-1" type="number" min="1" value={race.dist} onChange={e => setRace(r => ({ ...r, dist: +e.target.value }))} />
              <select className="fs w-20" value={race.dunit} onChange={e => setRace(r => ({ ...r, dunit: e.target.value }))}>
                <option value="km">km</option>
                <option value="mi">mi</option>
              </select>
            </div>
          </div>
        </div>

        <div className="fg mb-5">
          <label className="fl">Tiempo estimado de carrera</label>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <input className="fi w-20 text-center text-lg font-mono font-bold" type="number" min="0" max="99" value={race.hours} onChange={e => setRace(r => ({ ...r, hours: Math.max(0, +e.target.value) }))} />
              <span className="text-text2 text-sm font-medium">horas</span>
            </div>
            <div className="flex items-center gap-2">
              <input className="fi w-20 text-center text-lg font-mono font-bold" type="number" min="0" max="59" value={race.minutes} onChange={e => setRace(r => ({ ...r, minutes: Math.min(59, Math.max(0, +e.target.value)) }))} />
              <span className="text-text2 text-sm font-medium">minutos</span>
            </div>
          </div>
        </div>

        <div className="fg p-4 bg-surface border border-border rounded-lg">
          <label className="fl mb-2 text-amber text-sm font-semibold">Objetivo de hidratos por hora</label>
          <div className="flex items-center gap-4">
            <input type="range" className="flex-1 accent-amber h-1.5 bg-border rounded-full appearance-none outline-none cursor-pointer" min="30" max="120" step="5" value={race.target} onChange={e => setRace(r => ({ ...r, target: +e.target.value }))} />
            <span className="font-mono text-2xl text-amber w-24 text-right font-semibold">{race.target}g/h</span>
          </div>
          <div className="text-xs text-text3 mt-3 flex items-center gap-2 bg-bg px-3 py-2 rounded-md">
            <Activity size={14} className="text-amber" />
            <span>Principiantes: 30–45g/h · Intermedios: 60g/h · Avanzados con gut training: 90–120g/h</span>
          </div>
        </div>

        <div className="fg p-4 bg-surface border border-border rounded-lg mt-4">
          <label className="fl mb-2 text-blue-DEFAULT text-sm font-semibold">Objetivo de hidratación por hora</label>
          <div className="flex items-center gap-4">
            <input type="range" className="flex-1 accent-blue-DEFAULT h-1.5 bg-border rounded-full appearance-none outline-none cursor-pointer" min="0" max="1500" step="50" value={race.liquidTarget || 500} onChange={e => setRace(r => ({ ...r, liquidTarget: +e.target.value }))} />
            <span className="font-mono text-2xl text-blue-DEFAULT w-24 text-right font-semibold">{race.liquidTarget || 500}ml/h</span>
          </div>
          <div className="text-xs text-text3 mt-3 flex items-center gap-2 bg-bg px-3 py-2 rounded-md">
            <Activity size={14} className="text-blue-DEFAULT" />
            <span>Recomendado: 400ml–800ml por hora dependiendo de tasa de sudoración</span>
          </div>
        </div>
      </div>

      <div className="card shadow-lg bg-gradient-to-br from-card to-bg">
        <div className="card-title flex items-center gap-2 text-amber">
          <Activity size={16} /> Resumen de carrera
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-card2 border border-border2 rounded-lg p-4 text-center transition-transform hover:-translate-y-1 duration-200">
            <div className="font-mono text-2xl text-text font-bold leading-tight">{race.dist}<span className="text-sm ml-1 text-text2 font-normal">{race.dunit}</span></div>
            <div className="text-[10px] text-text3 uppercase tracking-wider mt-1">Distancia</div>
          </div>
          <div className="bg-card2 border border-border2 rounded-lg p-4 text-center transition-transform hover:-translate-y-1 duration-200">
            <div className="font-mono text-xl text-amber font-bold leading-tight mt-1">{fmt(totalMins)}</div>
            <div className="text-[10px] text-text3 uppercase tracking-wider mt-1">Tiempo</div>
          </div>
          <div className="bg-card2 border border-border2 rounded-lg p-4 text-center transition-transform hover:-translate-y-1 duration-200">
            <div className="font-mono text-xl text-text font-bold leading-tight mt-1">{pace}<span className="text-[11px] ml-1 text-text2 font-normal">min/{race.dunit}</span></div>
            <div className="text-[10px] text-text3 uppercase tracking-wider mt-1">Ritmo</div>
          </div>
          <div className="bg-card2 border border-border2 rounded-lg p-4 text-center transition-transform hover:-translate-y-1 duration-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-amber/5 opacity-50"></div>
            <div className="font-mono text-2xl text-amber font-bold leading-tight relative">{totalCho}<span className="text-sm ml-1 font-normal">g</span></div>
            <div className="text-[10px] text-text3 uppercase tracking-wider mt-1 relative text-amber">Hidratos total objetivo</div>
          </div>
          <div className="bg-card2 border border-border2 rounded-lg p-4 text-center transition-transform hover:-translate-y-1 duration-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-DEFAULT/5 opacity-50"></div>
            <div className="font-mono text-2xl text-blue-DEFAULT font-bold leading-tight relative">{Math.round((race.liquidTarget || 500) * totalHrs)}<span className="text-sm ml-1 font-normal">ml</span></div>
            <div className="text-[10px] text-text3 uppercase tracking-wider mt-1 relative text-blue-DEFAULT">Líquido total objetivo</div>
          </div>
        </div>

        {totalHrs > 0 && (
          <div className="mt-4 bg-surface p-4 border border-border rounded-lg">
            <div className="font-mono text-[10px] uppercase tracking-widest text-text2 mb-4 flex items-center gap-2">
              <Clock size={12} />
              Distribución objetivo por hora
            </div>
            <div className="flex items-end gap-2 h-24 overflow-x-auto pb-2 scrollbar-hide">
              {Array.from({ length: Math.ceil(totalHrs) }, (_, i) => {
                const frac = (i + 1 > totalHrs && totalHrs % 1 > 0) ? totalHrs % 1 : 1;
                const Hidratos = Math.round(race.target * frac);
                const hPct = (Hidratos / race.target) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 min-w-[40px] group">
                    <div className="font-mono text-xs text-text opacity-0 group-hover:opacity-100 transition-opacity absolute -mt-6 bg-card2 px-1.5 py-0.5 rounded shadow-lg">{Hidratos}g</div>
                    <div
                      className="w-full bg-gradient-to-t from-amber-d to-amber-l rounded-t-[4px] min-h-[4px] relative transition-all duration-500 hover:brightness-125"
                      style={{ height: `${Math.max(4, hPct * 0.7)}px`, opacity: frac < 1 ? 0.5 : 1 }}
                    />
                    <div className="font-mono text-[10px] text-text2 mt-1">H{i + 1}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function IngredientsTab({ ings, setIngs }) {
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);

  const save = (ing) => {
    if (editing) setIngs(l => l.map(i => i.id === ing.id ? ing : i));
    else setIngs(l => [...l, ing]);
    setShow(false); setEditing(null);
  };
  const edit = (ing) => { setEditing(ing); setShow(true); };
  const del = (id) => { if (window.confirm('¿Eliminar este alimento?')) setIngs(l => l.filter(i => i.id !== id)); };

  const solids = ings.filter(i => i.type === 'solid');
  const liquids = ings.filter(i => i.type === 'liquid');

  const IngList = ({ list }) => list.length === 0 ? null : list.map(ing => (
    <div className="flex items-center gap-4 p-3.5 bg-card2 border border-border hover:border-border2 rounded-lg mb-2.5 transition-colors group" key={ing.id}>
      <span className={`badge shrink-0 shadow-sm ${ing.type === 'solid' ? 'badge-s' : 'badge-l'}`}>{ing.type === 'solid' ? 'Sólido' : 'Líquido'}</span>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-[14px] text-text truncate">{ing.name}</div>
        <div className="text-xs text-text3 truncate mt-0.5 font-sans">
          Porción: {ing.sz}{ing.su} · {ing.kcal} kcal{ing.notes ? ` · ${ing.notes}` : ''}
        </div>
      </div>
      <div className="text-center w-12 shrink-0 bg-surface/50 rounded py-1">
        <div className="font-mono text-sm text-amber font-bold">{ing.cho}g</div>
        <div className="text-[9px] text-text3 uppercase mt-px">Hidratos</div>
      </div>
      <div className="text-center w-10 shrink-0 hidden sm:block">
        <div className="font-mono text-xs text-text2">{ing.prot}g</div>
        <div className="text-[9px] text-text3 uppercase mt-px">Prot</div>
      </div>
      <div className="text-center w-12 shrink-0 hidden md:block">
        <div className="font-mono text-xs text-text2">{ing.sod || 0}mg</div>
        <div className="text-[9px] text-text3 uppercase mt-px">Sodio</div>
      </div>
      <div className="text-center w-12 shrink-0 hidden md:block">
        <div className="font-mono text-xs text-text2">{ing.caf || 0}mg</div>
        <div className="text-[9px] text-text3 uppercase mt-px">Caf.</div>
      </div>
      <div className="flex gap-1.5 shrink-0 opacity-100 sm:opacity-50 sm:group-hover:opacity-100 transition-opacity">
        <button className="bico hover:bg-surface hover:text-amber" onClick={() => edit(ing)} title="Editar"><Edit3 size={14} /></button>
        <button className="bico hover:bg-red/10 border-transparent hover:border-red/20 hover:text-red" onClick={() => del(ing.id)} title="Eliminar"><Trash2 size={14} /></button>
      </div>
    </div>
  ));

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-center mb-5">
        <p className="text-sm text-text2">Gestiona tus fuentes de carbohidratos.</p>
        <button className="btn btn-p flex items-center gap-1.5 shadow-lg shadow-amber/20" onClick={() => { setEditing(null); setShow(true); }}>
          <Plus size={16} /> Añadir alimento
        </button>
      </div>

      <div className="card">
        <div className="card-title flex items-center gap-2">
          <Dumbbell size={16} /> Alimentos sólidos
        </div>
        {solids.length === 0 ? <div className="text-center py-10 text-text3 text-sm bg-surface/50 rounded-xl border border-dashed border-border">Sin sólidos. Añade barritas, fruta, geles densos...</div> : <IngList list={solids} />}
      </div>

      <div className="card">
        <div className="card-title flex items-center gap-2 text-blue-DEFAULT">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
          Bebidas y líquidos
        </div>
        {liquids.length === 0 ? <div className="text-center py-10 text-text3 text-sm bg-surface/50 rounded-xl border border-dashed border-border">Sin líquidos. Añade geles líquidos, isotónicas...</div> : <IngList list={liquids} />}
      </div>

      {show && <IngForm ing={editing} onSave={save} onClose={() => { setShow(false); setEditing(null); }} />}
    </div>
  );
}

function HourBlock({ idx, totalHrs, plan, setPlan, ings, target, liquidTarget }) {
  const isLast = idx + 1 >= totalHrs;
  const frac = isLast && totalHrs % 1 > 0 ? totalHrs % 1 : 1;
  const adjTarget = Math.round(target * frac);
  const adjLiquidTarget = Math.round((liquidTarget || 500) * frac);
  const events = plan[idx] || [];

  const totalCho = events.reduce((s, ev) => {
    const ing = ings.find(i => i.id === ev.ingId);
    return s + (ing ? round1(ing.cho * ev.qty) : 0);
  }, 0);

  const totalLiquid = events.reduce((s, ev) => {
    const ing = ings.find(i => i.id === ev.ingId);
    return s + (ing && ing.su === 'ml' ? round1(ing.sz * ev.qty) : 0);
  }, 0);

  const pct = adjTarget > 0 ? (totalCho / adjTarget) * 100 : 0;
  const status = totalCho < adjTarget * 0.7 ? 'low' : totalCho > adjTarget * 1.15 ? 'over' : 'ok';

  const barBg = status === 'ok' ? 'bg-green' : status === 'low' ? 'bg-amber' : 'bg-red';
  const textColor = status === 'ok' ? 'text-green' : status === 'low' ? 'text-amber' : 'text-red';

  const [selIng, setSelIng] = useState('');

  const addEv = () => {
    if (!selIng) return;
    const ing = ings.find(i => String(i.id) === String(selIng));
    if (!ing) return;
    setPlan(p => ({ ...p, [idx]: [...(p[idx] || []), { ingId: ing.id, qty: 1, _k: uid() }] }));
    setSelIng('');
  };

  const updateQty = (k, v) => setPlan(p => ({ ...p, [idx]: (p[idx] || []).map(ev => ev._k === k ? { ...ev, qty: Math.max(0.25, v) } : ev) }));
  const removeEv = (k) => setPlan(p => ({ ...p, [idx]: (p[idx] || []).filter(ev => ev._k !== k) }));

  const startM = idx * 60;
  const endM = Math.min((idx + 1) * 60, Math.round(totalHrs * 60));

  return (
    <div className="border border-border bg-card rounded-xl mb-4 overflow-hidden shadow-sm transition-all hover:border-border2 group">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 border-b border-border bg-gradient-to-r from-card to-surface">
        <div className="flex items-center gap-3 shrink-0">
          <div className="font-display text-3xl text-amber tracking-wider w-12">H{idx + 1}</div>
          <div className="text-xs text-text3 font-mono bg-bg px-2 py-1 rounded">
            {fmt(startM)} <ArrowRight size={10} className="inline opacity-50" /> {fmt(endM)}{isLast && frac < 1 ? ' ·' : ''}
          </div>
        </div>

        {/* Progress bar — flex-1 grows horizontally in flex-row, align-items:stretch gives full width in flex-col */}
        <div className="flex-1 min-w-0 h-2.5 bg-bg rounded-full overflow-hidden border border-border shadow-inner relative">
          <div
            className={`h-full rounded-full transition-[width] duration-500 ease-out ${barBg}`}
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
          {status === 'over' && (
            <div className="absolute right-0 top-0 h-full w-2 bg-red animate-pulse rounded-r-full opacity-80" />
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 justify-end shrink-0">
          <div className={`font-mono text-base font-bold text-right min-w-[100px] ${textColor}`}>
            {Math.round(totalCho)}g <span className="text-text3 text-sm font-normal">/ {adjTarget}g</span>
          </div>
          <div className={`font-mono text-base font-bold text-right min-w-[100px] ${totalLiquid >= adjLiquidTarget * 0.8 && totalLiquid <= adjLiquidTarget * 1.5 ? 'text-blue' : totalLiquid < adjLiquidTarget * 0.8 ? 'text-amber' : 'text-red'}`}>
            {Math.round(totalLiquid)}ml <span className="text-text3 text-sm font-normal">/ {adjLiquidTarget}ml</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-surface group-hover:bg-card2/30 transition-colors">
        {events.length > 0 ? (
          <div className="space-y-2 mb-4">
            {events.map(ev => {
              const ing = ings.find(i => i.id === ev.ingId);
              if (!ing) return null;
              const cho = round1(ing.cho * ev.qty);
              return (
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 p-2 bg-card rounded-lg border border-border shadow-sm animate-in zoom-in-95 duration-200" key={ev._k}>
                  <span className={`badge shrink-0 hidden sm:inline-block ${ing.type === 'solid' ? 'badge-s' : 'badge-l'}`}>{ing.type === 'solid' ? '◆' : '◉'}</span>
                  <span className="text-[13px] font-medium text-text flex-1 min-w-[120px]">{ing.name}</span>
                  <span className="text-xs text-text3 font-mono shrink-0">×{ev.qty} ({ing.sz * ev.qty}{ing.su})</span>
                  <div className="flex items-center gap-1 bg-surface p-1 rounded-md border border-border shrink-0">
                    <button className="!w-6 !h-6 !text-xs bico hover:bg-card hover:text-amber" onClick={() => updateQty(ev._k, ev.qty - 0.25)}><Minus size={12} /></button>
                    <input className="w-12 bg-transparent text-center text-sm font-mono text-text outline-none" type="number" min="0.25" step="0.25" value={ev.qty} onChange={e => updateQty(ev._k, +e.target.value)} />
                    <button className="!w-6 !h-6 !text-xs bico hover:bg-card hover:text-amber" onClick={() => updateQty(ev._k, ev.qty + 0.25)}><Plus size={12} /></button>
                  </div>
                  <div className="font-mono text-[14px] text-amber text-right w-16 shrink-0 font-bold">{cho}g</div>
                  <button className="bico !w-8 !h-8 text-text3 hover:text-red-DEFAULT hover:border-red/20 hover:bg-red/5 shrink-0" onClick={() => removeEv(ev._k)}><X size={14} /></button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-xs text-text3 text-center py-2 mb-3 border border-dashed border-border rounded-lg bg-bg/50">
            Sin consumos en esta hora. Añade algo abajo.
          </div>
        )}

        <div className="flex gap-2 items-center">
          <select className="fs flex-1 shadow-sm" value={selIng} onChange={e => setSelIng(e.target.value)}>
            <option value="">Seleccionar alimento para añadir a la hora {idx + 1}...</option>
            {ings.map(i => <option key={i.id} value={i.id}>{i.name} · {i.cho}g Hidratos / {i.sz}{i.su}</option>)}
          </select>
          <button className="btn btn-o btn-sm flex items-center gap-1 whitespace-nowrap bg-card shadow-sm hover:!bg-amber hover:!text-bg disabled:opacity-50 disabled:cursor-not-allowed" onClick={addEv} disabled={!selIng}>
            <Plus size={14} /> Añadir
          </button>
        </div>
      </div>
    </div>
  );
}

function PlanTab({ race, ings, plan, setPlan }) {
  const totalMins = race.hours * 60 + race.minutes;
  const totalHrs = totalMins / 60;
  const numBlocks = Math.ceil(totalHrs);

  const totalCho = useMemo(() =>
    Object.values(plan).flat().reduce((s, ev) => {
      const i = ings.find(x => x.id === ev.ingId);
      return s + (i ? i.cho * ev.qty : 0);
    }, 0)
    , [plan, ings]);

  const avgPerH = totalHrs > 0 ? totalCho / totalHrs : 0;
  const cov = race.target > 0 ? (avgPerH / race.target) * 100 : 0;
  const covColor = cov >= 80 && cov <= 115 ? 'text-green' : cov < 50 ? 'text-red' : 'text-amber';

  const totalKcal = useMemo(() =>
    Object.values(plan).flat().reduce((s, ev) => {
      const i = ings.find(x => x.id === ev.ingId); return s + (i ? i.kcal * ev.qty : 0);
    }, 0)
    , [plan, ings]);

  const totalSod = useMemo(() =>
    Object.values(plan).flat().reduce((s, ev) => {
      const i = ings.find(x => x.id === ev.ingId); return s + (i ? (i.sod || 0) * ev.qty : 0);
    }, 0)
    , [plan, ings]);

  const totalCaf = useMemo(() =>
    Object.values(plan).flat().reduce((s, ev) => {
      const i = ings.find(x => x.id === ev.ingId); return s + (i ? (i.caf || 0) * ev.qty : 0);
    }, 0)
    , [plan, ings]);

  const totalLiquid = useMemo(() =>
    Object.values(plan).flat().reduce((s, ev) => {
      const i = ings.find(x => x.id === ev.ingId); return s + (i && i.su === 'ml' ? i.sz * ev.qty : 0);
    }, 0)
    , [plan, ings]);

  if (ings.length === 0) return (
    <div className="text-center py-20 text-text3 flex flex-col items-center gap-4 animate-in fade-in">
      <Apple size={48} className="text-border2" />
      <p>Primero añade alimentos en la pestaña <strong className="text-amber">Alimentos</strong>.</p>
    </div>
  );

  if (totalMins === 0) return (
    <div className="text-center py-20 text-text3 flex flex-col items-center gap-4 animate-in fade-in">
      <Target size={48} className="text-border2" />
      <p>Configura el tiempo de carrera en <strong className="text-amber">Setup</strong>.</p>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="card shadow-lg bg-gradient-to-br from-card to-[#151f15]">
        <div className="card-title flex items-center gap-2 text-amber">
          <List size={16} /> Resumen del plan nutricional
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="bg-bg/50 border border-border p-4 rounded-xl text-center backdrop-blur-sm">
            <div className="font-mono text-2xl text-text font-bold">{Math.round(totalCho)}<span className="text-sm ml-1 text-text2 font-normal">g</span></div>
            <div className="text-[10px] text-text3 uppercase mt-1 tracking-wider">Hidratos planeado</div>
          </div>
          <div className="bg-bg/50 border border-border p-4 rounded-xl text-center backdrop-blur-sm">
            <div className={`font-mono text-2xl font-bold ${covColor}`}>{Math.round(avgPerH)}<span className="text-sm ml-1 font-normal opacity-70">g/h</span></div>
            <div className="text-[10px] text-text3 uppercase mt-1 tracking-wider">Promedio/hora</div>
          </div>
          <div className="bg-bg/50 border border-border p-4 rounded-xl text-center backdrop-blur-sm">
            <div className={`font-mono text-2xl font-bold ${covColor}`}>{Math.round(cov)}%</div>
            <div className="text-[10px] text-text3 uppercase mt-1 tracking-wider">Cobertura objetivo</div>
          </div>
          <div className="bg-bg/50 border border-border p-4 rounded-xl text-center backdrop-blur-sm">
            <div className="font-mono text-2xl text-text2">{Math.round(totalKcal)}</div>
            <div className="text-[10px] text-text3 uppercase mt-1 tracking-wider">kcal totales</div>
          </div>
          <div className="bg-bg/50 border border-border p-4 rounded-xl text-center backdrop-blur-sm">
            <div className="font-mono text-2xl text-text2">{Math.round(totalSod)}<span className="text-sm ml-1 text-text3 font-normal">mg</span></div>
            <div className="text-[10px] text-text3 uppercase mt-1 tracking-wider">Sodio total</div>
          </div>
          <div className="bg-bg/50 border border-border p-4 rounded-xl text-center backdrop-blur-sm">
            <div className="font-mono text-2xl text-text2">{Math.round(totalCaf)}<span className="text-sm ml-1 text-text3 font-normal">mg</span></div>
            <div className="text-[10px] text-text3 uppercase mt-1 tracking-wider">Cafeína total</div>
          </div>
          <div className="bg-bg/50 border border-border p-4 rounded-xl text-center backdrop-blur-sm">
            <div className="font-mono text-2xl text-blue">{Math.round(totalLiquid)}<span className="text-sm ml-1 text-text3 font-normal">ml</span></div>
            <div className="text-[10px] text-text3 uppercase mt-1 tracking-wider">Líquido total</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4 sticky top-0 bg-bg/95 backdrop-blur-md py-3 z-10 rounded-lg shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] border-b border-border px-2">
        <div className="font-mono text-[10px] uppercase tracking-widest text-text2 flex items-center gap-2">
          <CalendarDays size={14} className="text-amber" />
          Plan hora a hora <span className="text-text3">·</span> Objetivo <strong className="text-amber">{race.target}g/h</strong> y <strong className="text-blue">{race.liquidTarget || 500}ml/h</strong>
        </div>
        <div className="flex justify-between sm:justify-end gap-5 items-center">
          <div className="flex gap-4 text-[10px] sm:text-[11px] text-text3 font-medium tracking-wide">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-DEFAULT shadow-[0_0_6px_rgba(82,168,82,0.6)]"></span> OK</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber shadow-[0_0_6px_rgba(232,160,32,0.6)]"></span> Bajo</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-DEFAULT shadow-[0_0_6px_rgba(200,64,64,0.6)]"></span> Exceso</span>
          </div>
          <button className="text-xs text-text2 hover:text-red-DEFAULT underline decoration-red/30 underline-offset-4 transition-colors p-1" onClick={() => { if (window.confirm('¿Limpiar toda la planificación?')) setPlan({}); }}>Limpiar plan</button>
        </div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: numBlocks }, (_, i) => (
          <HourBlock key={i} idx={i} totalHrs={totalHrs} plan={plan} setPlan={setPlan} ings={ings} target={race.target} liquidTarget={race.liquidTarget} />
        ))}
      </div>
    </div>
  );
}

function SummaryTab({ race, ings, plan }) {
  const totalMins = race.hours * 60 + race.minutes;
  const totalHrs = totalMins / 60;
  const numBlocks = Math.ceil(totalHrs);

  const chartData = Array.from({ length: numBlocks }, (_, i) => {
    const isLast = i + 1 >= totalHrs;
    const frac = isLast && totalHrs % 1 > 0 ? totalHrs % 1 : 1;
    const objCho = Math.round(race.target * frac);
    const events = plan[i] || [];
    const planCho = events.reduce((s, ev) => {
      const ing = ings.find(x => x.id === ev.ingId);
      return s + (ing ? round1(ing.cho * ev.qty) : 0);
    }, 0);
    return { name: `H${i + 1}`, Objetivo: objCho, Planificado: Math.round(planCho) };
  });

  const shoppingList = useMemo(() => {
    const totals = {};
    Object.values(plan).flat().forEach(ev => {
      if (!totals[ev.ingId]) totals[ev.ingId] = 0;
      totals[ev.ingId] += ev.qty;
    });
    return Object.entries(totals)
      .map(([id, qty]) => {
        const ing = ings.find(i => String(i.id) === id);
        return ing ? { ...ing, totalQty: qty } : null;
      })
      .filter(Boolean);
  }, [plan, ings]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
      <div className="card shadow-lg bg-gradient-to-br from-card to-bg">
        <div className="card-title flex items-center gap-2 text-amber">
          <TrendingUp size={16} /> Curva de Carbohidratos (g)
        </div>
        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#263322" vertical={false} />
              <XAxis dataKey="name" stroke="#7a9274" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#7a9274" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: '#202e1d' }} contentStyle={{ backgroundColor: '#141b12', borderColor: '#3a4e35', borderRadius: '8px' }} itemStyle={{ color: '#dcdad0' }} />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', color: '#7a9274' }} />
              <Bar dataKey="Objetivo" fill="#3a4e35" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="Planificado" fill="#e8a020" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card shadow-lg bg-card">
        <div className="card-title flex items-center gap-2 text-amber">
          <ShoppingCart size={16} /> Lista de compras
        </div>
        {shoppingList.length === 0 ? (
          <div className="text-center py-8 text-text3 text-sm border border-dashed border-border rounded-xl">
            Tu plan está vacío. Añade alimentos en la pestaña "Plan" para ver qué necesitas comprar.
          </div>
        ) : (
          <div className="space-y-3">
            {shoppingList.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-surface border border-border rounded-lg group hover:border-amber-d transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-card2 border border-border2 flex flex-col items-center justify-center shrink-0 shadow-inner">
                    <span className="font-mono text-base text-amber font-bold leading-none">{Math.ceil(item.totalQty)}</span>
                    <span className="text-[8px] text-text3 uppercase mt-0.5">ud</span>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-text">{item.name} <span className="text-xs text-text3 font-normal ml-1">({item.sz}{item.su})</span></div>
                    <div className="text-[11px] text-text2 mt-1 flex flex-wrap gap-2">
                      <span className="bg-bg px-1.5 py-0.5 rounded border border-border">Total cantidad: {Math.round(item.totalQty * item.sz)}{item.su}</span>
                      <span className="bg-bg px-1.5 py-0.5 rounded border border-border">Total gasto: {Math.round(item.totalQty * 10) / 10} ud.</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const SAVES_KEY = 'tct_saves_v1';

function SaveModal({ race, ings, plan, onClose }) {
  const [name, setName] = useState(race.name || '');
  const [saves, setSaves] = useState(() => { try { return JSON.parse(localStorage.getItem(SAVES_KEY) || '[]'); } catch { return []; } });
  const [saved, setSaved] = useState(false);

  const persist = (list) => { localStorage.setItem(SAVES_KEY, JSON.stringify(list)); setSaves(list); };

  const doSave = () => {
    if (!name.trim()) return;
    const entry = { id: uid(), name: name.trim(), savedAt: new Date().toISOString(), race, ings, plan };
    persist([entry, ...saves]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const load = (entry) => {
    if (!window.confirm(`¿Cargar el plan "${entry.name}"? Se reemplazará el plan actual.`)) return;
    localStorage.setItem('tct_v4', JSON.stringify({ race: entry.race, ings: entry.ings, plan: entry.plan }));
    window.location.reload();
  };

  const del = (id) => persist(saves.filter(s => s.id !== id));

  const fmtDate = (iso) => { const d = new Date(iso); return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`; };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-card border border-border2 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div className="card-title flex items-center gap-2 text-amber">
            <Save size={16} /> Guardar plan
          </div>
          <button className="bico hover:bg-surface" onClick={onClose}><X size={14} /></button>
        </div>

        <div className="fg mb-4">
          <label className="fl">Nombre del plan</label>
          <div className="flex gap-2">
            <input className="fi flex-1 focus:ring-1 focus:ring-amber-d" value={name} onChange={e => setName(e.target.value)} placeholder="Ej: UTMB 2025 – Plan A" autoFocus onKeyDown={e => e.key === 'Enter' && doSave()} />
            <button className={`btn flex items-center gap-2 transition-all ${saved ? 'btn-o border-green-DEFAULT text-green-DEFAULT' : 'btn-p'}`} onClick={doSave}>
              {saved ? <><CheckCircle size={15} /> Guardado</> : <><Save size={15} /> Guardar</>}
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="font-mono text-[10px] uppercase tracking-widest text-text2 mb-3 flex items-center gap-2">
            <FolderOpen size={12} /> Planes guardados ({saves.length})
          </div>
          {saves.length === 0 ? (
            <div className="text-center py-8 text-text3 text-sm border border-dashed border-border rounded-xl">Aún no hay planes guardados.</div>
          ) : (
            <div className="space-y-2">
              {saves.map(s => (
                <div key={s.id} className="flex items-center gap-3 p-3 bg-surface border border-border hover:border-border2 rounded-lg transition-colors group">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[14px] text-text truncate">{s.name}</div>
                    <div className="text-[11px] text-text3 mt-0.5 font-mono">{fmtDate(s.savedAt)} · {s.race.dist}{s.race.dunit} · {s.race.hours}h{s.race.minutes > 0 ? String(s.race.minutes).padStart(2, '0') + 'm' : ''}</div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <button className="bico hover:bg-amber/10 hover:text-amber hover:border-amber-d text-xs" onClick={() => load(s)} title="Cargar">
                      <FolderOpen size={13} />
                    </button>
                    <button className="bico hover:bg-red/10 border-transparent hover:border-red/20 hover:text-red" onClick={() => del(s.id)} title="Eliminar">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState('setup');
  const [showSave, setShowSave] = useState(false);
  const [importError, setImportError] = useState('');
  const fileInputRef = React.useRef(null);
  const [race, setRace] = useState({ name: 'Patagonia Run 70K', dist: 70, dunit: 'km', hours: 14, minutes: 0, target: 60, liquidTarget: 500 });
  const [ings, setIngs] = useState(DEFAULTS);
  const [plan, setPlan] = useState({});

  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem('tct_v4') || '{}');
      if (d.race) setRace(d.race);
      if (d.ings) {
        // Migrate: if any ingredient was saved with 'Hidratos' key, convert back to 'cho'
        const migrated = d.ings.map(i => {
          if (i.Hidratos !== undefined && i.cho === undefined) {
            const { Hidratos, ...rest } = i;
            return { ...rest, cho: Hidratos };
          }
          return i;
        });
        setIngs(migrated);
      }
      if (d.plan) setPlan(d.plan);
    } catch (e) { }
  }, []);

  useEffect(() => {
    try { localStorage.setItem('tct_v4', JSON.stringify({ race, ings, plan })); } catch (e) { }
  }, [race, ings, plan]);

  const handleExport = () => {
    const data = JSON.stringify({ race, ings, plan }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(race.name || 'plan').replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const d = JSON.parse(ev.target.result);
        if (!d.race || !d.ings || !d.plan) throw new Error('Formato inválido');
        // Regenerate _k keys so add/remove/update still works after load
        const freshPlan = {};
        Object.entries(d.plan).forEach(([h, events]) => {
          freshPlan[h] = (events || []).map(ev => ({ ...ev, _k: uid() }));
        });
        // Set state directly — no reload needed, auto-save will persist it
        setRace(d.race);
        setIngs(d.ings);
        setPlan(freshPlan);
        setTab('plan');
      } catch {
        setImportError('El archivo no es válido. Asegúrate de subir un JSON exportado desde esta app.');
        setTimeout(() => setImportError(''), 4000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const totalMins = Math.max(0, race.hours * 60 + race.minutes);
  const plannedCho = useMemo(() =>
    Object.values(plan).flat().reduce((s, ev) => {
      const i = ings.find(x => x.id === ev.ingId); return s + (i ? i.cho * ev.qty : 0);
    }, 0)
    , [plan, ings]);

  const tabs = [
    { id: 'setup', lbl: 'Setup', icon: Settings },
    { id: 'ingredients', lbl: 'Alimentos', icon: Apple },
    { id: 'plan', lbl: 'Plan', icon: List },
    { id: 'summary', lbl: 'Insights', icon: PieChart }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 pb-20 pt-6">
      <header className="flex flex-col gap-4 pb-6 mb-2 border-b border-border/60">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-amber to-amber-d rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(232,160,32,0.3)] shrink-0">
              <Rocket className="text-bg w-8 h-8" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-display text-4xl sm:text-5xl text-amber tracking-wider leading-none drop-shadow-sm">TRAIL CARB TRACKER</h1>
              {showSave && <SaveModal race={race} ings={ings} plan={plan} onClose={() => setShowSave(false)} />}
              <p className="font-mono text-[11px] sm:text-xs text-text2 uppercase tracking-[3px] mt-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-DEFAULT animate-pulse"></span>
                {race.name || 'Sin título'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex gap-4 sm:gap-8 bg-card2/50 backdrop-blur-sm p-3.5 rounded-2xl border border-border2/50 self-start">
            <div className="text-right">
              <div className="font-mono text-xl sm:text-2xl text-amber font-bold leading-none">{race.dist}<span className="text-sm ml-1 text-text2 font-normal">{race.dunit}</span></div>
              <div className="text-[9px] sm:text-[10px] text-text3 uppercase mt-1.5 tracking-wider font-semibold">Distancia</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-xl sm:text-2xl text-text font-bold leading-none">{race.hours}:{String(race.minutes).padStart(2, '0')}</div>
              <div className="text-[9px] sm:text-[10px] text-text3 uppercase mt-1.5 tracking-wider font-semibold">Tiempo est.</div>
            </div>
            <div className="text-right border-l border-border2/50 pl-4 sm:pl-8">
              <div className="font-mono text-xl sm:text-2xl text-amber font-bold leading-none">{Math.round(plannedCho)}<span className="text-sm ml-1 text-text2 font-normal">g</span></div>
              <div className="text-[9px] sm:text-[10px] text-text3 uppercase mt-1.5 tracking-wider font-semibold">Hidratos Plan</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {importError && (
              <span className="text-xs text-red-DEFAULT bg-red/10 border border-red/20 px-3 py-1.5 rounded-lg w-full">{importError}</span>
            )}
            <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
            <button
              className="btn btn-o flex items-center gap-2 text-sm hover:!bg-surface"
              onClick={() => fileInputRef.current?.click()}
              title="Importar plan desde archivo JSON"
            >
              <Upload size={15} /> Importar
            </button>
            <button
              className="btn btn-o flex items-center gap-2 text-sm hover:!bg-surface"
              onClick={handleExport}
              title="Exportar plan como archivo JSON"
            >
              <Download size={15} /> Exportar
            </button>
            <button
              className="btn btn-p flex items-center gap-2 text-sm shadow-lg shadow-amber/20"
              onClick={() => setShowSave(true)}
            >
              <Save size={15} /> Guardar plan
            </button>
          </div>
        </div>
      </header>

      <div className="flex gap-1.5 bg-surface p-1.5 rounded-xl border border-border mb-8 shadow-inner overflow-x-auto scollbar-hide">
        {tabs.map(({ id, lbl, icon: Icon }) => (
          <button
            key={id}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${tab === id ? 'bg-card2 text-amber shadow-md border border-border2/80 scale-[1.02]' : 'bg-transparent text-text3 hover:text-text hover:bg-surface'}`}
            onClick={() => setTab(id)}
          >
            <Icon size={16} className={tab === id ? "text-amber" : "opacity-70"} />
            {lbl}
          </button>
        ))}
      </div>

      <main className="min-h-[500px]">
        {tab === 'setup' && <SetupTab race={race} setRace={setRace} />}
        {tab === 'ingredients' && <IngredientsTab ings={ings} setIngs={setIngs} />}
        {tab === 'plan' && <PlanTab race={race} ings={ings} plan={plan} setPlan={setPlan} />}
        {tab === 'summary' && <SummaryTab race={race} ings={ings} plan={plan} />}
      </main>
    </div>
  );
}
