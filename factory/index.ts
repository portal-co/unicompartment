import type { CompartmentEvaluateOptions, CompartmentOptions } from "ses";
import { getGlobalIntrinsics } from "./node_modules/ses/src/intrinsics.js";
export function createRaw({
  globalThis = eval?.("this"),
}: { globalThis?: typeof self } = {}): typeof Compartment {
  return class _UniCompartment {
    static readonly #evaluatorFactory: Function =
      "eval" in globalThis
        ? new Function("$", `with($){return a=>eval(a);}`)
        : ($: any) => {
            throw ``;
          };
    #opts: CompartmentOptions;
    constructor(opts: CompartmentOptions) {
      this.#opts = opts;
      const val = {
        ...(() => {
          if ("Object" in globalThis && "freeze" in globalThis["Object"]) {
            return getGlobalIntrinsics(globalThis, { ...console });
          } else {
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
    #scope: any;
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
    #_evaluator: ((a: string) => any) | undefined;
    get #evaluator(): (a: string) => any {
      return (this.#_evaluator ??= _UniCompartment.#evaluatorFactory.call(
        this.#scope,
        this.#scope
      ));
    }
    evaluate(a: string, opts?: CompartmentEvaluateOptions): any {
      a = this.#opts.transforms?.reduce?.((i, f) => f(i), a) ?? a;
      return this.#evaluator(a);
    }
  } as any;
}
