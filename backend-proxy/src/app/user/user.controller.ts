import { convertSetToArray, findInSetByKey, getUUIDV4, log } from "../../utils";
import { User, UserAccessToken, UserID } from "./types";
import AppController from "../app.controller";
import { Response, Request } from "express";
import { RoleID, RoleType } from "../role/types";

export default class UserController {
  constructor(private appController: AppController) {}

  exampleUserIDs: Record<RoleType, string> = {
    admin: "admin-user",
    "recruiter-manager": "ats-recruiter-manager-user",
    recruiter: "ats-recruiter-user",
  };

  log = (...args: any[]) => {
    log("[UserController]", ...args);
  };

  findByAccessToken = (accessToken: UserAccessToken) => {
    const { db } = this.appController;
    const { user } = db;

    return findInSetByKey<User>(user, "accessToken", accessToken);
  };

  findByID = (id: UserID) => {
    const { db } = this.appController;
    const { user } = db;

    return findInSetByKey<User>(user, "id", id);
  };

  findByRoleId = (roleId: RoleID) => {
    const { db } = this.appController;
    const { user } = db;

    return findInSetByKey<User>(user, "roleId", roleId);
  };

  updateByID = (id: UserID, updateUserDto: Partial<User>) => {
    const { db } = this.appController;
    const { user: userDb } = db;

    let user = findInSetByKey<User>(userDb, "id", id);

    if (user) {
      userDb.delete(user);
      userDb.add({
        ...user,
        ...updateUserDto,
      });
    }

    user = this.findByID(id);

    return user;
  };

  findAll = () => {
    const { db } = this.appController;
    const { user } = db;

    return convertSetToArray<User>(user);
  };

  onGetAllUsersForFrontendDemo = (req: Request, res: Response) => {
    const allUsers = this.findAll();

    this.appController.respondWithData(res, 200, allUsers);
  };

  getExampleUserIDByRoleType = (roleType: RoleType) => {
    return `${this.appController.tenantController.exampleTenantIDForX}-${this.exampleUserIDs[roleType]}`;
  };

  seedDatabase = () => {
    const { db, roleController, tenantController } = this.appController;
    const { user, role } = db;
    const { findByType: findRoleByType } = roleController;
    const { findByID: findTenantByID } = tenantController;

    const atsAdminRole = findRoleByType("admin");

    if (atsAdminRole) {
      user.add({
        id: this.getExampleUserIDByRoleType("admin"),
        tenantId: this.appController.tenantController.exampleTenantIDForX,
        name: "Admin User with all permissions",
        roleId: atsAdminRole.id,
        accessToken: getUUIDV4(),
      });
    }

    const recruiterManagerRole = findRoleByType("recruiter-manager");

    if (recruiterManagerRole) {
      user.add({
        id: this.getExampleUserIDByRoleType("recruiter-manager"),
        tenantId: this.appController.tenantController.exampleTenantIDForX,
        name: "Recruiter Manager User with view and manage permissions",
        roleId: recruiterManagerRole.id,
        accessToken: getUUIDV4(),
      });
    }

    const recruiterRole = findRoleByType("recruiter");

    if (recruiterRole) {
      user.add({
        id: this.getExampleUserIDByRoleType("recruiter"),
        tenantId: this.appController.tenantController.exampleTenantIDForX,
        name: "Recruiter User with only view and order permissions",
        roleId: recruiterRole.id,
        accessToken: getUUIDV4(),
      });
    }

    this.log("Seeded to database:");
    console.table(
      this.findAll().map((user) => ({
        id: user.id,
        name: user.name,
        tenant: findTenantByID(user.tenantId)?.name,
      })),
      ["id", "name", "tenant"]
    );
  };
}
