import {IRole} from "./role";
import {ITechStack} from "./techStack";

export interface IBaseUser{
  id:string;
  username:string;
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  role:IRole[];
  techStack:ITechStack[];
  age:string;
  gender:string;
  level:string;

}
