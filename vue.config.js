module.exports={
    configureWebpack:{
        resolve:{
          alias:{
             'assets':'@/assets', 
             'common':'@/common', 
             'components':'@/components', 
             'network':'@/network', 
             'views':'@/views', 
          }
        }
    },
    devServer: {
		open: false, // 自动打开浏览器
		port: '8080', // 前台代理端口号
		https: false, // https： {type: Booleam}
		hotOnly: false, // 热更新
		proxy: {
			'/api': {
				target: 'http://192.168.0.102:9898', // 要访问的跨域的域名
				ws: true, // 如果要代理websockets
				changeOrigin: true, // 开启代理
				pathRewrite: { // 路径重写
					'^/api': '' // 使用 `/api` 代替 `target` 要访问的跨域的域名
				}
			}
		}
	}

}