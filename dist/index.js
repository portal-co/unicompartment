import { createRaw } from '@portal-solutions/unicompartment.factory';
const key = 'Compartment';
export const UniCompartment = key in globalThis ? globalThis[key] : createRaw();
