import { User } from './user';

export type Review = {
    id: number;
    moveiId: number;
    text: string;
    user: User;
}
