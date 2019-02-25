

```
gradle  dependencies brunch-web:brunch-webapp-api:dependencies  --configuration runtime
```



```
-    apply plugin: "jetty"
+    apply from: 'https://raw.github.com/gretty-gradle-plugin/gretty/master/pluginScripts/gretty.plugin'
```


https://github.com/gretty-gradle-plugin/gretty/blob/master/gradle.properties
