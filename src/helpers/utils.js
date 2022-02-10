import copyToClipboard from "gdt-jsapi/copyToClipboard";
import downloadFile from "gdt-jsapi/downloadFile";
import dd from "gdt-jsapi";
import { Notification } from "element-ui";
import ClipboardJS from "clipboard";
import { getUserInfo, login } from "@/api/auth";
import store from "@/store";
import router, { checkRoutes } from "@/router";
import Vue from "vue";
import App from "@/App";
export async function copyText(content) {
  try {
    await dd.version();
    return copyToClipboard({ text: content });
  } catch (e) {
    //非钉钉
    const text = document.createElement("p");
    text.setAttribute("data-clipboard-text", content);
    const copy = new ClipboardJS(text);
    copy.on("success", function () {
      Notification({
        message: "复制成功",
        type: "success",
        duration: 5000,
      });
    });
    copy.on("error", function () {
      Notification({
        message: "复制失败",
        type: "error",
      });
    });
    text.click();
  }
}

export async function downloadByUrl(url, name) {
  try {
    console.log(url);
    console.log(name);
    await dd.version();
    return downloadFile({
      url,
      name,
    });
  } catch (e) {
    //非钉钉
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.click();
    link.remove();
  }
}

export function doLogin(authCode) {
  return login({ requestAuthCode: authCode })
    .then((res) => {
      store.commit("SET_TOKEN", res.token);
      // 如采集用户信息是异步行为需要先执行这个BLOCK埋点
      aplus_queue.push({
        action: "aplus.setMetaInfo",
        arguments: ["_hold", "BLOCK"],
      });
      return getUserInfo();
    })
    .then((res) => {
      // 设置会员昵称
      aplus_queue.push({
        action: "aplus.setMetaInfo",
        arguments: ["_user_nick", res.data.name],
      });
      // 设置会员ID
      aplus_queue.push({
        action: "aplus.setMetaInfo",
        arguments: ["_user_id", res.data.id],
      });
      aplus_queue.push({
        action: "aplus.setMetaInfo",
        arguments: ["_dev_id", "yourDeviceId"],
      });
      // 如采集用户信息是异步行为，需要先设置完用户信息后再执行这个START埋点
      // 此时被block住的日志会携带上用户信息逐条发出
      aplus_queue.push({
        action: "aplus.setMetaInfo",
        arguments: ["_hold", "START"],
      });
      store.commit("SET_USER_INFO", res.data);
      checkRoutes();
    });
}

export function ddAuthenticate(ticket, jsApiList) {
  return dd.authConfig({
    ticket: ticket,
    jsApiList: jsApiList,
  });
}
