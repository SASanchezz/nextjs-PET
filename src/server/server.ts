import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect, { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

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

let categoriesData = [...categories];

router
  .post((req, res) => {
    const category = req.body.category;
    categoriesData.push(category);
    
    res.status(200).json({});
  })
  .get((req, res) => {
    const category = categoriesData.find((category) => category.id === Number(req.query.id));
    res.status(200).json({ category });
  })
  .put((req, res) => {
    const category = req.body.category;
    const index = categoriesData.findIndex((category) => category.id === Number(req.query.id));
    if (index === -1) res.status(404).end();
    categoriesData[index] = category;
    res.status(200).json({ category });
  })
  .delete((req, res) => {
    const index = categoriesData.findIndex((category) => category.id === Number(req.query.id));
    if (index === -1) res.status(404).end();
    categoriesData = categoriesData.filter((category) => category.id !== Number(req.query.id));
    res.status(200).json({});
  });

export default router.handler({
  onError: (err: any, req, res) => {
    res.status(err.statusCode || 500).end(err.message);
  },
});
