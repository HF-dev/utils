"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const assert = require("assert");
class CtxInterpretor {
    constructor(context) {
        this.startPatern = "$ENV.";
        this.endPatern = "$$";
        this.splitPatern = ".";
        assert(context, "context is not spécified");
        this.context = context;
    }
    setEnv(varKey) {
        console.log(varKey);
        if (varKey.indexOf(".") == -1) {
            if (this.context.hasOwnProperty(varKey)) {
                return this.context[varKey];
            }
            else {
                console.log(this.context.hasOwnProperty(varKey));
                return this.startPatern + varKey + this.endPatern;
            }
        }
        else {
            let argVar = varKey.split(this.splitPatern);
            let targetContext = this.context;
            argVar.forEach((val) => {
                if (targetContext) {
                    if (_.isArray(targetContext) && parseInt(val) != NaN) {
                        targetContext = targetContext[parseInt(val)];
                    }
                    else if (targetContext.hasOwnProperty(val)) {
                        targetContext = targetContext[val];
                    }
                    else {
                        targetContext = null;
                    }
                }
            });
            if (targetContext != null) {
                return targetContext;
            }
            else {
                return this.startPatern + varKey + this.endPatern;
            }
        }
    }
    ;
    setGlobalEnv(stringKey) {
        var arr, result;
        if (stringKey.indexOf(this.startPatern) == -1) {
            return stringKey;
        }
        else {
            var envStart = stringKey.indexOf(this.startPatern);
            var envEnd;
            var startPaternLength = this.startPatern.length;
            var endPaternLength = this.endPatern.length;
            while (envStart > -1) {
                let preEnv = "";
                let postEnv = "";
                let envVar = "";
                if (envStart > 0) {
                    preEnv = stringKey.substr(0, envStart);
                }
                envEnd = stringKey.indexOf(this.endPatern, envStart);
                if (envEnd == -1) {
                    envEnd = stringKey.length;
                }
                else if (envEnd + endPaternLength < stringKey.length - 1) {
                    postEnv = stringKey.substr(envEnd + endPaternLength);
                }
                envVar = stringKey.substring(envStart + startPaternLength, envEnd);
                if (preEnv == "" && postEnv == "") {
                    stringKey = this.setEnv(envVar);
                    envStart = -1;
                }
                else {
                    stringKey = preEnv + this.setEnv(envVar) + postEnv;
                    envStart = stringKey.indexOf(this.startPatern, envStart + 1);
                }
            }
            return stringKey;
            // arr = stringKey.split("$ENV.");
            // result = "";
            // _.each(arr, (val) => {
            //   let indexOf = val.indexOf("$$") ;
            //   if(indexOf == -1){
            //     result += this.setEnv(val);
            //   }else{
            //     let value = val.substr(0 ,indexOf) ;
            //     result += this.setEnv(value) + val.substr(indexOf) ;
            //   }
            // });
            // return result;
        }
    }
    ;
    updateArrEnv(obj, clone = false) {
        let newArr = [];
        obj.map((data) => {
            if (_.isString(data)) {
                newArr.push(this.setGlobalEnv(data));
            }
            else if (_.isArray(data)) {
                newArr.push(this.updateArrEnv(data, clone));
            }
            else if (_.isObject(data)) {
                newArr.push(this.updateEnv(data, clone));
            }
            else {
                newArr.push(data);
            }
        });
        return newArr;
    }
    updateEnv(obj, clone = false) {
        if (clone) {
            obj = Object.assign({}, obj);
        }
        _.each(obj, (val, key) => {
            var arr;
            if (_.isString(val)) {
                obj[key] = this.setGlobalEnv(val);
            }
            else if (_.isArray(val)) {
                obj[key] = this.updateArrEnv(val, clone);
            }
            else if (_.isObject(val)) {
                obj[key] = this.updateEnv(val, clone);
            }
        });
        return obj;
    }
}
exports.CtxInterpretor = CtxInterpretor;
//# sourceMappingURL=CtxInterpretor.js.map