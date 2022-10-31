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
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./../model/errors");
function verifyRole(roles) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = req.app.locals.UsersRepository;
            try {
                const user = yield userRepo.findById(req.userId);
                if (!roles.includes(user.role)) {
                    next(new errors_1.ForbiddenError(`Access not allowed`));
                    return;
                }
                next();
            }
            catch (err) {
                next(err);
                return;
            }
        });
    };
}
exports.default = verifyRole;
//# sourceMappingURL=verify-role.js.map