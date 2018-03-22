# jquery write by pengliheng

### usage
```js

```


## how to publish an Private package


do you wanna to publish your package like that??`@pengliheng/<package name>`?

- first step.
```
npm init --scope=<username>
```
- second step.
```
npm config set scope <username>
```
- third step.
```
npm publish --access=public
```
- finally , u can install package with below option
```
npm install @username/project-name --save
```


refrence: [14.How to Work with Scoped Packages](https://docs.npmjs.com/getting-started/scoped-packages)