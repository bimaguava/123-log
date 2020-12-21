Oriclone for Hugo SSG
=====================

SCSS based template.

### Generate CSS

In your favorite terminal, go to theme directory.

```
cd ./themes/oriclone
```

And run either one of this command

```
sass -I sass --update sass/themes/oriclone:static/assets/css --style compressed --sourcemap=none
```

or this to continuosly watch

```
sass --watch -I sass  sass/themes/oriclone:static/assets/css --style compressed --sourcemap=none
```

Thank you
