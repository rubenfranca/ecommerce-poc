export interface User {
  id: string;
  displayName: string;
  email: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
}
