import { OnModuleInit } from '@nestjs/common';
import { Cache } from 'cache-manager';
export declare class CacheModule implements OnModuleInit {
    private readonly cache;
    constructor(cache: Cache);
    onModuleInit(): any;
}
