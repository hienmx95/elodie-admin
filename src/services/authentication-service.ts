import { Repository } from "@react3l/react3l/core";
import _, { kebabCase } from "lodash";
import { ActionContext } from "app/app-context";
import { AxiosResponse } from "axios";
import { LOGIN_ROUTE } from "config/route-consts";
import { AppUser } from "models/AppUser";
import React from "react";
import { map } from "rxjs/operators";
import * as Cookie from "js-cookie";
import { httpConfig } from "config/http";

class AuthenticationService extends Repository {
  constructor() {
    super(httpConfig);
  }

  public checkAuth() {
    return this.httpObservable
      .post("rpc/elodie/profile-web/get")
      .pipe(map((response: AxiosResponse<AppUser>) => response.data));
  }

  public login(appUser: any) {
    return this.httpObservable
      .post("rpc/elodie/account/login", appUser)
      .pipe(map((response: AxiosResponse<AppUser>) => response.data));
  }

  public listPath() {
    return this.httpObservable
      .post(`rpc/elodie/permission/list-path`)
      .pipe(map((response: AxiosResponse<string[]>) => response.data));
  }

  public logout() {
    Cookie.remove("Token");
    window.location.href = LOGIN_ROUTE;
  }

  public forgotPassword(email: string) {
    return this.httpObservable
      .post("rpc/elodie/profile/forgot-password", { email })
      .pipe(map((response: AxiosResponse<AppUser>) => response.data));
  }

  public changePassword(password: string) {
    return this.httpObservable
      .post("rpc/elodie/profile/forgot-password", { password })
      .pipe(map((response: AxiosResponse<AppUser>) => response.data));
  }

  public verifyOtpCode(appUser: AppUser) {
    return this.httpObservable
      .post("rpc/elodie/profile/forgot-password", { appUser })
      .pipe(map((response: AxiosResponse<AppUser>) => response.data));
  }

  public useAction(module: string, baseAction: string) {
    const actionContext = React.useContext<string[]>(ActionContext);
    const [actionMapper, setActionMapper] = React.useState<
      Record<string, number>
    >({});

    React.useEffect(() => {
      const mapper: Record<string, number> = {};
      const regex = new RegExp(`^(${baseAction})/`, "i");
      actionContext.forEach((item: string, index: number) => {
        if (item.match(regex)) {
          mapper[item] = index;
        }
      });
      setActionMapper(mapper);
    }, [actionContext, baseAction, module]);

    const buildAction = React.useCallback(
      (action: string) => {
        return `${baseAction}/${kebabCase(action)}`;
      },
      [baseAction]
    );

    const validAction = React.useMemo(() => {
      return (action: string) => {
        if (
          !_.isEmpty(actionMapper) &&
          actionMapper.hasOwnProperty(buildAction(action))
        ) {
          return true;
        }
        return false;
      };
    }, [actionMapper, buildAction]);

    return { validAction };
  }
}

export default new AuthenticationService();
