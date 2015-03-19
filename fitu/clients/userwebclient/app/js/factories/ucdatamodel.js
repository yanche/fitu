(function () {
    angular.module('fitu')
    .factory('ucdatamodel', ['datamodel', 'validate', 'crypto', function (datamodel, validate, crypto) {
        var ModelProp = datamodel.ModelProp, ModelArrayProp = datamodel.ModelArrayProp, DataModel = datamodel.DataModel;
        
        var LoginModel = function () {
            DataModel.call(this);
            
            this.emailProp = new ModelProp(validate.email);
            this.pwdProp = new ModelProp(validate.valuedString);
            this.addProp(this.emailProp).addProp(this.pwdProp);
        };
        LoginModel.prototype = Object.create(DataModel.prototype);
        LoginModel.prototype.toLO = function () {
            return {
                email: this.emailProp.val,
                hash_pwd: crypto.sha1(this.pwdProp.val)
            };
        };
        LoginModel.prototype.init = function (data) {
            if (!data)
                DataModel.prototype.init.call();
            else {
                this.emailProp.init(data.email);
                this.pwdProp.init(data.pwd);
            }
            return this;
        };
        
        var RegisterModel = function () {
            var me = this;
            DataModel.call(me);
            
            me.emailProp = new ModelProp(validate.email);
            me.pwdProp = new ModelProp(validate.password);
            me.pwdConfirmProp = new ModelProp(function (input, optional) {
                return input == me.pwdProp.val || (optional && validate.nullOrEmpty(input));
            });
            me.nickNameProp = new ModelProp(function (input) { return validate.nickName(input, true); });
            me.phoneProp = new ModelProp(function (input) { return validate.phone(input, true); });
            me.contactProp = new ModelProp(function (input) { return validate.email(input, true); });
            me.genderProp = new ModelProp(function (input) { return validate.gender(input, true); });
            me.addProp(me.emailProp).addProp(me.pwdProp).addProp(me.pwdConfirmProp).addProp(me.nickNameProp).addProp(me.phoneProp).addProp(me.contactProp).addProp(me.genderProp);
        };
        RegisterModel.prototype = Object.create(DataModel.prototype);
        RegisterModel.prototype.toLO = function () {
            return {
                email: this.emailProp.val,
                hash_pwd: crypto.sha1(this.pwdProp.val),
                personal: {
                    contact: this.contactProp.val || this.emailProp.val,
                    phone: this.phoneProp.val,
                    nickName: this.nickNameProp.val,
                    gender: this.genderProp.val
                }
            };
        };
        RegisterModel.prototype.init = function (data) {
            if (!data)
                DataModel.prototype.init.call();
            else {
                this.emailProp.init(data.email);
                this.pwdProp.init(data.pwd);
                this.pwdConfirmProp.init(data.pwd2);
                this.nickNameProp.init(data.personal.nickName);
                this.phoneProp.init(data.personal.phone);
                this.contactProp.init(data.personal.contact);
                this.genderProp.init(data.personal.gender);
            }
            return this;
        };
        
        var UserProfileModel = function () {
            var me = this;
            DataModel.call(me);
            
            me.nickNameProp = new ModelProp(function (input) { return validate.nickName(input, true); });
            me.phoneProp = new ModelProp(function (input) { return validate.phone(input, true); });
            me.contactProp = new ModelProp(function (input, optional) { return validate.email(input, optional); });
            me.genderProp = new ModelProp(function (input) { return validate.gender(input, true); });
            me.headUrlProp = new ModelProp(function (input) { return validate.picBase64(input, true) || validate.url(input, true); });
            me.addProp(me.nickNameProp).addProp(me.phoneProp).addProp(me.contactProp).addProp(me.genderProp).addProp(me.headUrlProp);
        };
        UserProfileModel.prototype = Object.create(DataModel.prototype);
        UserProfileModel.prototype.toLO = function () {
            return {
                headUrl: this.headUrlProp.val,
                personal: {
                    contact: this.contactProp.val,
                    phone: this.phoneProp.val,
                    nickName: this.nickNameProp.val,
                    gender: this.genderProp.val
                }
            };
        };
        UserProfileModel.prototype.init = function (data) {
            if (!data)
                DataModel.prototype.init.call();
            else {
                this.nickNameProp.init(data.personal.nickName);
                this.phoneProp.init(data.personal.phone);
                this.contactProp.init(data.personal.contact);
                this.genderProp.init(data.personal.gender);
                this.headUrlProp.init(data.headUrl);
            }
            return this;
        };
        
        var UpdateLoginEmailModel = function () {
            var me = this;
            DataModel.call(me);
            
            me.emailProp = new ModelProp(validate.email);
            me.emailConfirmProp = new ModelProp(function (input, optional) {
                return input == me.emailProp.val || (optional && validate.nullOrEmpty(input));
            });
            me.pwdProp = new ModelProp(validate.valuedString);
            me.addProp(me.emailProp).addProp(me.emailConfirmProp).addProp(me.pwdProp);
        };
        UpdateLoginEmailModel.prototype = Object.create(DataModel.prototype);
        UpdateLoginEmailModel.prototype.toLO = function () {
            return {
                email: this.emailProp.val,
                confirm_hash_pwd: crypto.sha1(this.pwdProp.val)
            };
        };
        UpdateLoginEmailModel.prototype.init = function (data) {
            if (!data)
                DataModel.prototype.init.call();
            else {
                this.emailProp.init(data.email);
                this.emailConfirmProp.init(data.email2);
                this.pwdProp.init(data.pwd);
            }
            return this;
        };
        
        var UpdateLoginPWDModel = function () {
            var me = this;
            DataModel.call(me);
            
            me.oldPwdProp = new ModelProp(validate.valuedString);
            me.newPwdProp = new ModelProp(validate.password);
            me.newPwdConfirmProp = new ModelProp(function (input, optional) {
                return input == me.newPwdProp.val || (optional && validate.nullOrEmpty(input));
            });
            me.addProp(me.oldPwdProp).addProp(me.newPwdProp).addProp(me.newPwdConfirmProp);
        };
        UpdateLoginPWDModel.prototype = Object.create(DataModel.prototype);
        UpdateLoginPWDModel.prototype.toLO = function () {
            return {
                hash_pwd: crypto.sha1(this.newPwdProp.val),
                confirm_hash_pwd: crypto.sha1(this.oldPwdProp.val)
            };
        };
        UpdateLoginPWDModel.prototype.init = function (data) {
            if (!data)
                DataModel.prototype.init.call();
            else {
                this.oldPwdProp.init(data.oldPwd);
                this.newPwdProp.init(data.newPwd);
                this.newPwdConfirmProp.init(data.newPwd2);
            }
            return this;
        };
        
        var SendNoteModel = function () {
            var me = this;
            DataModel.call(me);
            
            me.subjectProp = new ModelProp(validate.valuedString);
            me.bodyProp = new ModelProp(validate.valuedString);
            me.emphasisProp = new ModelProp(validate.alwaysTrue);
            me.addProp(me.subjectProp).addProp(me.bodyProp).addProp(me.emphasisProp);
        };
        SendNoteModel.prototype = Object.create(DataModel.prototype);
        SendNoteModel.prototype.toLO = function () {
            return {
                subject: this.subjectProp.val,
                body: this.bodyProp.val,
                emphasis: Boolean(this.emphasisProp.val)
            };
        };
        SendNoteModel.prototype.init = function (data) {
            if (!data)
                DataModel.prototype.init.call();
            else {
                this.subjectProp.init(data.subject);
                this.bodyProp.init(data.body);
                this.emphasisProp.init(data.emphasis);
            }
            return this;
        };
        
        var MatrixModel = function () {
            var me = this;
            DataModel.call(me);
            
            me.nameProp = new ModelProp(validate.valuedString);
            me.introProp = new ModelProp(validate.valuedString);
            me.startsOnProp = new ModelProp(function (input, optional) {
                return (optional && validate.nullOrEmpty(input)) || (validate.datetime(input, optional) && (new Date(input).getTime() > new Date().getTime()));
            });
            me.endsOnProp = new ModelProp(function (input, optional) {
                return (optional && validate.nullOrEmpty(input)) || (validate.datetime(input, optional) && (new Date(input).getTime() > new Date(me.startsOnProp.val || '').getTime()));
            });
            me.capacityProp = new ModelProp(validate.positiveInteger);
            me.priceProp = new ModelProp(validate.nonNegFloat);
            me.picUrlProp = new ModelProp(validate.alwaysTrue);
            me.tagProp = new ModelProp(validate.alwaysTrue);
            me.addProp(me.nameProp).addProp(me.introProp).addProp(me.startsOnProp).addProp(me.endsOnProp).addProp(me.capacityProp).addProp(me.priceProp).addProp(me.picUrlProp).addProp(me.tagProp);
        };
        MatrixModel.prototype = Object.create(DataModel.prototype);
        MatrixModel.prototype.toLO = function () {
            return {
                name: this.nameProp.val,
                intro: this.introProp.val,
                startsOn: new Date(this.startsOnProp.val).getTime(),
                endsOn: new Date(this.endsOnProp.val).getTime(),
                capacity: this.capacityProp.val,
                price: this.priceProp.val,
                picUrl: this.picUrlProp.val,
                tags: [this.tagProp.val]
            };
        };
        MatrixModel.prototype.init = function (data) {
            if (!data)
                DataModel.prototype.init.call();
            else {
                this.nameProp.init(data.name);
                this.introProp.init(data.intro);
                this.startsOnProp.init(data.startsOn);
                this.endsOnProp.init(data.endsOn);
                this.capacityProp.init(data.capacity);
                this.priceProp.init(data.price);
                this.picUrlProp.init(data.picUrl);
                this.tagProp.init(data.tags[0]);
            }
            return this;
        };
            
        var MsgModel = function () {
            DataModel.call(this);
            
            this.msgProp = new ModelProp(validate.valuedString);
            this.addProp(this.msgProp);
        };
        MsgModel.prototype = Object.create(DataModel.prototype);
        MsgModel.prototype.toLO = function () {
            return {
                msg: this.msgProp.val
            };
        };
        MsgModel.prototype.init = function (data) {
            if (!data)
                DataModel.prototype.init.call();
            else
                this.msgProp.init(data.msg);
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
        
        var DiscoveryModel = function () {
            DataModel.call(this);
                
            this.nameProp = new ModelProp(validate.valuedString);
            this.introProp = new ModelProp(validate.alwaysTrue);
            this.contactProp = new ModelProp(validate.alwaysTrue);
            this.addrProp = new ModelProp(validate.valuedString);
            this.geoProp = new ModelProp(function (input, optional) {
                return (optional && validate.nullOrEmpty(input)) || (input && validate.lat(input.lat) && validate.lng(input.lng));
            });
            this.picProp = new ModelProp(function (input, optional) {
                return validate.picBase64(input, optional) || validate.url(input, optional);
            });
            this.tagsProp = new ModelProp(validate.nonEmptyArray);
            this.openStartHourProp = new ModelProp(validate.alwaysTrue);
            this.openStartMinProp = new ModelProp(validate.alwaysTrue);
            this.openEndHourProp = new ModelProp(validate.alwaysTrue);
            this.openEndMinProp = new ModelProp(validate.alwaysTrue);
            this.pricesProp = new ModelArrayProp(validate.alwaysTrue, function (item, optional) {
                return item.validate(optional);
            });
            this.transSubwayProp = new ModelProp(validate.alwaysTrue);
            this.transBusProp = new ModelProp(validate.alwaysTrue);
            this.addProp(this.nameProp).addProp(this.introProp).addProp(this.addrProp).addProp(this.geoProp).addProp(this.picProp).addProp(this.tagsProp).addProp(this.openStartHourProp).addProp(this.openStartMinProp).addProp(this.openEndHourProp).addProp(this.openEndMinProp).addProp(this.pricesProp).addProp(this.transSubwayProp).addProp(this.transBusProp);
        };
        DiscoveryModel.prototype = Object.create(DataModel.prototype);
        DiscoveryModel.prototype.toLO = function () {
            return {
                name: this.nameProp.val,
                intro: this.introProp.val,
                contact: this.contactProp.val,
                location: {
                    address: this.addrProp.val,
                    geo: this.geoProp.val
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
                this.geoProp.init(data.location.geo);
                this.picProp.init(data.picUrl);
                this.tagsProp.init(data.tags);
                this.openStartHourProp.init(data.open.startsOn.hour);
                this.openStartMinProp.init(data.open.startsOn.min);
                this.openEndHourProp.init(data.open.endsOn.hour);
                this.openEndMinProp.init(data.open.endsOn.min);
                this.pricesProp.array = data.prices.map(function (p) { return new SitePriceModel().init(p); });
                this.transSubwayProp.init(data.trans.subway);
                this.transBusProp.init(data.trans.bus);
            }
            return this;
        };
        
        return {
            LoginModel: LoginModel,
            RegisterModel: RegisterModel,
            UserProfileModel: UserProfileModel,
            UpdateLoginEmailModel: UpdateLoginEmailModel,
            UpdateLoginPWDModel: UpdateLoginPWDModel,
            SendNoteModel: SendNoteModel,
            MatrixModel: MatrixModel,
            MsgModel: MsgModel,
            SitePriceModel: SitePriceModel,
            DiscoveryModel: DiscoveryModel
        };
    }]);
})();