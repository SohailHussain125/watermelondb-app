import { appSchema, tableSchema } from '@nozbe/watermelondb'


export const USER_SCEHMA = 'user';
export const COMPANY_SCHEMA = 'company';
export const CAR_SCHEMA = 'car';

export const mySchema =  appSchema({
  version: 1,
  tables: [
    tableSchema({
        name: USER_SCEHMA,
        columns: [
            {name: 'name', type: 'string'},
            {name: 'email', type: 'string',isUnique: true },
            {name: 'password', type: 'string'}
        ],
    }),
    tableSchema({
        name: COMPANY_SCHEMA,
        columns: [
            {name: 'user_id', type: 'string'},
            {name: 'name', type: 'string'},
        ],
    }),
    tableSchema({
        name: CAR_SCHEMA,
        columns: [
            {name: 'name', type: 'string'},
            {name: 'model', type: 'string'},
            {name: 'color', type: 'string'},
            {name: 'variant', type: 'string'},
            {name: 'company_id', type: 'string'},

        ],
    }),
  ]
})