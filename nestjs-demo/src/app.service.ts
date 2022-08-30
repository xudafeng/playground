import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello!';
  }

  getNewController(): string {
    return 'it works';
  }
}
