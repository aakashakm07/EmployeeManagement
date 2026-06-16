export type Project = {
  _id?: string;
  customer: string;
  contact: string;
  place: string;
  product: string;
  amount: number;
  received: number;
  date: string;
  status: "PAID" | "PENDING";
};

export type FormType = {
  customer: string;
  contact: string;
  place: string;
  product: string;
  amount: string;
  received: string;
};

export type ErrorType = Partial<
  Record<keyof FormType, string>
>;