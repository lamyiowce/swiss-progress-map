export const REGIONS = {
  eastern: { label: 'Eastern', color: '#e67e22' },
  central: { label: 'Central', color: '#8e44ad' },
  northwestern: { label: 'Northwestern', color: '#2980b9' },
  zurich: { label: 'Zürich', color: '#27ae60' },
  ticino: { label: 'Ticino', color: '#c0392b' },
  lake_geneva: { label: 'Lake Geneva', color: '#16a085' },
  bern: { label: 'Bern', color: '#d4ac0d' },
};

export const CANTONS = [
  { id: 'AG', name: 'Aargau',            region: 'northwestern', capital: 'Aarau' },
  { id: 'AI', name: 'Appenzell Innerrhoden', region: 'eastern',  capital: 'Appenzell' },
  { id: 'AR', name: 'Appenzell Ausserrhoden', region: 'eastern', capital: 'Herisau' },
  { id: 'BE', name: 'Bern',              region: 'bern',         capital: 'Bern' },
  { id: 'BL', name: 'Basel-Landschaft', region: 'northwestern',  capital: 'Liestal' },
  { id: 'BS', name: 'Basel-Stadt',       region: 'northwestern', capital: 'Basel' },
  { id: 'FR', name: 'Fribourg',          region: 'lake_geneva',  capital: 'Fribourg' },
  { id: 'GE', name: 'Geneva',            region: 'lake_geneva',  capital: 'Geneva' },
  { id: 'GL', name: 'Glarus',            region: 'eastern',      capital: 'Glarus' },
  { id: 'GR', name: 'Graubünden',        region: 'eastern',      capital: 'Chur' },
  { id: 'JU', name: 'Jura',              region: 'northwestern', capital: 'Delémont' },
  { id: 'LU', name: 'Lucerne',           region: 'central',      capital: 'Lucerne' },
  { id: 'NE', name: 'Neuchâtel',         region: 'lake_geneva',  capital: 'Neuchâtel' },
  { id: 'NW', name: 'Nidwalden',         region: 'central',      capital: 'Stans' },
  { id: 'OW', name: 'Obwalden',          region: 'central',      capital: 'Sarnen' },
  { id: 'SG', name: 'St. Gallen',        region: 'eastern',      capital: 'St. Gallen' },
  { id: 'SH', name: 'Schaffhausen',      region: 'eastern',      capital: 'Schaffhausen' },
  { id: 'SO', name: 'Solothurn',         region: 'northwestern', capital: 'Solothurn' },
  { id: 'SZ', name: 'Schwyz',            region: 'central',      capital: 'Schwyz' },
  { id: 'TG', name: 'Thurgau',           region: 'eastern',      capital: 'Frauenfeld' },
  { id: 'TI', name: 'Ticino',            region: 'ticino',       capital: 'Bellinzona' },
  { id: 'UR', name: 'Uri',               region: 'central',      capital: 'Altdorf' },
  { id: 'VD', name: 'Vaud',              region: 'lake_geneva',  capital: 'Lausanne' },
  { id: 'VS', name: 'Valais',            region: 'lake_geneva',  capital: 'Sion' },
  { id: 'ZG', name: 'Zug',              region: 'central',       capital: 'Zug' },
  { id: 'ZH', name: 'Zürich',            region: 'zurich',       capital: 'Zürich' },
];

export const CANTON_MAP = Object.fromEntries(CANTONS.map(c => [c.id, c]));

export function getRegionCantons(regionKey) {
  return CANTONS.filter(c => c.region === regionKey);
}
