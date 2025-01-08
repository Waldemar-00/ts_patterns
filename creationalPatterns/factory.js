"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class TFInsurance {
    setVehicle(vehicle) {
        this.vehicle = vehicle;
    }
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('tf', {
                method: "POST",
                body: JSON.stringify({ vehicle: this.vehicle })
            });
            return response.ok;
        });
    }
}
class ABInsurance {
    setVehicle(vehicle) {
        this.vehicle = vehicle;
    }
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('ab', {
                method: "POST",
                body: JSON.stringify({ vehicle: this.vehicle })
            });
            const data = yield response.json();
            return data.isSuccess;
        });
    }
}
class AbstractInsuranceFactory //! The common data for all companies
 {
    saveHistory(instance) {
        this.DB.save(instance.id, instance.status);
    }
}
//! RESULT - FABRIC
class TFInsuranceFactory extends AbstractInsuranceFactory {
    createInsurance() {
        return new TFInsurance();
    }
}
class ABInsuranceFactory extends AbstractInsuranceFactory {
    createInsurance() {
        return new ABInsurance();
    }
}
const TFFactory = new TFInsuranceFactory(); //! You also have property name
const TFInstance = TFFactory.createInsurance();
TFFactory.saveHistory(TFInstance);
const ABFactory = new ABInsuranceFactory();
const INSURANCE = {
    TF: TFInsurance,
    AB: ABInsurance,
};
//! COMMON FACTORY one for all NOT UNIQUE
class CommonInsuranceFactory {
    returnInsurance(key) {
        return INSURANCE[key];
    }
    saveHistory(instance) {
        this.DB.save(instance.id, instance.status);
    }
}
const commonFactory = new CommonInsuranceFactory();
const TF = new (commonFactory.returnInsurance('TF'));
const AB = new (commonFactory.returnInsurance('AB'));
