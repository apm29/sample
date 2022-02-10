import remote from "./remote";
import { getToken } from "@/storage/storage";
import { Loading, Notification } from "element-ui";
import { ref, unref } from "@vue/composition-api";
const JAVA_SUCCESS_CODE = 200;
remote.init({
  //缓存获取相关
  onCacheRetrieve(option) {
    return null;
  },

  //设置token
  onInterceptRequest(axiosRequest, option) {
    axiosRequest.headers.Authorization = option.token || getToken();
    return axiosRequest;
  },
  //响应处理
  onInterceptResponse(axiosResponse, option) {
    return new Promise((resolve, reject) => {
      if (axiosResponse.status === 200) {
        //在此处进行响应拦截
        if (axiosResponse.data.state === JAVA_SUCCESS_CODE) {
          if (option.showSuccessMessage) {
            Notification({
              message:
                axiosResponse.data.msg || axiosResponse.data.text || "操作成功",
              type: "success",
              duration: 5000,
            });
          }
          resolve(axiosResponse.data);
        } else {
          Notification({
            message: axiosResponse.data.msg || axiosResponse.data.text,
            type: "error",
          });
          reject(axiosResponse.data.msg);
        }
      } else {
        Notification({
          message: axiosResponse.data.msg || axiosResponse.statusText,
          type: "error",
        });
        reject(axiosResponse);
      }
    });
  },

  onInterceptRejectedRequest(error, option) {
    if (option.showErrorMessage && error) {
      Notification({
        message: error.message || String(error),
        type: "error",
      });
    }
    return error;
  },
  onInterceptRejectedResponse(error, option) {
    if (option.showErrorMessage && error) {
      Notification({
        message: error.message || String(error),
        type: "error",
      });
    }
    return error;
  },

  startLoading(option) {
    if (!option.silent) {
      loadingCount.value += 1;
      if (unref(loadingCount) > 0) {
        loadingInstance.value = Loading.service({
          fullscreen: true,
          spinner: "el-icon-loading",
          // background: "rgba(0, 0, 0, 0.8)",
          text: "拼命加载中",
        });
      }
    }
  },
  stopLoading(option) {
    if (!option.silent) {
      loadingCount.value -= 1;
      if (unref(loadingCount) <= 0) {
        unref(loadingInstance).close();
      }
    }
  },
});

const loadingInstance = ref(null);
const loadingCount = ref(0);
