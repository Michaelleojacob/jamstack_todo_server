## key points

- see: https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript

```js
import { Request } from "express";

export interface RequestCustom extends Request {
  property: string;
}
```
