import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/sign-in')
  signIn(@Body() body: any) {
    return this.authService.validateUser(body.username, body.password);
  }
}