(function () {
    angular.module('fituvd')
    .factory('vcdatamodel', ['datamodel', 'validate', function (datamodel, validate) {
        var ModelProp = datamodel.ModelProp, DataModel = datamodel.DataModel;

        var VendorModel = function () {
            DataModel.call(this);
            
            this.nameProp = new ModelProp(validate.valuedString);
            this.introProp = new ModelProp(validate.valuedString);
            this.addrProp = new ModelProp(validate.valuedString);
            this.geoProp = new ModelProp(function () { return true; });
            this.logoProp = new ModelProp(function (input, optional) {
                return validate.picBase64(input, optional) || validate.url(input, optional);
            });
            this.tagProp = new ModelProp(function () { return true; });
            this.addProp(this.nameProp).addProp(this.introProp).addProp(this.addrProp).addProp(this.geoProp).addProp(this.logoProp).addProp(this.tagProp);
        };
        VendorModel.prototype = Object.create(DataModel.prototype);
        VendorModel.prototype.toPOJO = function () {
            return {
                name: this.nameProp.val,
                intro: this.introProp.val,
                location: {
                    address: this.addrProp.val,
                    geo: this.geoProp.val
                },
                logoUrl: this.logoProp.val,
                tags: [this.tagProp.val] //TODO
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
            }
            return this;
        };
        
        var SiteModel = function () {
            DataModel.call(this);
            
            this.nameProp = new ModelProp(validate.valuedString);
            this.introProp = new ModelProp(validate.valuedString);
            this.addrProp = new ModelProp(validate.valuedString);
            this.geoProp = new ModelProp(function () { return true; });
            this.picProp = new ModelProp(function (input, optional) {
                return validate.picBase64(input, optional) || validate.url(input, optional);
            });
            this.tagProp = new ModelProp(function () { return true; });
            this.addProp(this.nameProp).addProp(this.introProp).addProp(this.addrProp).addProp(this.geoProp).addProp(this.picProp).addProp(this.tagProp);
        };
        SiteModel.prototype = Object.create(DataModel.prototype);
        SiteModel.prototype.toPOJO = function () {
            return {
                name: this.nameProp.val,
                intro: this.introProp.val,
                location: {
                    address: this.addrProp.val,
                    geo: this.geoProp.val
                },
                picUrl: this.picProp.val,
                tags: [this.tagProp.val] //TODO
            };
        };
        SiteModel.prototype.init = function (data) {
            if (!data)
                DataModel.prototype.init.call();
            else {
                this.nameProp.init(data.name);
                this.introProp.init(data.intro);
                this.addrProp.init(data.location.address);
                this.geoProp.init(data.location.geo);
                this.picProp.init(data.picUrl);
                this.tagProp.init(data.tags[0]);
            }
            return this;
        };
        
        var SiteIdleModel = function () {
            var me = this;
            DataModel.call(me);
            
            me.slotsProp = new ModelProp(validate.positiveInteger);
            me.priceProp = new ModelProp(validate.nonNegFloat);
            me.startsOnProp = new ModelProp(function (input, optional) {
                var date = new Date(input);
                return (!isNaN(date.getTime()) && date.getTime() > new Date().getTime()) || (optional && validate.nullOrEmpty(input));
            });
            me.endsOnProp = new ModelProp(function (input, optional) {
                var date = new Date(input), startsOn = new Date(me.startsOnProp.val);
                if (isNaN(startsOn.getTime())) startsOn = new Date();
                return (!isNaN(date.getTime()) && date.getTime() > startsOn.getTime()) || (optional && validate.nullOrEmpty(input));
            });
            me.tagProp = new ModelProp(function () { return true; });
            me.addProp(me.slotsProp).addProp(me.priceProp).addProp(me.startsOnProp).addProp(me.endsOnProp).addProp(me.tagProp);
        };
        SiteIdleModel.prototype = Object.create(DataModel.prototype);
        SiteIdleModel.prototype.toPOJO = function () {
            return {
                slots: this.slotsProp.val,
                price: this.priceProp.val,
                startsOn: this.startsOnProp.val,
                endsOn: this.endsOnProp.val,
                tags: [this.tagProp.val]
            };
        };
        SiteIdleModel.prototype.init = function (data) {
            if (!data)
                DataModel.prototype.init.call();
            else {
                this.slotsProp.init(data.slots);
                this.priceProp.init(data.price);
                this.startsOnProp.init(data.startsOn);
                this.endsOnProp.init(data.endsOn);
                this.tagProp.init(data.tags[0]);
            }
            return this;
        };
        
        return {
            VendorModel: VendorModel,
            SiteModel: SiteModel,
            SiteIdleModel: SiteIdleModel
        };
    }]);
})();