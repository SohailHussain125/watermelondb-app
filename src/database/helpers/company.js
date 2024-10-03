import { COMPANY_SCHEMA } from '../schema';
import { database } from '../index'
import {Q} from '@nozbe/watermelondb';

const company = database.collections.get(COMPANY_SCHEMA);

export const findCompanyByID = async id => await company.find(id);



export const observeCompany = (companyId) => company.query(Q.where('id', companyId)).observeWithColumns(['name']);

