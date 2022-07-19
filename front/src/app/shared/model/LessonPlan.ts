import { EducationLevel } from "./EducationLevel";
import { User } from "./User";

export class LessonPlan {
    id: number;
    name: string;
    description: string;
    pillar: string;
    component: string;
    level: EducationLevel;
    user: User;
    enabled: boolean = false;
    tutorial: string;
}