"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniCompartment = void 0;
const unicompartment_factory_1 = require("@portal-solutions/unicompartment.factory");
const key = 'Compartment';
exports.UniCompartment = key in globalThis ? globalThis[key] : (0, unicompartment_factory_1.createRaw)();
