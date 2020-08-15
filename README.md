 # setup

 - install yesheng
 https://www.yeshen.com/blog/category/macmnq/

 - install  and login weixin
 https://www.yeshen.com/appcenter/game_management/weixin/
 - open the mini program
 NA
 - copy packages to local 

 ```
 # first, copy the files shared folder
 source: /data/data/com.tencent.mm/MicroMsg/xxxx/appbrand/pkg/*.wxapkg
 yeshen path: /mnt/shared/Other  
 
 # second, copy the files from local pc
destination： ~/Library/Application\ Support/NoxAppPlayer/Nox_share/Other

```

![rSmS9h](https://gitee.com/chasays/mdPic/raw/master/uPic/rSmS9h.png)


# decompile
- clone this repo
- change dirctory 
- npm install as following
```
npm install esprima
npm install css-tree
npm install cssbeautify
npm install vm2
npm install uglify-es
npm install js-beautify
```
 folder node_modules will be observed after installed.

![qAWVVa](https://gitee.com/chasays/mdPic/raw/master/uPic/qAWVVa.png)


# 说明
- 本项目无法适用于 2018 年前开发的小程序(如最后更新时间为 2017.7.12), 请过早的小程序不用再尝试了
- 本项目完全基于 [wxappUnpacker](https://github.com/qwerty472123/wxappUnpacker "wxappUnpacker") 改进的。


# 分包功能

当检测到 wxapkg 为子包时, 添加-s 参数指定主包源码路径即可自动将子包的 wxss,wxml,js 解析到主包的对应位置下. 完整流程大致如下: 
1. 获取主包和若干子包
2. 解包主包 `./bingo.sh testpkg/master-xxx.wxapkg`
3. 解包子包 `./bingo.sh testpkg/sub-1-xxx.wxapkg -s=../master-xxx`


![JYJaKN](https://gitee.com/chasays/mdPic/raw/master/uPic/JYJaKN.png)

![67MZX3](https://gitee.com/chasays/mdPic/raw/master/uPic/67MZX3.png)
TIP
> -s 参数可为相对路径或绝对路径, 推荐使用绝对路径, 因为相对路径的起点不是当前目录 而是子包解包后的目录

```
├── testpkg
│   ├── sub-1-xxx.wxapkg #被解析子包
│   └── sub-1-xxx               #相对路径的起点
│       ├── app-service.js
│   ├── master-xxx.wxapkg
│   └── master-xxx             # ../master-xxx 就是这个目录
│       ├── app.json
```
