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
        
        var ModelArrayProp = function (arrayValidator, itemValidator) {
            this.arrayValidator = arrayValidator;
            this.itemValidator = itemValidator;
            this.array = [];
        };
        ModelArrayProp.prototype.validate = function (optional) {
            var me = this;
            return me.arrayValidator(me.array, optional) && me.array.every(function (item) { return me.itemValidator(item, optional); });
        };
        ModelArrayProp.prototype.init = function (data) {
            this.array = data || [];
            return this;
        };

        //shared between vendor and user client
        var DiscoveryModel = function () {
            DataModel.call(this);

            this.nameProp = new ModelProp(validate.valuedString);
            this.introProp = new ModelProp(validate.alwaysTrue);
            this.contactProp = new ModelProp(validate.alwaysTrue);
            this.addrProp = new ModelProp(validate.valuedString);
            this.geoLngProp = new ModelProp(function (input, optional) {
                return (optional && validate.nullOrEmpty(input)) || validate.lng(input);
            });
            this.geoLatProp = new ModelProp(function (input, optional) {
                return (optional && validate.nullOrEmpty(input)) || validate.lat(input);
            });
            this.picProp = new ModelProp(function (input, optional) {
                return validate.picBase64(input, optional) || validate.url(input, optional);
            });
            this.tagsProp = new ModelProp(validate.nonEmptyArray);
            //TODO: add check
            this.openStartHourProp = new ModelProp(validate.alwaysTrue);
            this.openStartMinProp = new ModelProp(validate.alwaysTrue);
            this.openEndHourProp = new ModelProp(validate.alwaysTrue);
            this.openEndMinProp = new ModelProp(validate.alwaysTrue);
            this.pricesProp = new ModelArrayProp(validate.alwaysTrue, function (item, optional) {
                return item.validate(optional);
            });
            this.transSubwayProp = new ModelProp(validate.alwaysTrue);
            this.transBusProp = new ModelProp(validate.alwaysTrue);
            this.addProp(this.nameProp).addProp(this.introProp).addProp(this.addrProp).addProp(this.geoLngProp).addProp(this.geoLatProp).addProp(this.picProp).addProp(this.tagsProp).addProp(this.openStartHourProp).addProp(this.openStartMinProp).addProp(this.openEndHourProp).addProp(this.openEndMinProp).addProp(this.pricesProp).addProp(this.transSubwayProp).addProp(this.transBusProp);
        };
        DiscoveryModel.prototype = Object.create(DataModel.prototype);
        DiscoveryModel.prototype.toLO = function () {
            return {
                name: this.nameProp.val,
                intro: this.introProp.val,
                contact: this.contactProp.val,
                location: {
                    address: this.addrProp.val,
                    geo: { lat: this.geoLatProp.val, lng: this.geoLngProp.val }
                },
                picUrl: this.picProp.val,
                tags: this.tagsProp.val, //TODO
                open: { startsOn: { hour: this.openStartHourProp.val, min: this.openStartMinProp.val }, endsOn: { hour: this.openEndHourProp.val, min: this.openEndMinProp.val } },
                prices: this.pricesProp.array.map(function (p) { return p.toLO(); }),
                trans: { subway: this.transSubwayProp.val || '', bus: this.transBusProp.val || '' }
            };
        };
        DiscoveryModel.prototype.init = function (data) {
            if (!data)
                DataModel.prototype.init.call();
            else {
                this.nameProp.init(data.name);
                this.introProp.init(data.intro);
                this.contactProp.init(data.contact);
                this.addrProp.init(data.location.address);
                this.geoLatProp.init(data.location && data.location.geo ? data.location.geo.lat : '');
                this.geoLngProp.init(data.location && data.location.geo ? data.location.geo.lng : '');
                this.picProp.init(data.picUrl);
                this.tagsProp.init(data.tags);
                this.openStartHourProp.init(data.open && data.open.startsOn ? data.open.startsOn.hour : '');
                this.openStartMinProp.init(data.open && data.open.startsOn ? data.open.startsOn.min : '');
                this.openEndHourProp.init(data.open && data.open.endsOn ? data.open.endsOn.hour : '');
                this.openEndMinProp.init(data.open && data.open.endsOn ? data.open.endsOn.min : '');
                this.pricesProp.array = data.prices.map(function (p) { return new SitePriceModel().init(p); });
                this.transSubwayProp.init(data.trans ? data.trans.subway : '');
                this.transBusProp.init(data.trans ? data.trans.bus : '');
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
        SitePriceModel.prototype.toLO = function () {
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

        return {
            ModelProp: ModelProp,
            ModelArrayProp: ModelArrayProp,
            DataModel: DataModel,
            DiscoveryModel: DiscoveryModel,
            SitePriceModel: SitePriceModel
        };
    }]);
})();