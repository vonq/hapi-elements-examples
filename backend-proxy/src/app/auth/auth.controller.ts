import AppController from "../app.controller";
import { Request, Response } from "express";
import { log } from "../../utils";
import { PermissionVONQHAPIPathRequestMethod } from "../permission-vonq-hapi-path/types";
import { AUTH_NOT_AUTHORIZED_ERROR_MESSAGE } from "./consts";

export default class AuthController {
  constructor(private appController: AppController) {}

  log = (...args: any[]) => {
    log("[AuthController]", ...args);
  };

  throwErrorWhenNotAuthorized = (
    userAccessToken: string,
    vonqHAPIPathUrl: string,
    req: Request
  ): void => {
    const user =
      this.appController.userController.findByAccessToken(userAccessToken);

    this.log(
      "throwErrorWhenNotAuthorized received",
      userAccessToken,
      "and path",
      vonqHAPIPathUrl
    );

    if (user) {
      const lowercaseRequestMethod =
        req.method.toLowerCase() as PermissionVONQHAPIPathRequestMethod;

      const permissionOfVONQHAPIPath =
        this.appController.permissionVONQHAPIPathController.findByVONQHAPIPathAndRequestMethod(
          vonqHAPIPathUrl,
          lowercaseRequestMethod
        );
      this.log(
        "throwErrorWhenNotAuthorized found permission",
        permissionOfVONQHAPIPath
      );
      if (permissionOfVONQHAPIPath?.permissionId) {
        const permission = this.appController.permissionController.findByID(
          permissionOfVONQHAPIPath?.permissionId
        );
        this.log("throwErrorWhenNotAuthorized found permission", permission);
        if (permission) {
          const roleIdsOfThisPermission =
            this.appController.rolePermissionController
              .filterByPermissionID(permissionOfVONQHAPIPath?.permissionId)
              ?.map((rolePermission) => rolePermission.roleId);

          this.log(
            "throwErrorWhenNotAuthorized found roleIdsOfThisPermission",
            roleIdsOfThisPermission,
            "and user roleId",
            user.roleId
          );

          if (!(roleIdsOfThisPermission || [])?.includes(user.roleId)) {
            throw new Error(AUTH_NOT_AUTHORIZED_ERROR_MESSAGE);
          }
        }
      }
    } else {
      throw new Error("User not found");
    }

    //throw new Error();
  };

  respondWithUnauthorizedError = (res: Response) => {
    return this.appController.respondWithData(res, 401, {
      message: AUTH_NOT_AUTHORIZED_ERROR_MESSAGE,
    });
  };

  respondWithUserNotFoundError = (res: Response) => {
    return this.appController.respondWithData(res, 404, {
      message: "User not found",
    });
  };
}
