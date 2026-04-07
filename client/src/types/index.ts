export interface Service {
    id: string;
    category: string;
    name: string;
    description: string;
    image: string;
    delay?: string;
}

export interface Expert {
    name: string;
    role: string;
    image: string;
}
