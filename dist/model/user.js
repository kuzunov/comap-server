"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guest = exports.USER_ROLE = exports.USER_STATUS = void 0;
;
;
var USER_STATUS;
(function (USER_STATUS) {
    USER_STATUS[USER_STATUS["ACTIVE"] = 1] = "ACTIVE";
    USER_STATUS[USER_STATUS["SUSPENDED"] = 2] = "SUSPENDED";
    USER_STATUS[USER_STATUS["DEACTIVATED"] = 3] = "DEACTIVATED";
})(USER_STATUS = exports.USER_STATUS || (exports.USER_STATUS = {}));
var USER_ROLE;
(function (USER_ROLE) {
    USER_ROLE[USER_ROLE["GUEST"] = 0] = "GUEST";
    USER_ROLE[USER_ROLE["USER"] = 1] = "USER";
    USER_ROLE[USER_ROLE["ORGANIZATOR"] = 2] = "ORGANIZATOR";
    USER_ROLE[USER_ROLE["ADMIN"] = 3] = "ADMIN";
})(USER_ROLE = exports.USER_ROLE || (exports.USER_ROLE = {}));
exports.Guest = {
    id: '0',
    username: "Guest",
    firstName: "",
    lastName: "",
    password: "",
    gender: "f",
    status: USER_STATUS.ACTIVE,
    avatar: "",
    description: "",
    created: 0,
    modified: 0,
    role: USER_ROLE.GUEST,
};
//# sourceMappingURL=user.js.map