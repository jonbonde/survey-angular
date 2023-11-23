import { Answer } from "./answer";

export interface Question {
    id: number;
    question: string;
    answer_type: string;
    answer_options?: Answer[];
}