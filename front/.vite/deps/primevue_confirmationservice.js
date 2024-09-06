import {
  EventBus
} from "./chunk-7IMIA7S2.js";
import "./chunk-CUOF2D23.js";

// node_modules/primevue/confirmationeventbus/index.mjs
var ConfirmationEventBus = EventBus();

// node_modules/primevue/useconfirm/index.mjs
var PrimeVueConfirmSymbol = Symbol();

// node_modules/primevue/confirmationservice/index.mjs
var ConfirmationService = {
  install: function install(app) {
    var ConfirmationService2 = {
      require: function require2(options) {
        ConfirmationEventBus.emit("confirm", options);
      },
      close: function close() {
        ConfirmationEventBus.emit("close");
      }
    };
    app.config.globalProperties.$confirm = ConfirmationService2;
    app.provide(PrimeVueConfirmSymbol, ConfirmationService2);
  }
};
export {
  ConfirmationService as default
};
//# sourceMappingURL=primevue_confirmationservice.js.map
