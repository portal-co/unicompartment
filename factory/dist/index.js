import { getGlobalIntrinsics } from "ses/src/intrinsics.js";
export function createRaw({ globalThis = eval?.("this"), } = {}) {
    return class _UniCompartment {
        static #evaluatorFactory = "eval" in globalThis
            ? new Function("$", `with($){return a=>eval(a);}`)
            : ($) => {
                throw ``;
            };
        #opts;
        constructor(opts) {
            this.#opts = opts;
            const val = {
                ...(() => {
                    if ("Object" in globalThis && "freeze" in globalThis["Object"]) {
                        return getGlobalIntrinsics(globalThis, { ...console });
                    }
                    else {
                        return {};
                    }
                })(),
                ...(opts.globals ?? {}),
            };
            if ("Object" in globalThis && "freeze" in globalThis["Object"]) {
                globalThis["Object"]["freeze"](val);
            }
            this.#scope =
                "Proxy" in globalThis
                    ? new globalThis["Proxy"](val, {
                        has(target, p) {
                            return true;
                        },
                    })
                    : val;
        }
        #scope;
        get globalThis() {
            return this.#scope;
        }
        get name() {
            return (this.#opts.name ??=
                "crypto" in globalThis
                    ? globalThis.crypto.randomUUID()
                    : "Math" in globalThis
                        ? `${Math.random()}`
                        : "unnamed");
        }
        #_evaluator;
        get #evaluator() {
            return (this.#_evaluator ??= _UniCompartment.#evaluatorFactory.call(this.#scope, this.#scope));
        }
        evaluate(a, opts) {
            a = this.#opts.transforms?.reduce?.((i, f) => f(i), a) ?? a;
            return this.#evaluator(a);
        }
    };
}
