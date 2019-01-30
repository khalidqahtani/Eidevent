import {Therole} from '../role.model';

export class User {
    constructor(
    public userid: number,
    public id: number,
    public firstname: string,
    public lastname: string,
    public username: string,
    public password: string,
    public birthday: string,
    public gender: string,
    public email: string,
    public mobile: string,
    public roles: Therole) {}
}
