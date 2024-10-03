import { CAR_SCHEMA ,COMPANY_SCHEMA} from '../schema';
import { database } from '../index'
import {Q} from '@nozbe/watermelondb';

const car = database.collections.get(CAR_SCHEMA);


export const observeCars = (companyId) =>
    car.query(Q.where('company_id', companyId)).observe();

        