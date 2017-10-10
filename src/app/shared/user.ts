export class User {
  key: string;
  name: string;
  email: string;
  code: string;
  password: string;

  constructor(key?: string, name?: string, email?: string, code?:string, password?:string) {
    this.key = key;
    this.name = name;
    this.email = email;
    this.code = code;
    this.password = password;
  }
}
