(function () {
    angular.module('fitulib')
    .factory('datamodel', ['validate', function (validate) {
        var DataModel = function () {
            this._props = [];
        };
        DataModel.prototype.validate = function (optional) {
            return this._props.every(function (prop) {
                return prop.validate(optional);
            });
        };
        DataModel.prototype.addProp = function (prop) {
            this._props.push(prop);
            return this;
        };
        DataModel.prototype.init = function (prop) {
            this._props.forEach(function (prop) {
                prop.init();
            });
            return this;
        };
        
        var ModelProp = function (validator) {
            this.validator = validator;
        };
        ModelProp.prototype.validate = function (optional) {
            return this.validator(this.val, optional);
        };
        ModelProp.prototype.init = function (data) {
            this.val = data;
            return this;
        };

        return {
            ModelProp: ModelProp,
            DataModel: DataModel
        };
    }]);
})();