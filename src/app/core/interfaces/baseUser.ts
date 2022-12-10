import {IRole} from "./role";
import {ITechStack} from "./techStack";

export interface IBaseUser{
  username:string;
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  role:IRole[];
  techStack:ITechStack[];

}
