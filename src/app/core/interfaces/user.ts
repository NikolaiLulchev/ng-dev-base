import {ITechStack} from "./techStack";
import {GenderEnum} from "../enums/gender.enum";
import {LevelEnum} from "../enums/level.enum";

export interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string[];
  techStack: ITechStack[];
  dateOfBirth: string;
  age: number;
  gender: GenderEnum;
  level: LevelEnum;
  company:string;

}
