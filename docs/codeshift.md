# JSCodeShift scripts

We provide two jscodeshift scripts to migrate the code from JavaScript with types in JSDoc to TypeScript.

The first script removes the '.js' in the import. That way, when we convert a script from `.js` to `.ts`
we don't need to change all the relative imports.
We should run it first on all the repository with: e.g.

```bash
find api -name '*.js' -exec npm run cs-rmjs -- {} \;
find test -name '*.js' -exec npm run cs-rmjs -- {} \;
find examples -name '*.js' -exec npm run cs-rmjs -- {} \;
find src -name '*.js' -exec npm run cs-rmjs -- {} \;
find contribs/gmf/ -name '*.js' -exec npm run cs-rmjs -- {} \;
```

The second script will do the real migration.
Then we can run it on one file with:

```bash
git mv <file_path>.js <file_path>.ts
npm run cs-tots -- <file_path>.ts
```

Conversion limitations:

- I use global variable so we shouldn't convert more than one file in at a time.
- Not all the type casts are working.
- `@type {{ ... }}` is not working, it should be converted into an `@typedef` first.
- `function(Type1|Type2): ResultType` is not working, the parsing with `doctrine` return an incorrect result.
