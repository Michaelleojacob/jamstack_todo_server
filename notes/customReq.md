## key

# ! this does not work check requestCustom.md

- adding to express.Request
- typing via typescript
- solution found here: https://stackoverflow.com/questions/65533644/how-to-extend-request-type-in-express-with-custom-property

---

## ./types/custom.d.ts

```js
export {};

declare global {
  namespace Express {
    export interface Request {
      token?: string;
    }
  }
}
```

## tsconfig.json

- "typeRoots": ["./types"],

```js
{
  "compilerOptions": {
    "sourceMap": true,
    "typeRoots": ["./types"],
    "outDir": "dist",
    "strict": true,
    "lib": ["esnext"],
    "esModuleInterop": true
  }
}
```
