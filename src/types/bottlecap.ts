export interface Bottlecap {
    id: string;
    frontImage: string;
    backImage: string;
    color: string;
    description: string;
    funFact: string;
}

export interface BottlecapData {
    bottlecaps: Bottlecap[];
} 