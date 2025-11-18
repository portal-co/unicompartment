import type { CompartmentEvaluateOptions, CompartmentOptions } from 'ses'
import { getGlobalIntrinsics } from './node_modules/ses/src/intrinsics.js'
import {createRaw} from '@portal-solutions/unicompartment.factory'
const key = 'Compartment';
export const UniCompartment: typeof Compartment = key in globalThis ? (globalThis as any)[key] : createRaw() as any;