import { Prisma } from "@prisma/client";
import { Customer } from "./Customer";
import { Item } from "./Item";
import { WithoutFunctions } from "./helpers";
export declare const order_include: {
    customer: true;
};
type OrderPrisma = Prisma.OrderGetPayload<{
    include: typeof order_include;
}>;
export type OrderType = "budget" | "order";
export interface DeliveryDate {
    from: number;
    to: number;
}
export interface Attachment {
    filename: string;
    url: string;
}
export type OrderForm = Omit<WithoutFunctions<Order>, "id">;
export declare class Order {
    id: string;
    number: string;
    type: OrderType;
    order_date: number;
    observations?: string;
    payment_terms?: string;
    images?: Attachment[];
    drawings?: Attachment[];
    delivery_date?: DeliveryDate;
    items: Item[];
    customerId?: string;
    customer: Customer;
    static list(): Promise<Order[]>;
    static get(id: string): Promise<Order | null>;
    static getNextAvailableNumber(): Promise<number>;
    static create(data: OrderForm): Promise<Order>;
    constructor(data: OrderPrisma);
    update(data: Partial<OrderForm>): Promise<this>;
    delete(): Promise<void>;
}
export {};
