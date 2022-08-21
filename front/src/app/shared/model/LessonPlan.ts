import { EducationLevel } from "./EducationLevel";
import { User } from "./User";

export class LessonPlan {
    id: number;
    name: string;
    description: string;
    pillar: string;
    component: string;
    educationLevel: string;
    author: string;
    enabled: boolean = false;
    tutorial: string;
    hability: string;
    teacherLevel: string;
    evaluation: string;
    pdfName: string;
}