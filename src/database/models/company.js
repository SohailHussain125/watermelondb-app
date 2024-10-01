import {Model} from '@nozbe/watermelondb';
import { COMPANY_SCHEMA } from '../schema';
import {text,relation} from '@nozbe/watermelondb/decorators';

export default class Company extends Model {
    static table = COMPANY_SCHEMA;

    static associations = {
        user: { type: 'belongs_to', key: 'user_id' },
    };
    @text('name') name;
    @relation('users', 'user_id') user}
