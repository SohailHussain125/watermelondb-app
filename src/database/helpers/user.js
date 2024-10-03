import { USER_SCEHMA } from './../schema';
import { database } from './../index'
const user = database.collections.get(USER_SCEHMA);

export const findUserByID = async id => await user.find(id);