// Model registry for the SandRA IFC viewer. AGS/MBBR are the production
// models but are 100+ MB each — too large for this static repo — so they
// stay marked unavailable until they're hosted somewhere reachable by URL.
export const SANDRA_MODELS = [
  { id: 'ark', label: 'ARK — Arkitektur', url: 'models/SANDRA_ARK.ifc', available: true },
  { id: 'rib', label: 'RIB — Bygg', url: 'models/SANDRA_RIB.ifc', available: true },
  { id: 'riv', label: 'RIV — VVS', url: 'models/SANDRA_RIV.ifc', available: true },
  { id: 'ags', label: 'AGS — Prosess', url: null, available: false },
  { id: 'mbbr', label: 'MBBR — Prosess', url: null, available: false },
];
