const routesNames = {
  home: "",
  login: "login",
  error404: "404",
  devices: "devices",
  about: "about",
  rooms: "rooms",
  manage: "manage"
};

export const RoutesConfig: any = {
  routesName: routesNames,
  routes: {
    rooms: `/${routesNames.rooms}`,
    home: `/${routesNames.home}`,
    login: `/${routesNames.login}`,
    error404: `/${routesNames.error404}`,
    devices: `/${routesNames.devices}`,
    about: `/${routesNames.about}`,
    manage: `/${routesNames.manage}`
  }
};
