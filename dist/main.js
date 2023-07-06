"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: 'https://angularcatask.web.app',
        credentials: true
    });
    await app.listen('https://console.clever-cloud.com/users/me/applications/app_45fd2a13-64eb-4ce3-803f-9ea4e101e0ef/logs');
}
bootstrap();
//# sourceMappingURL=main.js.map