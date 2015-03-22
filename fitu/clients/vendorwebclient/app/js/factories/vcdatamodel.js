(function () {
    angular.module('fituvd')
    .factory('vcdatamodel', ['datamodel', 'validate', function (datamodel, validate) {
        var ModelProp = datamodel.ModelProp, ModelArrayProp = datamodel.ModelArrayProp, DataModel = datamodel.DataModel;
        
        var VendorModel = function () {
            DataModel.call(this);
            
            this.nameProp = new ModelProp(validate.valuedString);
            this.introProp = new ModelProp(validate.valuedString);
            this.addrProp = new ModelProp(validate.valuedString);
            this.geoProp = new ModelProp(validate.alwaysTrue);
            this.logoProp = new ModelProp(function (input, optional) {
                return validate.picBase64(input, optional) || validate.url(input, optional);
            });
            this.tagProp = new ModelProp(validate.alwaysTrue);
            this.contactProp = new ModelProp(validate.valuedString);
            this.addProp(this.nameProp).addProp(this.introProp).addProp(this.addrProp).addProp(this.geoProp).addProp(this.logoProp).addProp(this.tagProp).addProp(this.contactProp);
        };
        VendorModel.prototype = Object.create(DataModel.prototype);
        VendorModel.prototype.toLO = function () {
            return {
                name: this.nameProp.val,
                intro: this.introProp.val,
                location: {
                    address: this.addrProp.val,
                    geo: this.geoProp.val
                },
                logoUrl: this.logoProp.val,
                tags: [this.tagProp.val], //TODO
                contact: this.contactProp.val
            };
        };
        VendorModel.prototype.init = function (data) {
            if (!data)
                DataModel.prototype.init.call();
            else {
                this.nameProp.init(data.name);
                this.introProp.init(data.intro);
                this.addrProp.init(data.location.address);
                this.geoProp.init(data.location.geo);
                this.logoProp.init(data.logoUrl);
                this.tagProp.init(data.tags[0]);
                this.contactProp.init(data.contact);
            }
            return this;
        };
        
        return {
            VendorModel: VendorModel,
            DiscoveryModel: datamodel.DiscoveryModel,
            SitePriceModel: datamodel.SitePriceModel
        };
    }]);
})();