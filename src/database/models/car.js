import {Model} from '@nozbe/watermelondb';
import { CAR_SCHEMA,COMPANY_SCHEMA} from '../schema';
import {text,relation} from '@nozbe/watermelondb/decorators';

export default class Car extends Model {
    static table = CAR_SCHEMA;

    static associations = {
        company: { type: 'belongs_to', key: 'company_id' },
    };
    
    @text('name') name;
    @text('model') model;
    @text('color') color;
    @text('variant') variant;
    
    @relation('company', 'company_id') company;
    
}
