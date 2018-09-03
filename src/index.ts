import fix42Repo from '../resources/fix42.json';
import fix44Repo from '../resources/fix44.json';
import fix50Repo from '../resources/fix50.json';
import Repository from './repository';

export const Fix42: Repository = new Repository(fix42Repo);
export const Fix44: Repository = new Repository(fix44Repo);
export const Fix50: Repository = new Repository(fix50Repo);