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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.LoginSignIn = void 0;
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
exports.LoginSignIn = function () {
    var _a = react_1.useState(false), signUp = _a[0], setSignUp = _a[1];
    var _b = react_1.useState(git, ""), user_name = _b[0], setUsername = _b[1];
    var _c = react_1.useState(""), plain_user_password = _c[0], setpassword = _c[1];
    var _d = react_1.useState(""), user_email = _d[0], setEmail = _d[1];
    var navigate = react_router_dom_1.useNavigate();
    var Submit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var username, password, endPoint, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    username = user_email;
                    password = plain_user_password;
                    endPoint = !signUp ? "login" : "register";
                    return [4 /*yield*/, fetch("http://localhost:3000/" + endPoint, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(signUp
                                ? {
                                    user_name: user_name,
                                    plain_user_password: plain_user_password,
                                    user_email: user_email
                                }
                                : {
                                    username: username,
                                    password: password
                                })
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        navigate("/");
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(card_1.Card, { className: "w-full max-w-md" },
        react_1["default"].createElement("form", { onSubmit: Submit },
            react_1["default"].createElement(card_1.CardHeader, null,
                react_1["default"].createElement(card_1.CardTitle, null, signUp ? "Sign up" : "Sign in"),
                react_1["default"].createElement(card_1.CardDescription, null, !signUp
                    ? "Enter your email below to sign in to your account"
                    : "Enter your email ,name and password to make an account."),
                react_1["default"].createElement(card_1.CardAction, null,
                    react_1["default"].createElement(button_1.Button, { variant: "link", onClick: function () { return setSignUp(function (prev) { return !prev; }); } }, !signUp ? "Sign up" : "Sign in"))),
            react_1["default"].createElement(card_1.CardContent, null,
                react_1["default"].createElement("div", { className: "flex flex-col gap-3" },
                    react_1["default"].createElement("div", { className: "grid gap-1" },
                        react_1["default"].createElement(label_1.Label, { htmlFor: "email" }, "Email"),
                        react_1["default"].createElement(input_1.Input, { id: "email", type: "email", placeholder: "m@example.com", required: true, onChange: function (e) { return setEmail(e.target.value); } })),
                    signUp && (react_1["default"].createElement("div", { className: "grid gap-2" },
                        react_1["default"].createElement(label_1.Label, { htmlFor: "username" }, "Username"),
                        react_1["default"].createElement(input_1.Input, { id: "username", type: "text", placeholder: "Jane", onChange: function (e) { return setUsername(e.target.value); }, required: true }))),
                    react_1["default"].createElement("div", { className: "flex flex-col gap-2" },
                        react_1["default"].createElement("div", { className: "flex items-center" },
                            react_1["default"].createElement(label_1.Label, { htmlFor: "password" }, "Password"),
                            react_1["default"].createElement("a", { href: "#", className: "ml-auto inline-block text-sm underline-offset-4 hover:underline" }, "Forgot your password?")),
                        react_1["default"].createElement("div", { className: "mb-2" },
                            react_1["default"].createElement(input_1.Input, { id: "password", type: "password", required: true, onChange: function (e) { return setpassword(e.target.value); } }))))),
            react_1["default"].createElement(card_1.CardFooter, { className: "flex-col gap-2 " },
                react_1["default"].createElement(button_1.Button, { type: "submit", className: "w-full" }, signUp ? "Sign up" : "Login"),
                react_1["default"].createElement(button_1.Button, { variant: "outline", className: "w-full" }, signUp ? "Sign up with Google" : "Login with Google")))));
};
