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
        VendorModel.prototype.toPOJO = function () {
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
        
        var SitePriceModel = function () {
            DataModel.call(this);
            
            this.amountProp = new ModelProp(validate.nonNegFloat);
            this.freqNumProp = new ModelProp(validate.positiveFloat);
            this.freqMeasureProp = new ModelProp(validate.alwaysTrue);
            this.peopleProp = new ModelProp(validate.positiveInteger);
            this.commentsProp = new ModelProp(validate.alwaysTrue);
            this.addProp(this.amountProp).addProp(this.freqNumProp).addProp(this.freqMeasureProp).addProp(this.peopleProp).addProp(this.commentsProp);
        };
        SitePriceModel.prototype = Object.create(DataModel.prototype);
        SitePriceModel.prototype.toPOJO = function () {
            return {
                amount: this.amountProp.val,
                freq: {
                    num: this.freqNumProp.val,
                    measure: this.freqMeasureProp.val
                },
                people: this.peopleProp.val,
                comments: this.commentsProp.val
            };
        };
        SitePriceModel.prototype.init = function (data) {
            if (!data)
                DataModel.prototype.init.call();
            else {
                this.amountProp.init(data.amount);
                this.freqNumProp.init(data.freq.num);
                this.freqMeasureProp.init(data.freq.measure);
                this.peopleProp.init(data.people);
                this.commentsProp.init(data.comments);
            }
            return this;
        };
        
        var SiteModel = function () {
            DataModel.call(this);
            
            this.nameProp = new ModelProp(validate.valuedString);
            this.introProp = new ModelProp(validate.valuedString);
            this.contactProp = new ModelProp(validate.alwaysTrue);
            this.addrProp = new ModelProp(validate.valuedString);
            this.geoProp = new ModelProp(validate.alwaysTrue);
            this.picProp = new ModelProp(function (input, optional) {
                return validate.picBase64(input, optional) || validate.url(input, optional);
            });
            this.tagProp = new ModelProp(validate.alwaysTrue);
            this.openStartHourProp = new ModelProp(validate.alwaysTrue);
            this.openStartMinProp = new ModelProp(validate.alwaysTrue);
            this.openEndHourProp = new ModelProp(validate.alwaysTrue);
            this.openEndMinProp = new ModelProp(validate.alwaysTrue);
            this.pricesProp = new ModelArrayProp(function (arr) {
                return arr.length > 0;
            }, function (item, optional) {
                return item.validate(optional);
            });
            this.addProp(this.nameProp).addProp(this.introProp).addProp(this.addrProp).addProp(this.geoProp).addProp(this.picProp).addProp(this.tagProp).addProp(this.openStartHourProp).addProp(this.openStartMinProp).addProp(this.openEndHourProp).addProp(this.openEndMinProp).addProp(this.pricesProp);
        };
        SiteModel.prototype = Object.create(DataModel.prototype);
        SiteModel.prototype.toPOJO = function () {
            return {
                name: this.nameProp.val,
                intro: this.introProp.val,
                contact: this.contactProp.val,
                location: {
                    address: this.addrProp.val,
                    geo: this.geoProp.val
                },
                picUrl: this.picProp.val,
                tags: [this.tagProp.val], //TODO
                open: { startsOn: { hour: this.openStartHourProp.val, min: this.openStartMinProp.val }, endsOn: { hour: this.openEndHourProp.val, min: this.openEndMinProp.val } },
                prices: this.pricesProp.array.map(function (p) { return p.toPOJO(); })
            };
        };
        SiteModel.prototype.init = function (data) {
            if (!data)
                DataModel.prototype.init.call();
            else {
                this.nameProp.init(data.name);
                this.introProp.init(data.intro);
                this.contactProp.init(data.contact);
                this.addrProp.init(data.location.address);
                this.geoProp.init(data.location.geo);
                this.picProp.init(data.picUrl);
                this.tagProp.init(data.tags[0]);
                this.openStartHourProp.init(data.open.startsOn.hour);
                this.openStartMinProp.init(data.open.startsOn.min);
                this.openEndHourProp.init(data.open.endsOn.hour);
                this.openEndMinProp.init(data.open.endsOn.min);
                this.pricesProp.array = data.prices.map(function (p) { return new SitePriceModel().init(p); });
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
            me.tagProp = new ModelProp(validate.alwaysTrue);
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
            SitePriceModel: SitePriceModel,
            SiteIdleModel: SiteIdleModel
        };
    }]);
})();