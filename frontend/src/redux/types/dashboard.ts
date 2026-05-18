export interface ITip {
  id: number;
  title: string;
  description: string;
  content: string;
  image?: string;
  type: 'tip' | 'ad'; 
}

export interface IItem {
    id: number;
    user_id: number;
    name: string;
    category?: string;
    material?: string;
    style?: string;
    color?: string;
    cost?: string;
    weather?: string;
    image?: string;
    image_url?: string;
    image_no_bg_url?: string;
}

export interface IOutfit {
    id: number;
    user_id: number;
    name: string;
    image?: string;
    category?: string;
    style?: string;
    weather?: string;
    cost?: string;
    items?: {
        id: number;
        item: {
            id: number;
            name: string;
            image_url?: string;
            image_no_bg_url?: string;
        };
        position_x: number;
        position_y: number;
        width: number;
        height: number;
        z_index: number;
    }[];
}

export interface IOutfitItems{
  id: number;
  outfut_id: number;
  item_id:number;
  item_order?: number;
  position_x: number;  
position_y: number; 
width: number;       
height: number;  
}

