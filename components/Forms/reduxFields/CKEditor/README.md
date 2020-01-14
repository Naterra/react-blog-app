### Webpack




#### 1. Edit next.config.js.
 

```
// ckeditor svg
config.module.rules.push({
     test: /ckeditor5-[^/]+\/theme\/icons\/.+\.svg$/,
     use: ["raw-loader"]
});

// 2. ckeditor css
config.module.rules.push({
    test: /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/,
    use: [
        {
            loader: "style-loader",
            options: {
                injectType: "singletonStyleTag"
            }
        },
        {
            loader: "postcss-loader",
            options: styles.getPostCssConfig({
                themeImporter: {
                    themePath: require.resolve("@ckeditor/ckeditor5-theme-lark")
                },
                minify: true
            })
        }
    ]
});
```



#### 2. Fix other loaders, add 'exclude'
```
{
    test: /\.(css|scss)/,
    loader: 'emit-file-loader',
    exclude: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/,
    options: {
        name: 'dist/[path][name].[ext]'
    }
},
{
    test: /\.(otf|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
    exclude: /ckeditor5-[^/]+\/theme\/icons\/.+\.svg$/,
    loaders: ["url-loader"],
},
   
```


  
  
### Uploading images
- Server response data must be in format
```
{
    success:true/false,
    url:'path/to/file'
}
```
