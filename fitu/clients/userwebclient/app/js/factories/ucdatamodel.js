(function () {
    angular.module('fitu')
    .factory('ucdatamodel', ['datamodel', 'validate', 'crypto', function (datamodel, validate, crypto) {
        var ModelProp = datamodel.ModelProp, DataModel = datamodel.DataModel;

        var LoginModel = function () {
            DataModel.call(this);
            
            this.emailProp = new ModelProp(validate.valuedString);
            this.pwdProp = new ModelProp(validate.valuedString);
            this.addProp(this.emailProp).addProp(this.pwdProp);
        };
        LoginModel.prototype = Object.create(DataModel.prototype);
        LoginModel.prototype.toPOJO = function () {
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
        RegisterModel.prototype.toPOJO = function () {
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
        UserProfileModel.prototype.toPOJO = function () {
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
        UpdateLoginEmailModel.prototype.toPOJO = function () {
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
        UpdateLoginPWDModel.prototype.toPOJO = function () {
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
            me.contentProp = new ModelProp(validate.valuedString);
            me.emphasisProp = new ModelProp(function () { return true; });
            me.addProp(me.subjectProp).addProp(me.contentProp).addProp(me.emphasisProp);
        };
        SendNoteModel.prototype = Object.create(DataModel.prototype);
        SendNoteModel.prototype.toPOJO = function () {
            return {
                subject: this.subjectProp.val,
                content: this.contentProp.val,
                emphasis: Boolean(this.emphasisProp.val)
            };
        };
        SendNoteModel.prototype.init = function (data) {
            if (!data)
                DataModel.prototype.init.call();
            else {
                this.subjectProp.init(data.subject);
                this.contentProp.init(data.content);
                this.emphasisProp.init(data.emphasis);
            }
            return this;
        };
        
        return {
            LoginModel: LoginModel,
            RegisterModel: RegisterModel,
            UserProfileModel: UserProfileModel,
            UpdateLoginEmailModel: UpdateLoginEmailModel,
            UpdateLoginPWDModel: UpdateLoginPWDModel,
            SendNoteModel: SendNoteModel
        };
    }]);
})();