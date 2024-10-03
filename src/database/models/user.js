import { Model } from '@nozbe/watermelondb';
import { USER_SCEHMA, COMPANY_SCHEMA } from '../schema';
import { text, children, writer } from '@nozbe/watermelondb/decorators';
import { uuid } from "../constants";

export default class User extends Model {
  static table = USER_SCEHMA;

  static associations = {
    company: { type: 'has_many', foreignKey: 'user_id' },
  };

  @text('name') name;
  @text('password') password;
  @text('email') email;

  @children(COMPANY_SCHEMA) company;


  static createUser(data) {
    return {
      id: uuid(), // Generate the ID here
      name: data.name,
      email: data.email,
      password: data.password,
    };
  }
  @writer async createCompany(details) {
    return await this.collections.get(COMPANY_SCHEMA).create(company => {
      company._raw.id = uuid();
      company.name = details.name;
      company.user.set(this);
    });
  }
}
