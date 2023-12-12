import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Provider } from "src/user/entities/provider.enum";







@Injectable()
export class GoogleAuthGuard extends AuthGuard(Provider.Google) {}