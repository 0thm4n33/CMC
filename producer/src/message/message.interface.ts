import {AnimationType} from "./enums/animation-type.enum";

export interface Message{
    message: string,
    coleur: string,
    animation: AnimationType
}