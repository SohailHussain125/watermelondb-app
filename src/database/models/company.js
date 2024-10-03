import { Model } from '@nozbe/watermelondb';
import { COMPANY_SCHEMA, CAR_SCHEMA, USER_SCEHMA } from '../schema';
import { text, relation, writer, children } from '@nozbe/watermelondb/decorators';
import { uuid } from '../constants';

export default class Company extends Model {
    static table = COMPANY_SCHEMA;

    static associations = {
        user: { type: 'belongs_to', key: 'user_id' },
        car: { type: 'has_many', foreignKey: 'company_id' },
    };

    @text('name') name;

    @relation('user', 'user_id') user
    
    @children('car') car;

    @writer async createCar(details) {
         return await this.collections.get('car').create(x => {
            console.log(x,'><><<<>><<',this)
            x._raw.id = uuid();
            x.name = details.name;
            x.model = details.model;
            x.color = details.color;
            x.variant = details.variant;
            x.company.set(this);
        });
    }
}
