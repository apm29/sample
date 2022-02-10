export const requireComponents = require.context(
  "@/views/pages",
  true,
  /\.vue/
);

//遍历src/views/pages文件夹下的vue文件
export const pages = requireComponents.keys().map((fileName) => {
  // 组件实例
  // const reqCom = requireComponents(fileName);
  // 截取路径作为组件名
  const reqComName = fileName.split("/").slice(1).join("/");
  console.log(reqComName);
  return reqComName;
});

export const lazyImport = (url) => () =>
  new Promise((resolve) => {
    console.log(url);
    import(`@/views/pages/${url}`)
      .then((module) => {
        resolve(module);
      })
      .catch((err) => {
        console.log(err);
        resolve(import("@/views/functional/NotFoundComponent"));
      });
  });

function flatRouteTree(routes) {
  return routes.reduce((flat, route) => {
    flat.push(route);
    if (route.children && route.children instanceof Array) {
      flat.push(...flatRouteTree(route.children));
    }
    return flat;
  }, []);
}

export function alterRoutes(routes) {
  let accessedRouters = [];
  if (routes && routes instanceof Array) {
    routes.forEach((route) => {
      let accessedRouter = {};
      accessedRouter.path = route.url;
      accessedRouter.name = route.menuName;
      accessedRouter.meta = {
        icon: route.icon,
        title: route.menuName,
        hideInMenu: route.hideInMenu,
      };
      accessedRouter.component = lazyImport(route.path);
      if (route.children && route.children.length) {
        accessedRouter.children = alterRoutes(route.children);
      }
      accessedRouters.push(accessedRouter);
    });
  }
  return accessedRouters;
}
