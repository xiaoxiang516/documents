<!--
重要: 请使用以下链接创建新 issue

  https://elementui.github.io/issue-generator

未通过以上链接创建的 issue 会被机器人直接关闭。

########

IMPORTANT: Please use the following link to create a new issue:

  https://elementui.github.io/issue-generator

If your issue was not created using the app above, it will be closed immediately.
-->
# Guía para Contribuidores a `Element UI`


Please make sure these boxes are checked before submitting your PR, thank you!

* [ ] Make sure you follow Element's contributing guide ([中文](https://github.com/ElemeFE/element/blob/master/.github/CONTRIBUTING.zh-CN.md) | [English](https://github.com/ElemeFE/element/blob/master/.github/CONTRIBUTING.en-US.md) | [Español](https://github.com/ElemeFE/element/blob/master/.github/CONTRIBUTING.es.md) | [Français](https://github.com/ElemeFE/element/blob/master/.github/CONTRIBUTING.fr-FR.md)).
* [ ] Make sure you are merging your commits to `dev` branch.
* [ ] Add some descriptions and refer relative issues for you PR.

## Pré-requis
`Node.js 4+`, `yarn` et `npm 3+` sont requis. Note: nous utilisons yarn pour verrouiller les versions des dépendances, donc vous devriez installer les dépendances en utilisant `yarn` au lieu de `npm install`.
```shell
git clone git@github.com:ElemeFE/element.git
npm run dev

# open http://localhost:8085
```

> **Remarque** : modifiez le fichier `examples/play/index.vue`, utilisez le composant auquel vous contribuez, puis lancez `npm run dev:play`, allez sur [http://localhost:8085](http://localhost:8085), regardez le résultat rapidement et facilement.

Pour le build:
