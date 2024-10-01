import {Database} from '@nozbe/watermelondb';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
import {mySchema} from './schema';
import {Models} from './models';

let adapter;

    // FOR WEB
    adapter = new LokiJSAdapter({
        schema: mySchema,
        useWebWorker: false,
        useIncrementalIndexedDB: true,
    });

// Then, make a Watermelon database from it!
export const database = new Database({
    adapter: adapter,
    modelClasses: Models,
});
