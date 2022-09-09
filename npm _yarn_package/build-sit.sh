rm -rf ./node_modules
npm cache clean --force
git pull
pnpm install
pnpm install git+https://git.bgy.com.cn/bu00428/gys-external-store.git -S -w
pnpm install git+https://git.bgy.com.cn/bu00428/gys-front/gys-external-invoice.git#dev -S -w
pnpm install git+https://git.bgy.com.cn/bu00428/gys-front/gys-external-cost.git#dev -S -w
pnpm install git+https://git.bgy.com.cn/bu00428/gys-front/gys-external-srm.git#dev -S -w
pnpm install git+https://git.bgy.com.cn/bu00428/gys-front/gys-external-contract-editor.git#sit -S -w
pnpm install demo-vue3-isp@latest -S -w
pnpm install bpms-formsdk-esm@latest -S -w
pnpm build:inner:sit
pnpm build:outer:sit
