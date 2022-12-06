## key points

- https://stackoverflow.com/questions/69479595/property-id-does-not-exist-on-type-string-jwtpayload-property-id-does

- typescript doesn't know what jwtpayload is

---

- middleware/verifyToken.ts

```js
const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
```

- types/types.ts

```js
export interface JwtPayload {
  user: User;
  iat: number;
  exp: number;
}
```
