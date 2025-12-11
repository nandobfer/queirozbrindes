import { Prisma } from "@prisma/client";
import { Gallery } from "../Gallery/Gallery";
import { Socket } from "socket.io";
import { Message } from "./Message";
export declare const chat_include: {
    media: {
        include: {
            media: true;
        };
    };
    course: true;
    messages: true;
};
export type ChatPrisma = Prisma.ChatGetPayload<{
    include: typeof chat_include;
}>;
export declare class Chat {
    id: string;
    description: string | null;
    media: Gallery;
    messages: number;
    static join(socket: Socket, chat_id: string, platform: "app" | "admin"): Promise<void>;
    static deleteMessages(messages: Message[], chat_id: string, socket?: Socket): Promise<{
        id: string;
        text: string;
        datetime: string;
        deleted: boolean;
        user_id: string | null;
        video_id: string | null;
        video_timestamp: string | null;
        chat_id: string;
        media_id: string | null;
    }[]>;
    constructor(data: ChatPrisma);
    deleteMessages(messages: Message[], socket?: Socket): Promise<{
        id: string;
        text: string;
        datetime: string;
        deleted: boolean;
        user_id: string | null;
        video_id: string | null;
        video_timestamp: string | null;
        chat_id: string;
        media_id: string | null;
    }[]>;
}
