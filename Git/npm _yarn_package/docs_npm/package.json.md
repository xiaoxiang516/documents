## 关注配置

### 微前端
项目拆分
```json
{
  "scripts": {
    "serve:main": "cd projects/yth-integration && yarn dev",
    "serve:co": "cd projects/yth-co && yarn dev",
    "serve:srm": "cd projects/yth-srm && yarn dev",
    "start:srm": "cd projects/yth-srm && yarn start:srm",
    "build": "npm-run-all --parallel build:*",
    "build:main": "cd projects/yth-integration && npm run build:sit",
    "build:co": "cd projects/yth-co && npm run build:sit",
    "build:srm": "cd projects/yth-srm && npm run build:sit",
    "lib:co": "cd projects/yth-co && yarn lib"
  },
}
```

```json
{
    "scripts": {
      "preinstall": "npx only-allow pnpm",
      "start:inner": "pnpm -C ./packages/gys-inner dev",
      "start:outer": "pnpm -C ./packages/gys-outer dev",
      "start:home": "pnpm -C ./packages/gys-home dev",
      "start:all": "turbo run dev --parallel --no-cache",
      "build:inner:sit": "pnpm -C ./packages/gys-inner build:sit",
      "build:inner:uat": "pnpm -C ./packages/gys-inner build:uat",
      "build:inner": "pnpm -C ./packages/gys-inner build",
      "build:outer:sit": "pnpm -C ./packages/gys-outer build:sit",
      "build:outer:uat": "pnpm -C ./packages/gys-outer build:uat",
      "build:outer": "pnpm -C ./packages/gys-outer build",
      "build:home:sit": "pnpm -C ./packages/gys-home build:sit",
      "build:home:uat": "pnpm -C ./packages/gys-home build:uat",
      "build:home": "pnpm -C ./packages/gys-home build",
      "build:all": "turbo run build",
      "prettier": "prettier --write .",
      "prepare": "husky install",
      "commit": "cz"
  },
}

```