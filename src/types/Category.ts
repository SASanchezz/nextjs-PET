export type CategoryType = {
  id: number;
  name: string;
  visibility: boolean;
}

export const categories: CategoryType[] = [
  {
    id: 3,
    name: "Category 3",
    visibility: true,
  },   
  {
    id: 2,
    name: "Category 2",
    visibility: false,
  },
  {
    id: 1,
    name: "Category 1",
    visibility: true,
  },
  {
    id: 0,
    name: "Other",
    visibility: true,
  }
]
