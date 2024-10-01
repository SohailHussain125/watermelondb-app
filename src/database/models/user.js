import {Model} from '@nozbe/watermelondb';
import { USER_SCEHMA} from '../schema';
import {text,writer} from '@nozbe/watermelondb/decorators';
import { uuid } from "../constants";

export default class User extends Model {
    static table = USER_SCEHMA;

    static associations = {
        company: { type: 'has_many', foreignKey: 'user_id' },
    };
    @text('name') name;
    @text('password') password;
    @text('email') email;

    @writer async createUser(details) {
        await this.update(user => {
          user._raw.id = uuid();
          user.name = details.name;
          user.email = details.email;
          user.password = details.password;
        })
      }
}
