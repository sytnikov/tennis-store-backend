import { Product } from "../types/Product";

export const productsData: Product[] = [
  {
    id: 1,
    name: "Item 1",
    price: 122,
    description: "some text",
    category: {
      id: 1,
      name: "Shoes",
      images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
    },
    images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
  },
  {
    id: 2,
    name: "Item 2",
    price: 333,
    description: "some text",
    category: {
      id: 2,
      name: "Clothes",
      images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
    },
    images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
  },
  {
    id: 3,
    name: "Item 3",
    description: "some text",
    price: 432,
    category: {
      id: 3,
      name: "Accessories",
      images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
    },
    images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
  },
];
