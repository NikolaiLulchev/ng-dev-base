import {IRole} from "./role";
import {ITechStack} from "./techStack";
import {GenderEnum} from "../enums/gender.enum";

export interface IBaseUser{
  id:number;
  username:string;
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  role:IRole[];
  techStack:ITechStack[];
  age:number;
  gender:GenderEnum;
  level:string;

}
