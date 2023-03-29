import { Prisma } from "@prisma/client";

import { RolesRepsonseProps } from "./Role";
import { UsersRepsonseProps } from "./User";

export type ProjectProps = {
  id: number;
  title: string;
  users: [ProjectUserWithRoleAndUser];
  content: string;
  published: boolean;
};

export type ProjectUserWithRoleAndUser = Prisma.ProjectUserGetPayload<{
  include: {
    role: true;
    user: true;
  };
}>;

export type NewProjectProps = {
  users: UsersRepsonseProps;
  roles: RolesRepsonseProps;
};
