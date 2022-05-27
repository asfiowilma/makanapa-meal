"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheModule = void 0;
const common_1 = require("@nestjs/common");
const redisStore = require("cache-manager-ioredis");
const cache_manager_1 = require("cache-manager");
let CacheModule = class CacheModule {
    constructor(cache) {
        this.cache = cache;
    }
    onModuleInit() {
        const logger = new common_1.Logger('Cache');
        const commands = ['get', 'set', 'del'];
        const cache = this.cache;
        commands.forEach((commandName) => {
            const oldCommand = cache[commandName];
            cache[commandName] = async (...args) => {
                const start = new Date();
                const result = await oldCommand.call(cache, ...args);
                const end = new Date();
                const duration = end.getTime() - start.getTime();
                args = args.slice(0, 2);
                logger.log(`${commandName.toUpperCase()} ${args.join(', ')} - ${duration}ms`);
                return result;
            };
        });
    }
};
CacheModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.registerAsync({
                useFactory: () => {
                    return {
                        store: redisStore,
                        host: 'redis-15571.c9.us-east-1-2.ec2.cloud.redislabs.com',
                        port: 15571,
                        password: 'f10D7LP7mra3siccNsXU5BmtGQg21UhW'
                    };
                }
            })
        ],
        exports: [common_1.CacheModule]
    }),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeof (_a = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _a : Object])
], CacheModule);
exports.CacheModule = CacheModule;
//# sourceMappingURL=cache.module.js.map