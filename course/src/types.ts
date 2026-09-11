export interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
  export interface CoursePartDescribable extends CoursePartBase {
    description: string;
  }
  
  export interface CoursePartBasic extends CoursePartDescribable {
    kind: "basic";
  }
  
  export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
  }
  
  export interface CoursePartBackground extends CoursePartDescribable {
    backgroundMaterial: string;
    kind: "background";
  }
  
  export interface CoursePartSpecial extends CoursePartDescribable {
    requirements: string[];
    kind: "special";
  }
  
  export type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartSpecial;