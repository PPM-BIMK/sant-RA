// Model registry for the SandRA IFC viewer.
//
// ARK/RIB/RIV are structural discipline models — independently selectable.
// AGS and MBBR are the two process-model alternatives: picking one selects
// it together with all the base models and deselects the other (they're
// mutually exclusive, not stackable). Both are the production models
// (100+ MB each) — too large for this static repo — so `url` stays null
// until they're hosted somewhere reachable by URL.
export const SANDRA_MODELS = [
  { id: 'ark', label: 'ARK — Arkitektur', url: 'models/SANDRA_ARK.ifc', group: 'base' },
  { id: 'rib', label: 'RIB — Bygg', url: 'models/SANDRA_RIB.ifc', group: 'base' },
  { id: 'riv', label: 'RIV — VVS', url: 'models/SANDRA_RIV.ifc', group: 'base' },
  { id: 'ags', label: 'AGS — Prosess', url: null, group: 'process' },
  { id: 'mbbr', label: 'MBBR — Prosess', url: null, group: 'process' },
];
